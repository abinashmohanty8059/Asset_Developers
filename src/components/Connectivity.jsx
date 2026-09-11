import React from 'react';
import { connectivityCards } from '../data/websiteData';

// Doubled so the horizontal auto-scroll can loop seamlessly at -50%.
const GALLERY_CARDS = [...connectivityCards, ...connectivityCards];

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
      </div>
      <div className="conn-gallery reveal">
        <div className="conn-track">
          {GALLERY_CARDS.map((card, idx) => (
            <div
              className="conn-card"
              key={idx}
              aria-hidden={idx >= connectivityCards.length ? 'true' : undefined}
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
