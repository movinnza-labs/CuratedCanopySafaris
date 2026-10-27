import { PageHero } from "@/components/sections/page-hero";
import { BlogBody } from "@/components/sections/blog-body";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { termsAndConditions } from "@/lib/data/terms-and-conditions";
import { site } from "@/lib/data/site";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Terms & Conditions", path: "/terms-and-conditions" },
];

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Terms & Conditions for Curated Canopy Safaris bookings: quotations, payments, safari permits, itinerary changes, guest responsibilities and liability.",
  path: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  const { contact } = site;
  return (
    <>
      <PageHero title="Terms & Conditions" breadcrumbs={breadcrumbs} />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <div className="prose-safari mb-6">
            <p>
              <strong>Operated by {termsAndConditions.operator}</strong>
              <br />
              <strong>Effective date:</strong>{" "}
              <time dateTime={termsAndConditions.effectiveDate}>{formatDate(termsAndConditions.effectiveDate)}</time>
              <br />
              <strong>Last updated:</strong>{" "}
              <time dateTime={termsAndConditions.updatedDate}>{formatDate(termsAndConditions.updatedDate)}</time>
            </p>
          </div>
          <BlogBody blocks={termsAndConditions.blocks} />
          <div className="prose-safari">
            <h2>25. Contact Information</h2>
            <ul>
              <li>
                <strong>Legal business name:</strong> {termsAndConditions.operator}
              </li>
              <li>
                <strong>Brand name:</strong> {site.name}
              </li>
              <li>
                <strong>Website:</strong> curatedcanopysafaris.com
              </li>
              <li>
                <strong>Address:</strong> {contact.address.lines.join(", ")}
              </li>
              <li>
                <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <strong>Contact number:</strong> <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
            </ul>
            <p>
              For booking-related enquiries, please refer to the contact details published on our official website or
              provided in your booking confirmation.
            </p>
          </div>
        </Container>
      </section>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
