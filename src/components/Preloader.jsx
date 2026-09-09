import React, { useEffect, useState } from 'react';

/** Brief branded loading screen; skipped entirely for prefers-reduced-motion. */
export default function Preloader() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDone(true);
      setHidden(true);
      return undefined;
    }

    const doneTimer = setTimeout(() => setDone(true), 850);
    const hideTimer = setTimeout(() => setHidden(true), 1350);

    return () => {
      clearTimeout(doneTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <div className={`preloader ${done ? 'is-done' : ''}`} role="status" aria-label="Loading">
      <div className="preloader-inner">
        <img src="/images/logo-clean.jpg" alt="Asset Developers" className="preloader-logo" />
        <div className="preloader-line">
          <span />
        </div>
      </div>
    </div>
  );
}
