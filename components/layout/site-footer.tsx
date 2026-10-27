import Link from "next/link";
import { HomeImage } from "@/components/ui/home-image";
import { InlineText } from "@/components/ui/inline-text";
import { footer } from "@/lib/data/home";

const contactIcons = {
  phone: (
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

function FooterLinks({ id, title, links }: { id: string; title: string; links: readonly { label: string; href: string }[] }) {
  const className = "inline-block text-white/85 transition-[color,transform] duration-300 hover:translate-x-1 hover:text-white";
  return (
    <nav aria-labelledby={id}>
      {/* Styled text, not a heading, so footer labels stay out of every page outline. */}
      <p id={id} className="font-display text-xl font-semibold text-sand-100">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {links.map((item) => (
          <li key={item.label}>
            {item.href.startsWith("http") ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                {item.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={item.href} className={className}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ochre-700 text-white">
      {/* Brand-brown footer (live site: #A1612C) with a subtle depth gradient. */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_0%,#b0703a_0%,transparent_60%),linear-gradient(180deg,#9c632d_0%,#6f4420_100%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-sand-200" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-3">
            <Link href="/" aria-label="Curated Canopy Safaris — Home" className="inline-block rounded-2xl bg-[#eff1df] p-3 shadow-lg transition-transform duration-300 hover:-translate-y-0.5">
              <HomeImage imageKey="pugmarkLogo" sizes="168px" className="h-auto w-[168px] rounded-xl" />
            </Link>
            <p className="mt-6 max-w-xs leading-relaxed text-white/90">{footer.subsidiary}</p>
            <p className="mt-3 max-w-xs leading-relaxed text-white/80">{footer.incorporation}</p>
          </div>

          <div className="lg:col-span-2">
            <FooterLinks id="footer-quick-links" title={footer.quickLinksTitle} links={footer.quickLinks} />
          </div>

          <div className="lg:col-span-3">
            <FooterLinks id="footer-policy-links" title={footer.policyLinksTitle} links={footer.policyLinks} />
          </div>

          <div className="lg:col-span-4">
            <p className="font-display text-xl font-semibold text-sand-100">{footer.contactTitle}</p>
            <ul className="mt-5 space-y-3.5">
              {footer.contacts.map((contact) => (
                <li key={contact.label}>
                  <a href={contact.href} className="group flex items-start gap-3 [overflow-wrap:anywhere] text-white/85 transition-colors hover:text-white">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                      <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        {contactIcons[contact.kind as keyof typeof contactIcons]}
                      </svg>
                    </span>
                    <span className="pt-1">{contact.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border-t border-white/15 pt-8 text-sm leading-relaxed font-semibold text-white/85">{footer.gstin}</p>
        <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/80">
          <InlineText parts={footer.copyright} linkClassName="font-semibold text-white underline-offset-4 hover:underline" />
        </p>
      </div>
    </footer>
  );
}
