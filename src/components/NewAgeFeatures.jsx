import React from 'react';
import { newAgeFeatures } from '../data/websiteData';

export default function NewAgeFeatures() {
  return (
    <section id="newage">
      <div className="wrap reveal">
        <div className="eyebrow">A New-Age SCO</div>
        <h2>Low maintenance, by design</h2>
        <div className="sub2">
          A low-maintenance SCO built to ensure more profit and higher income.
        </div>
        <div className="feat-grid">
          {newAgeFeatures.map((feat, idx) => (
            <div
              className="feat reveal"
              key={idx}
              style={{ transitionDelay: `${idx * 0.1}s` }}
            >
              <img src={feat.image} alt={feat.alt} loading="lazy" />
              <div className="t">
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="newage-banner">
          A low maintenance SCO which ensures more profits and higher income
        </div>
      </div>
    </section>
  );
}
