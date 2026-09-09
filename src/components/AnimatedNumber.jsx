import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Parses a display string such as "13 km", "100%", "5x+" or "5,400 sq. ft."
 * into a leading numeric value plus a static suffix, so it can be counted
 * up from 0 on scroll-into-view. Strings with no leading number (e.g.
 * "Bang On") are returned unparsed and simply fade/scale in as-is.
 */
function parseValue(raw) {
  const match = String(raw).match(/^([\d,]+(?:\.\d+)?)/);
  if (!match) return null;
  const numStr = match[1];
  const num = parseFloat(numStr.replace(/,/g, ''));
  if (Number.isNaN(num)) return null;
  return {
    num,
    isInt: Number.isInteger(num),
    hasComma: numStr.includes(','),
    suffix: raw.slice(match[0].length),
  };
}

export default function AnimatedNumber({ value, duration = 1400, className }) {
  const parsed = useMemo(() => parseValue(value), [value]);
  const [display, setDisplay] = useState(() => {
    if (!parsed) return value;
    return `0${parsed.suffix}`;
  });
  const ref = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplay(value);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const { num, suffix, hasComma, isInt } = parsed;

            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = num * eased;
              const rounded = isInt ? Math.round(current) : Math.round(current * 10) / 10;
              const formatted = hasComma ? rounded.toLocaleString('en-IN') : String(rounded);
              setDisplay(`${formatted}${suffix}`);
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(value);
              }
            };
            requestAnimationFrame(tick);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, parsed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
