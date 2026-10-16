import type { Metadata } from "next";
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
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { todayInIndia } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
// Departures move from bookable to "Departed" by date, so re-render a few times a day (same as the park page).
export const revalidate = 21600;

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  const imageKey = destination.imageKeys.find(isImageKey) as ImageKey | undefined;
  return buildMetadata({
    title: `${destination.shortName} Safari Schedules`,
    description: `${destination.shortName} safari schedules: departure dates, safaris, fares and online booking, plus the itinerary, inclusions and payment terms.`,
    path: `/destinations/${destination.slug}/schedule`,
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

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Safari Packages", path: "/safari-packages" },
    { name: destination.shortName, path: parkPath },
    { name: "Schedules", path: `${parkPath}/schedule` },
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
            {destination.name} Schedules
          </h1>
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
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
