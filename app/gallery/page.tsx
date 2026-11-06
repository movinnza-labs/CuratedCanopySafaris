import Image from "next/image";
import { GalleryBrowser } from "@/components/gallery/gallery-browser";
import { ButtonLink } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { gallery, galleryCounts, galleryIntro } from "@/lib/data/gallery";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata("/gallery", {
  title: "Safari Photos & Videos",
  description:
    "A glimpse of our real safari experiences: tiger sightings, wildlife moments and guest journeys, photographed and filmed on Curated Canopy Safaris trips.",
});

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export default function GalleryPage() {
  const cover = gallery.find((item) => item.id === "guests-in-sal-forest") ?? gallery[0]!;

  return (
    <>
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-forest-950 pt-32 pb-16 text-center sm:pt-40 sm:pb-20">
        <Image src={cover.image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950 via-forest-950/60 to-forest-950/30" />
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-5 [&_ol]:justify-center" />
          <p className="mb-3 text-xs font-bold tracking-[0.2em] text-ochre-300 uppercase">{galleryIntro.eyebrow}</p>
          <h1 id="page-title" className="mx-auto max-w-4xl text-4xl leading-tight font-semibold text-sand-50 sm:text-5xl lg:text-6xl">
            {galleryIntro.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-sand-100/85">{galleryIntro.text}</p>
          <p className="mt-6 text-sm font-semibold text-sand-200">
            {galleryCounts.photos} photos · {galleryCounts.videos} videos
          </p>
        </Container>
      </section>

      <section aria-label="Photos and videos" className="bg-sand-50 py-14 sm:py-20">
        <Container size="wide">
          <GalleryBrowser items={gallery} />
        </Container>
      </section>

      <section className="bg-sand-100 py-14 text-center sm:py-16">
        <Container>
          <h2 className="text-3xl font-semibold text-forest-900 sm:text-4xl">Create moments like these</h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-700">Join one of our weekend getaways or let us curate a safari around your dates.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/safari-packages" size="lg" icon="arrowRight">
              View safari packages
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              Plan a safari with us
            </ButtonLink>
          </div>
        </Container>
      </section>

      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
