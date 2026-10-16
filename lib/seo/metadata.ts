import type { Metadata } from "next";
import { images, type ImageKey } from "@/lib/data/images";
import { site } from "@/lib/data/site";

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
