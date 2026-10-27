// 301 map from the old WordPress URLs to the new site, per the "301 Redirects" tab of the Movinnza launch SEO pack
// (14 Oct 2026), plus a few older WordPress leftovers found in the original audit. Applied by proxy.ts.
// Keys and values are paths without a trailing slash; the proxy strips the slash before looking a path up.

const destinationSlugs = [
  "kanha-national-park",
  "bandhavgarh-national-park",
  "pench-national-park",
  "panna-national-park",
  "satpura-tiger-reserve",
  "tadoba-andhari-tiger-reserve",
  "dudhwa-national-park",
  "pilibhit-tiger-reserve",
  "jim-corbett-national-park",
  "kaziranga-national-park",
  "ranthambore-national-park",
  "gir-national-park",
];

// Old schedule page slug → park slug.
const scheduleSlugs: Record<string, string> = {
  "kanha-national-park-schedules": "kanha-national-park",
  "bandhavgarh-national-park-schedule": "bandhavgarh-national-park",
  "pench-national-park-schedule": "pench-national-park",
  "panna-national-park-schedule": "panna-national-park",
  "satpura-tiger-reserve-schedule": "satpura-tiger-reserve",
  "tadoba-andhari-tiger-reserve-schedule": "tadoba-andhari-tiger-reserve",
  "dudhwa-national-park-kishanpur-wildlife-sanctuary-schedules": "dudhwa-national-park",
  "pilibhit-tiger-reserve-schedule": "pilibhit-tiger-reserve",
  "jim-corbett-national-park-schedule": "jim-corbett-national-park",
  "kaziranga-national-park-schedule": "kaziranga-national-park",
  "ranthambore-national-park-schedule": "ranthambore-national-park",
  "gir-national-park-schedule": "gir-national-park",
};

// Posts that lived at the site root and now live under /blogs.
const blogSlugs = [
  "kanha-national-park-safari-open-2026",
  "how-to-book-panna-safari-online",
  "satpura-safari-booking-guide-2026",
  "best-time-to-visit-india-for-tiger-safari-month-by-month-guide",
  "best-time-for-tiger-safari-in-india-season-by-season-guide",
  "best-time-to-visit-dudhwa-national-park",
  "tadoba-safari-booking-guide",
];

export const redirectMap: Record<string, string> = {
  "/home": "/",
  "/about-us": "/about",
  "/our-team": "/team",
  "/contact-us": "/contact",
  "/our-expeditions": "/safari-packages",
  "/coming-soon": "/",
  "/new": "/",
  "/main-page": "/",
  ...Object.fromEntries(destinationSlugs.map((slug) => [`/${slug}`, `/destinations/${slug}`])),
  ...Object.fromEntries(Object.entries(scheduleSlugs).map(([from, slug]) => [`/${from}`, `/destinations/${slug}/schedule`])),
  ...Object.fromEntries(blogSlugs.map((slug) => [`/${slug}`, `/blogs/${slug}`])),
  // Duplicate Panna guide: its newer content now lives at the main URL.
  "/how-to-book-panna-safari-online-2": "/blogs/how-to-book-panna-safari-online",
  "/blogs/how-to-book-panna-safari-online-2": "/blogs/how-to-book-panna-safari-online",
  // Links on the old homepage that pointed at pages which were never published.
  "/in-the-edens-of-kanha": "/destinations/kanha-national-park",
  "/panna-tiger-reserve": "/destinations/panna-national-park",
  "/pilibhit-the-emerging-tiger-reserve": "/destinations/pilibhit-tiger-reserve",
  "/in-the-land-of-the-lion": "/destinations/gir-national-park",
  "/in-the-grasslands-heavens-of-velavadar": "/contact",
  // WordPress feeds.
  "/feed": "/blogs",
};

/** Returns where an old path should permanently redirect to, or undefined. `path` must have no trailing slash. */
export function resolveRedirect(path: string): string | undefined {
  const direct = redirectMap[path];
  if (direct) return direct;
  // WordPress category and author archives.
  if (/^\/(category|author)(\/|$)/.test(path)) return "/blogs";
  // Per-post feeds, e.g. /kanha-national-park/feed → the new home of /kanha-national-park.
  const feed = path.match(/^(\/.+)\/feed$/);
  if (feed?.[1]) return redirectMap[feed[1]] ?? feed[1];
  return undefined;
}
