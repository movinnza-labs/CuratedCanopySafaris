import { AboutStory } from "@/components/sections/about-story";
import { CtaBanner } from "@/components/sections/cta-banner";
import { CustomExpeditions } from "@/components/sections/custom-expeditions";
import { PageHero } from "@/components/sections/page-hero";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyChoose } from "@/components/sections/why-choose";
import { YoungNaturalist } from "@/components/sections/young-naturalist";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

export const metadata = buildMetadata({
  title: "About Us – Wildlife Safari Experts in India",
  description:
    "Curated Canopy Safaris: trusted wildlife travel experts offering bespoke jungle safaris and nature tours across India’s top national parks.",
  path: "/about",
  imageKey: "heroChital",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        eyebrow="Curated Canopy Safaris"
        intro="Making India’s wildlife safaris more affordable, accessible and thoughtfully designed for all."
        imageKey="heroChital"
        breadcrumbs={breadcrumbs}
      />
      <AboutStory />
      <WhyChoose />
      <CustomExpeditions />
      <YoungNaturalist />
      <Testimonials />
      <CtaBanner />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
