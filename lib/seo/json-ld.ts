import { images } from "@/lib/data/images";
import { site } from "@/lib/data/site";
import type { BlogPost, Destination, Faq } from "@/lib/data/types";
import { absoluteUrl } from "./metadata";

type JsonLd = Record<string, unknown>;

const organizationId = `${site.url}/#organization`;

/**
 * Organisation facts only — deliberately no aggregateRating or review markup:
 * the original site's rating figures could not be verified.
 */
export function organizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl(images.logo.src),
    image: absoluteUrl(images.heroTigerAtPool.src),
    description: site.description,
    telephone: "+91-9172036513",
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "No 3, Chandan Apartment, Dhodipuja, Navapur Road, Boisar (W)",
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    areaServed: { "@type": "Country", name: "India" },
    parentOrganization: { "@type": "Organization", name: site.legal.parentCompany },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+91-9172036513",
      email: site.contact.email,
    },
  };
}

export function websiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": organizationId },
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Drops the `[label](href)` and `**bold**` markup used in data files, keeping the visible text. */
function plainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\s*\n\s*/g, " ");
}

export function faqJsonLd(faqs: Faq[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: plainText(faq.answer) },
    })),
  };
}

export function destinationJsonLd(destination: Destination, imageSrc: string): JsonLd {
  const place = destination.schema?.place;
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: place?.description ?? destination.summary,
    url: absoluteUrl(`/destinations/${destination.slug}`),
    image: absoluteUrl(imageSrc),
    ...(place
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: place.locality,
            addressRegion: place.region,
            addressCountry: "IN",
          },
          geo: { "@type": "GeoCoordinates", latitude: place.latitude, longitude: place.longitude },
        }
      : {}),
    containedInPlace: { "@type": "State", name: destination.state, containedInPlace: { "@type": "Country", name: "India" } },
  };
}

export function serviceJsonLd(destination: Destination): JsonLd | null {
  const service = destination.schema?.service;
  if (!service) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.serviceType ?? ["Wildlife safari booking", "Permit processing", "Naturalist-guided tours"],
    provider: { "@type": "TravelAgency", "@id": organizationId, name: site.name, url: site.url },
    areaServed: service.areaServed.map((name) => ({ "@type": "Country", name })),
    url: absoluteUrl(`/destinations/${destination.slug}`),
    description: service.description,
  };
}

export function blogPostingJsonLd(post: BlogPost, imageSrc: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seo.description,
    image: absoluteUrl(imageSrc),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: absoluteUrl(`/blogs/${post.slug}`),
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  };
}
