import { useEffect } from 'react';

/**
 * Custom hook to initialize scroll reveal animations using IntersectionObserver.
 * Observes all elements with the `.reveal` class and adds the `.in` class when they enter the viewport.
 * Automatically respects `prefers-reduced-motion`.
 */
export function useScrollReveal(threshold = 0.14) {
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const elements = document.querySelectorAll('.reveal');
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal:not(.in)');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [threshold]);
}

export default useScrollReveal;
