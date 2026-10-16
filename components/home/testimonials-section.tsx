import { Reveal } from "@/components/ui/reveal";
import { testimonials, testimonialsIntro } from "@/lib/data/home";
import { HomeHeading } from "./home-heading";
import { TestimonialCarousel } from "./testimonial-carousel";

export function TestimonialsSection() {
  return (
    <section aria-labelledby="testimonials-title" className="relative isolate overflow-hidden bg-forest-900 py-24 text-white sm:py-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_10%,rgb(156_99_45/0.35)_0%,transparent_70%),radial-gradient(50%_60%_at_5%_90%,rgb(98_117_89/0.45)_0%,transparent_70%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ochre-300/40 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal from="zoom">
          <HomeHeading id="testimonials-title" eyebrow={testimonialsIntro.eyebrow} title={testimonialsIntro.title} align="center" tone="dark" />
        </Reveal>
        <Reveal delay={150} className="mt-16 sm:mt-20">
          <TestimonialCarousel items={testimonials} />
        </Reveal>
      </div>
    </section>
  );
}
