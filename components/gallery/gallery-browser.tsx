"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import type { GalleryItem } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";

type Filter = "all" | "photo" | "video";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "photo", label: "Photos" },
  { value: "video", label: "Videos" },
];

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;

function PlayBadge({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("grid place-items-center rounded-full bg-white/90 text-forest-900 shadow-xl", className)}>
      <svg viewBox="0 0 24 24" className="ml-0.5 size-1/2" fill="currentColor">
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </span>
  );
}

/** One tile: the photo, or the video's poster with a play badge and its length. */
function Tile({ item, onOpen, sizes, cover }: { item: GalleryItem; onOpen: () => void; sizes: string; cover?: boolean }) {
  const label = item.type === "video" ? `Play video: ${item.caption}` : `View photo: ${item.caption}`;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={cn(
        "group relative block w-full overflow-hidden rounded-2xl bg-forest-900 text-left shadow-card focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ochre-500",
        cover && "h-full",
      )}
    >
      <Image
        src={item.image}
        alt=""
        width={item.width}
        height={item.height}
        sizes={sizes}
        className={cn(
          "w-full transition-transform duration-700 ease-out group-hover:scale-105",
          cover ? "h-full object-cover" : "h-auto",
        )}
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/0 to-forest-950/0 opacity-90 transition-opacity group-hover:opacity-100" />
      {item.type === "video" ? (
        <>
          <PlayBadge className="absolute top-1/2 left-1/2 size-11 -translate-x-1/2 sm:size-14 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110" />
          {item.duration ? (
            <span className="absolute top-3 right-3 rounded-full bg-forest-950/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              {clock(item.duration)}
            </span>
          ) : null}
        </>
      ) : null}
      <span aria-hidden className="absolute inset-x-0 bottom-0 p-3 text-xs leading-snug text-white sm:p-4 sm:text-sm">
        <span className="block font-semibold">{item.caption}</span>
        {item.place ? <span className="mt-0.5 block text-xs text-sand-200">{item.place}</span> : null}
      </span>
    </button>
  );
}

/** Full-screen viewer: arrows, swipe, Escape; videos play with sound controls. */
function Lightbox({ items, index, onClose, onMove }: { items: GalleryItem[]; index: number; onClose: () => void; onMove: (step: number) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);
  const item = items[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    // Keep the page behind still while the viewer is open.
    const { overflow } = document.documentElement.style;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onMove]);

  if (!item) return null;
  const navButton =
    "grid size-12 shrink-0 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-ochre-300";

  return (
    <dialog
      ref={dialogRef}
      aria-label={item.caption}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      onTouchStart={(event) => {
        touchX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchX.current;
        const end = event.changedTouches[0]?.clientX;
        touchX.current = null;
        if (start !== null && end !== undefined && Math.abs(end - start) > 50) onMove(end < start ? 1 : -1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-forest-950 p-0 text-white backdrop:bg-forest-950"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <p className="text-sm text-sand-200" aria-live="polite">
            {index + 1} / {items.length}
          </p>
          <button type="button" onClick={() => dialogRef.current?.close()} className={navButton} aria-label="Close">
            <Icon name="close" className="size-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center gap-2 px-2 sm:gap-4 sm:px-4">
          <button type="button" onClick={() => onMove(-1)} className={cn(navButton, "hidden sm:grid")} aria-label="Previous">
            <Icon name="arrowRight" className="size-5 rotate-180" />
          </button>
          <figure className="flex h-full min-w-0 flex-1 flex-col items-center justify-center">
            <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
              {item.type === "video" ? (
                <video
                  key={item.id}
                  src={item.video}
                  poster={item.image}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  // Fill the stage (scaled up from the small phone originals), letterboxed on the dark background.
                  className="h-full w-full object-contain"
                />
              ) : (
                <Image
                  key={item.id}
                  src={item.image}
                  alt={item.caption}
                  width={item.width}
                  height={item.height}
                  sizes="100vw"
                  className="max-h-full w-auto max-w-full rounded-xl object-contain"
                  style={{ height: "auto" }}
                />
              )}
            </div>
            <figcaption className="px-4 pt-4 pb-2 text-center">
              <span className="block font-semibold">{item.caption}</span>
              {item.place ? <span className="mt-0.5 block text-sm text-sand-200">{item.place}</span> : null}
            </figcaption>
          </figure>
          <button type="button" onClick={() => onMove(1)} className={cn(navButton, "hidden sm:grid")} aria-label="Next">
            <Icon name="arrowRight" className="size-5" />
          </button>
        </div>

        <div className="flex justify-center gap-3 pb-5 sm:hidden">
          <button type="button" onClick={() => onMove(-1)} className={navButton} aria-label="Previous">
            <Icon name="arrowRight" className="size-5 rotate-180" />
          </button>
          <button type="button" onClick={() => onMove(1)} className={navButton} aria-label="Next">
            <Icon name="arrowRight" className="size-5" />
          </button>
        </div>
      </div>
    </dialog>
  );
}

/** Opens any item of `items` in the viewer; shared by the gallery page and the homepage section. */
function useViewer(items: GalleryItem[]) {
  const [open, setOpen] = useState<number | null>(null);
  const move = useCallback(
    (step: number) => setOpen((current) => (current === null ? null : (current + step + items.length) % items.length)),
    [items.length],
  );
  const viewer =
    open !== null ? <Lightbox items={items} index={open} onClose={() => setOpen(null)} onMove={move} /> : null;
  return { openAt: setOpen, viewer };
}

/** Full gallery: All / Photos / Videos filter over a masonry grid. */
export function GalleryBrowser({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? items : items.filter((item) => item.type === filter);
  const { openAt, viewer } = useViewer(shown);

  return (
    <div>
      <div role="group" aria-label="Show" className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map(({ value, label }) => {
          const count = value === "all" ? items.length : items.filter((item) => item.type === value).length;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                filter === value
                  ? "border-forest-900 bg-forest-900 text-white"
                  : "border-sand-300 bg-white text-forest-900 hover:border-ochre-500 hover:text-ochre-700",
              )}
            >
              {label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Two columns even on phones, so tall photos do not fill the whole screen. */}
      <ul className="columns-2 gap-3 sm:gap-5 lg:columns-3">
        {shown.map((item, i) => (
          <li key={item.id} className="mb-3 break-inside-avoid sm:mb-5">
            <Tile item={item} onOpen={() => openAt(i)} sizes="(min-width: 1024px) 400px, 50vw" />
          </li>
        ))}
      </ul>
      {viewer}
    </div>
  );
}

/** Homepage mosaic: a large lead tile plus smaller tiles, all opening the same viewer. */
export function GalleryMosaic({ items }: { items: GalleryItem[] }) {
  const { openAt, viewer } = useViewer(items);
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <>
      <ul className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:grid-cols-4">
        <li className="col-span-2 row-span-2">
          <Tile item={lead} onOpen={() => openAt(0)} cover sizes="(min-width: 1024px) 50vw, 100vw" />
        </li>
        {rest.map((item, i) => (
          <li key={item.id} className={cn(item.height > item.width && "row-span-2")}>
            <Tile item={item} onOpen={() => openAt(i + 1)} cover sizes="(min-width: 1024px) 25vw, 50vw" />
          </li>
        ))}
      </ul>
      {viewer}
    </>
  );
}
