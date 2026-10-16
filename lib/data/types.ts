export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ContentSection = {
  heading: string;
  paragraphs: string[];
};

export type NamedItem = {
  name: string;
  description: string;
};

export type Season = {
  name: "Winter" | "Summer" | "Monsoon";
  months: string;
  notes: string[];
};

export type Faq = {
  question: string;
  answer: string;
};

/** Text in paragraphs, items and table cells may contain inline links as `[label](href)` and `**bold**`. */
export type BookingBlock = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  table?: { head: string[]; rows: string[][] };
  /** Paragraphs shown after the items/table. */
  closing?: string[];
};

export type BookingSection = BookingBlock & { subsections?: BookingBlock[] };

export type Destination = {
  slug: string;
  /** Full park name, e.g. "Kanha National Park". */
  name: string;
  /** Page H1 when it should differ from `name`. */
  pageTitle?: string;
  /** Hero text when it should differ from `summary` (the card blurb). */
  heroIntro?: string;
  /** Short label used in navigation and cards, e.g. "Kanha". */
  shortName: string;
  /** Indian state(s) the park lies in, as stated on the original site. */
  state: string;
  /** Optional strapline used on the original site, e.g. "The Terai Haven". */
  tagline?: string;
  /** Card blurb used on the Safari Packages listing (verbatim from the original site). */
  summary: string;
  seo: { title: string; description: string };
  /** Keys into `images` from lib/data/images.ts. First is the hero. */
  imageKeys: string[];
  /** Opening narrative sections at the top of the destination page. */
  intro: ContentSection[];
  about?: ContentSection;
  wildlife?: {
    heading: string;
    paragraphs: string[];
    highlights?: string[];
  };
  zones?: {
    heading: string;
    intro?: string;
    items: NamedItem[];
  };
  safariExperience?: {
    heading: string;
    intro?: string;
    items: NamedItem[];
  };
  bestTime?: Season[];
  howToReach?: {
    intro?: string;
    byAir?: string;
    byTrain?: string;
    byRoad?: string;
  };
  /** Booking-service copy for international travellers, shown after the overview. */
  booking?: BookingSection[];
  /** Closing call to action, shown after the FAQs. */
  cta?: { heading: string; text?: string };
  /** FAQ section title; defaults to "Frequently asked questions". */
  faqHeading?: string;
  /** Answers may contain `[label](href)` links and blank-line paragraph breaks; both are flattened in structured data. */
  faqs?: Faq[];
  /** Extra structured data for the page (Service and Place details). */
  schema?: {
    service?: { name: string; description: string; areaServed: string[]; serviceType?: string[] };
    place?: { description: string; locality: string; region: string; latitude: number; longitude: number };
  };
};

export type Itinerary = {
  id: string;
  title: string;
  subtitle?: string;
  days: { label: string; description: string }[];
};

export type TermsPolicy = {
  id: string;
  included: string[];
  notIncluded: string[];
  payment: string[];
  cancellation: string[];
};

export type Departure = {
  /** ISO date (YYYY-MM-DD) of the first day. */
  start: string;
  /** ISO date (YYYY-MM-DD) of the last day. */
  end: string;
  /** Date range as published, e.g. "1 May – 4 May 2026". */
  label: string;
  /** Duration as published, e.g. "3N/4D". */
  duration: string;
  /** Payment/registration form for this departure, as linked on the original site. */
  bookingUrl?: string;
};

export type SafariPackage = {
  id: string;
  destinationSlug: string;
  /** Package name where the original site gave one (e.g. "Canter Safaris – Ramganga Tigers"). */
  title?: string;
  /** Safari count / vehicle occupancy line, e.g. "5 Safaris (4 safarists per gypsy)". */
  safaris: string;
  /** Extra detail lines shown with each departure, e.g. how safaris split across parks. */
  details?: string[];
  price: { amount: number; currency: "INR"; display: string };
  itineraryId: string;
  termsId: string;
  /** Logistics notes as published, e.g. group tour pickup points. */
  notes: string[];
  departures: Departure[];
};

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageKey: string;
};

export type Testimonial = {
  id: string;
  author: string;
  location?: string;
  quote: string[];
  imageKey: string;
  /** Park the guest visited, where the testimonial names it. */
  destinationSlug?: string;
};

/** Text in paragraphs, list items, callouts and table cells may contain inline links as `[label](href)`. */
export type BlogBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "callout"; title?: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  /** Bold line shown under the title, as on the live post. */
  subtitle?: string;
  excerpt: string;
  seo: { title: string; description: string };
  imageKey: string;
  /** ISO date the post was published on the original site. */
  publishedAt: string;
  /** ISO date the post was last modified on the original site, if known. */
  updatedAt?: string;
  relatedDestinationSlugs?: string[];
  body: BlogBlock[];
};
