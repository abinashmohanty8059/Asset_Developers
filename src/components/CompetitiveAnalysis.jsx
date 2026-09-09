import React from 'react';

export default function CompetitiveAnalysis() {
  return (
    <section id="analysis">
      <div className="wrap">
        <div className="grid reveal">
          <div>
            <div className="eyebrow" style={{ color: '#a97f2c' }}>
              Competitive Analysis
            </div>
            <h2>Resale performance across nearby SCO addresses</h2>
            <p>
              Launch prices across comparable SCO developments along the Dwarka
              Expressway corridor have shown strong resale premiums as the micro-market has
              matured — a trend India World Mart is positioned to benefit from at an
              earlier entry point.
            </p>
          </div>
          <div className="imgcard">
            <img
              src="/images/chart-competitive-analysis.jpg"
              alt="Chart comparing launch price and resale price per sq. yd. across SCO 102, 99, 37D, 113 and 84"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
