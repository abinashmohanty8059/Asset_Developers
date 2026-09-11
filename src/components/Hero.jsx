import React, { useEffect, useRef } from 'react';
import { heroBadges } from '../data/websiteData';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const scrollCueRef = useRef(null);

  // Layered scroll parallax: the background lags behind at a slower rate
  // than native scroll (classic depth cue), the foreground content recedes
  // and fades a little faster than the page itself, and the scroll hint
  // fades out quickly once the visitor actually starts scrolling.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    // The scroll cue has its own CSS entrance animation (fill: forwards),
    // which — since CSS animations sit above inline styles in the cascade —
    // would otherwise keep overriding the opacity we set below indefinitely.
    // Clearing the animation once it finishes lets the scroll-driven fade
    // actually take effect.
    const cueEl = scrollCueRef.current;
    const clearCueAnimation = () => {
      if (cueEl) cueEl.style.animation = 'none';
    };
    cueEl?.addEventListener('animationend', clearCueAnimation, { once: true });

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        const bg = bgRef.current;
        if (bg) {
          // Capped as a fraction of viewport height so it can never outrun
          // the background's top overscan and reveal a gap, regardless of
          // how tall the viewport is.
          const bgShift = Math.min(scrollY * 0.28, vh * 0.12);
          bg.style.transform = `translateY(${bgShift}px)`;
        }

        const content = contentRef.current;
        if (content) {
          const fadeProgress = Math.min(scrollY / (vh * 0.85), 1);
          content.style.transform = `translateY(${-scrollY * 0.32}px)`;
          content.style.opacity = String(1 - fadeProgress * 0.9);
        }

        const cue = scrollCueRef.current;
        if (cue) {
          cue.style.opacity = String(Math.max(0, 1 - scrollY / 120));
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cueEl?.removeEventListener('animationend', clearCueAnimation);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !window.matchMedia('(pointer: fine)').matches) return undefined;

    const handleMove = (e) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--x', `${e.clientX - rect.left}px`);
      hero.style.setProperty('--y', `${e.clientY - rect.top}px`);
    };

    hero.addEventListener('mousemove', handleMove);
    return () => hero.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <header id="hero" ref={heroRef}>
      <div className="glow" aria-hidden="true" />
      <div className="bg" ref={bgRef} aria-hidden="true">
        <div className="bg-image" />
      </div>
      <div className="wrap content" ref={contentRef}>
        <div className="kicker">Asset Developers · Sector 88A, Gurugram NCR</div>
        <h1>
          Unveiling the most awaited <em>opportunity</em> on the Gurugram NCR
        </h1>
        <p className="sub">
          India World Mart — an exclusive Shop-Cum-Office plotted development bang on the
          Dwarka Expressway, built for retail, offices and everyday services that a growing,
          affluent Gurugram deserves.
        </p>
        <div className="badges">
          {heroBadges.map((badge, idx) => (
            <div
              key={idx}
              className={`badge ${badge.isGold ? 'gold' : ''}`.trim()}
            >
              {badge.text}
            </div>
          ))}
        </div>
      </div>
      <div className="scroll-cue" ref={scrollCueRef} aria-hidden="true">
        <span className="line" /> Scroll
      </div>
    </header>
  );
}
