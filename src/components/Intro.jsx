import React from 'react';
import { introPoints } from '../data/websiteData';

export default function Intro() {
  return (
    <section id="intro">
      <div className="wrap">
        <div className="grid reveal">
          <div>
            <div className="eyebrow">The Retail Goldmine</div>
            <h2>An iconic epicentre with top-tier connectivity</h2>
            <p>
              India World Mart, part of the larger India Project*, is an exclusive SCO
              (Shop-Cum-Office) plotted project poised to become one of the most
              sought-after commercial hubs of Delhi NCR.
            </p>
            <ul className="points">
              {introPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            <p className="footnote">
              *India Project is a group of separate projects owned by separate land
              owners, to be developed by separate developers, located in Sector 88A
              Gurugram, wherein common road access / infrastructure is proposed to be
              developed jointly.
            </p>
          </div>
          <div className="imgwrap">
            <img
              src="/images/spr-interchange.jpg"
              alt="CPR-SPR link, Dwarka Expressway interchange at night"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
