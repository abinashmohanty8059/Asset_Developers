import React, { useEffect, useRef, useState } from 'react';

// A single address, told across a day — reusing our own skyline photography
// (including the previously-unused dusk-blue frame) as a scroll-scrubbed
// sequence, crossfading from one still to the next as the section is pinned.
const FRAMES = [
  {
    src: '/images/hero-skyline-sunset.jpg',
    time: 'Morning',
    caption: 'Commuters enter off a 150 m-wide Dwarka Expressway.',
  },
  {
    src: '/images/skyline-dusk-blue.jpg',
    time: 'Afternoon',
    caption: 'Retail footfall builds along the SCO high street.',
  },
  {
    src: '/images/skyline-dusk-2.jpg',
    time: 'Evening',
    caption: 'Offices wind down as cafés and F&B pick up.',
  },
  {
    src: '/images/hero-skyline-night.jpg',
    time: 'Night',
    caption: '100% power backup keeps the address always on.',
  },
];

export default function SkylineScrollReveal() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const raw = total > 0 ? (-rect.top) / total : 0;
        const clamped = Math.max(0, Math.min(1, raw));
        setProgress(clamped);
        const idx = Math.min(FRAMES.length - 1, Math.floor(clamped * FRAMES.length));
        setActiveIndex(idx);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section id="skyline-story" className="skyline-story" ref={sectionRef} aria-label="India World Mart, sunrise to night">
      <div className="skyline-sticky">
        <div className="skyline-frames" aria-hidden="true">
          {FRAMES.map((frame, idx) => (
            <div
              key={frame.src}
              className={`skyline-frame ${idx === activeIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${frame.src})` }}
            />
          ))}
          <div className="skyline-overlay" />
        </div>

        <div className="skyline-content">
          <div className="eyebrow">One Address, All Day</div>
          <h2>India World Mart, sunrise to night</h2>
          <div className="skyline-track" role="presentation">
            {FRAMES.map((frame, idx) => (
              <div key={frame.time} className={`skyline-step ${idx === activeIndex ? 'active' : ''}`}>
                <span className="skyline-time">{frame.time}</span>
                <p>{frame.caption}</p>
              </div>
            ))}
          </div>
          <div className="skyline-progress" aria-hidden="true">
            <div className="skyline-progress-bar" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
