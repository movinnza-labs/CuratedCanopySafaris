// Terms & Conditions, from the business's PDF (Curated_Canopy_Safaris_Terms_and_Conditions-12.pdf), verbatim.
// Section 25's contact block had unfilled "[Insert …]" placeholders; the page builds it from `site` instead.
import type { BlogBlock } from "./types";

/** Numbered sub-clauses ("4.1.", "4.2." …) as paragraphs with a bold number. */
const clauses = (section: number, items: string[]): BlogBlock[] =>
  items.map((text, i) => ({ type: "paragraph", text: `**${section}.${i + 1}.** ${text}` }));

export const termsAndConditions: {
  operator: string;
  effectiveDate: string;
  updatedDate: string;
  blocks: BlogBlock[];
} = {
  operator: "PUGMARK SAFARIS LLP",
  effectiveDate: "2026-10-16",
  updatedDate: "2026-10-16",
  blocks: [
    {
      type: "paragraph",
      text: "These Terms & Conditions govern the use of the Curated Canopy Safaris website and the booking of safari tours, wildlife experiences, accommodation, transport, meals and related travel services arranged by PUGMARK SAFARIS LLP under the brand name Curated Canopy Safaris.",
    },
    {
      type: "paragraph",
      text: "By requesting a quotation, making a booking, making a payment or using our services, you acknowledge that you have read and understood these Terms & Conditions.",
    },
    { type: "heading", level: 2, text: "1. Definitions" },
    {
      type: "paragraph",
      text: "For the purposes of these Terms & Conditions: “Company”, “we”, “us” or “our” means PUGMARK SAFARIS LLP, operating under the brand name Curated Canopy Safaris. “Customer”, “traveller”, “guest” or “you” means any person enquiring about, booking or using our services. “Services” means safari arrangements, accommodation, meals, transport, permits, itineraries and other travel-related services specified in a booking. “Third-party service providers” means resorts, hotels, lodges, forest departments, authorised safari booking channels, transport operators, guides and other independent providers involved in delivering the services.",
    },
    { type: "heading", level: 2, text: "2. Scope of Services" },
    {
      type: "paragraph",
      text: "Curated Canopy Safaris provides customised wildlife travel and safari arrangements at selected national parks and wildlife destinations in India. Depending on the package selected, our services may include:",
    },
    {
      type: "list",
      items: [
        "Safari arrangements and coordination of permits through applicable booking channels.",
        "Accommodation at selected resorts, lodges or hotels.",
        "Meals, transport and transfers, where expressly included.",
        "Assistance with itinerary planning and travel coordination.",
        "Other activities or services specifically mentioned in the quotation or booking confirmation.",
      ],
    },
    {
      type: "paragraph",
      text: "The exact inclusions, exclusions, destination, travel dates, accommodation category, safari schedule and package price shall be as stated in the relevant quotation or written booking confirmation. Any service not expressly listed as included shall be treated as excluded.",
    },
    { type: "heading", level: 2, text: "3. Nature of Our Role" },
    {
      type: "paragraph",
      text: "Curated Canopy Safaris coordinates travel arrangements and services through the relevant service providers and booking channels. Safari permits, park entry, vehicle allocation, accommodation availability and other services may be governed by the rules, systems and decisions of the relevant authorities or independent providers. Unless expressly stated in writing, Curated Canopy Safaris does not represent itself as a government authority, forest department or official booking partner of any national park or government booking platform. The terms and operational rules of the relevant forest department, accommodation provider and other service providers may also apply to the services booked.",
    },
    { type: "heading", level: 2, text: "4. Enquiries, Quotations and Booking Confirmation" },
    ...clauses(4, [
      "Quotations are prepared based on the travel details, availability, preferences and requirements communicated by the customer.",
      "A quotation is not, by itself, a confirmed reservation. Availability and prices may change until the relevant arrangements are confirmed.",
      "A booking shall be treated as confirmed when the applicable booking requirements have been fulfilled and written confirmation has been issued by Curated Canopy Safaris or the relevant provider, as applicable.",
      "Customers must carefully review their quotation and booking confirmation, including dates, destination, number of guests, room category, safari details, inclusions, exclusions and total price.",
      "Any discrepancy or requested correction should be communicated promptly in writing.",
      "Special requests, including specific rooms, dietary preferences, vehicle preferences, guides or particular safari timings, are subject to availability and cannot be guaranteed unless expressly confirmed in writing.",
    ]),
    { type: "heading", level: 2, text: "5. Pricing, Taxes and Payments" },
    ...clauses(5, [
      "Package prices are based on the services, dates, number of guests and other details specified in the relevant quotation.",
      "Applicable taxes, including GST where applicable, shall be charged as stated in the quotation or invoice and in accordance with applicable law.",
      "Any advance payment, balance payment, payment deadline or other payment requirement shall be communicated in the relevant quotation, invoice or booking confirmation.",
      "Customers are responsible for making payments through the payment methods and accounts officially communicated by Curated Canopy Safaris.",
      "A payment shall be considered received only when it has been successfully credited or otherwise confirmed through the applicable payment channel.",
      "Any additional service, upgrade, extension or change requested by the customer after confirmation may involve additional charges, which shall be communicated before the additional arrangement is finalised, where reasonably practicable.",
      "Customers must retain payment receipts and booking confirmations for their records.",
    ]),
    { type: "heading", level: 2, text: "6. Safari Permits and Forest Department Regulations" },
    ...clauses(6, [
      "Safari permits and entry arrangements are subject to the rules, availability, operating schedules and approval processes of the relevant forest department or authorised booking channel.",
      "The issue of a permit, confirmation of a safari or allocation of a vehicle is subject to the applicable official system and the information supplied for the booking.",
      "Customers must provide accurate information and valid identification documents required for safari permits and entry.",
      "The name, age, identification details and other information entered into a permit or reservation must match the applicable requirements. Corrections or changes may not be permitted by the relevant authority after issuance.",
      "Entry into a national park, reserve, core zone, buffer zone or other protected area is subject to the relevant authority’s rules and decisions.",
      "Curated Canopy Safaris cannot guarantee the issuance of a permit, entry approval, access to a particular zone or allocation of a particular vehicle where the decision rests with an independent authority.",
      "Guests must comply with all official instructions, timings, identification requirements, entry restrictions and safety directions applicable to their safari.",
    ]),
    { type: "heading", level: 2, text: "7. Wildlife Viewing and Safari Experience" },
    ...clauses(7, [
      "Wildlife sightings are inherently unpredictable. Curated Canopy Safaris does not guarantee sightings of any particular animal, bird, species or natural event, including tigers, leopards or other sought-after wildlife.",
      "Wildlife movement, weather, visibility, forest conditions, seasonal restrictions, animal behaviour and decisions made by park authorities may affect the safari experience.",
      "Safari routes, zones, timings and vehicle allocations may be determined or changed by the relevant authorities or operators.",
      "Guests acknowledge that a wildlife safari takes place in a natural environment and may involve rough terrain, dust, noise, changing weather, insects and other conditions associated with forests and wildlife habitats.",
      "Guests must not feed, chase, touch, provoke or attempt to attract wildlife, leave authorised routes, litter, make unauthorised noise or engage in any conduct prohibited by the applicable park rules.",
      "Guests must follow the instructions of authorised guides, drivers, forest staff and other responsible personnel throughout the safari.",
    ]),
    { type: "heading", level: 2, text: "8. Accommodation, Meals and Other Third-party Services" },
    ...clauses(8, [
      "Accommodation, meals, transport and other services are provided by the respective hotels, resorts, lodges, transport operators or other service providers.",
      "Room categories, amenities, meal plans, check-in and check-out times, occupancy limits and property rules are governed by the relevant provider and the confirmed booking.",
      "Photographs, descriptions and other representations of accommodation or facilities are intended to provide general information. Actual room layouts, views, furnishings, amenities and facilities may vary.",
      "Requests for early check-in, late check-out, adjoining rooms, specific views, special meals or other arrangements remain subject to the relevant provider’s confirmation.",
      "Guests must comply with the accommodation provider’s safety, conduct, occupancy and property-use rules.",
      "Where a third-party provider is responsible for delivering a service, its applicable terms and operational policies shall also apply. Curated Canopy Safaris will provide reasonable assistance in communicating with the provider regarding service-related concerns.",
    ]),
    { type: "heading", level: 2, text: "9. Itinerary Changes and Operational Requirements" },
    ...clauses(9, [
      "Itineraries are prepared based on the information and arrangements available at the time of confirmation.",
      "Changes may become necessary due to weather, road or transport conditions, park closures, government directions, wildlife-related restrictions, operational issues, availability or other circumstances beyond our reasonable control.",
      "Where necessary, Curated Canopy Safaris may coordinate reasonable adjustments to the itinerary in consultation with the customer and relevant service providers.",
      "No change shall be represented as confirmed until communicated to the customer through an appropriate written communication or booking update.",
      "Guests must comply with changes or instructions required by competent authorities for safety, conservation or lawful park operations.",
    ]),
    { type: "heading", level: 2, text: "10. Customer Responsibilities" },
    { type: "paragraph", text: "Customers are responsible for:" },
    {
      type: "list",
      items: [
        "Providing accurate names, contact details, travel dates, guest counts and identification information.",
        "Reviewing all booking confirmations and promptly reporting errors.",
        "Arriving at the specified meeting points and reporting at the required times.",
        "Carrying valid identification and any other documents required for the trip.",
        "Following the rules of national parks, accommodation providers and transport operators.",
        "Respecting wildlife, local communities, staff and fellow travellers.",
        "Informing us in advance of relevant dietary, mobility or accessibility requirements where assistance is requested.",
        "Supervising children and ensuring that they follow applicable safety instructions.",
        "Ensuring that their personal conduct does not endanger themselves or others or disrupt the trip.",
      ],
    },
    {
      type: "paragraph",
      text: "Customers may be responsible for additional costs or losses arising directly from inaccurate information, failure to follow instructions, damage caused by them or non-compliance with applicable rules, to the extent permitted by law.",
    },
    { type: "heading", level: 2, text: "11. Travel Documents and International Guests" },
    ...clauses(11, [
      "Customers are responsible for ensuring that they possess valid identification and any required passport, visa, travel authorisation or other documents for their journey.",
      "International travellers must verify the entry, immigration and documentation requirements applicable to their nationality and itinerary.",
      "Where passport or identification information is required for permits or reservations, customers must provide it accurately through the requested communication or booking channel.",
      "Customers should independently verify applicable travel advisories, entry conditions and other requirements before departure.",
      "Curated Canopy Safaris does not provide immigration or legal advice and does not guarantee that any government authority will approve a visa, permit or entry request.",
    ]),
    { type: "heading", level: 2, text: "12. Health, Safety and Accessibility" },
    ...clauses(12, [
      "Guests should assess their own fitness and ability to participate in the activities included in their itinerary.",
      "Customers should inform us of relevant medical, dietary, mobility or accessibility requirements when such information is necessary to coordinate the requested services. Only information reasonably relevant to the arrangements should be provided.",
      "Guests must follow safety instructions issued by guides, drivers, forest personnel, accommodation staff and other authorised personnel.",
      "Guests should carry any personal medication or essential health supplies they may require during travel.",
      "Accessibility facilities and medical assistance may be limited in remote wildlife destinations. Customers should communicate specific requirements in advance so that availability can be checked, without assuming that every request can be accommodated.",
      "In an emergency, guests must cooperate with reasonable safety instructions and applicable emergency procedures.",
    ]),
    { type: "heading", level: 2, text: "13. Risks Associated with Wildlife Travel" },
    {
      type: "paragraph",
      text: "Wildlife safaris and travel in natural or remote areas involve risks that may include uneven terrain, vehicle movement, changing weather, insects, contact with natural environments, limited medical facilities and unpredictable animal behaviour. Customers acknowledge these inherent conditions and agree to act responsibly, follow safety instructions and avoid conduct that creates unnecessary risk. Nothing in these Terms & Conditions excludes or limits any liability or consumer right that cannot lawfully be excluded or limited under applicable law.",
    },
    { type: "heading", level: 2, text: "14. Personal Belongings and Guest Conduct" },
    ...clauses(14, [
      "Guests are responsible for their personal belongings, valuables, travel documents, cameras, electronic devices and other possessions.",
      "Guests should take reasonable precautions to protect their belongings and follow any storage or security instructions provided by the relevant service provider.",
      "Guests must not carry or use prohibited items or engage in unlawful, abusive, dangerous or disruptive conduct during any service.",
      "Guests may be required to comply with reasonable directions from authorised personnel where necessary to protect safety, wildlife, property or the lawful operation of the service.",
    ]),
    { type: "heading", level: 2, text: "15. Third-party Providers and Service Limitations" },
    ...clauses(15, [
      "Certain elements of a package may be delivered by independent service providers.",
      "Those providers may have their own terms, operating procedures, safety standards, availability restrictions and complaint-handling processes.",
      "Curated Canopy Safaris will make reasonable efforts to coordinate the arrangements described in the confirmed package. However, we cannot guarantee the continuous availability or uninterrupted operation of services controlled by independent providers or authorities.",
      "Where a concern relates to a third-party service, customers should notify Curated Canopy Safaris promptly so that we can assist with communication and coordination, where appropriate.",
      "Nothing in this section removes any responsibility that applicable law places on Curated Canopy Safaris.",
    ]),
    { type: "heading", level: 2, text: "16. Force Majeure" },
    {
      type: "paragraph",
      text: "Neither Curated Canopy Safaris nor a relevant service provider shall be considered in breach solely because performance is delayed or prevented by circumstances beyond reasonable control, to the extent recognised by applicable law. Such circumstances may include natural disasters, severe weather, floods, fires, public emergencies, epidemics, government restrictions, park closures, strikes, civil disturbances, transport disruptions or other comparable events. Where such circumstances affect a booking, we will make reasonable efforts to communicate material changes and coordinate with the relevant service providers regarding available arrangements. Any financial consequences arising from a disruption shall be dealt with under the applicable booking terms, the separate [Refund & Cancellation Policy](/refund-cancellation-policy) where relevant, the terms of the relevant provider and applicable law.",
    },
    { type: "heading", level: 2, text: "17. Website Content and Intellectual Property" },
    ...clauses(17, [
      "The website and its content, including text, branding, logos, graphics, photographs, itineraries and other materials, may be owned by or licensed to PUGMARK SAFARIS LLP or the relevant rights holders.",
      "Such material may not be copied, reproduced, modified, republished or commercially used without the necessary permission, except where permitted by law.",
      "Website descriptions, photographs, wildlife images, indicative itineraries and general travel information are provided for informational purposes. They do not guarantee future wildlife sightings, uninterrupted service availability or identical conditions at a destination.",
      "Customers must not misuse the website, attempt unauthorised access, introduce malicious code or engage in activity that interferes with its proper operation.",
    ]),
    { type: "heading", level: 2, text: "18. Privacy and Personal Information" },
    {
      type: "paragraph",
      text: "Personal information provided in connection with enquiries, bookings, payments and travel arrangements will be handled in accordance with our separate [Privacy Policy](/privacy-policy) and applicable law. Information may be shared with relevant service providers, booking channels, payment providers or authorities where reasonably necessary to arrange the requested services, complete transactions or comply with legal obligations. Customers should review the Privacy Policy available on our website for further information about the collection, use, sharing, retention and protection of personal information and the ways in which privacy-related requests may be submitted.",
    },
    { type: "heading", level: 2, text: "19. Refunds and Cancellations" },
    {
      type: "paragraph",
      text: "Refund and cancellation matters are governed by our separate [Refund & Cancellation Policy](/refund-cancellation-policy), together with the applicable booking terms, the relevant service provider’s policies and applicable law. Customers should review that policy before confirming a booking. This Terms & Conditions document does not replace or reproduce the separate Refund & Cancellation Policy.",
    },
    { type: "heading", level: 2, text: "20. Complaints and Customer Support" },
    {
      type: "paragraph",
      text: "Customers are encouraged to communicate any concern regarding a quotation, booking, itinerary or service to Curated Canopy Safaris as soon as reasonably practicable. Please provide the booking reference, travel dates, relevant details and any supporting documents so that the concern can be reviewed. We will make reasonable efforts to understand the issue, communicate with the relevant service provider where necessary and respond within a reasonable period. Contact details for customer support and formal grievances should be published on our website and included in relevant booking communications.",
    },
    { type: "heading", level: 2, text: "21. Limitation of Liability" },
    ...clauses(21, [
      "Curated Canopy Safaris will exercise reasonable care in coordinating the services expressly included in a confirmed booking.",
      "To the extent permitted by applicable law, the Company shall not be liable for losses arising solely from the independent acts or omissions of third-party providers, decisions of competent authorities, unpredictable wildlife behaviour or circumstances beyond the Company’s reasonable control.",
      "Nothing in these Terms & Conditions excludes liability for fraud, wilful misconduct, negligence or any other matter where such exclusion is prohibited by law.",
      "Nothing in these Terms & Conditions limits a consumer’s statutory rights or remedies under applicable Indian law.",
      "Each matter shall be assessed on its facts, the services agreed upon, the responsibilities of the relevant parties and the requirements of applicable law.",
    ]),
    { type: "heading", level: 2, text: "22. Governing Law and Jurisdiction" },
    {
      type: "paragraph",
      text: "These Terms & Conditions shall be governed by the laws of India. Subject to applicable law, including mandatory consumer-protection provisions and the jurisdiction of any forum or authority that cannot lawfully be excluded, disputes arising out of or in connection with these Terms & Conditions shall be submitted to the competent courts having jurisdiction in Boisar, Maharashtra, and/or Jabalpur, Madhya Pradesh, as legally applicable. Nothing in this clause restricts a consumer from approaching a consumer commission or other forum where such access is available under applicable law.",
    },
    { type: "heading", level: 2, text: "23. Amendments to These Terms" },
    {
      type: "paragraph",
      text: "Curated Canopy Safaris may update these Terms & Conditions to reflect changes in its services, business operations, booking arrangements or applicable law. The latest version will be published on our website with the updated effective or revision date. Any mandatory legal requirements concerning notice, consent or the application of revised terms will be followed. The terms applicable to a particular booking should be read together with its written confirmation and any specific conditions communicated for that booking.",
    },
    { type: "heading", level: 2, text: "24. Severability" },
    {
      type: "paragraph",
      text: "If any provision of these Terms & Conditions is found to be invalid or unenforceable by a competent authority, the remaining provisions shall continue to apply to the extent permitted by law.",
    },
  ],
};
