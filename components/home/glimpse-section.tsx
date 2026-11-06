import { GalleryMosaic } from "@/components/gallery/gallery-browser";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { gallery, galleryCounts, galleryIntro } from "@/lib/data/gallery";
import { HomeHeading } from "./home-heading";

/** "A Glimpse of Our Real Safari Experiences": featured photos and videos, opening in the viewer, with a link to /gallery. */
export function GlimpseSection() {
  const featured = gallery.filter((item) => item.featured);
  return (
    <section id="glimpse" aria-labelledby="glimpse-title" className="relative overflow-hidden bg-sand-100 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal from="left" className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <HomeHeading id="glimpse-title" eyebrow={galleryIntro.eyebrow} title={galleryIntro.title} />
            <p className="mt-5 text-[1.0625rem] leading-[1.8] text-ink-700">{galleryIntro.text}</p>
          </div>
          <ButtonLink href="/gallery" size="lg" icon="arrowRight" className="shrink-0 self-start lg:self-end">
            See all {galleryCounts.photos} photos &amp; {galleryCounts.videos} videos
          </ButtonLink>
        </Reveal>
        <div className="mt-12">
          <GalleryMosaic items={featured} />
        </div>
      </div>
    </section>
  );
}
