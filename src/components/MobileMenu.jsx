import React, { useEffect } from 'react';
import { navLinks } from '../data/websiteData';

export default function MobileMenu({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        id="menuOverlay"
        className={isOpen ? 'open' : ''}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        id="mobileMenu"
        className={isOpen ? 'open' : ''}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={onClose}>
            {link.label}
          </a>
        ))}
        <a className="cta" href="#contact" onClick={onClose}>
          Enquire Now
        </a>
      </div>
    </>
  );
}
