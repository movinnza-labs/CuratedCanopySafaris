import Link from "next/link";
import { PaymentForm } from "@/components/sections/payment-form";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/data/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = {
  ...buildMetadata({
    title: "Pay Now",
    description: "Pay for your Curated Canopy Safaris booking securely online through Easebuzz by UPI, card, net banking or wallet.",
    path: "/pay",
  }),
  robots: { index: false, follow: true },
};

/** Checkout page: just the payment form, no banner. */
export default function PayPage() {
  const { contact } = site;
  return (
    <>
      {/* Solid bar behind the transparent site header, whose text is white. */}
      <div aria-hidden className="h-[4.75rem] bg-forest-950 lg:h-[5.5rem]" />

      <section aria-labelledby="page-title" className="no-justify bg-sand-50 py-10 sm:py-14">
        <Container size="narrow">
          <div className="rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card sm:p-10">
            <div className="flex items-center gap-3 border-b border-sand-200 pb-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ochre-50 text-ochre-600">
                <Icon name="card" className="size-5" />
              </span>
              <div>
                <h1 id="page-title" className="text-2xl font-semibold text-forest-900 sm:text-3xl">
                  Pay Now
                </h1>
                <p className="text-sm text-ink-500">Secure payment by Easebuzz: UPI, cards, net banking or wallets.</p>
              </div>
            </div>
            <div className="mt-6">
              <PaymentForm />
            </div>
            <p className="mt-6 border-t border-sand-200 pt-5 text-sm text-ink-500">
              Please pay only after we have confirmed your booking and the amount. Payments are subject to our{" "}
              <Link href="/refund-cancellation-policy" className="font-semibold text-ochre-700 underline-offset-4 hover:underline">
                Refund and Cancellation Policy
              </Link>
              . Need help? Call{" "}
              <a href={contact.phoneHref} className="font-semibold text-ochre-700 hover:underline">
                {contact.phone}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
