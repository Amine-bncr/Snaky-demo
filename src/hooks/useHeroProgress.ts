import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Drives the hero parallax by writing the scroll progress of the
 * `.hero-stage` element into the CSS custom property `--hp` on the stage.
 *
 * p = clamp(-rect.top / (rect.height - window.innerHeight), 0, 1)
 *
 * No React state is used: the value is written directly to the element so the
 * pinned media and type can transform on every frame without re-rendering.
 */
export function useHeroProgress() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) {
        el.style.setProperty('--hp', '0');
        return;
      }
      // Only drive the effect while the stage is on-screen.
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        return;
      }
      const p = Math.max(0, Math.min(1, -rect.top / span));
      el.style.setProperty('--hp', p.toFixed(4));
    };

    const onScroll = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        update();
      });
    };

    const onResize = () => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = null;
        update();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();

    return () => {
      if (raf.current !== null) cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return ref;
}

export default useHeroProgress;