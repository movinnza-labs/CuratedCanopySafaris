import Link from "next/link";
import { HomeImage } from "@/components/ui/home-image";
import { RichBlocks } from "@/components/ui/inline-text";
import { Reveal } from "@/components/ui/reveal";
import { youngNaturalist } from "@/lib/data/home";

export function YoungNaturalistSection() {
  return (
    <section aria-labelledby="young-naturalist-title" className="bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal from="zoom" className="mx-auto max-w-3xl text-center">
          <h2 id="young-naturalist-title" className="text-[2.1rem] leading-tight font-semibold tracking-tight text-forest-900 sm:text-5xl">
            {youngNaturalist.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-600">{youngNaturalist.intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal from="curtain" className="lg:col-span-7 [--curtain-color:var(--color-sand-100)]">
            <div className="group relative h-full min-h-[20rem] overflow-hidden rounded-[2rem] shadow-lift sm:min-h-[26rem]">
              <HomeImage
                imageKey={youngNaturalist.mainImageKey}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover object-[65%_center] transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
            </div>
          </Reveal>

          <Reveal from="right" delay={120} className="flex flex-col gap-8 lg:col-span-5">
            <div className="rounded-[2rem] bg-white p-8 shadow-card sm:p-10">
              <div className="space-y-5 text-[1.0625rem] leading-[1.8] text-ink-700">
                <RichBlocks
                  blocks={youngNaturalist.body}
                  linkClassName="font-semibold break-all text-ochre-600 underline decoration-ochre-300 underline-offset-4 transition-colors hover:text-ochre-800"
                />
              </div>
              <Link
                href={youngNaturalist.button.href}
                className="btn-sheen mt-8 inline-flex items-center gap-2 rounded-full bg-ochre-600 px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-ochre-700 hover:shadow-lg"
              >
                {youngNaturalist.button.label}
              </Link>
            </div>
            <div className="group relative mx-auto aspect-[750/511] w-full max-w-[560px] overflow-hidden rounded-[2rem] shadow-card lg:max-w-none">
              <HomeImage
                imageKey={youngNaturalist.secondaryImageKey}
                fill
                sizes="(min-width: 1024px) 480px, 560px"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
