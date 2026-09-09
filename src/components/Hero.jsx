import React, { useEffect, useRef } from 'react';
import { heroBadges } from '../data/websiteData';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const bg = bgRef.current;
        if (bg) {
          bg.style.transform = `translateY(${window.scrollY * 0.18}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
      <div className="wrap content">
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
      <div className="scroll-cue" aria-hidden="true">
        <span className="line" /> Scroll
      </div>
    </header>
  );
}
