import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SafariImage } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutStory } from "@/lib/data/content";

export function AboutStory({ showLink = false }: { showLink?: boolean }) {
  const [lead, ...rest] = aboutStory.paragraphs;
  return (
    <section aria-labelledby="about-story-title" className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <SafariImage imageKey="aboutRaptor" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -right-4 -bottom-8 hidden w-56 overflow-hidden rounded-3xl border-8 border-sand-50 shadow-lift sm:block lg:-right-10">
            <SafariImage imageKey="blackNeckedStork" sizes="224px" className="aspect-square object-cover" />
          </div>
        </div>
        <div>
          <SectionHeading id="about-story-title" eyebrow="About us" title="Curated wildlife experiences" />
          <div className="prose-safari mt-6">
            <p className="font-display text-xl leading-snug text-forest-800 sm:text-2xl">{lead}</p>
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          {showLink ? (
            <ButtonLink href="/about" variant="outline" className="mt-8" icon="arrowRight">
              Read more about us
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
