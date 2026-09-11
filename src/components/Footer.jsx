import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="brand">
          <img
            src="/images/asset-developers-logo.png"
            alt="Asset Developers"
            style={{ height: '20px' }}
            loading="lazy"
          />
        </div>
        <div>&copy; Asset Developers. New Delhi, India.</div>
      </div>
      <div className="wrap legal">
        <div className="rera">
          HARERA Registration No. RC/REP/HARERA/GGM/960/692/2025/63 &nbsp;·&nbsp; Website:{' '}
          <a
            href="https://www.haryanarera.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            www.haryanarera.gov.in
          </a>
        </div>
        <div>
          *India Project is a group of separate projects owned by separate land owners,
          to be developed by separate developers, located in Sector 88A Gurugram, wherein
          common road access / infrastructure is proposed to be developed jointly.
          Location maps are graphical representations for information purposes only;
          please refer to accurate details and certification before investing.
        </div>
      </div>
    </footer>
  );
}
