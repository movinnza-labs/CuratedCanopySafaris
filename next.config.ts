import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so a lockfile elsewhere on the machine isn't mistaken for the project root.
  turbopack: { root: process.cwd() },
  // Old-URL, trailing-slash and www redirects are all 301s issued in one hop by proxy.ts (see lib/seo/redirects.ts).
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 only serves listed qualities; homepage photos use 85, the hero poster 80.
    qualities: [75, 80, 85],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
  },
};

export default nextConfig;
