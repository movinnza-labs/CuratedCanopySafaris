import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { journey } from "@/lib/data/home";
import { HomeHeading } from "./home-heading";

export function JourneySection() {
  return (
    <section aria-labelledby="journey-title" className="relative isolate overflow-hidden bg-forest-600 py-20 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(90%_120%_at_100%_0%,#6d7f63_0%,transparent_55%),radial-gradient(70%_90%_at_0%_100%,#3c4a3a_0%,transparent_60%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <Reveal from="left" className="lg:col-span-5">
          <HomeHeading id="journey-title" eyebrow={journey.eyebrow} title={journey.title} tone="dark" />
        </Reveal>
        <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
          {journey.counters.map((counter, index) => (
            <Reveal
              key={counter.label}
              from="right"
              delay={index * 300}
              className="flex flex-col-reverse rounded-[1.75rem] border border-white/15 bg-white/[0.06] p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.1] sm:p-10"
            >
              <dt className="mt-3 text-sm font-semibold tracking-[0.2em] text-sand-200 uppercase">{counter.label}</dt>
              <dd className="font-display text-6xl font-semibold text-white sm:text-7xl">
                <CountUp start={counter.start} end={counter.end} durationMs={counter.durationMs} suffix={counter.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
