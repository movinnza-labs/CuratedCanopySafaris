import { AccordionItem } from "@/components/ui/accordion";
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

/** One date, laid out like the live schedule pages: dates, safaris, fare, then a full-width Book Now. */
function DepartureCard({ pkg, departure, departed }: { pkg: SafariPackage; departure: Departure; departed: boolean }) {
  return (
    <li className="flex flex-col rounded-2xl border border-sand-300/70 bg-white p-3 shadow-card">
      <div className="flex-1 space-y-1.5 rounded-xl bg-sand-100 px-4 py-5 text-center text-sm text-ink-700">
        <p className="flex items-center justify-center gap-2 font-semibold text-forest-900">
          <Icon name="calendar" className="size-4 shrink-0 text-ochre-600" />
          {departure.label} ({departure.duration})
        </p>
        <p className="flex items-center justify-center gap-2">
          <Icon name="users" className="size-4 shrink-0 text-ochre-600" />
          {pkg.safaris}
        </p>
        {pkg.details?.map((detail) => (
          <p key={detail}>{detail}</p>
        ))}
        <p className="font-semibold text-forest-900">{pkg.price.display}</p>
      </div>
      <div className="mt-3">
        {departed ? (
          <span className={`${bookButton} cursor-not-allowed bg-sand-200 text-ink-500`}>Departed</span>
        ) : departure.bookingUrl ? (
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
      </div>
    </li>
  );
}

/**
 * A park's schedules as on the live "<park>-schedule" pages: a two-column grid of departure cards, and beside
 * it Inclusions & Payment Terms, Itinerary, the group-tour note, WhatsApp / Enquire Now and the international note.
 * Dates that have already started are still listed (as on the live page) but can no longer be booked.
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
          const departedStarts = new Set(splitDepartures(pkg, today).past.map((d) => d.start));
          return (
            <section key={pkg.id} aria-label={pkg.title ?? `${destinationName} departures`}>
              {packages.length > 1 && pkg.title ? <h3 className="mb-5 text-2xl font-semibold text-forest-900">{pkg.title}</h3> : null}
              <ul className="grid gap-5 sm:grid-cols-2">
                {pkg.departures.map((departure) => (
                  <DepartureCard key={departure.start} pkg={pkg} departure={departure} departed={departedStarts.has(departure.start)} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <aside aria-labelledby="booking-details-title" className="space-y-4 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <h3 id="booking-details-title" className="sr-only">
          Booking details
        </h3>
        {terms.map((t) => (
          <AccordionItem key={t.id} title="Inclusions & Payment Terms">
            <TermsPanel terms={t} />
          </AccordionItem>
        ))}
        {itineraries.map((it) => (
          <AccordionItem key={it.id} title={itineraries.length > 1 ? `Itinerary – ${it.title}` : "Itinerary"}>
            <ItineraryPanel itinerary={it} />
          </AccordionItem>
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
