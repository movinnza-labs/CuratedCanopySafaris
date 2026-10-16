"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  start: number;
  end: number;
  durationMs: number;
  suffix?: string;
  className?: string;
};

const format = (n: number) => new Intl.NumberFormat("en-IN").format(n);

/**
 * Counts from `start` to `end` when scrolled into view (as the live site's counters do).
 * Renders the final value on the server and for reduced-motion users.
 */
export function CountUp({ start, end, durationMs, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(end);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let started = false;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(start + (end - start) * eased));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started) {
          started = true;
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    // Reset to the starting value only while the counter is still off-screen, so there is no visible jump.
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) {
      frame = requestAnimationFrame(() => setValue(start));
    }
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [start, end, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden className="tabular-nums">
        {format(value)}
        {suffix ? <span className="ml-1">{suffix}</span> : null}
      </span>
      <span className="sr-only">
        {format(end)}
        {suffix}
      </span>
    </span>
  );
}
