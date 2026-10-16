# Homepage rebuild — audit & preservation checklist

Source of truth: https://curatedcanopysafaris.com/ (inspected 18 Sep 2026 on desktop 1440px and mobile 390px, DOM + live rendering).
**Content rule:** every visible word is copied verbatim, including the site's own spelling and punctuation. No text, logos, reviews, prices or claims were added.

## 1. What the live homepage contains (in order)

| # | Section | Interactions on the live site |
|---|---|---|
| 1 | **Header**: logo, menu (Home, About Us, Safari Packages, Our Team, Blogs, Contact Us), "Reach Us" button | Links; mobile hamburger menu |
| 2 | **Hero**: background video (`IMG_0170.mp4`, 50% dark overlay), logo, "We curate, you discover.", "Exclusive Safari Destinations, curated just for you", download-arrow button | Video autoplays muted and looped (also on mobile); button scrolls to `#aboutus`; entrance animations |
| 3 | **About us**: "about us" / "Curated Wildlife Experiences" / "Curated Wildlife Safaris", 4 paragraphs (one bold sentence), raptor photo | Scroll animations |
| 4 | **Young Naturalist Programme**: heading, intro, 2 paragraphs (email link), "Read more" → About Us, tiger and shrike photos | Links |
| 5 | **Our Journey in the Wild**: "What sets us apart", counters "Tourist Visitors" and "Users" | Counters animate 20 → 200+ and 20 → 120+ over 3 s |
| 6 | **Why Choose Curated Canopy Safaris?**: 3 paragraphs on a brown panel, chital photo | Slide-in animations |
| 7 | **Custom - Designed Expeditions**: 3 paragraphs, bold "Who Can Choose…" and 6-item list, closing line, eagle photo | Scroll animations |
| 8 | **Let Us Know** (form 1): intro, bold note, fields Full Name*, Phone Number* (number), Email*, Message (optional), Submit; stork and Kanha photos | Validation: "This field is required." / "Please enter a valid email address." / "Please enter a valid number."; "Sending..." while submitting |
| 9 | **Our Upcoming Expeditions**: "A curated selection of our finest wildlife Destinations" and 12 park cards (thumbnail, title, description, second photo, Read More, Book Now) | Links to park and schedule pages |
| 10 | **Testimonials**: "Trusted by many, proven by results"; 5 reviews (name, photo, 5 stars, text, quote icon) | Auto-playing slider, pauses on hover |
| 11 | **Let Us Know** (form 2): same as #8 | Same as #8 |
| 12 | **Footer**: Pugmark Safaris logo, 2 company lines, Quick Links (Home, About Us, Our Expeditions, Our Team, Contact Us, Privacy Policy), Get In Touch (phone, 2 emails), Share on Facebook / Twitter, Google Map, terms, GSTIN, © line with Movinnza credit | Links, share pop-ups, map |
| 13 | **"🌿 Ask Us" Safari Assistant**: floating tab (bottom pill on mobile) | Chat panel queries `/wp-json/ccs/v1/ask` |

**Not visible on the live site, so not rebuilt:**
- A hidden block (Terai Haven / Panna / Pilibhit / Velavadar / Gir / Tadoba teasers). It is set to hidden on desktop, tablet and mobile.
- The inclusions and itinerary pop-ups. Only schedule pages open them; the homepage never does.
- There is **no trusted-brands / partner-logo section** on the live homepage. The only logos are Curated Canopy Safaris (header, hero) and Pugmark Safaris (footer), both shown in full colour.

## 2. Component structure

```text
app/page.tsx                       Homepage: sections in the live order
app/api/ask/route.ts               Forwards "Ask Us" queries to the live WordPress endpoint (it has no CORS)
app/actions/home-enquiry.ts        Server action for both "Let Us Know" forms
lib/data/home.ts                   ALL homepage text, verbatim, plus links
lib/data/home-images.ts            Image registry (source URL, size, alt)
components/layout/                 site-header, site-footer, share-buttons, ask-us-widget, logo
components/home/                   hero-section, hero-video, about-section, young-naturalist-section,
                                   journey-section, why-choose-section, custom-expeditions-section,
                                   let-us-know-section, let-us-know-form, expeditions-section,
                                   expedition-card, testimonials-section, testimonial-carousel, home-heading
components/ui/                     reveal (scroll animations), count-up, home-image, inline-text
public/images/home/, public/media/ Photos and hero video
```

## 3. Preservation checklist

- [x] Header: same logo (full colour), same six menu items in the same order, "Reach Us" → Contact Us. It now starts transparent over the video and turns solid on scroll, and it stays fixed at the top.
- [x] Mobile menu: same six items plus Reach Us. It uses the live site's four-line menu symbol, closes on Escape or navigation, and traps keyboard focus while open.
- [x] Hero: same video (re-encoded 134.7 MB → 12.3 MB for 1080p and 5.7 MB for 720p, same footage), autoplays muted and looped on desktop and mobile. Same logo, both headings, and the same download-arrow button scrolling to About us.
- [x] About us: all 4 paragraphs verbatim, with the bold sentence kept bold; same raptor photo.
- [x] Young Naturalist Programme: text verbatim, working email link, "Read more" → About Us; same tiger and shrike photos.
- [x] Our Journey in the Wild: both counters, animating 20 → 200+ and 20 → 120+ over 3 s like the live site.
- [x] Why Choose: 3 paragraphs verbatim on a brown panel over the same chital photo.
- [x] Custom - Designed Expeditions: text, bold heading, all 6 bullet items and closing line verbatim; same eagle photo.
- [x] Let Us Know ×2: same labels, order, required fields, "Submit" / "Sending..." and the same three validation messages. The live form's hidden anti-spam field is replaced with an equivalent hidden field.
- [x] Our Upcoming Expeditions: all 12 parks in order, with the same titles, descriptions, both photos per card, and Read More / Book Now each going to the same destination.
- [x] Testimonials: all 5 reviews verbatim, with names, photos and **5-star ratings**. Auto-play, pause on hover or focus, plus a pause button, previous/next, a photo rail, swipe and arrow keys.
- [x] Footer: every line verbatim, same links, phone and email, Share on Facebook / Share on Twitter (with the same bird symbol), the same Google Map location, terms, GSTIN, and the © / Movinnza credit.
- [x] Ask Us assistant: same button text, title, greeting, placeholder, "Send", "Searching…", and the same answer formats (FAQ, park list, tour cards) and error text.
- [x] Symbols match the live site: download arrow, phone, envelope, Facebook, Twitter bird, quote mark, stars, four-line menu. No new icons were added to the content.
- [x] Tested: 22/22 interaction checks pass. The page was verified at 1440 / 820 / 390 px with no sideways scrolling, one `h1`, and alt text on every image.

## 4. Changes you should know about (all non-content)

- **Link targets:** links point to this app's routes (e.g. `/about` instead of `/about-us/`). Every old URL 301-redirects to the same page.
  - The live Kanha thumbnail links to `/in-the-edens-of-kanha/`, which returns **404**. Here it opens the Kanha page.
  - The Ranthambore card image and title link to the schedule, exactly as on the live site.
- **Images:** the largest size the server has is **1600px wide**, so there are no UHD versions to use. Photos are served at native resolution (AVIF/WebP, quality 85) and never upscaled. For true UHD, send the original camera files.
- **Alt text:** follows the live site. Alt text that was just a filename (e.g. "chital-stag-and-fawn-kanha-NP.jpg", "crouching tigress-k") was cleaned up. The Pench card photo keeps the live alt text "Pilibhit Tiger Reserve".
- **Header order:** matches the live site (your latest instruction), not the earlier Home / About Us / Contact Us-first order.

## 5. Needs your confirmation

1. **Form thank-you message.** The live form's confirmation text can only be seen by sending a real enquiry, so the WordPress default "Thanks for contacting us! We will be in touch with you shortly." is used. Tell me the real wording if it differs.
2. **Form delivery.** Set `ENQUIRY_WEBHOOK_URL` so enquiries are delivered automatically. Until then, the form hands the enquiry over as a pre-filled email or WhatsApp message.
3. **Ask Us** answers come from the live WordPress site (`/wp-json/ccs/v1/ask`). They stop working if that site is switched off, unless the data is migrated.
4. **Analytics.** The live site loads Google Analytics `G-XVZ7EY4R9S`. It is not included locally; say if it should go in before launch.

## 6. Run locally

```bash
cd "C:\Users\HP\Desktop\Curated Cano"
npm install
npm run dev          # http://localhost:3000
# production check:
npm run build && npm start
```

Nothing has been published or deployed.
