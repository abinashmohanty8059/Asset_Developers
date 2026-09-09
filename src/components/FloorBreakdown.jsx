import React from 'react';
import { floorBreakdown } from '../data/websiteData';
import AnimatedNumber from './AnimatedNumber';

export default function FloorBreakdown() {
  return (
    <section id="floors">
      <div className="wrap">
        <div className="grid reveal">
          <div>
            <div className="eyebrow" style={{ color: '#a97f2c' }}>
              Built-Up Potential
            </div>
            <h2>Potential covered area, per plot</h2>
            <p className="lede">
              As per SCO policy, a typical 100 sq. yd. plot can build up to five times
              its area across six usable levels.
            </p>
          </div>
          <div>
            <div className="floor-table">
              {floorBreakdown.map((row, idx) => (
                <div
                  key={idx}
                  className={`floor-row reveal ${row.isTotal ? 'total' : ''}`.trim()}
                  style={{ transitionDelay: `${idx * 0.05}s` }}
                >
                  <span className="l">{row.label}</span>
                  <span className="v">
                    {row.isTotal ? <AnimatedNumber value={row.value} /> : row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="plotcap">
              Figures illustrative, for a 100 sq. yd. plot — actual built-up scales
              proportionally with plot size (Types A–J).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
