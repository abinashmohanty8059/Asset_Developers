import React from 'react';
import { whySCOBenefits } from '../data/websiteData';

export default function WhySCO() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="grid reveal">
          <div>
            <div className="eyebrow">SCO · The Smart Investment Choice</div>
            <h2>Why SCO plots?</h2>
            <p className="lede">
              A freehold, low-maintenance commercial asset class built for both self-use
              and steady rental income — without the shared ownership limitations of a
              traditional mall unit.
            </p>
            <img
              src="/images/building-elevation-2.jpg"
              alt="India World Mart SCO street elevation, dusk"
              loading="lazy"
            />
          </div>
          <ul>
            {whySCOBenefits.map((benefit, idx) => (
              <li
                className="reveal"
                key={idx}
                style={{ transitionDelay: `${(idx % 5) * 0.06}s` }}
              >
                <span className="n">—</span> {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
