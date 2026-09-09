import React from 'react';
import { contactMeta } from '../data/websiteData';

export default function Contact() {
  return (
    <section id="contact">
      <div className="bg" aria-hidden="true" />
      <div className="wrap inner reveal">
        <div className="eyebrow">Get In Touch</div>
        <h2>Reserve your SCO plot on the Dwarka Expressway</h2>
        <p>
          Speak with our sales team for available plot types, pricing and a personal site
          visit to India World Mart, Sector 88A, Gurugram.
        </p>
        <div className="contact-actions">
          <a className="btn primary" href="tel:+919164001144">
            Call +91 91640 01144
          </a>
          <a className="btn ghost" href="#siteplan">
            View Site Plan
          </a>
        </div>
        <div className="contact-meta">
          {contactMeta.map((meta, idx) => (
            <div key={idx}>
              <span>{meta.label}</span>
              {meta.value}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
