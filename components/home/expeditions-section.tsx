import { InlineText } from "@/components/ui/inline-text";
import { Reveal } from "@/components/ui/reveal";
import { expeditions, expeditionsIntro } from "@/lib/data/home";
import { ExpeditionCard } from "./expedition-card";
import { HomeHeading } from "./home-heading";

export function ExpeditionsSection() {
  return (
    <section aria-labelledby="expeditions-title">
      <div className="bg-white pt-24 pb-16 sm:pt-32">
        <Reveal from="zoom" className="w-full px-4 sm:px-6 lg:px-8">
          <HomeHeading id="expeditions-title" eyebrow={expeditionsIntro.eyebrow} title={expeditionsIntro.title} align="center" />
        </Reveal>
      </div>
      <div className="relative bg-forest-600 py-16 sm:py-24">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,#627559_0%,transparent_70%)]" />
        <ol className="relative mx-auto grid max-w-6xl gap-7 px-4 sm:px-6 lg:gap-9 lg:px-8">
          {expeditions.map((expedition, i) => (
            <Reveal as="li" key={expedition.slug} from={i % 2 === 0 ? "left" : "right"} delay={60}>
              <ExpeditionCard expedition={expedition} />
            </Reveal>
          ))}
        </ol>
        <p className="relative mx-auto mt-12 max-w-3xl px-4 text-center text-lg leading-relaxed text-white/90 sm:mt-16 sm:px-6">
          <InlineText
            parts={expeditionsIntro.outro}
            linkClassName="font-semibold text-sand-100 underline decoration-sand-200/60 underline-offset-4 transition-colors hover:decoration-sand-100"
          />
        </p>
      </div>
    </section>
  );
}
