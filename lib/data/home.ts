// Homepage content, transcribed verbatim from https://curatedcanopysafaris.com/ (audited 18 Sep 2026).
// Wording, spelling and punctuation are intentionally left exactly as published. Only surrounding whitespace
// was trimmed. Links point to this app's routes; every original WordPress URL 301-redirects to the same page.
import type { HomeImageKey } from "./home-images";

/** A run of inline text: plain, bold, or a link. */
export type Inline = string | { strong: string } | { text: string; href: string };
export type RichBlock = { p: Inline[] } | { ul: string[] } | { spacer: true };

// Same items and order as the live site's header menu.
export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Safari Packages", href: "/safari-packages" },
  { label: "Our Team", href: "/team" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const reachUs = { label: "Reach Us", href: "/contact" } as const;

export const hero = {
  videoMp4: "/media/hero-1080.mp4",
  videoMp4Small: "/media/hero-720.mp4",
  poster: "/media/hero-poster.jpg",
  title: "We curate, you discover.",
  subtitle: "Exclusive Safari Destinations, curated just for you",
  scrollTarget: "#aboutus",
} as const;

export const about = {
  anchorId: "aboutus",
  eyebrow: "about us",
  kicker: "Curated Wildlife Experiences",
  title: "Curated Wildlife Safaris",
  body: [
    { p: ["Traditionally, wildlife safaris have been perceived as expensive and out of reach for many."] },
    {
      p: [
        { strong: "This platform was created with a simple purpose: to make safari experiences more affordable, accessible, and thoughtfully designed for all. " },
        "They are economically priced,but we have chosen good resorts for the guests with all facilities required for a comfortable and happy stay. Although the safari vehicles can seat six,we have curated all safaris with four safarists in the gypsy,so that the experience is more comfortable for the guests.",
      ],
    },
    { p: ["Alongside value-driven experiences, we also curate mid-range and luxury wildlife expeditions for guests from India and around the world—each planned with care, comfort, and genuine expertise."] },
    { p: ["Our larger vision is to encourage more people to explore India’s tiger strongholds and diverse wildlife landscapes, fostering awareness, appreciation, and a deeper connection with nature. By enabling meaningful encounters with the wild, we hope to celebrate—and help preserve—India’s rich and extraordinary wildlife heritage."] },
  ] satisfies RichBlock[],
  imageKey: "aboutRaptor" as HomeImageKey,
};

export const youngNaturalist = {
  title: "Young Naturalist Programme",
  intro: "We encourage youngsters to visit national parks, so that they develop a love and affinity towards nature and wildlife.",
  body: [
    { p: ["They are the custodians of the future, whose love for nature will go a long way in protecting, conserving and developing the critical wildlife areas."] },
    {
      p: [
        "All students, upto graduation, get a 10% discount on all our expeditions. Students can mail us at ",
        { text: "enquiries@curatedcanopysafaris.com", href: "mailto:enquiries@curatedcanopysafaris.com" },
        " or call/whatsapp on our number, with school/college ID card to avail the benefit.",
      ],
    },
  ] satisfies RichBlock[],
  button: { label: "Read more", href: "/about" },
  mainImageKey: "ynTiger" as HomeImageKey,
  secondaryImageKey: "ynShrike" as HomeImageKey,
};

export const journey = {
  eyebrow: "What sets us apart",
  title: "Our Journey in the Wild",
  // The live counters animate from 20 to their end value over 3 seconds.
  counters: [
    { label: "Tourist Visitors", start: 20, end: 200, suffix: "+", durationMs: 3000 },
    { label: "Users", start: 20, end: 120, suffix: "+", durationMs: 3000 },
  ],
};

export const whyChoose = {
  title: "Why Choose Curated Canopy Safaris?",
  // One paragraph with line breaks on the live site.
  lines: [
    "At Curated Canopy Safaris, the jungle is our second home. Our experienced Gypsy drivers and certified naturalist guides have an intimate understanding of forest life. They read tiger pugmarks, interpret jungle sounds, and recognise the alarm calls of chital, barking deer, and langurs—skills that help them track the king of the forest with precision. Our teams also stay updated with the latest wildlife movements and sightings.",
    "While the tiger may be the star, we believe the true magic of the jungle lies in everything that surrounds it. From graceful deer and elusive mongooses to vibrant birdlife and countless other forest denizens, we ensure you experience the wilderness in its entirety, making every safari immersive and memorable.",
    "Beyond the safaris, we pay close attention to your comfort throughout your stay. Thoughtful arrangements, seamless logistics, and a deep understanding of what travellers need in the wild allow us to create a safari experience that feels effortless, enriching, and truly enchanting.",
  ],
  imageKey: "whyChital" as HomeImageKey,
};

export const customExpeditions = {
  title: "Custom - Designed Expeditions",
  body: [
    { p: ["We specialise in curating bespoke wildlife expeditions, thoughtfully designed around your preferred dates, interests, and choice of national parks or wildlife habitats."] },
    { p: ["Our itineraries can seamlessly include multiple national parks within a single expedition—such as Kanha and Bandhavgarh, Dudhwa and Pilibhit, or other carefully paired landscapes."] },
    { p: ["For those seeking a richer experience, we also offer the option to combine wildlife journeys with cultural explorations, creating a well-balanced and immersive travel narrative."] },
  ] satisfies RichBlock[],
  audienceTitle: "Who Can Choose a Custom-Designed Expedition",
  audiences: ["Individual travellers", "Private groups", "Families", "International guests", "Corporate groups", "Educational institutions"],
  closing: "Each expedition is planned with attention to detail, ensuring comfort, authenticity, and meaningful experiences in the wild.",
  imageKey: "customEagle" as HomeImageKey,
};

export const letUsKnow = {
  title: "Let Us Know",
  intro: "Let us know your destination and preferred dates of the Photography Tour.",
  note: "Our team will get in touch with you very soon.",
  imageKeys: ["enquiryStork", "enquiryKanha"] as HomeImageKey[],
  // Field labels, order and required flags as on the live WPForms form (#1921). The live form's fifth
  // field is a WPForms anti-spam honeypot, hidden from visitors, so it is not shown here either.
  fields: {
    name: "Full Name",
    phone: "Phone Number",
    email: "Email",
    message: "Message (optional)",
  },
  submit: "Submit",
  submitting: "Sending...",
  // Validation messages used by the live form (WPForms settings).
  messages: {
    required: "This field is required.",
    email: "Please enter a valid email address.",
    number: "Please enter a valid number.",
  },
};

export const expeditionsIntro = {
  eyebrow: "Our Upcoming Expeditions",
  title: "A curated selection of our finest wildlife Destinations",
};

export type Expedition = {
  slug: string;
  title: string;
  description: string;
  thumbKey: HomeImageKey;
  /** Only the Kanha thumbnail is linked on the live site. */
  thumbHref?: string;
  boxKey: HomeImageKey;
  /** Where the image-box picture and title link to. */
  titleHref: string;
  readMoreHref: string;
  bookNowHref: string;
};

const park = (slug: string) => `/destinations/${slug}`;
const schedule = (slug: string) => `/destinations/${slug}/schedule`;

export const expeditions: Expedition[] = [
  {
    slug: "kanha-national-park",
    title: "Kanha National Park",
    description:
      "Kanha National Park, located in the Mandla and Balaghat districts of Madhya Pradesh, spans nearly 2,000 square kilometres—of which about 940 square kilometres form the core area, surrounded by a buffer of over 1,000 square kilometres. It is an eden beyond compare.",
    thumbKey: "kanhaThumb",
    // Live link: /in-the-edens-of-kanha/ (a page that returns 404). It redirects to the Kanha page here.
    thumbHref: park("kanha-national-park"),
    boxKey: "kanhaBox",
    titleHref: park("kanha-national-park"),
    readMoreHref: park("kanha-national-park"),
    bookNowHref: schedule("kanha-national-park"),
  },
  {
    slug: "bandhavgarh-national-park",
    title: "Bandhavgarh National Park",
    description:
      "Bandhavgarh National Park, located in the Umaria district of Madhya Pradesh, is a compact reserve with an outsized presence. Spread over 1500 sq km, across a rugged terrain of low hills etc.",
    thumbKey: "bandhavgarhThumb",
    boxKey: "bandhavgarhBox",
    titleHref: park("bandhavgarh-national-park"),
    readMoreHref: park("bandhavgarh-national-park"),
    bookNowHref: schedule("bandhavgarh-national-park"),
  },
  {
    slug: "pench-national-park",
    title: "Pench National Park",
    description:
      "Pench National Park, located in the southern reaches of Madhya Pradesh along the Maharashtra border, forms part of a larger protected landscape shaped by the Pench River.",
    thumbKey: "penchThumb",
    boxKey: "penchBox",
    titleHref: park("pench-national-park"),
    readMoreHref: park("pench-national-park"),
    bookNowHref: schedule("pench-national-park"),
  },
  {
    slug: "panna-national-park",
    title: "Panna national Park",
    description:
      "Panna National Park, nestled in the Vindhyan ranges of Madhya Pradesh,  is a landscape where wilderness unfolds in dramatic contrast.The two core zones are Hinouta and Madla.",
    thumbKey: "pannaThumb",
    boxKey: "pannaBox",
    titleHref: park("panna-national-park"),
    readMoreHref: park("panna-national-park"),
    bookNowHref: schedule("panna-national-park"),
  },
  {
    slug: "satpura-tiger-reserve",
    title: "Satpura Tiger Reserve",
    description:
      "Tucked within the rugged Satpura Range, Satpura Tiger Reserve unfolds across the Narmadapuram (Hoshangabad) and Betul districts of Madhya Pradesh, spanning more than 2,100 square kilometres of raw, untamed wilderness.",
    thumbKey: "satpuraThumb",
    boxKey: "satpuraBox",
    titleHref: park("satpura-tiger-reserve"),
    readMoreHref: park("satpura-tiger-reserve"),
    bookNowHref: schedule("satpura-tiger-reserve"),
  },
  {
    slug: "tadoba-andhari-tiger-reserve",
    title: "Tadoba Andhari Tiger Reserve",
    description:
      "Tadoba Andhari Tiger Reserve,spread over 1700 sq km,having three main core zones-Moharli,Kolsa and Kolara.It carries the weight of age. This is an old forest, one that feels settled into its land in eastern Maharashtra. The air is dry, the light is sharp, and the forest floor lies bare for much of the year, revealing tracks, movement, and signs that are often hidden elsewhere.",
    thumbKey: "tadobaThumb",
    boxKey: "tadobaBox",
    titleHref: park("tadoba-andhari-tiger-reserve"),
    readMoreHref: park("tadoba-andhari-tiger-reserve"),
    bookNowHref: schedule("tadoba-andhari-tiger-reserve"),
  },
  {
    slug: "dudhwa-national-park",
    title: "Dudhwa National park and Kishanpur Wildlife Sanctuary",
    description:
      "Dudhwa is located in Lakhimpur Kheri district of Uttar Pradesh,spread over 490 sq km. Tthe sanctuary functions as a vital piece of the larger Dudhwa landscape, offering continuity of habitat rather than spectacle.",
    thumbKey: "dudhwaThumb",
    boxKey: "dudhwaBox",
    titleHref: park("dudhwa-national-park"),
    readMoreHref: park("dudhwa-national-park"),
    bookNowHref: schedule("dudhwa-national-park"),
  },
  {
    slug: "pilibhit-tiger-reserve",
    title: "Pilibhit Tiger Reserve",
    description:
      "Declared a tiger reserve,in 2014,pilibhit is a comparatively new tiger reserve.But Tiger sightings are excellent. Pilibhit Tiger Reserve lies within the great Terai belt, a landscape born of rivers descending from the Himalaya.",
    thumbKey: "pilibhitThumb",
    boxKey: "pilibhitBox",
    titleHref: park("pilibhit-tiger-reserve"),
    readMoreHref: park("pilibhit-tiger-reserve"),
    bookNowHref: schedule("pilibhit-tiger-reserve"),
  },
  {
    slug: "jim-corbett-national-park",
    title: "Jim Corbett National park",
    description:
      "Set against the foothills of the Himalayas, Jim Corbett National Park is India’s oldest national park and a timeless wilderness where forests, rivers, and wildlife exist in powerful harmony. Located in Uttarakhand’s Nainital and Pauri Garhwal districts, the park spreads across more than 1,300 square kilometres, encompassing a rich mix of hills, riverine belts, grasslands, and dense sal forests.",
    thumbKey: "corbettThumb",
    boxKey: "corbettBox",
    titleHref: park("jim-corbett-national-park"),
    readMoreHref: park("jim-corbett-national-park"),
    bookNowHref: schedule("jim-corbett-national-park"),
  },
  {
    slug: "kaziranga-national-park",
    title: "Kaziranga National park",
    description:
      "Kaziranga National Park lies along the banks of the Brahmaputra River in Assam,flanked by Karbi  hills on the other side, shaped by water, silt, and seasonal change. Spread across a vast floodplain,covering 430 sq km,in Golaghat and Nagaon District of Assam, the park is a mosaic of tall grasslands, marshes, shallow lakes, and patches of woodland—renewed each year by the river’s rise and retreat.",
    thumbKey: "kazirangaThumb",
    boxKey: "kazirangaBox",
    titleHref: park("kaziranga-national-park"),
    readMoreHref: park("kaziranga-national-park"),
    bookNowHref: schedule("kaziranga-national-park"),
  },
  {
    slug: "ranthambore-national-park",
    title: "Ranthambore National park",
    description:
      "Ranthambore National Park is one of India’s most iconic wildlife landscapes. Located in eastern Rajasthan, the park unfolds across rocky ridges, dry deciduous forests, open scrub, and ancient lakes—each element adding to its unmistakable character.",
    thumbKey: "ranthamboreThumb",
    boxKey: "ranthamboreBox",
    // On the live site this card's picture and title link to the Ranthambore schedule, not the park page.
    titleHref: schedule("ranthambore-national-park"),
    readMoreHref: park("ranthambore-national-park"),
    bookNowHref: schedule("ranthambore-national-park"),
  },
  {
    slug: "gir-national-park",
    title: "Gir National park",
    description:
      "Gir National Park stands apart from India’s other wild places.It covers 4 districts-Junagadh,Gir,Somnath and Amreli. This is the last natural home of the Asiatic lion, a species that has shaped—and been shaped by—this dry, open forest of western Gujarat.",
    thumbKey: "girThumb",
    boxKey: "girBox",
    titleHref: park("gir-national-park"),
    readMoreHref: park("gir-national-park"),
    bookNowHref: schedule("gir-national-park"),
  },
];

export const expeditionButtons = { readMore: "Read More", bookNow: "Book Now" } as const;

export const testimonialsIntro = {
  eyebrow: "testimonials",
  title: "Trusted by many, proven by results",
};

export type HomeTestimonial = { name: string; rating: number; text: string; imageKey: HomeImageKey };

/** Exactly as published (names, 5-star ratings and text, including the reviewers' own spelling). */
export const testimonials: HomeTestimonial[] = [
  {
    name: "Dr Suneet Raut, Palghar",
    rating: 5,
    imageKey: "t1",
    text: "Namaskar, I am Dr Suneet Raut. Myself and my wife, Dr Sushila visited Kanha National park, last year, by April 2025. Our close friend, Dr Prakash Babu,called me whether we were interested doing this Safari trip. As we both are nature lovers, and having visited Tadoba and other sanctuaries,were delighted by this call. It was last week of April.We flew from Mumbai to Jabalpur,then to Kanha sanctuary. I must say,the total experience of those 4 days was WONDERFUL. The flights, transportation to and fro by road, the accommodation, food, overall comforts and personal attention and care of Curated Canopy Safaris was exceptional. One thing I would like to mention, that, Dr Prakash himself is a wildlife enthusiast, has a deep knowledge of birds and animals, has good knowledge of flora and fauna. His planning is meticulous and punctual. His venture CURATED CANOPY Safaris is dependable service. We both look forward to join his safaries in future also. -- Dr Suneet Raut, Palghar",
  },
  {
    name: "Dr. Susheela Raut, Palghar",
    rating: 5,
    imageKey: "t2",
    text: "We had gone with Dr. Prakash Babu for a Tiger safari to Kanha National Park safari last year. We enjoyed the trip thoroughly. The trip was very meticulasly arranged by Dr. Babu from Curated Canopy Safaris, taking into consideration all the minutest needs of ever member The stay was very comfortable. Tours well arranged and comfortable. We saw 4 tigers and made us all very happy and fulfilled.",
  },
  {
    name: "Dr. Geeta Raju",
    rating: 5,
    imageKey: "t3",
    text: "Curated Canopy Safaris organised our trip to Kanha National Park in May ‘25. The Stay was in a serene hotel close to the park with amazing food and courteous staff. We did 1 night safari and 4 day safaris. We could see 4 tigers in 5 safaris. The tour guide and drivers were very alert and had a thorough know how of the parks. Besides tigers we could spot many deer, wild boars, peacocks and bisons. Overall we felt the time and money was well spent and looking forward to similar experiences with Canopy Safaris 👍",
  },
  {
    name: "Dr. Surya Raju",
    rating: 5,
    imageKey: "t4",
    text: "Attended Curated Canopy Safari trip to Kanha National Park in May 2025 with family and friends, it was a wild thrilling trip, early morning trips,Night rides with awesome rides through jungle. Well organised, over zealous guides,saw a lot of tigers,birds,deers bear etc.It was a wholesome awesome experience, good food, good stay.Looking forward to future safaris with curated canopy safaris.",
  },
  {
    name: "Dr. Shobha Sankhe",
    rating: 5,
    imageKey: "t5",
    text: "Dr. Prakash Babu is a true and passionate naturalist, and the ideal person to begin his venture, Curated Canopy Safaris. It is rightly said that a true naturalist is best suited to design wildlife safaris, as such a person is deeply well-versed with nature, flora, and fauna. Dr. Babu brings with him rich and varied experiences from safaris and sanctuaries across India. Along with wildlife exploration, he consistently strives to inculcate a love and respect for nature among the common man. Living in harmony with nature is essential for the survival of our ecology, which today stands at the edge of a cliff, challenged by increasing human impact. We wish him the very best in pursuing his passion, not only through curated wildlife experiences but also in contributing towards the protection of sanctuaries and wildlife. Apart from this, his deep knowledge of birdlife, combined with immersive wildlife exploration, truly serves as a panacea for human stress.",
  },
];

export const footer = {
  subsidiary: "Curated Canopy Safaris is a subsidiary of Pugmark Safaris LLP.",
  incorporation: "Pugmark Safaris LLP is incorporated with the ministry of corporate affairs of Govt.of India",
  quickLinksTitle: "Quick Links",
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Our Expeditions", href: "/safari-packages" },
    { label: "Our Team", href: "/team" },
    { label: "Contact Us", href: "/contact" },
    // Added to the live footer on 12 Oct 2026: Easebuzz payment form for custom packages.
    { label: "Custom Package Payment", href: "https://forms.easebuzz.in/register/PUGMARKmljwM/curated-custompayment" },
  ],
  policyLinksTitle: "Our Policy",
  policyLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund and Cancellation Policy", href: "/refund-cancellation-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
  contactTitle: "Get In Touch",
  contacts: [
    { kind: "phone", label: "+91 9172036513", href: "tel:+919172036513" },
    { kind: "email", label: "enquiries@curatedcanopysafaris.com", href: "mailto:enquiries@curatedcanopysafaris.com" },
    { kind: "email", label: "pugmarktigersafaris@gmail.com", href: "mailto:pugmarktigersafaris@gmail.com" },
  ],
  // Social *share* buttons (share the current page), as on the live footer.
  share: [
    { network: "facebook", label: "Share on Facebook" },
    { network: "twitter", label: "Share on Twitter" },
  ] as const,
  terms:
    "These Terms shall be governed by and construed in accordance with the laws of India. The Company has its registered office in Boisar, Maharashtra. Any dispute, claim or proceeding arising out of or relating to the use of this website, these Terms, or any services offered through this website shall be subject to the exclusive jurisdiction of the competent courts at Mumbai, Maharashtra, and users hereby irrevocably submit to such jurisdiction.",
  gstin: "GSTIN No.- 27ABIFP7813R1ZD",
  copyright: [
    "© 2026 ",
    { text: "Curated Canopy Safaris", href: "/" },
    " All Rights Reserved. Website Developed by ",
    { text: "Movinnza", href: "https://movinnza.in/" },
  ] satisfies Inline[],
};

/** "Ask Us" Safari Assistant widget, verbatim from the live site. */
export const askUs = {
  buttonLabel: "🌿 Ask Us",
  buttonTitle: "Ask our Safari Assistant",
  panelTitle: "🌿 Safari Assistant",
  closeTitle: "Close",
  greeting: "Namaste! Ask me anything — tiger safaris, park info, photography tours, booking details and more!",
  placeholder: "e.g. Tiger safari in May…",
  send: "Send",
  searching: "Searching…",
  noMatchPrefix: "No exact match found. Try: ",
  noMatchTerms: "tiger, rhino, corbett, photography, booking",
  parksHeading: "Parks we cover:",
  errorPrefix: "Sorry, could not connect. Please ",
  errorLink: "contact us",
  errorSuffix: " directly.",
};
