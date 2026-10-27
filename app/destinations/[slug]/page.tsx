import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BestTime } from "@/components/safari/best-time";
import { BookingEssentials } from "@/components/safari/booking-essentials";
import { BookingSections } from "@/components/safari/booking-sections";
import { DestinationGrid } from "@/components/safari/destination-grid";
import { FaqList } from "@/components/safari/faq-list";
import { HowToReach } from "@/components/safari/how-to-reach";
import { Price } from "@/components/safari/price";
import { ZoneList } from "@/components/safari/zone-list";
import { BlogCard } from "@/components/sections/blog-card";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { PageHero } from "@/components/sections/page-hero";
import { Testimonials } from "@/components/sections/testimonials";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { RichText } from "@/components/ui/rich-text";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPostsForDestination } from "@/lib/data/blog";
import { getPackageSummary } from "@/lib/data/departures";
import { destinations, getDestination } from "@/lib/data/destinations";
import { images, type ImageKey } from "@/lib/data/images";
import { breadcrumbJsonLd, destinationJsonLd, faqJsonLd, hasSchemaType, pageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

/** Groups consecutive short "Species – note" lines from the wildlife copy into a list; other paragraphs pass through. */
function groupSpeciesLines(paragraphs: string[]): Array<string | { name: string; description: string }[]> {
  const blocks: Array<string | { name: string; description: string }[]> = [];
  for (const paragraph of paragraphs) {
    const match = paragraph.length <= 120 ? paragraph.match(/^([^–.]{2,40}?)\s+–\s+(.+)$/) : null;
    if (match?.[1] && match[2]) {
      const item = { name: match[1], description: match[2] };
      const last = blocks[blocks.length - 1];
      if (Array.isArray(last)) last.push(item);
      else blocks.push([item]);
    } else {
      blocks.push(paragraph);
    }
  }
  return blocks;
}

/** Full-bleed heroes blur below ~1200px wide and crop badly when portrait, so prefer the first photo that is both; otherwise keep the lead photo. A park can name its hero instead. */
function splitHeroImage(keys: ImageKey[], preferred?: string): { heroKey: ImageKey; galleryKeys: ImageKey[] } {
  const heroKey =
    keys.find((key) => key === preferred) ??
    keys.find((key) => images[key].width >= 1200 && images[key].width >= images[key].height) ??
    keys[0] ??
    "pageHeader";
  return { heroKey, galleryKeys: keys.filter((key) => key !== heroKey) };
}

export const dynamicParams = false;
export const revalidate = 21600;

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return {};
  const { heroKey } = splitHeroImage(destination.imageKeys.filter(isImageKey) as ImageKey[], destination.heroImageKey);
  return pageMetadata(`/destinations/${destination.slug}`, {
    title: destination.seo.title,
    description: destination.seo.description,
    imageKey: heroKey,
    absoluteTitle: true,
  });
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const imageKeys = destination.imageKeys.filter(isImageKey) as ImageKey[];
  const { heroKey, galleryKeys } = splitHeroImage(imageKeys, destination.heroImageKey);
  const summary = getPackageSummary(destination.slug);
  const [leadIntro, ...moreIntro] = destination.intro;
  // Avoid repeating the page title as a section heading.
  const overviewTitle =
    leadIntro && leadIntro.heading !== destination.name ? leadIntro.heading : `Discover ${destination.shortName}`;
  const aboutTitle =
    destination.about && destination.about.heading !== destination.name ? destination.about.heading : "About the Reserve";
  const wildlifeBlocks = groupSpeciesLines(destination.wildlife?.paragraphs ?? []);
  const path = `/destinations/${destination.slug}`;
  const service = serviceJsonLd(destination);
  const suppliedJsonLd = pageJsonLd(path);

  const related = destination.relatedSlugs
    ? destination.relatedSlugs.flatMap((relatedSlug) => getDestination(relatedSlug) ?? [])
    : [
        ...destinations.filter((d) => d.slug !== destination.slug && d.state === destination.state),
        ...destinations.filter((d) => d.slug !== destination.slug && d.state !== destination.state),
      ].slice(0, 3);
  const guides = getPostsForDestination(destination.slug).slice(0, 3);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Safari Packages", path: "/safari-packages" },
    { name: destination.name, path: `/destinations/${destination.slug}` },
  ];

  const sections = [
    { id: "overview", label: "Overview", show: true },
    { id: "booking", label: "Booking", show: Boolean(destination.booking?.length) },
    { id: "wildlife", label: "Wildlife", show: Boolean(destination.wildlife) },
    { id: "zones", label: "Zones", show: Boolean(destination.zones) },
    { id: "safaris", label: "Safaris", show: Boolean(destination.safariExperience) },
    { id: "best-time", label: "Best time", show: Boolean(destination.bestTime?.length) },
    { id: "getting-there", label: "Getting there", show: Boolean(destination.howToReach) },
    { id: "faqs", label: "FAQs", show: Boolean(destination.faqs?.length) },
  ].filter((section) => section.show);

  return (
    <>
      <PageHero
        title={pageH1(path, destination.pageTitle ?? destination.name)}
        eyebrow={destination.tagline ?? destination.state}
        imageKey={heroKey}
        breadcrumbs={breadcrumbs}
        size="tall"
        intro={destination.heroIntro ? <p>{destination.heroIntro}</p> : <p className="line-clamp-4">{destination.summary}</p>}
      >
        <dl className="mt-8 flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sand-50 backdrop-blur">
            <dt className="sr-only">State</dt>
            <Icon name="mapPin" className="size-4 text-ochre-300" />
            <dd>{destination.state}</dd>
          </div>
          {summary ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sand-50 backdrop-blur">
                <dt className="sr-only">Duration</dt>
                <Icon name="clock" className="size-4 text-ochre-300" />
                <dd>{summary.durations.join(" / ")}</dd>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sand-50 backdrop-blur">
                <dt className="sr-only">{summary.seasonYears.join(", ")} season fare</dt>
                <Icon name="jeep" className="size-4 text-ochre-300" />
                <dd>
                  {summary.seasonYears.join(", ")} fare: <Price amount={summary.min} max={summary.max} />
                </dd>
              </div>
            </>
          ) : null}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`/destinations/${destination.slug}/schedule`} size="lg" icon="arrowRight">
            Book Now
          </ButtonLink>
          <ButtonLink href="#enquire" variant="light" size="lg">
            Enquire about {destination.shortName}
          </ButtonLink>
          {destination.scheduleLinkText ? (
            <Link
              href={`/destinations/${destination.slug}/schedule`}
              className="self-center px-2 font-semibold text-sand-50 underline decoration-ochre-300 underline-offset-4 transition-colors hover:text-ochre-200"
            >
              {destination.scheduleLinkText}
            </Link>
          ) : null}
        </div>
      </PageHero>

      <nav aria-label="On this page" className="sticky top-[3.8rem] z-30 border-b border-sand-200 bg-sand-50/95 backdrop-blur lg:top-[4.25rem]">
        <Container>
          <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 py-2 text-sm font-semibold whitespace-nowrap [scrollbar-width:none] sm:mx-0 sm:px-0">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="block rounded-full px-4 py-2 text-ink-600 transition-colors hover:bg-forest-50 hover:text-forest-900">
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {/* Overview */}
      <section id="overview" aria-labelledby="overview-title" className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {leadIntro ? (
              <>
                <SectionHeading id="overview-title" eyebrow="Overview" title={overviewTitle} />
                <div className="prose-safari mt-6">
                  {leadIntro.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </>
            ) : (
              <h2 id="overview-title" className="sr-only">
                Overview
              </h2>
            )}
            {destination.about ? (
              <div className="mt-12 rounded-3xl border border-sand-300/70 bg-white p-7 shadow-card sm:p-9">
                <h3 className="text-2xl font-semibold text-forest-900">{aboutTitle}</h3>
                <div className="prose-safari mt-4">
                  {destination.about.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="lg:col-span-5">
            <div className="grid gap-4 lg:sticky lg:top-36">
              {(galleryKeys.length ? galleryKeys : [heroKey]).map((key, index) => (
                <div
                  key={key}
                  className={cn("relative overflow-hidden rounded-3xl shadow-card", index === 0 ? "aspect-[4/3]" : "aspect-[16/9]")}
                >
                  <SafariImage imageKey={key} fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </Container>

        {moreIntro.length > 0 ? (
          <Container className="mt-16">
            <div className={cn("grid gap-6", moreIntro.length > 1 && "md:grid-cols-2")}>
              {moreIntro.map((section) => (
                <article key={section.heading} className="rounded-3xl bg-sand-100 p-7 sm:p-9">
                  <h3 className="text-2xl font-semibold text-forest-900">{section.heading}</h3>
                  <div className="prose-safari mt-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Container>
        ) : null}
      </section>

      {destination.booking?.length ? (
        <section id="booking" aria-labelledby="booking-title" className="border-t border-sand-200 py-20 sm:py-24">
          <BookingSections sections={destination.booking} />
        </section>
      ) : null}

      {destination.wildlife ? (
        <section id="wildlife" aria-labelledby="wildlife-title" className="bg-forest-900 py-20 text-sand-100 sm:py-24">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="self-start lg:sticky lg:top-36 lg:col-span-5">
              <SectionHeading id="wildlife-title" eyebrow="Wildlife" title={destination.wildlife.heading} tone="dark" />
              {destination.wildlife.highlights?.length ? (
                <div className="mt-8">
                  <p className="text-xs font-bold tracking-[0.18em] text-sand-100/60 uppercase">Also spotted</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {destination.wildlife.highlights.map((item) => (
                      <li key={item} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-sand-50">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-sand-100/85 lg:col-span-7">
              {wildlifeBlocks.map((block) =>
                typeof block === "string" ? (
                  <p key={block.slice(0, 40)}>{block}</p>
                ) : (
                  <dl key={block[0]?.name} className="grid gap-3 sm:grid-cols-2">
                    {block.map((item) => (
                      <div key={item.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <dt className="font-semibold text-sand-50">{item.name}</dt>
                        <dd className="mt-1 text-base text-sand-100/75">{item.description}</dd>
                      </div>
                    ))}
                  </dl>
                ),
              )}
            </div>
          </Container>
        </section>
      ) : null}

      {destination.zones ? (
        <section id="zones" aria-labelledby="zones-title" className="py-20 sm:py-24">
          <Container>
            <SectionHeading id="zones-title" eyebrow="Where you’ll explore" title={destination.zones.heading} intro={destination.zones.intro} />
            <div className="mt-10">
              <ZoneList items={destination.zones.items} />
            </div>
          </Container>
        </section>
      ) : null}

      {destination.safariExperience ? (
        <section id="safaris" aria-labelledby="safaris-title" className={cn("py-20 sm:py-24", destination.zones ? "bg-sand-100" : "")}>
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="safaris-title"
                eyebrow="On safari"
                title={destination.safariExperience.heading}
                intro={destination.safariExperience.intro}
              />
            </div>
            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {destination.safariExperience.items.map((item) => (
                <li key={item.name} className="rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card">
                  <Icon name={/evening|afternoon/i.test(item.name) ? "sun" : "clock"} className="size-7 text-ochre-600" />
                  <h3 className="mt-4 text-xl font-semibold text-forest-900">{item.name}</h3>
                  <p className="mt-2 leading-relaxed text-ink-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {destination.bestTime?.length ? (
        <section id="best-time" aria-labelledby="best-time-title" className="py-20 sm:py-24">
          <Container>
            <SectionHeading id="best-time-title" eyebrow="Plan your visit" title={`Best time to visit ${destination.name}`} />
            <div className="mt-10">
              <BestTime seasons={destination.bestTime} />
            </div>
            {destination.bestTimeNote ? (
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-ink-600 [&_a]:font-semibold [&_a]:text-forest-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-ochre-700">
                <RichText text={destination.bestTimeNote} />
              </p>
            ) : null}
          </Container>
        </section>
      ) : null}

      {destination.howToReach ? (
        <section id="getting-there" aria-labelledby="getting-there-title" className="bg-sand-100 py-20 sm:py-24">
          <Container>
            <SectionHeading id="getting-there-title" eyebrow="Getting there" title={`How to reach ${destination.name}`} />
            <div className="mt-8">
              <HowToReach howToReach={destination.howToReach} />
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="essentials-title" className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <SectionHeading id="essentials-title" eyebrow="Plan your safari" title="Booking made simple" />
          <div className="mt-10">
            <BookingEssentials destinationName={destination.shortName} />
          </div>
        </Container>
      </section>

      {destination.faqs?.length ? (
        <section id="faqs" aria-labelledby="faqs-title" className="py-20 sm:py-24">
          <Container>
            <SectionHeading
              id="faqs-title"
              eyebrow="FAQs"
              title={destination.faqHeading ?? "Frequently asked questions"}
              align="center"
              className="max-w-none!"
            />
            <div className="mt-10">
              <FaqList faqs={destination.faqs} group={`faq-${destination.slug}`} />
            </div>
          </Container>
        </section>
      ) : null}

      {destination.cta ? (
        <section aria-labelledby="booking-cta-title" className="pb-20 sm:pb-24">
          <Container>
            <div className="rounded-[2rem] bg-forest-900 px-6 py-12 sm:px-12 lg:px-16">
              <div className="max-w-3xl">
                <p className="text-xs font-bold tracking-[0.2em] text-ochre-300 uppercase">Next step</p>
                <h2 id="booking-cta-title" className="mt-3 text-3xl leading-tight font-semibold text-sand-50 sm:text-4xl">
                  {destination.cta.heading}
                </h2>
                {destination.cta.text ? (
                  <p className="mt-4 text-lg text-sand-100/80 [&_a]:font-semibold [&_a]:text-ochre-200 [&_a]:underline [&_a]:underline-offset-4">
                    <RichText text={destination.cta.text} />
                  </p>
                ) : null}
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/destinations/${destination.slug}/schedule`} size="lg" icon="arrowRight">
                    See dates &amp; book
                  </ButtonLink>
                  <ButtonLink href="#enquire" variant="light" size="lg">
                    Send an enquiry
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {guides.length > 0 ? (
        <section aria-labelledby="guides-title" className="pb-20 sm:pb-24">
          <Container>
            <SectionHeading id="guides-title" eyebrow="From the blog" title={`${destination.shortName} planning guides`} />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <Testimonials />

      <section aria-labelledby="related-title" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="related-title"
            eyebrow="Keep exploring"
            title="More wild places"
            intro={
              destination.relatedIntro ? (
                <p className="text-lg [&_a]:font-semibold [&_a]:text-forest-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-ochre-700">
                  <RichText text={destination.relatedIntro} />
                </p>
              ) : undefined
            }
          />
          <div className="mt-10">
            <DestinationGrid destinations={related} />
          </div>
        </Container>
      </section>

      <EnquirySection
        title={`Plan your ${destination.shortName} safari`}
        intro="Tell us your preferred dates and group size. Our team will get in touch with you very soon."
        defaultDestination={destination.name}
      />

      <JsonLd
        data={
          suppliedJsonLd
            ? [
                suppliedJsonLd,
                // The SEO pack only has FAQ markup for parks whose FAQs existed when it was written.
                ...(destination.faqs?.length && !hasSchemaType(suppliedJsonLd, "FAQPage") ? [faqJsonLd(destination.faqs)] : []),
              ]
            : [
                breadcrumbJsonLd(breadcrumbs),
                destinationJsonLd(destination, images[heroKey].src),
                ...(service ? [service] : []),
                ...(destination.faqs?.length ? [faqJsonLd(destination.faqs)] : []),
              ]
        }
      />
    </>
  );
}
