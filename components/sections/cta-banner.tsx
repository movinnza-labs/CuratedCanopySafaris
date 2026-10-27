import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SafariImage } from "@/components/ui/safari-image";
import { site } from "@/lib/data/site";

type CtaBannerProps = {
  /** Optional text link under the buttons, e.g. a page's end-of-page internal link. */
  link?: { label: string; href: string };
};

/** "Get started — Start Your Wildlife Visual Journey" band from the original About/Team/Contact pages. */
export function CtaBanner({ link }: CtaBannerProps = {}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-20">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-forest-900 px-6 py-14 sm:px-12 lg:px-16">
          <SafariImage imageKey="heroChital" fill sizes="(min-width: 1280px) 1216px, 100vw" className="-z-10 object-cover opacity-35" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950 via-forest-950/80 to-forest-950/30" />
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-ochre-300 uppercase">Plan your safari</p>
            <h2 id="cta-title" className="mt-3 text-3xl leading-tight font-semibold text-sand-50 sm:text-4xl">
              Start your wildlife visual journey
            </h2>
            <p className="mt-4 text-lg text-sand-100/80">
              Tell us your preferred park and dates. For international guests and luxury tours, write to{" "}
              <a href={`mailto:${site.contact.email}`} className="font-semibold break-all text-ochre-200 underline-offset-4 hover:underline">
                {site.contact.email}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact" size="lg" icon="arrowRight">
                Get started
              </ButtonLink>
              <ButtonLink href={site.contact.whatsappHref} external variant="light" size="lg" icon="whatsapp" iconPosition="start">
                WhatsApp us
              </ButtonLink>
            </div>
            {link ? (
              <p className="mt-6 text-sand-100/80">
                Or{" "}
                <Link href={link.href} className="font-semibold text-ochre-200 underline underline-offset-4 hover:text-ochre-100">
                  {link.label}
                </Link>
                .
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
