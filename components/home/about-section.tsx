import { HomeImage } from "@/components/ui/home-image";
import { RichBlocks } from "@/components/ui/inline-text";
import { Reveal } from "@/components/ui/reveal";
import { about } from "@/lib/data/home";
import { HomeHeading } from "./home-heading";

export function AboutSection() {
  return (
    <section id={about.anchorId} aria-labelledby="about-title" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute -top-24 -right-40 size-[28rem] rounded-full bg-sand-200/60 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <Reveal from="left" className="lg:col-span-7">
          <HomeHeading id="about-title" eyebrow={about.eyebrow} kicker={about.kicker} title={about.title} />
          <div className="mt-8 space-y-5 text-[1.0625rem] leading-[1.8] text-ink-700 [&_strong]:font-semibold [&_strong]:text-forest-900">
            <RichBlocks
              blocks={about.body}
              linkClassName="font-semibold text-ochre-600 underline decoration-ochre-300 underline-offset-4 transition-colors hover:text-ochre-800"
            />
          </div>
        </Reveal>

        <Reveal from="curtain" delay={150} className="mx-auto w-full max-w-[430px] lg:col-span-5">
          <figure className="relative">
            <div aria-hidden className="absolute -inset-4 translate-x-6 translate-y-6 rounded-[2rem] border-2 border-ochre-300/60" />
            <div className="group relative overflow-hidden rounded-[2rem] shadow-lift">
              {/* Native width is 430px, so it is never displayed wider than that. */}
              <HomeImage
                imageKey={about.imageKey}
                sizes="430px"
                className="h-auto w-full transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
