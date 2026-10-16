import { ContactDetails } from "@/components/sections/contact-details";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { destinations } from "@/lib/data/destinations";
import { site } from "@/lib/data/site";
import { breadcrumbJsonLd } from "@/lib/seo/json-ld";
import { buildMetadata } from "@/lib/seo/metadata";

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Contact Us", path: "/contact" },
];

export const metadata = buildMetadata({
  title: "Contact Us – Book Your Wildlife Adventure",
  description:
    "Get in touch with Curated Canopy Safaris to plan your perfect wildlife safari. Contact our experts for bookings, custom itineraries, and travel assistance across India.",
  path: "/contact",
});

type Props = { searchParams: Promise<{ destination?: string | string[] }> };

export default async function ContactPage({ searchParams }: Props) {
  const { destination } = await searchParams;
  const options = [...destinations.map((d) => d.name), "Velavadar National Park"];
  const requested = typeof destination === "string" && options.includes(destination) ? destination : undefined;

  return (
    <>
      <PageHero
        title="Contact Us"
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
            <p className="mt-2 text-ink-600">Fields marked * are required.</p>
            <div className="mt-8">
              <EnquiryForm destinations={options} defaultDestination={requested} showCity />
            </div>
          </div>
        </Container>
      </section>
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
    </>
  );
}
