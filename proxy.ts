import { NextResponse, type NextRequest } from "next/server";
import { resolveRedirect } from "@/lib/seo/redirects";

const PRODUCTION_HOST = "curatedcanopysafaris.com";
const PRODUCTION_ORIGIN = `https://${PRODUCTION_HOST}`;

/**
 * One-hop 301s for every old URL, trailing-slash URL and www URL, so link equity from the old WordPress site
 * passes straight to the final page (Next's own trailing-slash redirect is a 308 and would add a second hop;
 * it is turned off in next.config.ts). Any host other than the live domain (staging, previews) is noindexed.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "").split(":")[0]?.toLowerCase() ?? "";
  const isProduction = host === PRODUCTION_HOST || host === `www.${PRODUCTION_HOST}`;
  const { pathname, search } = request.nextUrl;

  let path = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;
  const target = resolveRedirect(path);
  if (target) path = target;

  if (path !== pathname || host === `www.${PRODUCTION_HOST}`) {
    const destination = isProduction ? new URL(path + search, PRODUCTION_ORIGIN) : new URL(path + search, request.nextUrl.origin);
    return NextResponse.redirect(destination, 301);
  }

  const response = NextResponse.next();
  // SITE_INDEXING=on is an escape hatch in case the host's reverse proxy ever hides the real hostname.
  if (!isProduction && process.env.SITE_INDEXING !== "on") response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/).*)"],
};
