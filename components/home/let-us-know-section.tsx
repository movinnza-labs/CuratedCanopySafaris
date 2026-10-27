import { HomeImage } from "@/components/ui/home-image";
import { Reveal } from "@/components/ui/reveal";
import { letUsKnow } from "@/lib/data/home";
import { LetUsKnowForm } from "./let-us-know-form";

/** "Let Us Know" enquiry block, shown once on the homepage (after Custom Expeditions). */
export function LetUsKnowSection({ id }: { id: string }) {
  const [first, second] = letUsKnow.imageKeys;
  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate overflow-hidden bg-ochre-600 py-24 sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(90%_100%_at_0%_0%,#b77a3f_0%,transparent_55%),linear-gradient(160deg,#9c632d_0%,#7a4b22_100%)]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <Reveal from="left" className="lg:col-span-6">
          <h2 id={`${id}-title`} className="text-[2.2rem] leading-tight font-semibold tracking-tight text-white sm:text-5xl">
            {letUsKnow.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/90">{letUsKnow.intro}</p>
          <p className="mt-4 text-lg font-bold text-sand-100">{letUsKnow.note}</p>
          <div className="relative mt-10 rounded-[2rem] border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
            <LetUsKnowForm />
          </div>
        </Reveal>

        <Reveal from="right" delay={150} className="grid content-center gap-6 lg:col-span-6">
          {first ? (
            <div className="group relative mx-auto aspect-[694/493] w-full max-w-[560px] overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/10 lg:ml-0">
              {/* Native width 694px: kept at or below that size. */}
              <HomeImage imageKey={first} fill sizes="(min-width: 640px) 560px, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
            </div>
          ) : null}
          {second ? (
            <div className="group relative aspect-[3/2] w-full overflow-hidden rounded-[2rem] shadow-lift ring-1 ring-white/10 lg:-mt-16 lg:ml-16 lg:w-[calc(100%-4rem)]">
              <HomeImage imageKey={second} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
