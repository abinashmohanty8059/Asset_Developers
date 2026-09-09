import React from 'react';
import { amenitiesList } from '../data/websiteData';

export default function Amenities() {
  return (
    <section id="amenities">
      <div className="bg" aria-hidden="true" />
      <div className="overlay" aria-hidden="true" />
      <div className="wrap inner reveal">
        <div className="eyebrow">Amenities &amp; Advantages</div>
        <h2>An SCO built for a new age</h2>
        <div className="amenity-grid">
          {amenitiesList.map((amenity, idx) => (
            <div className="a" key={idx}>
              <p>{amenity}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
