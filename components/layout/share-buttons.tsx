"use client";

import { usePathname } from "next/navigation";
import { site } from "@/lib/data/site";

type Share = { network: "facebook" | "twitter"; label: string };

const icons = {
  facebook: <path d="M14 8h3V4h-3c-2.8 0-4.5 1.9-4.5 4.6V11H7v4h2.5v9h4v-9H16l.6-4h-3.1V8.9c0-.6.3-.9.5-.9Z" />,
  // The live site uses the Twitter bird icon.
  twitter: (
    <path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8A11.9 11.9 0 0 1 3 4.6a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.2 4.2 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.4 8.4 0 0 1 2 18.6a11.9 11.9 0 0 0 6.4 1.9c7.7 0 11.9-6.4 11.9-11.9v-.5A8.5 8.5 0 0 0 22 5.8Z" />
  ),
};

/** "Share on Facebook" / "Share on Twitter" buttons from the live footer: they share the page being viewed. */
export function ShareButtons({ items }: { items: readonly Share[] }) {
  const pathname = usePathname();
  const url = `${site.url}${pathname === "/" ? "/" : pathname}`;

  const open = (network: Share["network"]) => {
    const target =
      network === "facebook"
        ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        : `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
    window.open(target, "_blank", "noopener,noreferrer,width=640,height=560");
  };

  return (
    <ul className="flex gap-2.5">
      {items.map((item) => (
        <li key={item.network}>
          <button
            type="button"
            aria-label={item.label}
            title={item.label}
            onClick={() => open(item.network)}
            className="grid size-10 place-items-center rounded-full border border-white/25 text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-sand-200 hover:bg-sand-200 hover:text-ochre-700"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="size-[18px]" fill="currentColor">
              {icons[item.network]}
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
}
