// Business facts as published on curatedcanopysafaris.com (header, footer and Contact Us page).
export const site = {
  name: "Curated Canopy Safaris",
  // Always the live domain, with no trailing slash, so canonicals and the sitemap never point at staging.
  url: "https://curatedcanopysafaris.com",
  tagline: "We curate, you discover.",
  description:
    "Curated wildlife and tiger safaris across India’s national parks and tiger reserves — economically priced expeditions with good resorts and four safarists per gypsy, plus mid-range, luxury and custom-designed journeys.",
  locale: "en_IN",

  contact: {
    phone: "+91 9172036513",
    phoneHref: "tel:+919172036513",
    whatsappNumber: "919172036513",
    whatsappHref: "https://wa.me/919172036513",
    email: "enquiries@curatedcanopysafaris.com",
    address: {
      lines: ["No 3, Chandan Apartment, Dhodipuja", "Navapur Road, Boisar (W)", "Maharashtra 401501"],
      locality: "Boisar",
      region: "Maharashtra",
      postalCode: "401501",
      country: "IN",
    },
  },

  legal: {
    parentCompany: "Pugmark Safaris LLP",
    subsidiaryNote: "Curated Canopy Safaris is a subsidiary of Pugmark Safaris LLP.",
    incorporationNote: "Pugmark Safaris LLP is incorporated with the Ministry of Corporate Affairs of the Government of India.",
    gstin: "27ABIFP7813R1ZD",
    jurisdiction:
      "These Terms shall be governed by and construed in accordance with the laws of India. The Company has its registered office in Boisar, Maharashtra. Any dispute, claim or proceeding arising out of or relating to the use of this website, these Terms, or any services offered through this website shall be subject to the exclusive jurisdiction of the competent courts at Mumbai, Maharashtra, and users hereby irrevocably submit to such jurisdiction.",
  },

  internationalNote: "For international guests and luxury tours, mail us at",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Safari Packages", href: "/safari-packages" },
  { label: "Our Team", href: "/team" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
] as const;

export const footerNav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Safari Packages", href: "/safari-packages" },
  { label: "Our Team", href: "/team" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund and Cancellation Policy", href: "/refund-cancellation-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
] as const;
