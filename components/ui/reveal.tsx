"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends React.ElementType> = {
  as?: T;
  /** Direction of the entrance. "curtain" wipes photographs open. */
  from?: "up" | "left" | "right" | "zoom" | "curtain";
  delay?: number;
  className?: string;
  /** Curtain only: classes for the inner (clipped) wrapper, e.g. layout for its children. */
  innerClassName?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/**
 * Fades/slides content in when it scrolls into view. Content is only hidden after the document is marked
 * (html.js), and reduced-motion users see everything immediately — nothing is ever lost.
 *
 * For "curtain", the clip-path sits on an inner wrapper: IntersectionObserver treats a fully clipped
 * element as invisible, so the observed element itself must stay unclipped.
 */
export function Reveal<T extends React.ElementType = "div">({
  as,
  from = "up",
  delay = 0,
  className,
  innerClassName,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const curtain = from === "curtain";
  return (
    <Tag
      ref={ref}
      data-reveal={from === "up" ? undefined : from}
      className={cn("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {curtain ? <div className={cn("curtain-inner h-full", innerClassName)}>{children}</div> : children}
    </Tag>
  );
}
