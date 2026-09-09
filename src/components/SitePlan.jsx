import React from 'react';

export default function SitePlan() {
  return (
    <section id="siteplan">
      <div className="wrap reveal">
        <div className="eyebrow">Site Plan &amp; Inventory</div>
        <h2>Ten plot types, along the Dwarka Expressway frontage</h2>
        <div className="frame">
          <img
            src="/images/site-plan.jpg"
            alt="India World Mart site plan showing Type A to J plots, sold and available"
            loading="lazy"
          />
        </div>
        <div className="note">
          Already NHAI-approved: direct access from Dwarka Expressway, as per sanctioned
          letter dated 18 Oct 2024.
        </div>
      </div>
    </section>
  );
}
