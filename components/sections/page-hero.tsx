import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SafariImage } from "@/components/ui/safari-image";
import type { ImageKey } from "@/lib/data/images";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  intro?: React.ReactNode;
  imageKey?: ImageKey;
  breadcrumbs: Crumb[];
  size?: "default" | "tall";
  children?: React.ReactNode;
};

export function PageHero({ title, eyebrow, intro, imageKey = "pageHeader", breadcrumbs, size = "default", children }: PageHeroProps) {
  return (
    <section
      aria-labelledby="page-title"
      className={cn(
        "relative isolate flex items-end overflow-hidden bg-forest-950",
        // Height tracks the photo's landscape ratio on wide screens (capped at one viewport) so the banner doesn't crop it to a thin strip.
        size === "tall" ? "min-h-[78svh] lg:min-h-svh" : "min-h-[28rem] sm:min-h-[34rem] lg:min-h-[min(62.5vw,100svh)]",
      )}
    >
      <SafariImage imageKey={imageKey} fill priority sizes="100vw" className="-z-10 object-cover object-center opacity-90" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/45 to-forest-950/20" />
      <Container className="pt-32 pb-12 sm:pb-16">
        <Breadcrumbs items={breadcrumbs} className="mb-6" />
        {eyebrow ? <p className="mb-3 text-xs font-bold tracking-[0.2em] text-ochre-300 uppercase">{eyebrow}</p> : null}
        <h1 id="page-title" className="max-w-4xl text-4xl leading-tight font-semibold text-sand-50 sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro ? <div className="mt-5 max-w-2xl text-lg leading-relaxed text-sand-100/85">{intro}</div> : null}
        {children}
      </Container>
    </section>
  );
}
