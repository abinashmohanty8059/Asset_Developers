import React, { useState, useEffect, useRef } from 'react';
import { wealthStats, wealthBarsData } from '../data/websiteData';

export default function WealthCreation() {
  const [animated, setAnimated] = useState(false);
  const barsRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setAnimated(true);
      return;
    }

    const currentRef = barsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section id="wealth">
      <div className="wrap">
        <div className="grid reveal">
          <div>
            <div className="eyebrow" style={{ color: '#a97f2c' }}>
              Path To Wealth Creation
            </div>
            <h2>Built on a corridor experts expect to double in value</h2>
            <p className="lede">
              Experts project a 100% increase in property values on Dwarka Expressway by
              2030, alongside strong and stable rental returns — making an SCO plot one of
              the best-performing asset classes in the NCR.
            </p>
            <div className="wealth-stats">
              {wealthStats.map((stat, idx) => (
                <div className="w" key={idx}>
                  <div className="num">{stat.num}</div>
                  <div className="lab">{stat.lab}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bars" id="wealthBars" ref={barsRef}>
            {wealthBarsData.map((bar, idx) => (
              <div className="col" key={idx}>
                <div
                  className="bar"
                  data-h={bar.height}
                  style={{ height: animated ? `${bar.height}%` : '0%' }}
                />
                <div className="yr">{bar.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
