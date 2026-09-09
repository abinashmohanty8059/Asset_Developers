import React from 'react';
import { trustMarquee } from '../data/websiteData';

/** Infinite-scroll strip of verified project facts, doubled for a seamless loop. */
export default function TrustMarquee() {
  return (
    <div className="trust-marquee">
      <div className="trust-track">
        {trustMarquee.map((item, idx) => (
          <span className="trust-item" key={`a-${idx}`}>
            {item}
            <span className="dot" aria-hidden="true">&bull;</span>
          </span>
        ))}
        {trustMarquee.map((item, idx) => (
          <span className="trust-item" key={`b-${idx}`} aria-hidden="true">
            {item}
            <span className="dot" aria-hidden="true">&bull;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
