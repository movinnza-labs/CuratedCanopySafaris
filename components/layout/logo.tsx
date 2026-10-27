import Image from "next/image";
import Link from "next/link";
import { homeImages } from "@/lib/data/home-images";
import { cn } from "@/lib/utils";

/** The original full-colour Curated Canopy Safaris logo (white lettering, so it sits on dark surfaces). */
export function Logo({ className, imageClassName, priority }: { className?: string; imageClassName?: string; priority?: boolean }) {
  const logo = homeImages.logo;
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="Curated Canopy Safaris — Home">
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        height={logo.height}
        priority={priority}
        sizes="(min-width: 1024px) 220px, 170px"
        className={cn("h-auto w-[170px] lg:w-[220px]", imageClassName)}
      />
    </Link>
  );
}
