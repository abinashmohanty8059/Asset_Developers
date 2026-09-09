import React from 'react';
import { neighbourhoodItems } from '../data/websiteData';

export default function Neighbourhood() {
  return (
    <section id="neighbourhood">
      <div className="wrap">
        <div className="grid reveal">
          <div>
            <div className="eyebrow">At The Centre Of A Growing Base</div>
            <h2>A growing, affluent customer base</h2>
            <div className="income">
              Surrounded by families with an annual income of over ₹50 lakhs
            </div>
          </div>
          <div>
            {neighbourhoodItems.map((item, idx) => (
              <div className="nb-item" key={idx}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
