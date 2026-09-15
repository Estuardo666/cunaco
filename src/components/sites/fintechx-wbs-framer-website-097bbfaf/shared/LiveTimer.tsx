"use client";

import { useEffect, useState } from "react";

/** `formatTime` from the app: mm:ss, or hh:mm:ss once it passes an hour. */
function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");

  return hours > 0
    ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    : `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * The running counter inside a screen mockup.
 *
 * The app's counters tick once a second (`LactationViewModel` /
 * `ContractionViewModel`), so the mockups tick too — a frozen stopwatch reads
 * as a screenshot. It renders `from` on the server and on the first client
 * render, then starts counting after mount, so hydration matches. It never
 * starts when the visitor asked for reduced motion; browsers throttle the
 * interval on their own while the tab is in the background.
 */
export function LiveTimer({
  from,
  className,
}: {
  /** Seconds shown before the counter starts. */
  from: number;
  className?: string;
}) {
  const [seconds, setSeconds] = useState(from);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(
      () => setSeconds((value) => value + 1),
      1000,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {formatTime(seconds)}
    </span>
  );
}
