import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon, type IconName } from "@/components/ui/icon";
import { SafariImage } from "@/components/ui/safari-image";

type HomeHeroProps = {
  destinationCount: number;
};

export function HomeHero({ destinationCount }: HomeHeroProps) {
  const highlights: { icon: IconName; label: string }[] = [
    { icon: "pawprint", label: `${destinationCount} national parks & tiger reserves` },
    { icon: "compass", label: "Custom-designed expeditions" },
    { icon: "graduationCap", label: "10% student discount" },
  ];

  return (
    <section aria-labelledby="home-hero-title" className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-forest-950">
      <SafariImage
        imageKey="heroTigerAtPool"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-[60%_center] opacity-90"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/70 via-transparent to-transparent" />

      <Container className="pt-36 pb-14 sm:pb-20">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-ochre-200 uppercase backdrop-blur-sm">
            Exclusive safari destinations, curated just for you
          </p>
          <h1 id="home-hero-title" className="text-5xl leading-[1.02] font-semibold text-sand-50 sm:text-6xl lg:text-7xl">
            We curate, <span className="text-ochre-300 italic">you discover.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-sand-100/85 sm:text-xl">
            Wildlife and tiger safaris across India’s tiger strongholds — economically priced, with good resorts and every
            detail thoughtfully arranged.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/safari-packages" size="lg" icon="arrowRight">
              Explore safari packages
            </ButtonLink>
            <ButtonLink href="/contact" variant="light" size="lg">
              Plan a custom expedition
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-14 grid gap-3 border-t border-white/15 pt-6 text-sm text-sand-100/85 sm:grid-cols-3 sm:gap-6">
          {highlights.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-ochre-300">
                <Icon name={item.icon} className="size-4.5" />
              </span>
              {item.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
