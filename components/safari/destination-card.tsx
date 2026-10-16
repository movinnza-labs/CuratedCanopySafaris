import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import type { Destination } from "@/lib/data/types";

export function DestinationCard({ destination, priority = false }: { destination: Destination; priority?: boolean }) {
  const [heroKey, altKey] = destination.imageKeys;
  const href = `/destinations/${destination.slug}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-forest-900">
        {isImageKey(heroKey) ? (
          <SafariImage
            imageKey={heroKey}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-opacity duration-700 group-hover:opacity-0"
          />
        ) : null}
        {isImageKey(altKey) ? (
          <SafariImage
            imageKey={altKey}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden
            alt=""
          />
        ) : null}
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-forest-950/75 px-3 py-1 text-xs font-semibold text-sand-50 backdrop-blur">
          <Icon name="mapPin" className="size-3.5 text-ochre-300" />
          {destination.state}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {destination.tagline ? (
          <p className="text-xs font-bold tracking-[0.16em] text-ochre-700 uppercase">{destination.tagline}</p>
        ) : null}
        <h3 className="mt-1.5 text-2xl leading-tight font-semibold text-forest-900">
          <Link href={href} className="after:absolute after:inset-0">
            {destination.name}
          </Link>
        </h3>
        <div className="mt-3 flex-1">
          <p className="line-clamp-4 leading-relaxed text-ink-600">{destination.summary}</p>
        </div>

        {/* Read More → park page, Book Now → its schedule, as on the live site. Raised above the card-wide link. */}
        <div className="relative z-10 mt-6 grid grid-cols-2 gap-3">
          <Link
            href={href}
            aria-label={`Read more about ${destination.name}`}
            className="btn-sheen inline-flex items-center justify-center rounded-xl bg-ochre-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-ochre-700"
          >
            Read More
          </Link>
          <Link
            href={`${href}/schedule`}
            aria-label={`Book Now: ${destination.name} schedule`}
            className="btn-sheen inline-flex items-center justify-center rounded-xl bg-ochre-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-ochre-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
