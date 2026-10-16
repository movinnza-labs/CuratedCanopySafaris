import { HomeImage } from "@/components/ui/home-image";
import { RichBlocks } from "@/components/ui/inline-text";
import { Reveal } from "@/components/ui/reveal";
import { customExpeditions } from "@/lib/data/home";

export function CustomExpeditionsSection() {
  return (
    <section aria-labelledby="custom-expeditions-title" className="bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-8">
        <Reveal from="curtain" className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none [--curtain-color:var(--color-sand-100)]">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <HomeImage
              imageKey={customExpeditions.imageKey}
              fill
              sizes="(min-width: 1024px) 480px, 448px"
              className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
          </div>
        </Reveal>

        <Reveal from="right" delay={120} className="lg:col-span-7">
          <h2 id="custom-expeditions-title" className="text-[2.1rem] leading-[1.08] font-semibold tracking-tight text-forest-900 sm:text-5xl">
            {customExpeditions.title}
          </h2>
          <div className="mt-7 space-y-5 text-[1.0625rem] leading-[1.8] text-ink-700">
            <RichBlocks blocks={customExpeditions.body} />
          </div>

          <div className="mt-9 rounded-[1.75rem] border border-sand-300 bg-white p-7 shadow-card sm:p-8">
            <p className="font-bold text-forest-900">{customExpeditions.audienceTitle}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {customExpeditions.audiences.map((audience) => (
                <li key={audience} className="flex items-center gap-3 text-ink-700">
                  {/* Plain bullet, as in the live site's list. */}
                  <span aria-hidden className="size-2 shrink-0 rounded-full bg-ochre-500" />
                  {audience}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-sand-200 pt-6 leading-relaxed text-ink-600">{customExpeditions.closing}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
