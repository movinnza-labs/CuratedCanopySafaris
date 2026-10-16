import { PageHero } from "@/components/sections/page-hero";
import { BlogBody } from "@/components/sections/blog-body";
import { Container } from "@/components/ui/container";
import { privacyPolicy } from "@/lib/data/content";
import { site } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Curated Canopy Safaris (operated by Pugmark Safaris LLP) collects, uses, shares and protects personal information, and how to request access, correction or deletion.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  const { contact } = site;
  return (
    <>
      <PageHero
        title="Privacy Policy"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <div className="prose-safari mb-6">
            <p>
              <strong>Operated by {privacyPolicy.operator}</strong>
              <br />
              <strong>Effective date:</strong> <time dateTime={privacyPolicy.effectiveDate}>{formatDate(privacyPolicy.effectiveDate)}</time>
              <br />
              <strong>Last updated:</strong> <time dateTime={privacyPolicy.updatedDate}>{formatDate(privacyPolicy.updatedDate)}</time>
            </p>
          </div>
          <BlogBody blocks={privacyPolicy.blocks} />
          <div className="prose-safari">
            <h2>14. Contact and Privacy / Grievance Requests</h2>
            <ul>
              <li>
                <strong>Legal business name:</strong> {privacyPolicy.operator}
              </li>
              <li>
                <strong>Brand:</strong> {site.name}
              </li>
              <li>
                <strong>Website:</strong> curatedcanopysafaris.com
              </li>
              <li>
                <strong>Address:</strong> {contact.address.lines.join(", ")}
              </li>
              <li>
                <strong>Email:</strong> <a href={`mailto:${contact.email}`}>{contact.email}</a>
                {" or "}
                <a href={`mailto:${contact.secondaryEmail}`}>{contact.secondaryEmail}</a>
              </li>
              <li>
                <strong>Contact number:</strong> <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
            </ul>
            <p>
              Please use the contact details above for questions about this policy, privacy concerns, consent withdrawal,
              correction requests or deletion requests. We will review and respond in accordance with applicable law.
            </p>
            <h2>Governing law</h2>
            <p>{site.legal.jurisdiction}</p>
          </div>
        </Container>
      </section>
    </>
  );
}
