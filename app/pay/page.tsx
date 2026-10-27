import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { PaymentForm } from "@/components/sections/payment-form";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Pay Now", path: "/pay" },
];

export const metadata = {
  ...buildMetadata({
    title: "Pay Now",
    description: "Pay for your Curated Canopy Safaris booking securely online through Easebuzz by UPI, card, net banking or wallet.",
    path: "/pay",
  }),
  robots: { index: false, follow: true },
};

export default function PayPage() {
  const { contact } = site;
  return (
    <>
      <PageHero title="Pay Now" breadcrumbs={breadcrumbs} />
      <section className="py-16 sm:py-20">
        <Container size="narrow">
          <p className="mb-8 text-lg text-ink-700">
            Pay the amount quoted by our team for your safari booking. Please pay only after we have confirmed your booking and the
            amount. Payments are subject to our{" "}
            <Link href="/refund-cancellation-policy" className="font-semibold text-ochre-700 underline-offset-4 hover:underline">
              Refund and Cancellation Policy
            </Link>
            .
          </p>
          <PaymentForm />
          <p className="mt-10 text-sm text-ink-500">
            Questions about a payment? Call <a href={contact.phoneHref} className="font-semibold text-ochre-700">{contact.phone}</a> or
            email <a href={`mailto:${contact.email}`} className="font-semibold text-ochre-700">{contact.email}</a>.
          </p>
        </Container>
      </section>
    </>
  );
}
