// Site copy from curatedcanopysafaris.com (Home, About Us, and the blocks repeated on every destination page).
// Wording is unchanged apart from spelling, spacing and punctuation fixes.
import type { BlogBlock, ContentSection, Faq, NamedItem } from "./types";

export const aboutStory: ContentSection = {
  heading: "Curated Wildlife Safaris",
  paragraphs: [
    "Traditionally, wildlife safaris have been perceived as expensive and out of reach for many.",
    "This platform was created with a simple purpose: to make safari experiences more affordable, accessible, and thoughtfully designed for all. They are economically priced, but we have chosen good resorts for the guests with all facilities required for a comfortable and happy stay. Although the safari vehicles can seat six, we have curated all safaris with four safarists in the gypsy, so that the experience is more comfortable for the guests.",
    "Alongside value-driven experiences, we also curate mid-range and luxury wildlife expeditions for guests from India and around the world—each planned with care, comfort, and genuine expertise.",
    "Our larger vision is to encourage more people to explore India’s tiger strongholds and diverse wildlife landscapes, fostering awareness, appreciation, and a deeper connection with nature. By enabling meaningful encounters with the wild, we hope to celebrate—and help preserve—India’s rich and extraordinary wildlife heritage.",
  ],
};

export const youngNaturalist: ContentSection = {
  heading: "Young Naturalist Programme",
  paragraphs: [
    "We encourage youngsters to visit national parks, so that they develop a love and affinity towards nature and wildlife.",
    "They are the custodians of the future, whose love for nature will go a long way in protecting, conserving and developing the critical wildlife areas.",
    "All students, up to graduation, get a 10% discount on all our expeditions. Students can mail us at enquiries@curatedcanopysafaris.com or call/WhatsApp on our number, with school/college ID card to avail the benefit.",
  ],
};

export const whyChooseUs: ContentSection = {
  heading: "Why Choose Curated Canopy Safaris?",
  paragraphs: [
    "At Curated Canopy Safaris, the jungle is our second home. Our experienced Gypsy drivers and certified naturalist guides have an intimate understanding of forest life. They read tiger pugmarks, interpret jungle sounds, and recognise the alarm calls of chital, barking deer, and langurs—skills that help them track the king of the forest with precision. Our teams also stay updated with the latest wildlife movements and sightings.",
    "While the tiger may be the star, we believe the true magic of the jungle lies in everything that surrounds it. From graceful deer and elusive mongooses to vibrant birdlife and countless other forest denizens, we ensure you experience the wilderness in its entirety, making every safari immersive and memorable.",
    "Beyond the safaris, we pay close attention to your comfort throughout your stay. Thoughtful arrangements, seamless logistics, and a deep understanding of what travellers need in the wild allow us to create a safari experience that feels effortless, enriching, and truly enchanting.",
  ],
};

export const customExpeditions = {
  heading: "Custom-Designed Expeditions",
  paragraphs: [
    "We specialise in curating bespoke wildlife expeditions, thoughtfully designed around your preferred dates, interests, and choice of national parks or wildlife habitats.",
    "Our itineraries can seamlessly include multiple national parks within a single expedition—such as Kanha and Bandhavgarh, Dudhwa and Pilibhit, or other carefully paired landscapes.",
    "For those seeking a richer experience, we also offer the option to combine wildlife journeys with cultural explorations, creating a well-balanced and immersive travel narrative.",
  ],
  audienceHeading: "Who Can Choose a Custom-Designed Expedition",
  audiences: [
    "Individual travellers",
    "Private groups",
    "Families",
    "International guests",
    "Corporate groups",
    "Educational institutions",
  ],
  closing: "Each expedition is planned with attention to detail, ensuring comfort, authenticity, and meaningful experiences in the wild.",
};

/** "Why Choose Curated Canopy Safaris" list shown on every destination page. */
export const destinationPromises: NamedItem[] = [
  { name: "All-Inclusive Packages", description: "Stay, all meals, forest permits, gypsy safaris, and trained guides are included for a seamless experience." },
  { name: "Experienced Local Guides", description: "Knowledgeable guides who understand the jungle, read alarm calls, and track wildlife effectively." },
  { name: "Comfortable Safari Lodges", description: "Carefully selected stays that offer both comfort and proximity to the park." },
  { name: "Thoughtfully Planned Expeditions", description: "Every detail is considered to ensure a smooth, comfortable, and rewarding safari." },
  { name: "Fair Pricing", description: "Well-curated experiences offered at reasonable and transparent costs." },
];

export const howToBook: string[] = [
  "You can book your complete package through Curated Canopy Safaris.",
  "You will need to provide a valid ID (Aadhaar card / PAN card / Driving Licence; passport for foreign nationals) for permit booking.",
  "Safaris are limited and should be booked in advance.",
];

/**
 * FAQs on the Safari Packages page. Every answer restates terms already on the site (terms.ts inclusions and payment,
 * the four-per-gypsy promise, howToBook). Cancellation refunds are deliberately left to each park's schedule page.
 */
export const safariPackagesFaqs: Faq[] = [
  {
    question: "What is included in a safari package?",
    answer:
      "Every package includes twin-sharing accommodation in comfortable lodges (single occupancy is available at an additional cost), all meals except on Day 1, and all entry fees, forest permits, guide fees and safaris.\n\nAirfare, transfers from the nearest airport or railway station, drinks, insurance, camera fees, tips and personal expenses are not included.",
  },
  {
    question: "How many guests share a safari vehicle?",
    answer:
      "Although the safari vehicles can seat six, we curate all our safaris with four safarists per gypsy, so the experience is more comfortable for every guest.",
  },
  {
    question: "How do I book a safari package?",
    answer:
      "You can book your complete package through Curated Canopy Safaris. Choose a park and open its schedule with **Book Now**, or [send us an enquiry](/contact). You will need a valid ID (Aadhaar card, PAN card or driving licence; passport for foreign nationals) for permit booking. Safaris are limited, so book in advance.",
  },
  {
    question: "How do I pay for my safari?",
    answer: "100% of the tour fee must be paid in advance to confirm participation in the tour.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Cancellation terms vary by package and are listed on each park’s schedule page. Please also read our [Refund and Cancellation Policy](/refund-cancellation-policy) before you confirm a booking.",
  },
  {
    question: "When should I go on safari?",
    answer:
      "Seasons and sightings differ from park to park. Our guide will help you [choose the right safari season](/blogs/best-time-for-tiger-safari-in-india-season-by-season-guide), and our team is happy to suggest dates for the park you have in mind.",
  },
];

export const safariTips: NamedItem[] = [
  { name: "Book in Advance", description: "Safari permits are limited and sell out quickly, so plan ahead." },
  { name: "Wear Neutral Colours", description: "Earth tones help you blend into the surroundings and avoid disturbing wildlife." },
  { name: "Carry Essentials", description: "Mobile phones may be restricted in some parks, so bring a camera and binoculars." },
  { name: "Follow Park Guidelines", description: "Always follow the rules and instructions provided by forest authorities and guides." },
];

/**
 * Homepage feature panels. Velavadar appears only here on the original site (its "Read more" link was broken),
 * so it links to the enquiry form rather than a destination page (Velavadar is not offered in the form's park list).
 */
export const featuredLandscapes = [
  {
    eyebrow: "The Terai Haven",
    title: "Dudhwa National Park & Kishanpur Wildlife Sanctuary",
    text: "Dudhwa is located in Lakhimpur Kheri district of Uttar Pradesh, spread over 490 sq km.",
    href: "/destinations/dudhwa-national-park",
    imageKey: "dudhwaVulture",
  },
  {
    eyebrow: "Tigers of the Diamond Country",
    title: "Panna Tiger Reserve",
    text: "Panna National Park, nestled in the Vindhyan ranges of Madhya Pradesh.",
    href: "/destinations/panna-national-park",
    imageKey: "pannaTiger",
  },
  {
    eyebrow: "The Emerging Tiger Reserve",
    title: "Pilibhit",
    text: "Declared a tiger reserve in 2014, Pilibhit is a comparatively new tiger reserve. But tiger sightings are excellent.",
    href: "/destinations/pilibhit-tiger-reserve",
    imageKey: "pilibhitTiger",
  },
  {
    eyebrow: "In the Grasslands Heavens",
    title: "Velavadar",
    text: "Velavadar National Park, also known as Blackbuck National Park, home to around 2000 blackbucks, lies along the Gulf of Khambhat in Gujarat.",
    href: "/contact",
    // No photo on the original site is attributed to Velavadar.
    imageKey: undefined,
  },
  {
    eyebrow: "In the Land of the Lion",
    title: "Gir National Park",
    text: "Gir National Park stands apart from India’s other wild places. It covers 4 districts—Junagadh, Gir, Somnath and Amreli.",
    href: "/destinations/gir-national-park",
    imageKey: "girLions",
  },
  {
    eyebrow: "The Jewel of Maharashtra",
    title: "Tadoba Andhari Tiger Reserve",
    text: "Tadoba Andhari Tiger Reserve, spread over 1700 sq km, has three main core zones—Moharli, Kolsa and Kolara. It carries the weight of age.",
    href: "/destinations/tadoba-andhari-tiger-reserve",
    imageKey: "tadobaTiger",
  },
] as const;

// Privacy Policy as rewritten on the live site on 12 October 2026.
// Section 14's contact block was published there with unfilled "[Insert …]" placeholders and an internal
// drafting note; neither is reproduced. The page builds section 14 from `site` instead.
export const privacyPolicy = {
  operator: "PUGMARK SAFARIS LLP",
  effectiveDate: "2026-10-12",
  updatedDate: "2026-10-12",
  // The site-wide clause (site.legal.jurisdiction) is worded for the Terms; this is the same clause for this Policy.
  governingLaw:
    "This Policy shall be governed by and construed in accordance with the laws of India. The Company has its registered office in Boisar, Maharashtra. Any dispute, claim or proceeding arising out of or relating to the use of this website, this Policy, or any services offered through this website shall be subject to the exclusive jurisdiction of the competent courts at Mumbai, Maharashtra, and users hereby irrevocably submit to such jurisdiction.",
  blocks: [
    {
      type: "paragraph",
      text: "This policy explains, in clear terms, what information we collect, why we need it, who may receive it, how we protect it, and how you can ask us to access, correct or delete information where applicable."
    },
    {
      type: "paragraph",
      text: "Curated Canopy Safaris is a wildlife-travel and safari-services brand operated by PUGMARK SAFARIS LLP. Our services may include safari and national-park arrangements, permit coordination, accommodation, meals, transport and customised travel packages."
    },
    {
      type: "paragraph",
      text: "We aim to collect only information reasonably needed to respond to you, arrange the services you request, complete payments, meet legal obligations and support a safe, well-coordinated trip. We handle personal information in accordance with applicable law."
    },
    {
      type: "heading",
      level: 2,
      text: "1. Information We May Collect"
    },
    {
      type: "paragraph",
      text: "The information collected depends on the service you request and the requirements of the relevant park, accommodation provider, transport operator or payment service."
    },
    {
      type: "heading",
      level: 3,
      text: "1.1 Identity and contact details"
    },
    {
      type: "list",
      items: [
        "Name, email address, mobile number and, where needed, residential address.",
        "Names and relevant contact details of other travellers included in a booking.",
        "Identification details or copies, such as passport or government-issued ID information, only where required for permits, reservations, verification or applicable law."
      ]
    },
    {
      type: "heading",
      level: 3,
      text: "1.2 Trip and booking details"
    },
    {
      type: "list",
      items: [
        "Destination or national park, travel dates, duration, number and ages of travellers, room and accommodation preferences, safari preferences, requested activities, itinerary, booking references and reservation status.",
        "Information you provide in enquiries, quotation requests, messages or customer-support communications."
      ]
    },
    {
      type: "heading",
      level: 3,
      text: "1.3 Health, dietary and accessibility information"
    },
    {
      type: "paragraph",
      text: "Where relevant to the arrangements you request, we may collect limited information such as food allergies, dietary requirements, mobility or accessibility needs, and other health or physical information needed to coordinate with accommodation, transport or activity providers. Please share only information that is relevant to your trip. We will handle such information with appropriate care and in accordance with applicable law."
    },
    {
      type: "heading",
      level: 3,
      text: "1.4 Insurance details"
    },
    {
      type: "paragraph",
      text: "If you ask us to coordinate or record travel or medical insurance information, we may process the relevant policy or contact details needed for that purpose. We do not collect insurance information unless it is relevant to the service or arrangement requested."
    },
    {
      type: "heading",
      level: 3,
      text: "1.5 Payment and transaction information"
    },
    {
      type: "paragraph",
      text: "We may receive transaction reference numbers, booking IDs, payment amount and date, payment status, payment method category, and relevant refund, cancellation or dispute details. We do not intend to store complete card numbers, CVV values, UPI PINs, banking passwords or similar confidential authentication credentials on our own systems."
    },
    {
      type: "heading",
      level: 3,
      text: "1.6 Website and technical information"
    },
    {
      type: "paragraph",
      text: "Depending on the website features enabled, we may collect technical information such as IP address, browser and device type, operating system, pages visited, website interactions, cookie identifiers, performance data and diagnostic logs."
    },
    {
      type: "heading",
      level: 2,
      text: "2. Why We Use Your Information"
    },
    {
      type: "paragraph",
      text: "We use information for purposes connected with operating our travel services, including to:"
    },
    {
      type: "list",
      items: [
        "Respond to enquiries and prepare customised itineraries or quotations.",
        "Create, manage and confirm bookings and communicate essential travel updates.",
        "Coordinate safari permits and reservations through the relevant booking channels.",
        "Arrange accommodation, meals, transport, guides and other services included in your package.",
        "Process and verify payments, administer eligible refunds and respond to payment disputes.",
        "Meet park, accommodation, transport, safety, identity-verification or other applicable requirements.",
        "Provide customer support, address complaints and maintain business and accounting records.",
        "Protect our website and services, detect suspicious activity and help prevent fraud.",
        "Comply with legal, tax, regulatory and recordkeeping obligations; and",
        "Send service information or promotional communications where permitted by law and, where required, with your consent."
      ]
    },
    {
      type: "paragraph",
      text: "We will not knowingly use your information for an unrelated purpose in a way that conflicts with applicable law. If a new purpose requires notice or consent, we will take the steps required by law."
    },
    {
      type: "heading",
      level: 2,
      text: "3. Payments and Saved Payment Details"
    },
    {
      type: "paragraph",
      text: "Payments may be processed through a third-party payment gateway, payment link, bank or other authorised payment service. Depending on the payment method, you may be redirected to the provider’s interface or use a service embedded in our website."
    },
    {
      type: "paragraph",
      text: "The payment provider handles the information required to authenticate and complete the transaction, prevent fraud and comply with its own legal obligations. We may receive payment confirmation and transaction details needed to verify your booking and maintain records. The provider’s own terms and privacy policy also apply."
    },
    {
      type: "paragraph",
      text: "For your security, enter confidential payment credentials only into the authorised payment interface. We will not ask you to send a UPI PIN, card PIN, CVV or banking password through WhatsApp, email or telephone."
    },
    {
      type: "heading",
      level: 3,
      text: "3.1 Requesting deletion of saved payment information"
    },
    {
      type: "paragraph",
      text: "You may request deletion of saved card or payment details held by us, where we control that information. If details are stored by a third-party payment provider, you may need to remove them through that provider or ask us for help with the available process. We will take reasonable steps to assist where possible."
    },
    {
      type: "paragraph",
      text: "Deleting saved payment details does not cancel a booking or automatically erase completed transaction records. We may retain records that are required for tax, accounting, legal, regulatory, fraud-prevention or dispute-resolution purposes. We will not retain saved payment details longer than reasonably necessary for the relevant permitted purpose."
    },
    {
      type: "heading",
      level: 2,
      text: "4. When We Share Information"
    },
    {
      type: "paragraph",
      text: "We share only information reasonably needed for the relevant service, transaction or lawful purpose. Depending on your booking, recipients may include:"
    },
    {
      type: "list",
      items: [
        "**Safari permit and booking channels:** Relevant park authorities, authorised booking portals or reservation channels to arrange permits and safaris.",
        "**Accommodation providers:** Resorts, lodges, hotels and other properties to confirm stays and coordinate check-in, meals or special requirements.",
        "**Travel and activity partners:** Transport operators, guides and other service providers involved in delivering the itinerary.",
        "**Payment providers:** Payment gateways and related providers for processing transactions, refunds and payment disputes.",
        "**Professional advisers:** Accountants, auditors, legal advisers and other service providers where reasonably necessary.",
        "**Authorities:** Government, regulatory, law-enforcement or other competent authorities where disclosure is required or legally permitted."
      ]
    },
    {
      type: "paragraph",
      text: "We do not sell personal information to third parties for their own independent marketing purposes. Service providers may process information under their own obligations and policies. Where practical, we limit the information shared to what is necessary for the purpose."
    },
    {
      type: "heading",
      level: 2,
      text: "5. Cookies and Website Analytics"
    },
    {
      type: "paragraph",
      text: "Our website may use cookies and similar technologies to maintain website functionality, remember preferences, understand visitor activity, measure performance, assess marketing campaigns and diagnose technical issues. You can manage cookies through your browser settings. Disabling some cookies may affect website features. Where required by law, we will seek consent before using non-essential cookies or tracking technologies."
    },
    {
      type: "heading",
      level: 2,
      text: "6. Marketing and Your Choices"
    },
    {
      type: "paragraph",
      text: "We may send service-related messages such as booking confirmations, payment updates, itinerary changes and important travel notices because they are necessary to provide the service. Promotional messages will be sent only where permitted by law and, where required, with your consent. You can ask us to stop promotional communications by using an unsubscribe option if available or contacting us. This will not prevent essential booking or service messages."
    },
    {
      type: "heading",
      level: 2,
      text: "7. How We Protect Information"
    },
    {
      type: "paragraph",
      text: "We use reasonable administrative, technical and organisational measures designed to protect information against unauthorised access, loss, misuse, alteration or disclosure. Access is limited to people and providers who need the information for their role. No website, transmission method or storage system can be guaranteed completely secure, and third-party systems are not entirely under our control."
    },
    {
      type: "heading",
      level: 2,
      text: "8. How Long We Keep Information"
    },
    {
      type: "paragraph",
      text: "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including completing bookings, providing support, resolving disputes, maintaining business records and meeting legal, tax, accounting or regulatory obligations. Retention periods vary according to the type of information and the relevant requirement. When information is no longer needed and no lawful retention ground applies, we will take reasonable steps to delete it or make it non-identifiable."
    },
    {
      type: "heading",
      level: 2,
      text: "9. Your Privacy Requests"
    },
    {
      type: "paragraph",
      text: "Subject to applicable law and verification of your identity, you may contact us to request access to or correction of information we hold about you, withdraw consent where processing relies on consent, object to or restrict certain processing where such rights apply, or request deletion of information where we are not required or otherwise permitted to retain it."
    },
    {
      type: "paragraph",
      text: "Withdrawing consent does not make earlier lawful processing unlawful and may affect our ability to provide a service if the information is necessary for that service. Some information may need to be retained to complete a booking, maintain required records, prevent fraud or resolve a claim. We may ask for reasonable information to verify your identity before acting on a request."
    },
    {
      type: "heading",
      level: 2,
      text: "10. Withdrawing Consent"
    },
    {
      type: "paragraph",
      text: "You may withdraw consent for processing that is based on your consent by emailing the privacy contact listed in Section 14. Please identify the request clearly and provide enough information for us to locate the relevant record. We will process the request in accordance with applicable law. If you withdraw consent for information essential to a booking or service, we may be unable to provide or continue that service."
    },
    {
      type: "heading",
      level: 2,
      text: "11. Information About Children"
    },
    {
      type: "paragraph",
      text: "A parent or lawful guardian may provide information about a child where it is needed to arrange a family booking, accommodation, safari permit or related service. Please provide only the information necessary for the arrangement. We will handle children’s information in accordance with applicable law, including any applicable requirements for parental or guardian consent."
    },
    {
      type: "heading",
      level: 2,
      text: "12. Third-Party Websites and Services"
    },
    {
      type: "paragraph",
      text: "Our website or communications may link to third-party websites, payment platforms, booking systems, accommodation providers or other services. Those services may have their own privacy notices and data-handling practices. This policy applies to our own practices and does not govern services that we do not control. Please review the relevant third party’s privacy information before submitting information directly to it."
    },
    {
      type: "heading",
      level: 2,
      text: "13. Changes to This Policy"
    },
    {
      type: "paragraph",
      text: "We may update this policy to reflect changes in our services, website, payment arrangements or applicable law. The latest version will be published on our website with an updated date. Where required, we will provide notice of material changes or obtain consent."
    }
  ] satisfies BlogBlock[],
};

// Refund and Cancellation Policy, from the business's PDF (Curated_Canopy_Safaris_Refund_Cancellation_Policy-1.pdf), verbatim.
export const refundPolicy: BlogBlock[] = [
  { type: "heading", level: 2, text: "1. General Refund Policy" },
  {
    type: "paragraph",
    text: "Refund policies vary depending on the resort or accommodation provider and the respective State Forest Department governing safari bookings. Cancellation terms, applicable deductions, and refund eligibility may differ depending on the destination, booking type, and timing of the cancellation.",
  },
  { type: "heading", level: 2, text: "2. Cancellation and Refund Eligibility" },
  {
    type: "paragraph",
    text: "In the event of a cancellation, refunds will be processed in accordance with the applicable refund policies of the resort and the concerned Forest Department. The relevant cancellation timelines, deductions, and refund conditions will be considered when calculating the refundable amount.",
  },
  { type: "heading", level: 2, text: "3. Service Charges" },
  {
    type: "paragraph",
    text: "Curated Canopy Safaris will retain a service charge calculated on the total package cost, based on the following cancellation timelines:",
  },
  {
    type: "list",
    items: [
      "**Cancellation within 7 days of booking:** 10% of the total package cost will be retained as service charges.",
      "**Cancellation after 7 days of booking:** 20% of the total package cost will be retained as service charges.",
    ],
  },
  {
    type: "paragraph",
    text: "These service charges are subject to applicable laws and will be accounted for alongside any applicable cancellation charges or non-refundable amounts imposed by the resort, Forest Department, or other service providers.",
  },
  { type: "heading", level: 2, text: "4. Calculation of Refunds" },
  {
    type: "paragraph",
    text: "The final refundable amount will be calculated after accounting for the applicable service charges, cancellation charges, and non-refundable amounts under the respective resort and Forest Department policies. The actual refund amount may vary depending on the applicable policies of the relevant service providers and the cancellation terms of the booking.",
  },
  { type: "heading", level: 2, text: "5. Refund Processing" },
  {
    type: "paragraph",
    text: "Refunds, where applicable, will be processed after confirmation of the refundable amount from the relevant resort, Forest Department, or other service providers. The processing time may vary depending on the respective provider’s refund procedures.",
  },
  { type: "heading", level: 2, text: "6. Important Conditions" },
  {
    type: "list",
    items: [
      "Customers are advised to review the applicable cancellation and refund terms before confirming their bookings.",
      "Safari permits and accommodation reservations are subject to the respective Forest Department and resort policies.",
      "Any deductions or non-refundable charges imposed by the relevant service providers will be considered when determining the final refund amount.",
      "All cancellations and refund requests must be communicated directly to Curated Canopy Safaris for processing in accordance with the applicable terms and conditions.",
    ],
  },
  {
    type: "paragraph",
    text: "Curated Canopy Safaris reserves the right to apply the applicable cancellation and refund terms in accordance with the booking conditions and relevant service provider policies, subject to applicable laws.",
  },
  { type: "heading", level: 2, text: "7. Jurisdiction" },
  {
    type: "paragraph",
    text: "All disputes arising out of or in connection with our services shall be subject to the jurisdiction of the competent courts in Boisar, Maharashtra, and Jabalpur, Madhya Pradesh, subject to applicable law.",
  },
];
