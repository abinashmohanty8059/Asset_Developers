import React, { useState } from 'react';
import { businessCategories, businessGallery } from '../data/websiteData';
import Lightbox from './Lightbox';

export default function Businesses() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="businesses">
      <div className="wrap">
        <div className="head reveal">
          <div>
            <div className="eyebrow" style={{ color: '#a97f2c' }}>
              Where Commerce Meets Opportunity
            </div>
            <h2>Built for the businesses Gurugram wants nearby</h2>
          </div>
          <ul className="biz-list">
            {businessCategories.map((biz, idx) => (
              <li
                className="reveal"
                key={idx}
                style={{ transitionDelay: `${idx * 0.06}s` }}
              >
                <b>{biz.title}</b> — {biz.desc}
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery">
          {businessGallery.map((item, idx) => (
            <div
              className="g reveal zoomable"
              key={idx}
              style={{ transitionDelay: `${(idx % 3) * 0.08}s` }}
              onClick={() => setOpenIdx(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setOpenIdx(idx);
              }}
            >
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="zoom-hint">Click to enlarge</span>
            </div>
          ))}
        </div>
        <div className="spa-note">Note: Spas will not be permitted at India World Mart.</div>
      </div>

      {openIdx !== null && (
        <Lightbox
          src={businessGallery[openIdx].image}
          alt={businessGallery[openIdx].alt}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </section>
  );
}
