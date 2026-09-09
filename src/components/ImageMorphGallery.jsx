import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A mix of imagery already used elsewhere on the site (lifestyle, feature and
// elevation renders) plus a few previously-unused lifestyle shots, cycled
// across the scatter/line/circle card formation.
const GALLERY_IMAGES = [
  { src: '/images/lifestyle-fine-dining.jpg', alt: 'Fine dining restaurant interior' },
  { src: '/images/lifestyle-gym.jpg', alt: 'Modern gym with cardio equipment' },
  { src: '/images/lifestyle-yoga.jpg', alt: 'Sunlit yoga studio' },
  { src: '/images/lifestyle-friends-cafe.jpg', alt: 'Friends enjoying a café outing' },
  { src: '/images/lifestyle-shopping.jpg', alt: 'Shoppers walking with bags' },
  { src: '/images/lifestyle-coworking.jpg', alt: 'Co-working meeting room with green wall' },
  { src: '/images/lifestyle-lounge.jpg', alt: 'Lounge seating area' },
  { src: '/images/lifestyle-retail-counter.jpg', alt: 'Retail checkout counter' },
  { src: '/images/lifestyle-family-movie.jpg', alt: 'Family enjoying a movie night' },
  { src: '/images/feature-sco-render.jpg', alt: 'SCO building elevation render' },
  { src: '/images/building-elevation-1.jpg', alt: 'India World Mart building elevation' },
  { src: '/images/globalcity-render.jpg', alt: 'Global City upcoming smart city render' },
];

const TOTAL_CARDS = 24;
const CARDS = Array.from({ length: TOTAL_CARDS }, (_, i) => GALLERY_IMAGES[i % GALLERY_IMAGES.length]);

export default function ImageMorphGallery() {
  const containerRef = useRef(null);
  const visualColRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const introRef = useRef(null);
  const exploreRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef.current;
    const visualCol = visualColRef.current;
    const cardsWrap = cardsWrapRef.current;
    const intro = introRef.current;
    const explore = exploreRef.current;
    if (!container || !visualCol || !cardsWrap || !intro || !explore) return undefined;

    if (prefersReducedMotion) {
      // Static, legible fallback: lay the cards out in a simple grid, no motion.
      const cards = cardsWrap.querySelectorAll('.morph-card-wrap');
      gsap.set(cards, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, clearProps: 'transform' });
      return undefined;
    }

    // The circle/line formation is sized against the visual column itself
    // (not the whole window) so it sits centered in its own half of the
    // section regardless of how much room the text column takes up.
    const getVisualSize = () => {
      const rect = visualCol.getBoundingClientRect();
      return { w: rect.width || window.innerWidth, h: rect.height || window.innerHeight };
    };

    // Sized to fill a good share of the visual column, but capped so the
    // ring's own cards (measured, since their height is responsive) never
    // clip against the column's overflow: hidden edges, top or bottom.
    const getRadius = () => {
      const { w, h } = getVisualSize();
      const sampleCard = cardsWrap.querySelector('.morph-card-wrap');
      const cardH = sampleCard ? sampleCard.getBoundingClientRect().height : 150;
      const maxByHeight = h / 2 - cardH / 2 - 16;
      return Math.max(110, Math.min(260, w * 0.3, maxByHeight));
    };

    const ctx = gsap.context(() => {
      const cards = cardsWrap.querySelectorAll('.morph-card-wrap');

      gsap.set(cards, {
        x: () => (Math.random() - 0.5) * getVisualSize().w * 0.9,
        y: () => (Math.random() - 0.5) * getVisualSize().h * 0.9,
        rotation: () => (Math.random() - 0.5) * 80,
        scale: () => 0.4 + Math.random() * 0.3,
        opacity: 0,
      });

      const introTimeline = gsap.timeline({ paused: true });

      introTimeline.to(cards, {
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power2.out',
      });

      // Scatter -> line
      introTimeline.to(
        cards,
        {
          x: (i) => {
            const spacing = getVisualSize().w < 420 ? 13 : 24;
            return (i - (TOTAL_CARDS - 1) / 2) * spacing;
          },
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.02,
          ease: 'power3.inOut',
        },
        '+=0.4'
      );

      // Line -> circle
      introTimeline.to(
        cards,
        {
          x: (i) => {
            const R = getRadius();
            const angle = (i / TOTAL_CARDS) * 2 * Math.PI;
            return R * Math.cos(angle);
          },
          y: (i) => {
            const R = getRadius();
            const angle = (i / TOTAL_CARDS) * 2 * Math.PI;
            return R * Math.sin(angle);
          },
          rotation: (i) => {
            const angle = (i / TOTAL_CARDS) * 2 * Math.PI;
            return Math.sin(angle) * 15;
          },
          scale: 1,
          duration: 1.4,
          stagger: 0.015,
          ease: 'elastic.out(1, 0.85)',
        },
        '+=1.0'
      );

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      scrollTimeline.to(intro, { opacity: 0, y: -30, duration: 0.35 }, 0);
      scrollTimeline.to(explore, { opacity: 1, y: 0, duration: 0.45 }, 0.15);

      scrollTimeline.to(cardsWrap, { rotation: 180, ease: 'none', duration: 2.0 }, 0);

      scrollTimeline.to(
        cards,
        {
          rotation: (i) => {
            const angle = (i / TOTAL_CARDS) * 2 * Math.PI;
            const initialRot = Math.sin(angle) * 15;
            return initialRot - 180;
          },
          ease: 'none',
          duration: 2.0,
        },
        0
      );

      const xTo = gsap.quickTo(cardsWrap, 'x', { duration: 0.8, ease: 'power2.out' });
      const handlePointerMove = (e) => {
        const px = (e.clientX / window.innerWidth) * 2 - 1;
        xTo(px * 30);
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      // ScrollTrigger (rather than a plain IntersectionObserver) so a scroll
      // that jumps straight past this section in one commit — a restored
      // scroll position, an anchor jump, etc. — still resolves correctly:
      // it evaluates the trigger's state against the current scroll position
      // immediately, instead of only reacting to a future intersection change.
      const entryTrigger = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        once: true,
        onEnter: () => introTimeline.play(),
        onRefresh: (self) => {
          if (self.progress > 0) introTimeline.progress(1);
        },
      });

      return () => {
        entryTrigger.kill();
        window.removeEventListener('pointermove', handlePointerMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="morph-page-container">
      <div className="morph-viewport">
        <div className="morph-text-col">
          <div ref={introRef} className="morph-text-overlay">
            <div className="eyebrow">The SCO Advantage</div>
            <h2>One project. Endless SCO possibilities.</h2>
            <p>Scroll to explore</p>
          </div>

          <div ref={exploreRef} className="morph-text-overlay morph-text-overlay--explore">
            <div className="eyebrow">India World Mart</div>
            <h2>Retail. Offices. Everyday life — all on one SCO plot.</h2>
            <p>From boutique storefronts to independent office floors</p>
          </div>
        </div>

        <div className="morph-visual-col" ref={visualColRef}>
          <div ref={cardsWrapRef} className="morph-cards-inner-wrap" aria-hidden="true">
            {CARDS.map((item, i) => (
              <div key={i} className="morph-card-wrap">
                <div className="morph-card-inner">
                  <div className="morph-card-front">
                    <img src={item.src} alt="" loading="lazy" />
                  </div>
                  <div className="morph-card-back">
                    <span>SCO</span>
                    <span>PLOT</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
