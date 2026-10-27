import Link from "next/link";
import { AboutStory } from "@/components/sections/about-story";
import { CtaBanner } from "@/components/sections/cta-banner";
import { CustomExpeditions } from "@/components/sections/custom-expeditions";
import { PageHero } from "@/components/sections/page-hero";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChoose } from "@/components/sections/why-choose";
import { YoungNaturalist } from "@/components/sections/young-naturalist";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { journey } from "@/lib/data/home";
import { site } from "@/lib/data/site";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

export const metadata = pageMetadata("/about", {
  title: "About Us – Wildlife Safari Experts in India",
  description:
    "Curated Canopy Safaris: trusted wildlife travel experts offering bespoke jungle safaris and nature tours across India’s top national parks.",
  imageKey: "heroChital",
});

// Every fact here is already published elsewhere on the site (footer legal notes, team bios, home counters).
const visitors = journey.counters.find((counter) => counter.label === "Tourist Visitors");
const trustFacts: { icon: IconName; value: string; text: string }[] = [
  { icon: "check", value: "Registered LLP", text: site.legal.incorporationNote },
  { icon: "info", value: "GSTIN", text: site.legal.gstin },
  { icon: "binoculars", value: "Since 2006", text: "Dr. Prakash Babu, Director – Operations, has been involved in wildlife photography since 2006." },
  ...(visitors ? [{ icon: "users" as const, value: `${visitors.end}${visitors.suffix}`, text: "Tourist visitors" }] : []),
];

function TrustStrip() {
  return (
    <section aria-label="Why guests trust us" className="pb-20 sm:pb-24">
      <Container>
        <ul className="grid gap-4 rounded-[2rem] border border-sand-300/70 bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
          {trustFacts.map((fact) => (
            <li key={fact.value} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-600">
                <Icon name={fact.icon} className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-xl font-semibold text-forest-900">{fact.value}</p>
                <p className="mt-1 text-sm leading-relaxed break-words text-ink-600">{fact.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={pageH1("/about", "About Us")}
        eyebrow="Curated Canopy Safaris"
        intro="Making India’s wildlife safaris more affordable, accessible and thoughtfully designed for all."
        imageKey="heroChital"
        breadcrumbs={breadcrumbs}
      />
      <AboutStory />
      <TrustStrip />
      <WhyChoose />
      <CustomExpeditions />
      <YoungNaturalist />
      <Container className="pb-12 text-center">
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-ink-700">
          The reviews below come from guests on our{" "}
          <Link href="/destinations/kanha-national-park" className="font-semibold text-ochre-700 underline underline-offset-4">
            Kanha National Park safari
          </Link>
          .
        </p>
      </Container>
      <Testimonials />
      <CtaBanner link={{ label: "see all safari packages", href: "/safari-packages" }} />
      <JsonLd data={pageJsonLd("/about") ?? breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
