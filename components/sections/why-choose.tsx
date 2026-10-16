import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { SafariImage } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { whyChooseUs } from "@/lib/data/content";

const pillars: { icon: IconName; title: string }[] = [
  { icon: "binoculars", title: "Naturalists who read the jungle" },
  { icon: "leaf", title: "The whole wilderness, not just the tiger" },
  { icon: "users", title: "Comfort and seamless logistics" },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-choose-title" className="relative isolate overflow-hidden bg-forest-900 py-20 text-sand-100 sm:py-28">
      <div aria-hidden className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block">
        <SafariImage imageKey="whyChooseRaptor" fill sizes="50vw" alt="" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/70 to-forest-900/20" />
      </div>
      <Container>
        <SectionHeading id="why-choose-title" eyebrow="What sets us apart" title={whyChooseUs.heading} tone="dark" className="max-w-none!" />
        <div className="max-w-2xl">
          <div className="mt-10 space-y-8">
            {whyChooseUs.paragraphs.map((paragraph, index) => {
              const pillar = pillars[index];
              return (
                <div key={paragraph.slice(0, 24)} className="flex gap-5">
                  {pillar ? (
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-ochre-300">
                      <Icon name={pillar.icon} className="size-6" />
                    </span>
                  ) : null}
                  <div>
                    {pillar ? <h3 className="text-xl font-semibold text-sand-50">{pillar.title}</h3> : null}
                    <p className="mt-2 leading-relaxed text-sand-100/80">{paragraph}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
