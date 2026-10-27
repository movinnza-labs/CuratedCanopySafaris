import { Icon } from "@/components/ui/icon";
import { site } from "@/lib/data/site";

/**
 * Sticky WhatsApp button on every page. Bottom-right on desktop (the Ask Us tab sits mid-way up the right edge);
 * on phones it stacks above the Ask Us pill so both stay tappable, clear of the home indicator.
 */
export function WhatsAppButton() {
  return (
    <a
      href={site.contact.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      title="Chat with us on WhatsApp"
      className="fixed right-3.5 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-[#1f9e4f] text-white shadow-xl ring-4 ring-white/70 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[#178a43] sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))]"
    >
      <Icon name="whatsapp" className="size-7" strokeWidth={2} />
    </a>
  );
}
