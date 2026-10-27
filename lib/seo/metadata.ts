import type { Metadata } from "next";
import { images, type ImageKey } from "@/lib/data/images";
import { site } from "@/lib/data/site";
import { pageSeo } from "./page-seo";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL. */
  path: string;
  imageKey?: ImageKey;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Use the title exactly as given instead of appending the site name. */
  absoluteTitle?: boolean;
};

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

export function buildMetadata({
  title,
  description,
  path,
  imageKey = "heroTigerAtPool",
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const image = images[imageKey];
  const ogImage = { url: image.src, width: image.width, height: image.height, alt: image.alt };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title,
      description,
      images: [ogImage],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.src],
    },
  };
}

/**
 * Metadata for a page covered by the launch SEO pack (lib/seo/page-seo.ts): its title (used as-is),
 * description and canonical. Pages the pack doesn't cover use `fallback`.
 */
export function pageMetadata(path: string, fallback: Omit<PageMetadataInput, "path">): Metadata {
  const seo = pageSeo[path];
  return buildMetadata({
    ...fallback,
    path,
    ...(seo ? { title: seo.title, description: seo.description, absoluteTitle: true } : {}),
  });
}

/** The page's H1 from the launch SEO pack, or `fallback` when the pack doesn't cover it. */
export function pageH1(path: string, fallback: string): string {
  return pageSeo[path]?.h1 ?? fallback;
}
