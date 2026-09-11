import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { amenitiesList } from '../data/websiteData';

gsap.registerPlugin(ScrollTrigger);

const svgProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

// Index-matched to amenitiesList in websiteData.js.
const ICONS = [
  <svg {...svgProps}><path d="M3 21h18M5 21V7l7-4 7 4v14M10 21v-5h4v5" /></svg>,
  <svg {...svgProps}><path d="M4 20v-7a8 8 0 0 1 16 0v7M4 20h16M9 20v-4M15 20v-4" /></svg>,
  <svg {...svgProps}><path d="M4 3h16v18H4zM4 9h16M4 15h16M10 3v18" /></svg>,
  <svg {...svgProps}><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>,
  <svg {...svgProps}><path d="M12 21v-7M12 14c-3.3 0-6-2.2-6-6 0 0 2.7 1 6 1s6-1 6-1c0 3.8-2.7 6-6 6zM7 21h10" /></svg>,
  <svg {...svgProps}><path d="M3 16h18v-3l-2-5H5l-2 5zM6 19v-3M18 19v-3M7 16h.01M17 16h.01" /></svg>,
  <svg {...svgProps}><path d="m12 3 2.4 5.3 5.6.9-4 4 1 6-5-3-5 3 1-6-4-4 5.6-.9z" /></svg>,
  <svg {...svgProps}><path d="M4 21V6a2 2 0 0 1 2-2h3v17M20 21V6a2 2 0 0 0-2-2h-3v17M2 21h20M11 12h2" /></svg>,
];

export default function Amenities() {
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  // Explosive scatter-in: cards fly in from random directions with rotation
  // and an elastic bounce as the grid scrolls into view.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const grid = gridRef.current;
    const cards = cardRefs.current.filter(Boolean);
    if (!grid || cards.length === 0 || prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        x: () => gsap.utils.random(-260, 260),
        y: () => gsap.utils.random(-170, 170),
        rotation: () => gsap.utils.random(-55, 55),
        scale: 0.4,
      });

      ScrollTrigger.create({
        trigger: grid,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.1,
            stagger: { each: 0.09, from: 'random' },
            ease: 'elastic.out(1, 0.6)',
            overwrite: 'auto',
          });
        },
        onRefresh: (self) => {
          if (self.progress > 0) {
            gsap.set(cards, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 });
          }
        },
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  // Cursor-follow 3D tilt, desktop pointers only.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const cards = cardRefs.current.filter(Boolean);

    const cleanups = cards.map((card) => {
      const handleMove = (e) => {
        card.style.transition = 'none';
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${(-py * 16).toFixed(2)}deg) rotateY(${(px * 16).toFixed(2)}deg) scale(1.05)`;
      };
      const handleLeave = () => {
        card.style.transition = 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)';
        card.style.transform = '';
      };
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
      return () => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return (
    <section id="amenities">
      <div className="wrap inner reveal">
        <div className="eyebrow dark">Amenities &amp; Advantages</div>
        <h2>An SCO built for a new age</h2>
        <p className="lede">
          Everything the plot comes with — from the built envelope to the everyday
          conveniences that keep tenants and footfall coming back.
        </p>
        <div className="amenity-grid" ref={gridRef}>
          {amenitiesList.map((amenity, idx) => (
            <div className="a" key={idx} ref={(el) => (cardRefs.current[idx] = el)}>
              <span className="icon">{ICONS[idx % ICONS.length]}</span>
              <p>{amenity}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
