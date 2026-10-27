"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, payNow, reachUs } from "@/lib/data/home";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/safari-packages") return pathname.startsWith("/safari-packages") || pathname.startsWith("/destinations");
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The menu remembers the path it was opened on, so any navigation closes it.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
    const focusTimer = window.setTimeout(() => firstLink?.focus(), 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenedOn(null);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key === "Tab" && panelRef.current) {
        const focusable = [menuButtonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          (el): el is HTMLElement => el !== null,
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Solid layer fades in on scroll; the transparent state keeps a soft scrim for legibility over the hero. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-500 ease-out",
          "bg-forest-950/88 shadow-[0_10px_30px_-12px_rgb(0_0_0/0.45)] backdrop-blur-xl backdrop-saturate-150",
          solid ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent transition-opacity duration-500",
          solid ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ochre-400/50 to-transparent transition-opacity duration-500",
          solid ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 transition-[padding] duration-500 sm:px-6 lg:px-8",
          solid ? "py-2.5" : "py-4 lg:py-5",
        )}
      >
        <Logo
          priority
          imageClassName={cn("transition-[width] duration-500", solid ? "w-[150px] lg:w-[190px]" : "w-[170px] lg:w-[220px]")}
        />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative px-3 py-2 text-[16.4px] font-semibold tracking-wide transition-colors duration-300",
                      active ? "text-ochre-200" : "text-white/90 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-ochre-300 transition-transform duration-300 ease-out",
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Icon-only between lg and xl, where the full nav leaves no room for the label. */}
          <Link
            href={payNow.href}
            className="hidden items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-sm font-bold tracking-wide text-white backdrop-blur-sm transition-[background-color,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-forest-900 sm:inline-flex lg:px-3 xl:px-5"
          >
            <Icon name="card" className="size-4" />
            <span className="lg:sr-only xl:not-sr-only">{payNow.label}</span>
          </Link>
          <Link
            href={reachUs.href}
            className="btn-sheen hidden rounded-full bg-sand-200 px-5 py-2.5 text-sm font-bold tracking-wide text-ochre-700 shadow-sm transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg sm:inline-flex"
          >
            {reachUs.label}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="relative inline-flex size-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpenedOn(open ? null : pathname)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {/* Four-line "align-justify" menu symbol, as on the live site; morphs into a close (×) mark. */}
            <span aria-hidden className="relative block h-[18px] w-6">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300",
                  open ? "top-2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute top-[5.33px] left-0 h-0.5 w-6 rounded-full bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute top-[10.66px] left-0 h-0.5 w-6 rounded-full bg-current transition-opacity duration-200",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300",
                  open ? "top-2 -rotate-45" : "top-4",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain bg-forest-950/97 backdrop-blur-xl transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 pt-6 pb-10 sm:px-6">
          <ul className="border-t border-white/10">
            {nav.map((item, index) => {
              const active = isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className={cn(
                    "border-b border-white/10 transition-[opacity,transform] duration-500 ease-out",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${80 + index * 55}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-display text-[29.2px] leading-tight",
                      active ? "text-ochre-200" : "text-sand-50",
                    )}
                  >
                    {item.label}
                    <span aria-hidden className={cn("h-px bg-ochre-300 transition-all duration-500", active ? "w-10" : "w-0")} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href={reachUs.href}
            className={cn(
              "btn-sheen mt-8 flex w-full items-center justify-center rounded-full bg-sand-200 px-6 py-4 text-base font-bold tracking-wide text-ochre-700 transition-[opacity,transform] duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: open ? "420ms" : "0ms" }}
          >
            {reachUs.label}
          </Link>
          <Link
            href={payNow.href}
            className={cn(
              "mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-4 text-base font-bold tracking-wide text-white transition-[opacity,transform] duration-500",
              open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
            style={{ transitionDelay: open ? "470ms" : "0ms" }}
          >
            <Icon name="card" className="size-5" />
            {payNow.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
