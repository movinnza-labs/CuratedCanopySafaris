import { PageHero } from "@/components/sections/page-hero";
import { BlogBody } from "@/components/sections/blog-body";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { refundPolicy } from "@/lib/data/content";
import { site } from "@/lib/data/site";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Refund and Cancellation Policy", path: "/refund-cancellation-policy" },
];

export const metadata = buildMetadata({
  title: "Refund and Cancellation Policy",
  description:
    "How Curated Canopy Safaris handles cancellations and refunds: resort and Forest Department policies, service charges, refund calculation and processing.",
  path: "/refund-cancellation-policy",
});

export default function RefundCancellationPolicyPage() {
  const { contact } = site;
  return (
    <>
      <PageHero title="Refund and Cancellation Policy" breadcrumbs={breadcrumbs} />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <BlogBody blocks={refundPolicy} />
          <div className="prose-safari">
            <h2>Cancellation and refund requests</h2>
            <p>
              Send cancellation and refund requests to <a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
              <a href={contact.phoneHref}>{contact.phone}</a>.
            </p>
          </div>
        </Container>
      </section>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
