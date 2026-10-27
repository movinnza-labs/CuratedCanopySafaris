import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { splitDepartures } from "@/lib/data/departures";
import { getItinerary } from "@/lib/data/itineraries";
import { site } from "@/lib/data/site";
import { getTerms } from "@/lib/data/terms";
import type { Departure, Itinerary, SafariPackage, TermsPolicy } from "@/lib/data/types";
import { ItineraryPanel } from "./itinerary-panel";
import { TermsPanel } from "./terms-panel";

const bookButton =
  "btn-sheen flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-colors";
const holdButton =
  "flex w-full items-center justify-center gap-2 rounded-xl border border-ochre-600 px-4 py-2.5 text-sm font-bold tracking-wide text-ochre-700 transition-colors hover:bg-sand-100";

/** WhatsApp link with a prefilled "hold my dates" message naming the park, the package and (when known) the date. */
function holdHref(destinationName: string, pkg: SafariPackage, departure?: Departure) {
  const trip = [destinationName, pkg.title, departure ? `${departure.label} (${departure.duration})` : "the 2026-27 season"]
    .filter(Boolean)
    .join(", ");
  const message = `Hello, I would like to hold my dates for ${trip}. Please share availability.`;
  return `${site.contact.whatsappHref}?text=${encodeURIComponent(message)}`;
}

function HoldLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={holdButton}>
      <Icon name="whatsapp" className="size-4 shrink-0" />
      Hold my dates<span className="sr-only">: {label} on WhatsApp (opens in a new tab)</span>
    </a>
  );
}

/** Safaris, how they split and the published fare: shared by the date cards and the "dates being finalised" card. */
function PackageFacts({ pkg }: { pkg: SafariPackage }) {
  return (
    <>
      <p className="flex items-center justify-center gap-2">
        <Icon name="users" className="size-4 shrink-0 text-ochre-600" />
        {pkg.safaris}
      </p>
      {pkg.details?.map((detail) => (
        <p key={detail}>{detail}</p>
      ))}
      <p className="font-semibold text-forest-900">{pkg.price.display}</p>
    </>
  );
}

/** One date, laid out like the live schedule pages: dates, safaris, fare, then full-width Book Now and Hold my dates. */
function DepartureCard({ pkg, departure, destinationName }: { pkg: SafariPackage; departure: Departure; destinationName: string }) {
  return (
    <li className="flex flex-col rounded-2xl border border-sand-300/70 bg-white p-3 shadow-card">
      <div className="flex-1 space-y-1.5 rounded-xl bg-sand-100 px-4 py-5 text-center text-sm text-ink-700">
        <p className="flex items-center justify-center gap-2 font-semibold text-forest-900">
          <Icon name="calendar" className="size-4 shrink-0 text-ochre-600" />
          {departure.label} ({departure.duration})
        </p>
        <PackageFacts pkg={pkg} />
      </div>
      <div className="mt-3 space-y-2">
        {departure.bookingUrl ? (
          <a
            href={departure.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${bookButton} bg-ochre-600 text-white hover:bg-ochre-700`}
          >
            Book Now<span className="sr-only">: {departure.label} (opens in a new tab)</span>
          </a>
        ) : (
          <a href="/contact" className={`${bookButton} bg-ochre-600 text-white hover:bg-ochre-700`}>
            Enquire Now
          </a>
        )}
        <HoldLink href={holdHref(destinationName, pkg, departure)} label={departure.label} />
      </div>
    </li>
  );
}

/** Shown instead of the date grid once every published date for a package has passed. */
function DatesPendingCard({ pkg, destinationName, enquireHref }: { pkg: SafariPackage; destinationName: string; enquireHref: string }) {
  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-sand-300/70 bg-white p-3 shadow-card">
      <div className="space-y-1.5 rounded-xl bg-sand-100 px-4 py-5 text-center text-sm text-ink-700">
        <p className="flex items-center justify-center gap-2 font-semibold text-forest-900">
          <Icon name="calendar" className="size-4 shrink-0 text-ochre-600" />
          2026-27 dates are being finalised
        </p>
        <PackageFacts pkg={pkg} />
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <HoldLink href={holdHref(destinationName, pkg)} label={pkg.title ?? destinationName} />
        <a href={enquireHref} className={`${bookButton} bg-ochre-600 py-2.5 text-white hover:bg-ochre-700`}>
          Enquire Now
        </a>
      </div>
    </div>
  );
}

/** Collapsible sidebar panel with a real H2 as its title; looks the same as the shared AccordionItem. */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-2xl border border-sand-300/70 bg-white/70 transition-colors open:bg-white">
      <summary className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left sm:px-6">
        <h2 className="font-sans text-base font-semibold text-forest-900">{title}</h2>
        <Icon
          name="chevronDown"
          className="size-5 shrink-0 text-ochre-600 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-5 text-ink-700 sm:px-6">{children}</div>
    </details>
  );
}

/**
 * A park's schedules as on the live "<park>-schedule" pages: a two-column grid of departure cards, and beside
 * it Inclusions & Payment Terms, Itinerary, the group-tour note, WhatsApp / Enquire Now and the international note.
 * Dates that have already started are hidden (the data is kept); a package with no dates left shows a holding card.
 */
export function ScheduleBoard({ packages, destinationName, today }: { packages: SafariPackage[]; destinationName: string; today: string }) {
  const enquireHref = `/contact?destination=${encodeURIComponent(destinationName)}`;
  const itineraries = [...new Set(packages.map((p) => p.itineraryId))].map(getItinerary).filter((x): x is Itinerary => Boolean(x));
  const terms = [...new Set(packages.map((p) => p.termsId))].map(getTerms).filter((x): x is TermsPolicy => Boolean(x));
  const notes = [...new Set(packages.flatMap((p) => p.notes))];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-12 lg:col-span-8">
        {packages.map((pkg) => {
          const { upcoming } = splitDepartures(pkg, today);
          return (
            <section key={pkg.id} aria-label={pkg.title ?? `${destinationName} departures`}>
              {packages.length > 1 && pkg.title ? <h3 className="mb-5 text-2xl font-semibold text-forest-900">{pkg.title}</h3> : null}
              {upcoming.length > 0 ? (
                <ul className="grid gap-5 sm:grid-cols-2">
                  {upcoming.map((departure) => (
                    <DepartureCard key={departure.start} pkg={pkg} departure={departure} destinationName={destinationName} />
                  ))}
                </ul>
              ) : (
                <DatesPendingCard pkg={pkg} destinationName={destinationName} enquireHref={enquireHref} />
              )}
            </section>
          );
        })}
      </div>

      {/* Labelled, not titled, so the outline stays H1 → H2 Schedules → H2 Inclusions / Itinerary. */}
      <aside aria-label="Booking details" className="space-y-4 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        {terms.map((t) => (
          <Panel key={t.id} title="Inclusions & Payment Terms">
            <TermsPanel terms={t} />
            <p className="mt-6 text-sm">
              See{" "}
              <Link href="/safari-packages" className="font-semibold text-ochre-700 underline-offset-4 hover:underline">
                what is included in our safaris
              </Link>{" "}
              across all our parks.
            </p>
          </Panel>
        ))}
        {itineraries.map((it) => (
          <Panel key={it.id} title={itineraries.length > 1 ? `Itinerary – ${it.title}` : "Itinerary"}>
            <ItineraryPanel itinerary={it} />
          </Panel>
        ))}

        {notes.length > 0 ? (
          <div className="space-y-1 px-2 py-2 text-center text-sm font-bold text-forest-900">
            {notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-sand-300/70 bg-white p-3 shadow-card">
          <a
            href={site.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-ochre-700 transition-colors hover:bg-sand-100"
          >
            <Icon name="whatsapp" className="size-5" />
            For More Details<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
          </a>
          <a
            href={enquireHref}
            className="flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-ochre-700 transition-colors hover:bg-sand-100"
          >
            <Icon name="mail" className="size-5" />
            Enquire Now
          </a>
        </div>

        <p className="px-2 text-center text-sm font-semibold text-forest-900">
          For International Guests and Luxury Tours – Mail To :{" "}
          <a href={`mailto:${site.contact.email}`} className="mt-1 block break-words text-ochre-700 underline-offset-4 hover:underline">
            {site.contact.email}
          </a>
        </p>
      </aside>
    </div>
  );
}
