"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 7000;

/** Cards per page: 1 on phones, 2 on tablets (sm), 3 on desktop (lg). */
function usePerView() {
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const lg = window.matchMedia("(min-width: 1024px)");
    const sm = window.matchMedia("(min-width: 640px)");
    const update = () => setPerView(lg.matches ? 3 : sm.matches ? 2 : 1);
    update();
    lg.addEventListener("change", update);
    sm.addEventListener("change", update);
    return () => {
      lg.removeEventListener("change", update);
      sm.removeEventListener("change", update);
    };
  }, []);
  return perView;
}

/**
 * Paged testimonial slider: always shows whole cards (never a cut-off one), advances a full page at a time,
 * pauses on hover/focus, and can be swiped on touch screens. The last page is aligned to the end so it is full too.
 */
export function TestimonialPager({ cards }: { cards: React.ReactNode[] }) {
  const perView = usePerView();
  const count = cards.length;
  const pages = Math.max(1, Math.ceil(count / perView));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const current = Math.min(page, pages - 1);
  const offset = Math.max(0, Math.min(current * perView, count - perView));
  const go = (next: number) => setPage(((next % pages) + pages) % pages);

  useEffect(() => {
    if (paused || pages < 2) return;
    const timer = setTimeout(() => setPage((current + 1) % pages), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, pages, paused]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        const end = e.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) > 45) go(current + (delta < 0 ? 1 : -1));
      }}
    >
      <div className="-mx-3 overflow-hidden">
        <ul
          className="flex items-stretch transition-transform duration-700 ease-out-expo"
          style={{ transform: `translateX(-${(offset * 100) / perView}%)` }}
        >
          {cards.map((card, i) => {
            const visible = i >= offset && i < offset + perView;
            return (
              <li
                key={i}
                aria-hidden={!visible || undefined}
                inert={!visible || undefined}
                className="w-full shrink-0 px-3 sm:w-1/2 lg:w-1/3"
              >
                {card}
              </li>
            );
          })}
        </ul>
      </div>

      {pages > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-2" role="group" aria-label="Choose a page of testimonials">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show testimonials page ${i + 1} of ${pages}`}
              aria-current={i === current ? "true" : undefined}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-300",
                i === current ? "w-8 bg-ochre-600" : "w-2 bg-ink-500/30 hover:bg-ink-500/60",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
