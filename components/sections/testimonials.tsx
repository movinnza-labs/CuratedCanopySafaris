import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SafariImage, isImageKey } from "@/components/ui/safari-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDestinationName } from "@/lib/data/destinations";
import { testimonials } from "@/lib/data/testimonials";
import type { Testimonial } from "@/lib/data/types";
import { TestimonialPager } from "./testimonial-pager";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [first, ...rest] = testimonial.quote;
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-sand-300/60 bg-white p-6 shadow-card sm:p-7">
      <Icon name="quote" className="size-8 text-ochre-400" />
      <blockquote className="mt-4 flex-1 leading-relaxed text-ink-700">
        <p>{first}</p>
        {rest.length > 0 ? (
          <details className="group mt-3">
            <summary className="inline-flex items-center gap-1 text-sm font-semibold text-ochre-700 hover:text-ochre-800">
              <span className="group-open:hidden">Read the full review</span>{" "}
              <span className="hidden group-open:inline">Show less</span>
              <Icon name="chevronDown" className="size-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-3 space-y-3">
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>
          </details>
        ) : null}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-sand-200 pt-5">
        {isImageKey(testimonial.imageKey) ? (
          <SafariImage
            imageKey={testimonial.imageKey}
            alt={testimonial.author}
            sizes="56px"
            className="size-14 shrink-0 rounded-full object-cover object-top"
          />
        ) : null}
        <div>
          <p className="font-semibold text-forest-900">{testimonial.author}</p>
          <p className="text-sm text-ink-500">
            {[testimonial.location, testimonial.destinationSlug && `Visited ${getDestinationName(testimonial.destinationSlug)}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-sand-100 py-20 sm:py-24">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="What our guests say"
          intro="In the words of guests who have travelled with us."
          align="center"
        />
        <div className="mt-12">
          <TestimonialPager cards={testimonials.map((testimonial) => <TestimonialCard key={testimonial.id} testimonial={testimonial} />)} />
        </div>
      </Container>
    </section>
  );
}
