"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Motion identity for the FintechX clone.
 *
 * Personality: **Premium / Corporate** — a fintech marketing page. Elegant and
 * decisive, never bouncy: 0% overshoot, one signature curve, three durations.
 * The original drives everything with Framer Motion springs (its buttons carry
 * `transition: all` with no duration, so nothing is CSS-timed); a critically
 * damped spring reproduces that feel without the dependency.
 */
export const FX_EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

/** quick = interactive feedback · base = state change · slow = reveal */
export const FX_DURATION = {
  quick: 180,
  base: 300,
  slow: 600,
} as const;

/** Honours the OS "reduce motion" setting and keeps up with changes to it. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    const id = window.setTimeout(sync, 0);
    query.addEventListener("change", sync);
    return () => {
      window.clearTimeout(id);
      query.removeEventListener("change", sync);
    };
  }, []);

  return reduced;
}

interface ParallaxOptions {
  /**
   * Scroll distance, in pixels from the moment the element's section starts
   * leaving the top of the viewport, over which progress travels 0 → 1.
   */
  distance: number;
  /** Spring stiffness. Higher = snappier. */
  stiffness?: number;
  /** Spring damping. At `2 * sqrt(stiffness)` the spring is critically damped. */
  damping?: number;
}

/**
 * Scroll-linked progress (0 → 1) smoothed by a critically damped spring.
 *
 * The raw target is `scrollY / distance`, clamped. The returned value trails it
 * with the same easing character as the original's Framer Motion springs, which
 * is what makes the hero read as *drifting* rather than snapping to scroll.
 *
 * When the user prefers reduced motion the spring is skipped entirely and the
 * raw scroll progress is returned, so the parallax still resolves to the right
 * state for the current scroll position — it just does not drift.
 */
export function useScrollSpring({
  distance,
  stiffness = 90,
  damping = 20,
}: ParallaxOptions): number {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const state = useRef({ current: 0, velocity: 0, target: 0, frame: 0, last: 0 });

  useEffect(() => {
    const store = state.current;

    const readTarget = () => {
      store.target = Math.min(1, Math.max(0, window.scrollY / distance));
    };

    // Reduced motion: track scroll directly, no rAF loop, no easing.
    if (reduced) {
      const sync = () => {
        readTarget();
        setValue(store.target);
      };
      const id = window.setTimeout(sync, 0);
      window.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      return () => {
        window.clearTimeout(id);
        window.removeEventListener("scroll", sync);
        window.removeEventListener("resize", sync);
      };
    }

    /**
     * Fixed-step integration. Advancing the spring by one variable `dt` makes it
     * frame-rate dependent — on a throttled tab a clamped `dt` runs the spring in
     * slow motion. Sub-stepping at a fixed 1/60s keeps the settle time identical
     * whether the page renders at 120fps or 5fps.
     */
    const STEP = 1 / 60;
    const MAX_STEPS = 20;

    const tick = (now: number) => {
      let elapsed = store.last ? (now - store.last) / 1000 : STEP;
      store.last = now;
      elapsed = Math.min(elapsed, STEP * MAX_STEPS);

      let steps = Math.max(1, Math.round(elapsed / STEP));
      while (steps-- > 0) {
        const force = -stiffness * (store.current - store.target);
        const drag = -damping * store.velocity;
        store.velocity += (force + drag) * STEP;
        store.current += store.velocity * STEP;
      }

      const settled =
        Math.abs(store.velocity) < 0.0005 &&
        Math.abs(store.current - store.target) < 0.0005;
      if (settled) {
        store.current = store.target;
        store.velocity = 0;
      }

      setValue(store.current);
      store.frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!store.frame) {
        store.last = 0;
        store.frame = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      readTarget();
      start();
    };

    readTarget();
    start();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (store.frame) cancelAnimationFrame(store.frame);
      store.frame = 0;
    };
  }, [distance, stiffness, damping, reduced]);

  return value;
}

/** Linear interpolation helper for mapping spring progress onto a range. */
export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}
