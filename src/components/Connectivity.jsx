import React from 'react';
import { connectivityCards } from '../data/websiteData';

export default function Connectivity() {
  return (
    <section id="connectivity">
      <div className="wrap">
        <div className="reveal">
          <div className="eyebrow" style={{ color: '#a97f2c' }}>
            The Most Accessible Location
          </div>
          <h2>Everything Gurugram matters for, minutes away</h2>
        </div>
        <div className="conn-grid">
          {connectivityCards.map((card, idx) => (
            <div
              className="conn-card reveal"
              key={idx}
              style={{ transitionDelay: `${(idx % 3) * 0.1}s` }}
            >
              <div className="img">
                <img src={card.image} alt={card.alt} loading="lazy" />
              </div>
              <div className="body">
                <div className="time">{card.time}</div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
