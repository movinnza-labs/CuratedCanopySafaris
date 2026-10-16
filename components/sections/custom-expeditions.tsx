import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SafariImage } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { customExpeditions } from "@/lib/data/content";

export function CustomExpeditions() {
  return (
    <section aria-labelledby="custom-expeditions-title" className="bg-sand-100 py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <SectionHeading id="custom-expeditions-title" eyebrow="Bespoke journeys" title={customExpeditions.heading} />
          <div className="prose-safari mt-6">
            {customExpeditions.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <ButtonLink href="/contact" className="mt-8" icon="arrowRight">
            Design my expedition
          </ButtonLink>
        </div>
        <div className="rounded-[2rem] bg-white p-8 shadow-card sm:p-10">
          <div className="relative -mx-8 -mt-8 mb-8 aspect-[16/9] overflow-hidden rounded-t-[2rem] sm:-mx-10 sm:-mt-10">
            <SafariImage imageKey="heroBarasingha" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <h3 className="text-2xl font-semibold text-forest-900">{customExpeditions.audienceHeading}</h3>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {customExpeditions.audiences.map((audience) => (
              <li key={audience} className="flex items-center gap-3 text-ink-700">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-600">
                  <Icon name="check" className="size-4" />
                </span>
                {audience}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-sand-200 pt-6 text-sm leading-relaxed text-ink-600">{customExpeditions.closing}</p>
        </div>
      </Container>
    </section>
  );
}
