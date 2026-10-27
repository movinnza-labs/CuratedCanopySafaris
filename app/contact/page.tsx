import Link from "next/link";
import { ContactDetails } from "@/components/sections/contact-details";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { destinations } from "@/lib/data/destinations";
import { site } from "@/lib/data/site";
import { breadcrumbJsonLd, pageJsonLd } from "@/lib/seo/json-ld";
import { pageH1, pageMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
];

export const metadata = pageMetadata("/contact", {
  title: "Contact Us – Book Your Wildlife Adventure",
  description:
    "Get in touch with Curated Canopy Safaris to plan your perfect wildlife safari. Contact our experts for bookings, custom itineraries, and travel assistance across India.",
});

type Props = { searchParams: Promise<{ destination?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { destination } = await searchParams;
  const options = destinations.map((d) => d.name);
  const requested = typeof destination === "string" && options.includes(destination) ? destination : undefined;

  return (
    <>
      <PageHero
        title={pageH1("/contact", "Contact Us")}
        eyebrow="Let’s plan your next wild expedition"
        intro="Tell us where and when you’d like to go — our team will get in touch with you very soon."
        imageKey="heroTigerByWater"
        breadcrumbs={breadcrumbs}
      />
      <section aria-labelledby="contact-form-title" className="py-20 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Get in touch" title="Talk to our team" />
            <div className="mt-10">
              <ContactDetails />
            </div>
            <p className="mt-10 rounded-2xl bg-sand-100 p-5 text-sm leading-relaxed text-ink-700">
              {site.internationalNote}{" "}
              <a href={`mailto:${site.contact.email}`} className="font-semibold break-all text-ochre-700 hover:underline">
                {site.contact.email}
              </a>
              .
            </p>
          </div>
          <div className="rounded-[2rem] border border-sand-300/70 bg-white p-6 shadow-card sm:p-10 lg:col-span-3">
            <h2 id="contact-form-title" className="text-2xl font-semibold text-forest-900 sm:text-3xl">
              Send us an enquiry
            </h2>
            <p className="mt-2 text-ink-600">
              Still choosing a park?{" "}
              <Link href="/safari-packages" className="font-semibold text-ochre-700 underline underline-offset-4">
                Browse safari packages
              </Link>{" "}
              first, or tell us what you have in mind below. Fields marked * are required.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl bg-forest-50 p-4">
              <p className="flex items-center gap-2 font-semibold text-forest-900">
                <Icon name="clock" className="size-5 text-forest-600" />
                We reply within a few hours.
              </p>
              <ButtonLink href={site.contact.whatsappHref} external variant="outline" size="sm" icon="whatsapp" iconPosition="start">
                WhatsApp us
              </ButtonLink>
            </div>
            <div className="mt-8">
              <EnquiryForm destinations={options} defaultDestination={requested} showCity />
            </div>
          </div>
        </Container>
      </section>
      <JsonLd data={pageJsonLd("/contact") ?? breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
