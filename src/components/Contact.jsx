import React, { useState } from 'react';
import { contactMeta } from '../data/websiteData';

const initialForm = { name: '', phone: '', email: '', message: '' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Please enter your name.';
  if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    errors.phone = 'Enter a valid 10-digit mobile number.';
  }
  if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus('submitting');
    // No backend is wired up yet — this simulates a submission locally.
    setTimeout(() => {
      setStatus('success');
      setForm(initialForm);
    }, 900);
  };

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

        <div className="enquiry-form">
          {status === 'success' ? (
            <div className="form-success">
              <div className="check">&#10003;</div>
              <h4>Request received</h4>
              <p>Thank you — our sales team will call you back shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="field">
                  <label htmlFor="cf-name">Full Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="cf-phone">Mobile Number</label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    placeholder="98xxxxxxxx"
                    value={form.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="cf-email">Email (optional)</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
              <div className="field">
                <label htmlFor="cf-message">Message (optional)</label>
                <textarea
                  id="cf-message"
                  name="message"
                  placeholder="Tell us about the plot type you're interested in"
                  value={form.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn primary submit-btn" disabled={status === 'submitting'}>
                {status === 'submitting' && <span className="spinner" />}
                {status === 'submitting' ? 'Sending…' : 'Request a Callback'}
              </button>
              <div className="form-note">
                This form is not yet connected to a backend — submissions are shown here only.
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
