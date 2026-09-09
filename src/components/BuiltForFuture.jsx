import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A giant headline whose letterforms are a clipping mask — a looping video
// only shows through the glyph shapes. The layout is measured from a hidden
// text layer so the SVG <text> clip-path glyphs line up with the visible
// (invisible) heading exactly, then a slow mouse-parallax drift plays inside
// the clipped area.
const WORDS = ['Built', 'for', 'the', 'Future'];

const VIDEO_SRC =
  'https://ik.imagekit.io/tm5te9cjl/ff/Aerial%20view%20of%20sand%20beach.%20Top%20view%20sea%20waves.%20Drone%20footage%20-%20Nature%20video,%20HD%20-%204K%20(720p,%20h264).mp4?updatedAt=1788042662542';

export default function BuiltForFuture() {
  const containerRef = useRef(null);
  const rootRef = useRef(null);
  const measureRef = useRef(null);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const prefersReducedMotionRef = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const root = rootRef.current;
    const measure = measureRef.current;
    const media = mediaRef.current;
    if (!root || !measure || !media) return undefined;

    const FILL_SCALE = 1.25;
    const PARALLAX = 22;
    const DRIFT = 12;
    const TEXT_SCALE = 0.115;

    const glyphEls = WORDS.map((_, i) => root.querySelector(`#bffG${i}`));
    const wordEls = WORDS.map((_, i) => root.querySelector(`#bffWord${i}`));
    const baseEls = WORDS.map((_, i) => root.querySelector(`#bffBase${i}`));

    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

    function sync() {
      const W = root.clientWidth;
      const fs = clamp(W * TEXT_SCALE, 26, 200);
      root.style.fontSize = `${fs.toFixed(1)}px`;

      const cs = window.getComputedStyle(measure);

      for (let i = 0; i < WORDS.length; i++) {
        const g = glyphEls[i];
        const w = wordEls[i];
        const b = baseEls[i];
        if (!g || !w || !b) continue;
        g.setAttribute('x', `${w.offsetLeft}`);
        g.setAttribute('y', `${b.offsetTop}`);
        g.style.fontFamily = cs.fontFamily;
        g.style.fontSize = cs.fontSize;
        g.style.fontWeight = cs.fontWeight;
        g.style.letterSpacing = cs.letterSpacing;
      }
      place();
    }

    function place() {
      const W = root.clientWidth;
      const H = root.clientHeight;
      const maxX = Math.max(0, ((FILL_SCALE - 1) / 2) * W);
      const maxY = Math.max(0, ((FILL_SCALE - 1) / 2) * H);
      media.style.transform =
        `translate3d(${clamp(ox, -maxX, maxX).toFixed(2)}px,` +
        `${clamp(oy, -maxY, maxY).toFixed(2)}px, 0)` +
        ` scale(${FILL_SCALE})`;
    }

    let ox = 0;
    let oy = 0;
    let tx = 0;
    let ty = 0;
    let clock = 0;
    let last = performance.now();
    let rafId = 0;

    function frame(now) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      clock += dt;

      const dx = Math.sin(clock * 0.21) * DRIFT;
      const dy = Math.cos(clock * 0.17) * DRIFT * 0.6;

      const ease = 1 - Math.exp(-dt / 0.18);
      ox += (tx + dx - ox) * ease;
      oy += (ty + dy - oy) * ease;

      place();
      rafId = requestAnimationFrame(frame);
    }

    function onMove(e) {
      const r = root.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / (r.width || 1)) * 2 - 1;
      const ny = ((e.clientY - r.top) / (r.height || 1)) * 2 - 1;
      tx = clamp(nx, -1, 1) * -PARALLAX;
      ty = clamp(ny, -1, 1) * -PARALLAX;
    }

    function onLeave() {
      tx = 0;
      ty = 0;
    }

    const ro = new ResizeObserver(sync);
    ro.observe(root);

    let fontPromiseActive = true;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (fontPromiseActive) sync();
      }).catch(() => {});
    }
    sync();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Static: glyphs fully in place, image held still, no drift/parallax.
        place();
        return;
      }

      root.addEventListener('pointermove', onMove, { passive: true });
      root.addEventListener('pointerleave', onLeave);
      rafId = requestAnimationFrame(frame);

      const riseDistance = () => (parseFloat(window.getComputedStyle(root).fontSize) || 60) * 1.15;
      const validGlyphs = glyphEls.filter(Boolean);
      gsap.set(validGlyphs, { y: () => riseDistance() });

      // ScrollTrigger rather than a plain IntersectionObserver: it evaluates
      // whether we're already past the trigger point at creation time, so a
      // scroll that jumps straight past this section in one commit still
      // settles the glyphs into place instead of leaving them permanently
      // shifted down.
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          gsap.to(validGlyphs, {
            y: 0,
            duration: 1.1,
            stagger: 0.09,
            ease: 'power4.out',
            overwrite: 'auto',
          });
        },
        onRefresh: (self) => {
          if (self.progress > 0) gsap.set(validGlyphs, { y: 0 });
        },
      });
    }, containerRef);

    return () => {
      fontPromiseActive = false;
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} id="built-for-future">
      <h2
        ref={rootRef}
        className="masked-heading"
        style={{ textAlign: 'center', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.06 }}
      >
        <span ref={measureRef} className="masked-heading__measure">
          {WORDS.map((word, i) => (
            <span className="masked-heading__word" id={`bffWord${i}`} key={word}>
              {word}
              <i className="masked-heading__baseline" id={`bffBase${i}`} />
            </span>
          ))}
        </span>

        <svg className="masked-heading__defs" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="bffClip" clipPathUnits="userSpaceOnUse">
              {WORDS.map((word, i) => (
                <text id={`bffG${i}`} key={word}>
                  {word}
                </text>
              ))}
            </clipPath>
          </defs>
        </svg>

        <span className="masked-heading__reveal">
          <span className="masked-heading__clip" style={{ clipPath: 'url(#bffClip)' }}>
            <span ref={mediaRef} className="masked-heading__media" aria-hidden="true">
              <video
                ref={videoRef}
                className="masked-heading__source"
                src={VIDEO_SRC}
                autoPlay={!prefersReducedMotionRef.current}
                loop={!prefersReducedMotionRef.current}
                muted
                playsInline
                preload="metadata"
              />
            </span>
          </span>
        </span>
      </h2>
      <p className="masked-heading__caption">India World Mart, Sector 88A — built for what Gurugram becomes next.</p>
    </section>
  );
}
