import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScheduleBoard } from "@/components/safari/schedule-board";
import { Testimonials } from "@/components/sections/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import { getPackagesForDestination } from "@/lib/data/departures";
import { destinations, getDestination } from "@/lib/data/destinations";
import type { ImageKey } from "@/lib/data/images";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";
import { todayInIndia } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
// Departures drop off the page once they start, so re-render a few times a day (same as the park page).
export const revalidate = 21600;

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  const imageKey = destination.imageKeys.find(isImageKey) as ImageKey | undefined;
  return pageMetadata(`/destinations/${destination.slug}/schedule`, {
    title: `${destination.shortName} Safari Schedules`,
    description: `${destination.shortName} safari schedules: departure dates, safaris, fares and online booking, plus the itinerary, inclusions and payment terms.`,
    imageKey,
  });
}

/** "Book Now" page for one park, laid out like the live site's "<park>-schedule" pages. */
export default async function DestinationSchedulePage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const today = todayInIndia();
  const packages = getPackagesForDestination(destination.slug);
  const imageKey = (destination.imageKeys.find(isImageKey) as ImageKey | undefined) ?? "pageHeader";
  const parkPath = `/destinations/${destination.slug}`;
  // Link text names the park itself ("Dudhwa National Park", not "... & Kishanpur Wildlife Sanctuary").
  const parkName = destination.name.split(" & ")[0];
  // Nearest airport and railway station, from the park page's "How to reach" copy.
  const reachLine = [destination.howToReach?.byAir, destination.howToReach?.byTrain]
    .filter((line): line is string => Boolean(line))
    .map((line) => (/[.!?]$/.test(line.trim()) ? line.trim() : `${line.trim()}.`))
    .join(" ");

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Safari Packages", path: "/safari-packages" },
    { name: destination.name, path: parkPath },
    { name: "Schedule", path: `${parkPath}/schedule` },
  ];

  return (
    <>
      {/* Compact banner: photo under a dark overlay, title centred (as on the live schedule pages). */}
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-forest-950 pt-32 pb-16 text-center sm:pt-40 sm:pb-24">
        <SafariImage imageKey={imageKey} fill priority sizes="100vw" className="-z-10 object-cover opacity-45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/80 to-forest-950/30" />
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-5 [&_ol]:justify-center" />
          <h1 id="page-title" className="text-4xl leading-tight font-semibold text-sand-50 sm:text-5xl lg:text-6xl">
            {pageH1(`${parkPath}/schedule`, `${destination.name} Schedules`)}
          </h1>
          <div className="mx-auto mt-5 max-w-2xl space-y-2 text-sand-100">
            <div>
              Departure dates, safaris and fares. Read more{" "}
              <Link href={parkPath} className="font-semibold text-sand-50 underline underline-offset-4 hover:text-ochre-200">
                about {parkName}
              </Link>
              .
            </div>
            {reachLine ? (
              <div className="text-sm">
                <span className="font-semibold text-sand-50">How to reach:</span> {reachLine}
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <section aria-labelledby="schedules-title" className="py-16 sm:py-20">
        <Container>
          <h2 id="schedules-title" className="text-center text-3xl font-semibold text-forest-900 sm:text-4xl">
            Schedules
          </h2>
          <div className="mt-10 sm:mt-12">
            {packages.length > 0 ? (
              <ScheduleBoard packages={packages} destinationName={destination.name} today={today} />
            ) : (
              <div className="mx-auto max-w-xl rounded-3xl bg-sand-100 p-8 text-center">
                <p className="text-ink-700">Dates for this park are shared on request.</p>
                <ButtonLink href={`/contact?destination=${encodeURIComponent(destination.name)}`} className="mt-5" icon="arrowRight">
                  Enquire Now
                </ButtonLink>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Testimonials />
      <JsonLd data={pageJsonLd(`${parkPath}/schedule`) ?? breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
