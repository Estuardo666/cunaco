"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot scroll reveal, extracted from the pattern the cloned root sections
 * each carry inline (see `StatsSection` / `SecuritySection`).
 *
 * Returns the ref to put on the `<section>` plus the two class strings the
 * revealed children need. Timing matches the rest of the site exactly —
 * 600ms on the shared FX_EASE curve, opacity + a 20px rise — so pages built
 * with this hook and pages built with the inline copies stay in step.
 */
export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.15,
) {
  const ref = useRef<T>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support: reveal on the next tick rather than synchronously.
      const timer = window.setTimeout(() => setEntered(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        }
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return {
    ref,
    entered,
    revealBase:
      "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
    revealState: entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
  } as const;
}
