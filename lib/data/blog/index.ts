import type { BlogPost } from "../types";
import { bestTimeMonthByMonth } from "./best-time-to-visit-india-for-tiger-safari-month-by-month-guide";
import { bestTimeSeasonBySeason } from "./best-time-for-tiger-safari-in-india-season-by-season-guide";
import { bestTimeToVisitDudhwa } from "./best-time-to-visit-dudhwa-national-park";
import { howToBookPannaSafariOnline } from "./how-to-book-panna-safari-online";
import { pannaSafariBookingGuide2026 } from "./how-to-book-panna-safari-online-2";
import { kanhaSafariOpen2026 } from "./kanha-national-park-safari-open-2026";
import { satpuraSafariBookingGuide2026 } from "./satpura-safari-booking-guide-2026";
import { tadobaSafariBookingGuide } from "./tadoba-safari-booking-guide";

/** Newest first. */
export const blogPosts: BlogPost[] = [
  tadobaSafariBookingGuide,
  bestTimeToVisitDudhwa,
  pannaSafariBookingGuide2026,
  kanhaSafariOpen2026,
  howToBookPannaSafariOnline,
  satpuraSafariBookingGuide2026,
  bestTimeMonthByMonth,
  bestTimeSeasonBySeason,
].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Posts that cover a destination, newest first. */
export function getPostsForDestination(destinationSlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.relatedDestinationSlugs?.includes(destinationSlug));
}

/** Other posts, those sharing a destination with `post` first, then the newest. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const parks = new Set(post.relatedDestinationSlugs ?? []);
  const shared = (other: BlogPost) => (other.relatedDestinationSlugs ?? []).filter((slug) => parks.has(slug)).length;
  return blogPosts
    .filter((other) => other.slug !== post.slug)
    .map((other, index) => ({ other, score: shared(other), index }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ other }) => other);
}
