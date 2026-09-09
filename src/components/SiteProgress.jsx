import React from 'react';

export default function SiteProgress() {
  return (
    <section id="progress">
      <div className="wrap">
        <div className="reveal">
          <div className="frame">
            <img
              src="/images/section-site-snapshots.jpg"
              alt="India World Mart signboard, statues and landscaped avenue on site"
              loading="lazy"
            />
          </div>
        </div>
        <div className="reveal">
          <h2>Construction in full swing, even before RERA</h2>
          <div className="prog-grid">
            <img
              src="/images/construction-1.jpg"
              alt="Earthmoving equipment grading the site"
              loading="lazy"
            />
            <div>
              <p>
                Use of quality material and futuristic technology means low maintenance
                and longevity — with site utilities, drainage and internal roads already
                under active development.
              </p>
              <img
                src="/images/construction-2.jpg"
                alt="Aerial view of drainage pipes and site infrastructure"
                style={{ marginTop: '20px' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
