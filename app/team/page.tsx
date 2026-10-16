import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { TeamGrid } from "@/components/sections/team-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Our Team", path: "/team" },
];

export const metadata = buildMetadata({
  title: "Meet Our Safari Experts",
  description:
    "Meet the passionate team behind Curated Canopy Safaris. Our wildlife experts, naturalists, and travel specialists ensure unforgettable safari experiences across India.",
  path: "/team",
  imageKey: "teamGroup",
});

export default function TeamPage() {
  return (
    <>
      <PageHero title="Our Team" eyebrow="Pugmark Safaris LLP" imageKey="teamGroup" breadcrumbs={breadcrumbs} />
      <TeamGrid />
      <Testimonials />
      <CtaBanner />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
