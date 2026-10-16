import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { youngNaturalist } from "@/lib/data/content";
import { site } from "@/lib/data/site";

export function YoungNaturalist() {
  const [intro, mission, offer] = youngNaturalist.paragraphs;
  return (
    <section aria-labelledby="young-naturalist-title" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-ochre-200 bg-ochre-50 p-8 sm:p-12 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-3">
            <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-ochre-700 uppercase">
              <Icon name="graduationCap" className="size-4" />
              For students
            </p>
            <h2 id="young-naturalist-title" className="mt-3 text-3xl font-semibold text-forest-900 sm:text-4xl">
              {youngNaturalist.heading}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-700">
              <p>{intro}</p>
              <p>{mission}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-card lg:col-span-2">
            <p className="font-display text-6xl font-semibold text-ochre-600">10%</p>
            <p className="mt-1 font-semibold text-forest-900">off all our expeditions</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{offer}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <ButtonLink href={`mailto:${site.contact.email}?subject=Young%20Naturalist%20Programme`} external size="sm" icon="mail" iconPosition="start">
                Email us
              </ButtonLink>
              <ButtonLink href={site.contact.whatsappHref} external variant="outline" size="sm" icon="whatsapp" iconPosition="start">
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
