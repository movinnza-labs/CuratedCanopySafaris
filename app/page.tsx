import { AboutSection } from "@/components/home/about-section";
import { CustomExpeditionsSection } from "@/components/home/custom-expeditions-section";
import { ExpeditionsSection } from "@/components/home/expeditions-section";
import { HeroSection } from "@/components/home/hero-section";
import { JourneySection } from "@/components/home/journey-section";
import { LetUsKnowSection } from "@/components/home/let-us-know-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { YoungNaturalistSection } from "@/components/home/young-naturalist-section";
import { JsonLd } from "@/components/ui/json-ld";
import { pageJsonLd } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("/", {
  title: "Best Wildlife Safari in India | Curated Canopy Safaris",
  description:
    "Discover top wildlife safari in India with expert-curated jungle tours, tiger reserves & national parks. Plan your dream safari adventure. Explore packages now!",
  absoluteTitle: true,
});

/** Section order follows the live homepage, minus its duplicate second "Let Us Know" form. */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <YoungNaturalistSection />
      <JourneySection />
      <WhyChooseSection />
      <CustomExpeditionsSection />
      <LetUsKnowSection id="let-us-know" />
      <ExpeditionsSection />
      <TestimonialsSection />
      <JsonLd data={pageJsonLd("/") ?? []} />
    </>
  );
}
