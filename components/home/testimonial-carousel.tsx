"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HomeImage } from "@/components/ui/home-image";
import type { HomeTestimonial } from "@/lib/data/home";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 8000;

function Stars({ rating, active }: { rating: number; active: boolean }) {
  return (
    <p className="flex items-center gap-1.5" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          aria-hidden
          viewBox="0 0 24 24"
          className={cn("size-5", i < rating ? "text-star" : "text-white/20", active && "animate-zoom-in")}
          style={active ? { animationDelay: `${250 + i * 90}ms` } : undefined}
          fill="currentColor"
        >
          <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z" />
        </svg>
      ))}
    </p>
  );
}

/**
 * "Trusted by many, proven by results" — premium version of the live site's auto-playing testimonial slider.
 * No arrow/pause buttons: it advances on its own every few seconds, pauses while a
 * mouse is over it, and can be swiped on touch screens.
 */
export function TestimonialCarousel({ items }: { items: HomeTestimonial[] }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const touchStart = useRef<number | null>(null);
  const count = items.length;

  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);
  const running = !hovered;

  useEffect(() => {
    if (!running || count < 2) return;
    const timer = setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, running, count, go]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      // Mouse only: a tap on a touch screen fires pointerenter without a matching leave.
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovered(false)}
      onTouchStart={(e) => {
        touchStart.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        const start = touchStart.current;
        const end = e.changedTouches[0]?.clientX;
        touchStart.current = null;
        if (start == null || end == null) return;
        const delta = end - start;
        if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
      }}
    >
      {/* Slides share one grid cell: the height never jumps between reviews. */}
      <div className="grid" aria-live={running ? "off" : "polite"}>
        {items.map((item, i) => {
          const active = i === index;
          return (
            <figure
              key={item.name}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                "col-start-1 row-start-1 grid items-center gap-10 transition-opacity duration-700 ease-out lg:grid-cols-12 lg:gap-14",
                active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              {/* Large photograph with a slow Ken Burns drift and the original quote badge. */}
              <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:col-span-4 lg:max-w-[19rem]">
                <div
                  aria-hidden
                  className={cn(
                    "absolute -inset-4 rounded-[2.25rem] border border-ochre-300/40 transition-transform duration-[1200ms] ease-out",
                    active ? "translate-x-3 translate-y-3 rotate-2" : "translate-x-0 translate-y-0 rotate-0",
                  )}
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest-800 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]">
                  <HomeImage
                    imageKey={item.imageKey}
                    fill
                    sizes="(min-width: 1024px) 304px, 288px"
                    className={cn(
                      "object-cover object-top transition-transform ease-out",
                      active ? "scale-110 duration-[9000ms]" : "scale-100 duration-700",
                    )}
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
                </div>
                <span
                  aria-hidden
                  className={cn(
                    "absolute -top-5 -right-4 grid size-16 place-items-center rounded-full bg-ochre-600 text-white shadow-xl ring-8 ring-forest-900 lg:-right-6",
                    active && "animate-zoom-in [animation-delay:150ms]",
                  )}
                >
                  <svg viewBox="0 0 24 24" className="size-7" fill="currentColor">
                    <path d="M9.5 6C6.5 6 4 8.6 4 11.8V18h6v-6H7c0-2 1.2-3.4 2.5-3.8V6Zm10 0c-3 0-5.5 2.6-5.5 5.8V18h6v-6h-3c0-2 1.2-3.4 2.5-3.8V6Z" />
                  </svg>
                </span>
              </div>

              <div className="lg:col-span-8">
                <Stars rating={item.rating} active={active} />
                <blockquote className={cn("mt-5", active && "animate-fade-up [animation-delay:350ms]")}>
                  <p className="font-display text-base leading-[1.7] text-white/90 sm:text-[17px]">{item.text}</p>
                </blockquote>
                <figcaption className={cn("mt-6 flex items-center gap-4", active && "animate-fade-up [animation-delay:550ms]")}>
                  <span aria-hidden className="h-px w-12 bg-ochre-300" />
                  <span className="font-sans text-sm font-bold tracking-[0.12em] text-sand-200 uppercase sm:text-base">{item.name}</span>
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
