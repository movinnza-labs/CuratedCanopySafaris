import Link from "next/link";
import { HomeImage } from "@/components/ui/home-image";
import { expeditionButtons, type Expedition } from "@/lib/data/home";
import { cn } from "@/lib/utils";

function ImageFrame({ children, href, label, className }: { children: React.ReactNode; href?: string; label: string; className?: string }) {
  // Positioning (relative/absolute) comes from the caller so the two never conflict.
  const classes = cn("group/img block overflow-hidden", className);
  const overlay = (
    <span aria-hidden className="absolute inset-0 bg-forest-950/0 transition-colors duration-500 group-hover/img:bg-forest-950/20" />
  );
  return href ? (
    <Link href={href} className={classes} aria-label={label}>
      {children}
      {overlay}
    </Link>
  ) : (
    <div className={classes}>
      {children}
      {overlay}
    </div>
  );
}

const imageMotion = "object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/img:scale-110";

/**
 * One row of "Our Upcoming Expeditions": thumbnail, title + description + Read More / Book Now, and the
 * second photograph — the same three parts as each card on the live site.
 */
export function ExpeditionCard({ expedition }: { expedition: Expedition }) {
  const titleId = `expedition-${expedition.slug}`;
  return (
    <article
      aria-labelledby={titleId}
      className="group relative grid overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-black/5 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift lg:grid-cols-12"
    >
      {/* Thumbnail */}
      <ImageFrame
        href={expedition.thumbHref}
        label={expedition.title.trim()}
        className="relative aspect-[16/10] sm:aspect-[16/9] lg:col-span-4 lg:aspect-auto lg:min-h-[19rem]"
      >
        <HomeImage imageKey={expedition.thumbKey} fill sizes="(min-width: 1024px) 400px, 100vw" className={imageMotion} />
      </ImageFrame>

      {/* Content */}
      <div className="relative flex flex-col p-7 sm:p-9 lg:col-span-5">
        <span aria-hidden className="h-0.5 w-10 rounded-full bg-ochre-400 transition-[width] duration-500 group-hover:w-16" />
        <h3 id={titleId} className="mt-4 text-2xl leading-tight font-semibold text-forest-900 sm:text-[1.75rem]">
          <Link href={expedition.titleHref} className="transition-colors hover:text-ochre-600">
            {expedition.title.trim()}
          </Link>
        </h3>
        <p className="mt-4 flex-1 leading-relaxed text-ink-600">{expedition.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={expedition.readMoreHref}
            className="btn-sheen inline-flex flex-1 items-center justify-center rounded-full border border-ochre-600 px-6 py-3 text-sm font-bold tracking-wide text-ochre-700 transition-colors duration-300 hover:bg-ochre-600 hover:text-white sm:flex-none"
          >
            {expeditionButtons.readMore}
          </Link>
          <Link
            href={expedition.bookNowHref}
            className="btn-sheen inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ochre-600 px-6 py-3 text-sm font-bold tracking-wide text-white shadow-md transition-[background-color,box-shadow] duration-300 hover:bg-ochre-700 hover:shadow-lg sm:flex-none"
          >
            {expeditionButtons.bookNow}
          </Link>
        </div>
      </div>

      {/* Second photograph (links to the park, as on the live site) */}
      <ImageFrame
        href={expedition.titleHref}
        label={expedition.title.trim()}
        className="relative hidden lg:col-span-3 lg:m-4 lg:ml-0 lg:block lg:rounded-[1.25rem]"
      >
        <HomeImage imageKey={expedition.boxKey} fill sizes="300px" className={imageMotion} />
      </ImageFrame>
      {/* On smaller screens the second photograph sits as an inset over the thumbnail. */}
      <ImageFrame
        href={expedition.titleHref}
        label={expedition.title.trim()}
        className="absolute top-4 right-4 size-24 rounded-2xl shadow-xl ring-4 ring-white sm:size-32 lg:hidden"
      >
        <HomeImage imageKey={expedition.boxKey} fill sizes="128px" className={imageMotion} />
      </ImageFrame>
    </article>
  );
}
