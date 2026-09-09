import React from 'react';
import { businessCategories, businessGallery } from '../data/websiteData';

export default function Businesses() {
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
              <li key={idx}>
                <b>{biz.title}</b> — {biz.desc}
              </li>
            ))}
          </ul>
        </div>
        <div className="gallery reveal">
          {businessGallery.map((item, idx) => (
            <div className="g" key={idx}>
              <img src={item.image} alt={item.alt} loading="lazy" />
            </div>
          ))}
        </div>
        <div className="spa-note">Note: Spas will not be permitted at India World Mart.</div>
      </div>
    </section>
  );
}
