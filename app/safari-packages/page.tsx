import Link from "next/link";
import { DestinationGrid } from "@/components/safari/destination-grid";
import { FaqList } from "@/components/safari/faq-list";
import { CustomExpeditions } from "@/components/sections/custom-expeditions";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { safariPackagesFaqs } from "@/lib/data/content";
import { destinations } from "@/lib/data/destinations";
import { termsPolicies } from "@/lib/data/terms";
import { breadcrumbJsonLd, faqJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";

export const revalidate = 21600;

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Safari Packages", path: "/safari-packages" },
];

export const metadata = pageMetadata("/safari-packages", {
  title: "Wildlife Safari Packages in India",
  description:
    "Expertly curated wildlife safari packages across India: tiger safaris, birding tours and luxury jungle experiences for nature lovers.",
  imageKey: "kanhaTiger",
});

export default function SafariPackagesPage() {
  const standard = termsPolicies[0];
  return (
    <>
      <PageHero
        title={pageH1("/safari-packages", "Safari Packages")}
        eyebrow="Our expeditions"
        intro="A curated selection of our finest wildlife destinations — each with stay, meals, forest permits, safaris and trained guides included."
        imageKey="kanhaTiger"
        breadcrumbs={breadcrumbs}
      />

      <section aria-labelledby="packages-title" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="packages-title"
            eyebrow={`${destinations.length} destinations`}
            title="Choose your wilderness"
            intro={
              <>
                Open any park for its full departure schedule, itinerary, inclusions and cancellation terms. Not sure when to go? Read
                our guide to the{" "}
                <Link
                  href="/blogs/best-time-to-visit-india-for-tiger-safari-month-by-month-guide"
                  className="font-semibold text-ochre-700 underline underline-offset-4"
                >
                  best time to visit India for a tiger safari
                </Link>
                .
              </>
            }
          />
          <div className="mt-12">
            <DestinationGrid destinations={destinations} priorityCount={3} />
          </div>
        </Container>
      </section>

      {standard ? (
        <section aria-labelledby="included-title" className="pb-20 sm:pb-24">
          <Container>
            <div className="grid gap-10 rounded-[2rem] bg-forest-900 p-8 text-sand-100 sm:p-12 lg:grid-cols-2">
              <div>
                <h2 id="included-title" className="text-3xl font-semibold text-sand-50">
                  What every package includes
                </h2>
                <ul className="mt-6 space-y-3">
                  {standard.included.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Icon name="check" className="mt-0.5 size-5 shrink-0 text-ochre-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-sm font-bold tracking-[0.15em] text-ochre-300 uppercase">Not included</h3>
                <ul className="mt-4 grid gap-2 text-sm text-sand-100/80 sm:grid-cols-2">
                  {standard.notIncluded.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Icon name="x" className="mt-0.5 size-4 shrink-0 text-sand-100/50" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-sand-100/70">
                  {standard.payment[0]} Cancellation terms vary by package and are listed on each destination page.
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section aria-labelledby="packages-faq-title" className="pb-20 sm:pb-24">
        <Container size="narrow">
          <SectionHeading id="packages-faq-title" eyebrow="Good to know" title="Safari package FAQs" />
          <div className="mt-10">
            <FaqList faqs={safariPackagesFaqs} group="packages-faq" />
          </div>
        </Container>
      </section>

      <CustomExpeditions />
      <EnquirySection />
      <JsonLd data={[pageJsonLd("/safari-packages") ?? breadcrumbJsonLd(breadcrumbs), faqJsonLd(safariPackagesFaqs)]} />
    </>
  );
}
