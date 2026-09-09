import React, { useState, useEffect } from 'react';
import { navLinks } from '../data/websiteData';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openMobileMenu = () => setMobileMenuOpen(true);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="brand">
          <a href="#hero" aria-label="Home">
            <img
              src="/images/logo-clean.jpg"
              alt="Asset Developers"
              style={{ background: '#fff', padding: '4px 8px', borderRadius: '2px' }}
            />
          </a>
        </div>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className="cta" href="#contact">
          Enquire Now
        </a>
        <button
          id="navToggle"
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobileMenu"
          onClick={openMobileMenu}
        >
          &#9776;
        </button>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMobileMenu} />
    </>
  );
}
