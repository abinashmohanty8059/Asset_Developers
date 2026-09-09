import React from 'react';
import { heroBadges } from '../data/websiteData';

export default function Hero() {
  return (
    <header id="hero">
      <div className="bg" aria-hidden="true" />
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
