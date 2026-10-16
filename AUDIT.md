# Content audit: curatedcanopysafaris.com → Next.js rebuild

Audited 18 September 2026. The live WordPress site was crawled page by page. Every destination, price, departure, testimonial and contact detail in the new site comes from it. Nothing was invented. Where the old site contradicted itself or showed another park's text by mistake, the change is listed below.

---

## 1. Please confirm before launch

These need a decision or a fact that only the business can supply.

| # | Item | What the new site does now |
|---|------|------------------------------|
| 1 | **Every published departure is in the past.** The latest ended on 29 June 2026. | Past dates are shown as "Departed", with no booking link. Visitors are sent to enquire about new dates. Add the new season's dates to `lib/data/packages.ts` and they get "Book now" buttons automatically. |
| 2 | **Much of the park content was hidden on the live site.** Elementor was set to hide it on desktop, tablet and mobile. On Kanha, almost the whole page was hidden; the only visible part was the "Guaranteed permits" block. Opening introductions were hidden on Bandhavgarh, Pench, Panna, Satpura, Tadoba, Dudhwa and Pilibhit. | The hidden text is the business's own park-specific writing, so it is shown. Please read each destination page and confirm you are happy to publish it. |
| 3 | **Jim Corbett durations.** All three packages say "3N/2D", but the dates (e.g. 4–6 April) are 2 nights / 3 days. | Shown exactly as published. Please correct it in `packages.ts`. |
| 4 | **Itinerary days vs departure days.** The itineraries are written Friday to Monday, but the Jim Corbett and Tadoba departures run Saturday to Monday. | Shown as published. Please align them. |
| 5 | **Vehicle occupancy.** The About text says every safari has four safarists per gypsy. The Tadoba package says six per gypsy. | Both shown as published. |
| 6 | **Two cancellation policies.** Dudhwa, Pilibhit and Kaziranga: 90% / 50% / 25% refund at 90 / 60 / 30 days. All other parks: 50% / 25% refund at 90 / 60 days. The Satpura blog post separately mentions "free date changes and cancellations up to 30 days before departure". | Each package shows the policy its old popup showed. Please confirm the policies, and edit or remove the blog sentence. |
| 7 | **Gir seasons.** The live page labelled April–June "Winter" and December–March "Summer". | The two labels are swapped back. Months and notes are unchanged. |
| 8 | **Contact form delivery.** The old form was a WordPress plugin. | Set `ENQUIRY_WEBHOOK_URL` (see README). Until then, the form turns the enquiry into a pre-filled email or WhatsApp message, so nothing is lost. |
| 9 | **Social media.** The live site's Facebook and Instagram links were unfilled placeholders (`REPLACE_WITH_YOUR_PAGE`). | Omitted. Send the real profile URLs to add them. |
| 10 | **Homepage counters.** "Tourist Visitors 20+" and "Users 20+" looked like unfinished placeholders. | Omitted. |
| 11 | **Velavadar.** It appears only as a homepage teaser. Its "Read more" link was broken, and it has no page, package or photo. | Shown as a teaser card that links to the enquiry form, with no photo. |
| 12 | **Ranthambore, 27 March departure.** Its booking link was broken (`…/undefined`). | That departure is in the past, so no link is shown. Check the Easebuzz form list for the new season. |

## 2. Removed on purpose

- **Guarantee claims.** The Kanha headings "Guaranteed Core Zone Jeep Permits" and "How We Guarantee Your Kanha Safari, From Permit to Tiger Sighting" were removed. So were these blog sentences:
  - "We track permit availability daily and secure your zone before the rush."
  - "…tigers at Satpura are not guaranteed to appear…" (it implies sightings are guaranteed elsewhere)
  - "…the Satpura jungle will give you the right sightings."
  - The Bandhavgarh "assured sightings" line.
  - The unattributed Satpura group-permit claim.
- **Unverifiable ratings.** The old structured data claimed an aggregate rating of 4.9 from 12 reviews, and attributed a review to a named guest with different wording from the page. Neither is carried over, and no star ratings are shown. Testimonials appear exactly as attributed on the site, with spelling fixes only.
- **Other parks' content on the wrong page.** Several pages still contained text from the park they were copied from. It was removed; nothing was rewritten to fit.
  - The Kanha FAQs appeared on the Bandhavgarh, Pench, Panna, Satpura, Tadoba, Ranthambore and Gir pages.
  - Bandhavgarh text appeared on Satpura and Panna.
  - On Gir, the lion paragraphs sat under the heading "Royal Bengal Tigers of Bandhavgarh". The heading was dropped; the paragraphs are kept.
  - Pench text appeared on Tadoba.
  - Kanha's zones, jeep-safari timings and best-time block appeared on Bandhavgarh, Pench, Panna and Satpura.
  - Kanha's "Also spotted" line (with its ~40,000 chital figure) appeared on Bandhavgarh, Pench and Panna.
- **A broken blog fragment.** The Panna booking post contained two fragments of the Satpura post, split mid-word ("…that tric" / "kle out…").
- **The Kanha overseas-marketing block.** Its section headings had no content; the mislabelled "Reviews from International Guests" block and the unanswered FAQs were dropped too. Its useful paragraphs on booking Kanha from overseas are kept.
- **"Photography Tour"** in the enquiry prompt. It read as a template leftover.

## 3. Corrected (wording only, no facts changed)

- **Wrong park named in a heading or intro:**
  - "How to Reach Pilibhit" on the Dudhwa page.
  - "many ways to get to Kanha" on most parks.
  - "Jeep safaris in Kanha National Park…" on Pench and Ranthambore.
- **Spelling, spacing and capitalisation:** e.g. "Tthe", "Refind", "Decemeber", "Philibit" → Pilibhit, "Ramnagr" → Ramnagar.
- **Species name:** "Palash Fish eagle" → "Pallas's Fish Eagle" on Kaziranga. Please confirm.

## 4. Left as published — please verify

| Park / post | Inconsistency |
|---|---|
| Kanha | Birds: "around 300" vs "over 300". Blackbuck listed once, nowhere else. |
| Bandhavgarh | Called "compact" and "relatively small", yet "over 1500 sq km". The listing blurb ends "…low hills etc." |
| Pench | The state is given both as Madhya Pradesh and as spanning MP and Maharashtra. The page has no best-time information (only Kanha's copy existed). "A black panther is being sighted regularly" at Mogarkasa. |
| Panna | Area "roughly 1,500" vs "over 1500" sq km. No monsoon months given. |
| Satpura | The SEO description mentions canoe rides and night safaris; the page doesn't describe night safaris. No train information. |
| Tadoba | Core zones are listed three ways: Moharli/Kolsa/Kolara; Moharli/Kolara/Navegaon; five zone cards with no Kolsa. |
| Dudhwa | Rhinos: "fifty-one" vs "a small but steadily growing population". |
| Pilibhit | Zones: "Mohof, Barhai" vs Chuka, Mala and Barahi. Winter starts in November, not October as on other parks. |
| Jim Corbett | Birds: 600+ vs 500+. Jhirna "open throughout the year" vs "park remains closed" in the monsoon. |
| Kaziranga | Area "430" vs "more than 430" sq km. "Four core zones" vs "four ranges". Summer covers only March–April. Road directions cite NH 37 (possibly an old number). |
| Ranthambore | The safari section says Jeep safaris; the packages are Canter safaris. |
| Gir | "4 districts — Junagadh, Gir, Somnath and Amreli" vs three districts in the About text (Gir Somnath is one district). Birds: ~350 vs 300–350. |
| Blog posts | Time-sensitive claims to re-check: booking windows (120 days in two posts, 90 days in the Panna post), "2026-27 bookings are now open", safari timings, fees, Wednesday closures, quota percentages. |

## 5. Old URLs → new URLs (301 redirects in `next.config.ts`)

| Old | New |
|---|---|
| `/about-us/` | `/about` |
| `/our-team/` | `/team` |
| `/contact-us/` | `/contact` |
| `/safari-packages/`, `/our-expeditions/` | `/safari-packages` |
| `/<park>/` (12 parks) | `/destinations/<park>` |
| `/<park>-schedule(s)/` (12) | `/destinations/<park>#departures` |
| `/<blog-post>/` (5) | `/blogs/<blog-post>` |
| `/privacy-policy/` | `/privacy-policy` |
| Dead homepage links (`/panna-tiger-reserve/`, `/pilibhit-the-emerging-tiger-reserve/`, `/in-the-land-of-the-lion/`, `/in-the-edens-of-kanha/`, `/in-the-grasslands-heavens-of-velavadar/`) | The matching park page, or `/contact` for Velavadar |

---

## 6. Re-audit, 16 October 2026

The live sitemaps and WordPress REST API were re-checked against the staging build (gray-porpoise-102225.hostingersite.com). The live site lists **34 pages, 7 posts, 1 category and 1 author archive**.

| Change on the live site since 18 Sep | What the new site does now |
|---|---|
| New post **Best Time to Visit Dudhwa National Park** (8 Oct) | Migrated to `/blogs/best-time-to-visit-dudhwa-national-park` with its featured image, SEO title and description, and internal links. The old URL 301-redirects. "Summer: March to June…" is an H3 like "Winter", not an H2, so the season headings are consistent. |
| **Privacy Policy rewritten** (12 Oct) | Migrated in full (sections 1–13). The live section 14 was published with unfilled `[Insert …]` placeholders and an internal "Before publishing" note. Neither is reproduced; section 14 uses the address, emails and phone the site already publishes. |
| Footer link **Custom Package Payment** (12 Oct) → Easebuzz form | Added to the footer Quick Links. It opens in a new tab. |
| `/home/` (theme demo, lorem ipsum), `/coming-soon/`, `/main-page/` | 301 → `/` |
| `/new/` (unlinked Kanha international landing-page draft, with the removed "Guaranteed permits" claims) | 301 → `/destinations/kanha-national-park`. Not rebuilt. |
| `/category/uncategorized/`, `/author/…/`, `/feed/`, `/<post>/feed/` | 301 → `/blogs` or the post |

**Blog cross-linking added.**
- Each post now ends with up to three related parks (from `relatedDestinationSlugs`), up to three related posts (posts about the same park first), and the enquiry CTA.
- Each park page with posts shows a "planning guides" section.

**Please confirm.**
- The privacy-policy registered office address and the designated grievance contact. The live draft left both blank.
- Whether the Boisar address on the Contact page is the registered office.
