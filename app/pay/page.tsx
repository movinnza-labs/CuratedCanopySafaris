import Link from "next/link";
import { BookingPaymentForm } from "@/components/sections/booking-payment-form";
import { PaymentForm } from "@/components/sections/payment-form";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { GST_RATE, MAX_GUESTS_PER_BOOKING, getBookableDeparture, pickupOptions } from "@/lib/data/departures";
import { getDestination } from "@/lib/data/destinations";
import { getItinerary } from "@/lib/data/itineraries";
import { site } from "@/lib/data/site";
import { getTerms } from "@/lib/data/terms";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...buildMetadata({
    title: "Pay Now",
    description: "Pay for your Curated Canopy Safaris booking securely online through Easebuzz by UPI, card, net banking or wallet.",
    path: "/pay",
  }),
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

/**
 * Checkout page. With ?package=…&date=… (the schedule's Book Now) it books that departure at the published fare;
 * otherwise it is the open "pay an agreed amount" form.
 */
export default async function PayPage({ searchParams }: Props) {
  const params = await searchParams;
  const requested = Boolean(params.package || params.date);
  const booking = requested ? getBookableDeparture(first(params.package), first(params.date)) : undefined;
  const { contact } = site;

  return (
    <>
      {/* Solid bar behind the transparent site header, whose text is white. */}
      <div aria-hidden className="h-[4.75rem] bg-forest-950 lg:h-[5.5rem]" />

      <section aria-labelledby="page-title" className="no-justify bg-sand-50 py-10 sm:py-14">
        {booking ? (
          <BookingView {...booking} />
        ) : (
          <Container size="narrow">
            {requested ? (
              <div role="status" className="mb-6 rounded-2xl bg-ochre-50 px-5 py-4 text-sm text-forest-900">
                That departure is no longer open for online booking. Please{" "}
                <Link href="/safari-packages" className="font-semibold text-ochre-700 underline underline-offset-4">
                  choose another date
                </Link>{" "}
                or pay an amount agreed with our team below.
              </div>
            ) : null}
            <div className="rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card sm:p-10">
              <div className="flex items-center gap-3 border-b border-sand-200 pb-5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ochre-50 text-ochre-600">
                  <Icon name="card" className="size-5" />
                </span>
                <div>
                  <h1 id="page-title" className="text-2xl font-semibold text-forest-900 sm:text-3xl">
                    Pay Now
                  </h1>
                  <p className="text-sm text-ink-500">Secure payment by Easebuzz: UPI, cards, net banking or wallets.</p>
                </div>
              </div>
              <div className="mt-6">
                <PaymentForm />
              </div>
              <p className="mt-6 border-t border-sand-200 pt-5 text-sm text-ink-500">
                Please pay only after we have confirmed your booking and the amount. Payments are subject to our{" "}
                <Link href="/refund-cancellation-policy" className="font-semibold text-ochre-700 underline-offset-4 hover:underline">
                  Refund and Cancellation Policy
                </Link>
                . Need help? Call{" "}
                <a href={contact.phoneHref} className="font-semibold text-ochre-700 hover:underline">
                  {contact.phone}
                </a>
                .
              </p>
            </div>
          </Container>
        )}
      </section>
    </>
  );
}

/** Booking checkout for one departure: trip summary beside the guest form. */
function BookingView({ pkg, departure }: NonNullable<ReturnType<typeof getBookableDeparture>>) {
  const destination = getDestination(pkg.destinationSlug);
  const itinerary = getItinerary(pkg.itineraryId);
  const terms = getTerms(pkg.termsId);
  const parkName = destination?.shortName ?? "the park";
  const schedulePath = `/destinations/${pkg.destinationSlug}/schedule`;
  const { contact } = site;

  return (
    <Container>
      <Link href={schedulePath} className="inline-flex items-center gap-2 text-sm font-semibold text-ochre-700 hover:underline">
        <Icon name="arrowRight" className="size-4 rotate-180" />
        Back to {parkName} dates
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-12">
        <aside aria-label="Your safari" className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div className="overflow-hidden rounded-3xl bg-forest-950 text-sand-50 shadow-card">
            <div className="p-6 sm:p-8">
              {pkg.season ? <p className="text-xs font-bold tracking-wide text-ochre-300 uppercase">{pkg.season}</p> : null}
              <p className="mt-1 font-display text-2xl">{pkg.title ?? destination?.name}</p>
              {destination && pkg.title ? (
                <p className="text-sm text-sand-200">
                  {destination.name}, {destination.state}
                </p>
              ) : null}
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Icon name="calendar" className="size-5 shrink-0 text-ochre-300" />
                  <span>
                    <span className="font-semibold">{departure.label}</span> ({departure.duration})
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="jeep" className="size-5 shrink-0 text-ochre-300" />
                  {pkg.safaris}
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="card" className="size-5 shrink-0 text-ochre-300" />
                  {pkg.price.display} per person
                </li>
              </ul>
            </div>
            {itinerary ? (
              <div className="border-t border-white/10 p-6 sm:p-8">
                <p className="text-xs font-bold tracking-wide text-ochre-300 uppercase">Itinerary</p>
                <ol className="mt-4 space-y-4 text-sm">
                  {itinerary.days.map((day) => (
                    <li key={day.label}>
                      <p className="font-semibold">{day.label}</p>
                      <p className="mt-0.5 text-sand-200">{day.description}</p>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {terms ? (
              <div className="border-t border-white/10 p-6 text-sm sm:p-8">
                <p className="text-xs font-bold tracking-wide text-ochre-300 uppercase">Included</p>
                <ul className="mt-3 space-y-2">
                  {terms.included.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-ochre-300" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-xs font-bold tracking-wide text-ochre-300 uppercase">Cancellation</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sand-200 marker:text-ochre-300">
                  {terms.cancellation.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </aside>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card sm:p-10">
            <div className="flex items-center gap-3 border-b border-sand-200 pb-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ochre-50 text-ochre-600">
                <Icon name="card" className="size-5" />
              </span>
              <div>
                <h1 id="page-title" className="text-2xl font-semibold text-forest-900 sm:text-3xl">
                  Book your {parkName} safari
                </h1>
                <p className="text-sm text-ink-500">{terms?.payment[0] ?? "Secure payment by Easebuzz."}</p>
              </div>
            </div>
            <div className="mt-6">
              <BookingPaymentForm
                packageId={pkg.id}
                date={departure.start}
                perPerson={pkg.price.amount}
                gstRate={GST_RATE}
                maxGuests={MAX_GUESTS_PER_BOOKING}
                pickupOptions={pickupOptions(pkg)}
                parkName={parkName}
              />
            </div>
            <p className="mt-6 border-t border-sand-200 pt-5 text-sm text-ink-500">
              Twin-sharing rooms; single occupancy and groups of more than {MAX_GUESTS_PER_BOOKING} can be arranged on request. Our team
              confirms your gypsy and lodge after payment. Questions? Call{" "}
              <a href={contact.phoneHref} className="font-semibold text-ochre-700 hover:underline">
                {contact.phone}
              </a>{" "}
              or{" "}
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-ochre-700 hover:underline">
                WhatsApp us
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
