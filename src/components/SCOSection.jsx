import React from 'react';

export default function SCOSection() {
  return (
    <section id="sco">
      <div className="wrap">
        <div className="grid reveal">
          <div className="textwrap">
            <div className="eyebrow" style={{ color: '#a97f2c' }}>
              Shop Cum Office
            </div>
            <h2>Plots designed to accommodate both commercial shops and offices</h2>
            <p>
              A low-rise, high-street format — basement plus ground plus four storeys —
              where a retail frontage and independent floors of office space sit on the
              same freehold plot, giving every owner the flexibility to lease, occupy or
              resell each level on its own terms.
            </p>
          </div>
          <img
            src="/images/building-elevation-1.jpg"
            alt="Rendered elevation of India World Mart SCO plots at dusk"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
