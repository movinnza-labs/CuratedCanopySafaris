import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredLandscapes } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export function FeaturedLandscapes() {
  return (
    <section aria-labelledby="landscapes-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="landscapes-title"
          eyebrow="Wild India"
          title="Landscapes we love"
          intro="From the Terai grasslands to the land of the Asiatic lion — a few of the wild places we return to again and again."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredLandscapes.map((item) => {
            const hasImage = isImageKey(item.imageKey);
            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative isolate flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-3xl p-6 sm:p-7",
                    hasImage ? "bg-forest-950" : "bg-gradient-to-br from-forest-800 to-forest-950",
                  )}
                >
                  {hasImage ? (
                    <>
                      <SafariImage
                        imageKey={item.imageKey}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/75 via-45% to-forest-950/5" />
                    </>
                  ) : (
                    <Icon name="leaf" className="absolute top-6 right-6 size-20 text-white/10" />
                  )}
                  <p className="text-xs font-bold tracking-[0.18em] text-ochre-300 uppercase">{item.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-sand-50">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand-100/80">{item.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sand-50">
                    {item.href.startsWith("/contact") ? "Enquire" : "Explore"}
                    <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
