import { Icon, type IconName } from "@/components/ui/icon";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

type Item = { icon: IconName; label: string; value: React.ReactNode; href?: string; external?: boolean };

export function ContactDetails({ tone = "light", showAddress = true }: { tone?: "light" | "dark"; showAddress?: boolean }) {
  const dark = tone === "dark";
  const items: Item[] = [
    { icon: "phone", label: "Call us", value: site.contact.phone, href: site.contact.phoneHref },
    { icon: "whatsapp", label: "WhatsApp", value: site.contact.phone, href: site.contact.whatsappHref, external: true },
    { icon: "mail", label: "Enquiries", value: site.contact.email, href: `mailto:${site.contact.email}` },
  ];
  if (showAddress) {
    items.push({
      icon: "mapPin",
      label: "Registered office",
      value: (
        <address className="not-italic">
          {site.contact.address.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      ),
    });
  }

  return (
    <ul className="grid gap-5">
      {items.map((item) => {
        const body = (
          <>
            <span
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full",
                dark ? "bg-white/10 text-ochre-300" : "bg-forest-50 text-forest-600",
              )}
            >
              <Icon name={item.icon} className="size-5" />
            </span>
            <span className="min-w-0">
              <span className={cn("block text-xs font-bold tracking-[0.15em] uppercase", dark ? "text-sand-100/60" : "text-ink-500")}>
                {item.label}
              </span>
              <span className={cn("mt-0.5 block font-semibold break-words", dark ? "text-sand-50" : "text-forest-900")}>{item.value}</span>
            </span>
          </>
        );
        return (
          <li key={`${item.label}-${item.icon}`}>
            {item.href ? (
              <a
                href={item.href}
                className="group flex items-start gap-4 transition-opacity hover:opacity-80"
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {body}
                {item.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            ) : (
              <div className="flex items-start gap-4">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
