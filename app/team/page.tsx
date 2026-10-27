import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { TeamGrid } from "@/components/sections/team-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Our Team", path: "/team" },
];

export const metadata = pageMetadata("/team", {
  title: "Meet Our Safari Experts",
  description:
    "Meet the passionate team behind Curated Canopy Safaris. Our wildlife experts, naturalists, and travel specialists ensure unforgettable safari experiences across India.",
  imageKey: "teamGroup",
});

export default function TeamPage() {
  return (
    <>
      <PageHero title={pageH1("/team", "Our Team")} eyebrow="Curated Canopy Safaris" imageKey="teamGroup" breadcrumbs={breadcrumbs} />
      <TeamGrid />
      <Testimonials />
      <CtaBanner link={{ label: "talk to us about your trip", href: "/contact" }} />
      <JsonLd data={pageJsonLd("/team") ?? breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
