import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DestinationGrid } from "@/components/safari/destination-grid";
import { BlogBody } from "@/components/sections/blog-body";
import { BlogCard } from "@/components/sections/blog-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogPosts, getBlogPost, getRelatedPosts } from "@/lib/data/blog";
import { getDestination } from "@/lib/data/destinations";
import type { Destination } from "@/lib/data/types";
import { images } from "@/lib/data/images";
import { blogPostingJsonLd, breadcrumbJsonLd, faqJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return pageMetadata(`/blogs/${post.slug}`, {
    title: post.seo.title,
    // Post SEO titles are already near Google's ~60-character limit; the site-name suffix would get cut off.
    absoluteTitle: true,
    description: post.seo.description,
    imageKey: isImageKey(post.imageKey) ? post.imageKey : undefined,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: post.title, path: `/blogs/${post.slug}` },
  ];
  const imageKey = isImageKey(post.imageKey) ? post.imageKey : "pageHeader";
  const relatedParks = (post.relatedDestinationSlugs ?? [])
    .map(getDestination)
    .filter((destination): destination is Destination => Boolean(destination))
    .slice(0, 3);
  const relatedPosts = getRelatedPosts(post);
  const faqs = post.body.flatMap((block) => (block.type === "faq" ? block.items : []));
  const suppliedJsonLd = pageJsonLd(`/blogs/${post.slug}`);

  return (
    <>
      {/* Dark band sits behind the transparent site header; the feature image overlaps its lower edge. */}
      <div className="bg-forest-950 pt-24 pb-20 text-sand-50 sm:pt-28 sm:pb-28 lg:pb-36">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-sm text-sand-100/70">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.updatedAt && post.updatedAt !== post.publishedAt ? (
              <>
                {" · "}Updated <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
              </>
            ) : null}
          </p>
        </Container>
      </div>

      <div className="pb-20">
        <Container>
          <div className="-mt-14 overflow-hidden rounded-2xl shadow-lift sm:-mt-20 sm:rounded-3xl lg:-mt-28">
            <SafariImage imageKey={imageKey} priority sizes="(min-width: 1280px) 1216px, 100vw" className="h-auto w-full" />
          </div>

          {/* Single column under the full-width image, inset like the live site's 50px article padding. */}
          <article className="mt-10 sm:mt-12 lg:px-12">
            <header>
              <h1 className="text-3xl leading-tight font-semibold text-forest-900 sm:text-4xl lg:text-5xl">
                {pageH1(`/blogs/${post.slug}`, post.title)}
              </h1>
              {post.subtitle ? (
                <p className="mt-4 text-lg leading-snug font-semibold text-ink-700 sm:text-xl">{post.subtitle}</p>
              ) : null}
            </header>
            <div className="mt-8">
              <BlogBody blocks={post.body} />
            </div>
          </article>
        </Container>
      </div>

      {relatedParks.length > 0 ? (
        <section aria-labelledby="related-parks-title" className="bg-sand-100 py-20 sm:py-24">
          <Container>
            <SectionHeading
              id="related-parks-title"
              eyebrow="Plan the trip"
              title={relatedParks.length === 1 ? "The park in this guide" : "Parks in this guide"}
            />
            <div className="mt-10">
              <DestinationGrid destinations={relatedParks} />
            </div>
          </Container>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section aria-labelledby="related-posts-title" className="py-20 sm:py-24">
          <Container>
            <SectionHeading id="related-posts-title" eyebrow="Keep reading" title="More safari guides" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <BlogCard post={related} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <CtaBanner />

      <JsonLd
        data={[
          ...(suppliedJsonLd ? [suppliedJsonLd] : [breadcrumbJsonLd(breadcrumbs), blogPostingJsonLd(post, images[imageKey].src)]),
          // The SEO pack has no FAQ markup for posts; the in-article FAQ blocks supply it.
          ...(faqs.length ? [faqJsonLd(faqs)] : []),
        ]}
      />
    </>
  );
}
