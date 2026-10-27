# Curated Canopy Safaris

The website for Curated Canopy Safaris, built with Next.js (App Router), TypeScript and Tailwind CSS. All content was audited from the previous WordPress site. See [AUDIT.md](AUDIT.md) for what was preserved, what was corrected, and what still needs confirming.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                   # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint (Next.js core-web-vitals and TypeScript rules) |
| `npm run typecheck` | `tsc --noEmit` |

Requires Node.js 20.9 or later.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `SITE_INDEXING` | No | Every host except `curatedcanopysafaris.com` (staging, previews) gets `X-Robots-Tag: noindex, nofollow` from `proxy.ts`. Set to `on` only if the live site sits behind a proxy that hides the real hostname. Canonicals, the sitemap and structured data always use `https://curatedcanopysafaris.com`. |
| `ENQUIRY_WEBHOOK_URL` | Recommended | Enquiry-form submissions are POSTed here as JSON, e.g. to a Formspree, Make, Zapier or n8n webhook. If it is unset or the request fails, the visitor gets pre-filled email and WhatsApp buttons instead, so no enquiry is lost. |
| `DEPARTURES_AS_OF` | QA only | Previews schedules as of a given date (`YYYY-MM-DD`). Never set it in production. |

## Project structure

```text
app/
  page.tsx                   Home
  about/ team/ blogs/ contact/ privacy-policy/
  safari-packages/page.tsx   All destinations
  destinations/[slug]/       One page per park: overview, wildlife, zones, best time, departures, FAQs
  blogs/[slug]/              Blog posts (preserved from the old site)
  actions/enquiry.ts         Server action behind the enquiry form
  sitemap.ts, robots.ts, icon.png, apple-icon.png
components/
  layout/    Header (mobile menu), footer, logo, skip link
  sections/  Page sections: hero, about, testimonials, enquiry form, team, blog
  safari/    Destination cards, package schedule, itinerary, terms, best time, zones
  ui/        Buttons, headings, accordion, icons, image wrapper, rich text, JSON-LD
lib/
  data/      All site content, typed (see below)
  seo/       Metadata builder and structured data (JSON-LD)
public/images/  Optimised photos from the original site
```

## Editing content

All content lives in typed files under `lib/data/`. You don't need a CMS; edit the file and redeploy.

| To change… | Edit |
|---|---|
| Departure dates, prices, booking links | `lib/data/packages.ts` |
| Itineraries | `lib/data/itineraries.ts` |
| Inclusions, payment and cancellation terms | `lib/data/terms.ts` |
| A park's page text and FAQs | `lib/data/destinations/<park>.ts` |
| Contact details, legal text, navigation | `lib/data/site.ts` |
| Home/About copy, Young Naturalist, shared booking tips | `lib/data/content.ts` |
| Team, testimonials | `lib/data/team.ts`, `lib/data/testimonials.ts` |
| Blog posts | `lib/data/blog/<slug>.ts` (inline links use `[label](/path)`) |
| Photos and alt text | `public/images/…` and `lib/data/images.ts` |

**Adding a new season's departures.** Add entries to the package's `departures` array in `packages.ts`:

```ts
{ start: "2027-04-02", end: "2027-04-05", label: "2 April – 5 April 2027", duration: "3N/4D", bookingUrl: "https://forms.easebuzz.in/register/…" }
```

The site compares each `start` date with today's date in India. Future departures show a **Book now** button that opens the Easebuzz form. Past ones move under **Past departures**. Pages using this data regenerate every six hours, so dates roll over without a redeploy.

## Quality notes

- **Performance:** every page is static or ISR. Images go through `next/image` (AVIF/WebP, responsive sizes) from pre-compressed originals. Fonts load via `next/font`. Client-side JavaScript is limited to the header and the enquiry form.
- **Accessibility:**
  - Semantic landmarks, a skip link, and one `h1` per page.
  - Every image has alt text.
  - Accordions and FAQs use native `<details>`.
  - The mobile menu traps focus and closes on Escape.
  - Form errors are announced and linked to their fields.
  - Reduced-motion preferences are respected.
- **SEO:**
  - Per-page metadata with canonical URLs and Open Graph images.
  - `sitemap.xml` and `robots.txt`.
  - JSON-LD: TravelAgency, BreadcrumbList, TouristDestination, FAQPage and BlogPosting.
  - 301 redirects from every old WordPress URL.
