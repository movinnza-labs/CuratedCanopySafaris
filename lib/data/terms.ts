// Inclusions, payment and cancellation terms from the "Inclusions & Payment Terms" popups on the original site.
// The original site shows two refund schedules; each package links to one of them (see packages.ts `termsId`).
import type { TermsPolicy } from "./types";

const included = [
  "Twin-sharing accommodation in comfortable lodges. (Single occupancy available at an additional cost.)",
  "All meals (breakfast, lunch, and dinner), except on Day 1",
  "All entry fees, forest permits, guide fees, and safaris",
];

const notIncluded = [
  "Any airfare",
  "Transfers from the nearest airport or railway station and back",
  "Any kind of personal expenses, optional tours, or extra meals ordered",
  "Bottled water, soft drinks, and alcoholic beverages",
  "Insurance, laundry services, and phone calls",
  "Camera and lens fees, if applicable",
  "Tips and gratuities",
];

const payment = ["100% of the tour fee must be paid in advance to confirm participation in the tour."];

export const termsPolicies: TermsPolicy[] = [
  {
    // Kanha, Bandhavgarh, Pench, Panna, Satpura, Tadoba, Jim Corbett, Ranthambore, Gir
    id: "standard",
    included,
    notIncluded,
    payment,
    cancellation: [
      "50% refund if cancelled 90 days before start of tour.",
      "25% refund if cancelled 60 days before start of tour.",
      "Nil refund if cancelled less than 60 days before start of tour.",
    ],
  },
  {
    // Dudhwa & Kishanpur, Pilibhit, Kaziranga
    id: "extended",
    included,
    notIncluded,
    payment,
    cancellation: [
      "90% refund if cancelled 90 days before start of tour.",
      "50% refund if cancelled 60 days before start of tour.",
      "25% refund if cancelled 30 days before start of tour.",
      "Nil refund if cancelled within 30 days of start of tour.",
    ],
  },
];

export function getTerms(id: string): TermsPolicy | undefined {
  return termsPolicies.find((policy) => policy.id === id);
}
