import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { AskUsWidget } from "@/components/layout/ask-us-widget";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { site } from "@/lib/data/site";
import "./globals.css";

// Headings. (Replaced Fraunces, whose capital J is drawn short and drops below the baseline at display sizes.)
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  axes: ["opsz"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Best Wildlife Safari in India | Curated Canopy Safaris",
    template: "%s | Curated Canopy Safaris",
  },
  description:
    "Discover top wildlife safaris in India with expert-curated jungle tours, tiger reserves & national parks. Plan your dream safari adventure. Explore packages now!",
  applicationName: site.name,
  authors: [{ name: site.name }],
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#161d16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${newsreader.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint, so scroll-reveal content is only hidden when it can be revealed. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppButton />
        <AskUsWidget />
      </body>
    </html>
  );
}
