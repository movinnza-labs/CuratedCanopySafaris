import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/data/site";

export const metadata: Metadata = { title: "Payment status", robots: { index: false, follow: false } };

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Pay Now", path: "/pay" },
  { name: "Payment status", path: "/pay/result" },
];

const outcomes = {
  success: { title: "Payment received", text: "Thank you! Your payment was successful. Our team will confirm it with you shortly." },
  cancelled: { title: "Payment cancelled", text: "You cancelled the payment, so no money was taken. You can try again whenever you are ready." },
  failed: { title: "Payment failed", text: "The payment did not go through. If money was debited, your bank will reverse it automatically." },
  unverified: {
    title: "We could not confirm this payment",
    text: "We could not verify the response from the payment gateway. Please contact our team with your transaction ID before paying again.",
  },
} as const;

export default async function PaymentResultPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const status = params.status && params.status in outcomes ? (params.status as keyof typeof outcomes) : "unverified";
  const outcome = outcomes[status];
  const ok = status === "success";
  const { contact } = site;

  return (
    <>
      {/* Same slim header strip as /pay: a checkout screen, not a photo banner. */}
      <section aria-labelledby="page-title" className="bg-forest-950 pt-28 pb-10 text-sand-50 sm:pt-32 sm:pb-12">
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-4" />
          <h1 id="page-title" className="text-3xl font-semibold sm:text-4xl">
            Payment status
          </h1>
        </Container>
      </section>
      <section className="bg-sand-50 py-12 sm:py-16">
        <Container size="narrow">
          <div role="status" className={`rounded-2xl p-8 text-center ${ok ? "bg-forest-50" : "bg-sand-100"} text-forest-900`}>
            <Icon name={ok ? "check" : "info"} className="mx-auto size-10 text-ochre-500" />
            <h2 className="mt-4 font-display text-3xl">{outcome.title}</h2>
            <p className="mt-3 text-ink-700">{outcome.text}</p>
            {params.txnid || params.amount ? (
              <dl className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-x-4 gap-y-2 text-left text-sm">
                {params.txnid ? (
                  <>
                    <dt className="font-semibold">Transaction ID</dt>
                    <dd className="break-all">{params.txnid}</dd>
                  </>
                ) : null}
                {params.ref ? (
                  <>
                    <dt className="font-semibold">Easebuzz ID</dt>
                    <dd className="break-all">{params.ref}</dd>
                  </>
                ) : null}
                {params.amount ? (
                  <>
                    <dt className="font-semibold">Amount</dt>
                    <dd>₹{params.amount}</dd>
                  </>
                ) : null}
              </dl>
            ) : null}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {ok ? (
                <ButtonLink href="/">Back to home</ButtonLink>
              ) : (
                <ButtonLink href="/pay" icon="arrowRight">
                  Try again
                </ButtonLink>
              )}
              <ButtonLink href={contact.whatsappHref} external variant="outline" icon="whatsapp" iconPosition="start">
                WhatsApp us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
