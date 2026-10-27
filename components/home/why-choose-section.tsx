import { HomeImage } from "@/components/ui/home-image";
import { InlineText } from "@/components/ui/inline-text";
import { Reveal } from "@/components/ui/reveal";
import { whyChoose } from "@/lib/data/home";

export function WhyChooseSection() {
  return (
    <section aria-labelledby="why-choose-title" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Brand-brown panel overlapping the photograph, as on the live site. */}
        <Reveal
          from="left"
          delay={250}
          className="relative z-10 order-2 -mt-16 rounded-[2rem] bg-ochre-600 p-8 text-white shadow-lift sm:mx-8 sm:p-12 lg:order-1 lg:col-span-6 lg:mx-0 lg:-mr-24 lg:mt-0"
        >
          <div aria-hidden className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_255_255/0.14)_0%,transparent_55%)]" />
          <h2 id="why-choose-title" className="relative text-[2rem] leading-[1.1] font-semibold tracking-tight sm:text-[2.6rem]">
            {whyChoose.title}
          </h2>
          <div className="relative mt-7 space-y-4 leading-relaxed text-white/90 sm:text-lg">
            {whyChoose.lines.map((line, i) => (
              <p key={i}>
                <InlineText parts={line} linkClassName="font-semibold text-white underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white" />
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal from="curtain" className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift lg:aspect-[4/5]">
            <HomeImage
              imageKey={whyChoose.imageKey}
              fill
              sizes="(min-width: 1024px) 620px, 100vw"
              className="object-cover object-[70%_center] transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
