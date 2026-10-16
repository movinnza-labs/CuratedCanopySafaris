import type { NextConfig } from "next";

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

// Old WordPress schedule URLs → the new per-park schedule page.
const scheduleRedirects: Record<string, string> = {
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

const blogSlugs = [
  "kanha-national-park-safari-open-2026",
  "how-to-book-panna-safari-online",
  "how-to-book-panna-safari-online-2",
  "satpura-safari-booking-guide-2026",
  "best-time-to-visit-india-for-tiger-safari-month-by-month-guide",
  "best-time-for-tiger-safari-in-india-season-by-season-guide",
  "best-time-to-visit-dudhwa-national-park",
  "tadoba-safari-booking-guide",
];

const nextConfig: NextConfig = {
  // Pin the workspace root so a lockfile elsewhere on the machine isn't mistaken for the project root.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves listed qualities; homepage photos use 85, the hero poster 80.
    qualities: [75, 80, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/our-team", destination: "/team", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/our-expeditions", destination: "/safari-packages", permanent: true },
      ...destinationSlugs.map((slug) => ({ source: `/${slug}`, destination: `/destinations/${slug}`, permanent: true })),
      ...Object.entries(scheduleRedirects).map(([from, slug]) => ({
        source: `/${from}`,
        destination: `/destinations/${slug}/schedule`,
        permanent: true,
      })),
      ...blogSlugs.map((slug) => ({ source: `/${slug}`, destination: `/blogs/${slug}`, permanent: true })),
      // Links on the old homepage that pointed at pages which were never published.
      { source: "/in-the-edens-of-kanha", destination: "/destinations/kanha-national-park", permanent: true },
      { source: "/panna-tiger-reserve", destination: "/destinations/panna-national-park", permanent: true },
      { source: "/pilibhit-the-emerging-tiger-reserve", destination: "/destinations/pilibhit-tiger-reserve", permanent: true },
      { source: "/in-the-land-of-the-lion", destination: "/destinations/gir-national-park", permanent: true },
      { source: "/in-the-grasslands-heavens-of-velavadar", destination: "/contact", permanent: true },
      // WordPress leftovers: theme demo page, coming-soon page, unlinked Kanha landing draft, archives and feeds.
      { source: "/home", destination: "/", permanent: true },
      { source: "/main-page", destination: "/", permanent: true },
      { source: "/coming-soon", destination: "/", permanent: true },
      { source: "/new", destination: "/destinations/kanha-national-park", permanent: true },
      { source: "/category/:path*", destination: "/blogs", permanent: true },
      { source: "/author/:path*", destination: "/blogs", permanent: true },
      { source: "/feed", destination: "/blogs", permanent: true },
      { source: "/:slug/feed", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
