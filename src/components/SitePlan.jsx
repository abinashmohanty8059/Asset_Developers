import React, { useState } from 'react';
import Lightbox from './Lightbox';

const SITE_PLAN_ALT = 'India World Mart site plan showing Type A to J plots, sold and available';

export default function SitePlan() {
  const [open, setOpen] = useState(false);

  return (
    <section id="siteplan">
      <div className="wrap reveal">
        <div className="eyebrow">Site Plan &amp; Inventory</div>
        <h2>Ten plot types, along the Dwarka Expressway frontage</h2>
        <div
          className="frame zoomable"
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpen(true);
          }}
        >
          <img src="/images/site-plan.jpg" alt={SITE_PLAN_ALT} loading="lazy" />
          <span className="zoom-hint">Click to enlarge</span>
        </div>
        <div className="note">
          Already NHAI-approved: direct access from Dwarka Expressway, as per sanctioned
          letter dated 18 Oct 2024.
        </div>
      </div>

      {open && (
        <Lightbox src="/images/site-plan.jpg" alt={SITE_PLAN_ALT} onClose={() => setOpen(false)} />
      )}
    </section>
  );
}
