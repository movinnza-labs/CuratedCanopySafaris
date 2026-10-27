import { BlogCard } from "@/components/sections/blog-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { blogPosts } from "@/lib/data/blog";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blogs" },
];

export const metadata = pageMetadata("/blogs", {
  title: "Safari Blogs & Planning Guides",
  description:
    "Tiger safari planning guides from Curated Canopy Safaris — the best time for a tiger safari in India, park-by-park booking guides, and season updates.",
  imageKey: "blogBestTimeMonth",
});

export default function BlogsPage() {
  const [featured, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        title={pageH1("/blogs", "Blogs")}
        eyebrow="Field notes & guides"
        intro="Planning guides and season updates for India’s tiger reserves."
        imageKey="heroTigerDrinking"
        breadcrumbs={breadcrumbs}
      />
      <section aria-label="Articles" className="py-20 sm:py-24">
        <Container>
          {featured ? <BlogCard post={featured} featured /> : null}
          {rest.length > 0 ? (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug}>
                  <BlogCard post={post} />
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </section>
      <CtaBanner />
      <JsonLd data={pageJsonLd("/blogs") ?? breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
