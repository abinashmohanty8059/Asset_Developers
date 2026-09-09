import React, { useEffect, useState } from 'react';

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`floating-contact ${visible ? 'visible' : ''}`}>
      <a href="#contact" className="fc-btn fc-enquire">
        Enquire Now
      </a>
      <a href="tel:+919164001144" className="fc-btn fc-call" aria-label="Call Asset Developers">
        <span className="fc-ring" aria-hidden="true" />
        <span className="fc-icon" aria-hidden="true">&#9742;</span>
      </a>
    </div>
  );
}
