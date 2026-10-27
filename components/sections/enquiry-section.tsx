import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { destinations } from "@/lib/data/destinations";
import { site } from "@/lib/data/site";
import { ContactDetails } from "./contact-details";
import { EnquiryForm } from "./enquiry-form";

type EnquirySectionProps = {
  title?: string;
  intro?: string;
  defaultDestination?: string;
  id?: string;
};

export function EnquirySection({
  title = "Let us know",
  intro = "Let us know your destination and preferred dates. Our team will get in touch with you very soon.",
  defaultDestination,
  id = "enquire",
}: EnquirySectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-forest-950 py-20 text-sand-100 sm:py-24">
      <Container className="grid gap-14 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionHeading id={`${id}-title`} eyebrow="Plan your safari" title={title} intro={intro} tone="dark" />
          <div className="mt-10">
            <ContactDetails tone="dark" showAddress={false} />
          </div>
          <p className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-relaxed text-sand-100/80">
            {site.internationalNote}{" "}
            <a href={`mailto:${site.contact.email}`} className="font-semibold break-all text-ochre-200 hover:underline">
              {site.contact.email}
            </a>
            .
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:col-span-3">
          <EnquiryForm
            tone="dark"
            destinations={destinations.map((d) => d.name)}
            defaultDestination={defaultDestination}
          />
        </div>
      </Container>
    </section>
  );
}
