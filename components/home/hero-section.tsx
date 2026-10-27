import Image from "next/image";
import { HomeImage } from "@/components/ui/home-image";
import { hero } from "@/lib/data/home";
import { pageH1 } from "@/lib/seo/metadata";
import { HeroVideo } from "./hero-video";

export function HeroSection() {
  // Keyword H1 from the launch SEO pack; the "We curate, you discover." slogan stays as the line below it.
  const title = pageH1("/", hero.title);
  const words = title.split(" ");
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-forest-950">
      {/* Media layer: poster (first video frame, LCP) + the background video, with a slow parallax on scroll. */}
      <div className="hero-media-parallax absolute inset-0 -z-20">
        <div className="absolute inset-0 animate-hero-reveal">
          <Image src={hero.poster} alt="" fill priority sizes="100vw" quality={80} className="object-cover" />
          <HeroVideo src={hero.videoMp4} srcSmall={hero.videoMp4Small} poster={hero.poster} />
        </div>
      </div>
      {/* The live site uses a 50% black overlay; a vignette keeps text crisp without flattening the video. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-black/45" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(0_0_0/0.45)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="hero-parallax mx-auto flex max-w-5xl flex-col items-center px-4 pt-28 pb-24 text-center sm:px-6">
        <div className="animate-zoom-in [animation-delay:150ms]">
          <HomeImage
            imageKey="logo"
            priority
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 280px"
            className="h-auto w-[280px] drop-shadow-[0_6px_24px_rgb(0_0_0/0.45)] sm:w-[420px] lg:w-[520px]"
          />
        </div>
        <h1
          id="hero-title"
          aria-label={title}
          className="mt-10 font-sans text-2xl font-light tracking-[0.18em] text-white uppercase sm:text-3xl lg:text-[2.6rem]"
        >
          {words.map((word, i) => (
            <span key={`${word}-${i}`} aria-hidden className="hero-word" style={{ "--i": i } as React.CSSProperties}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
        <p className="mt-5 animate-fade-up text-sm font-semibold tracking-[0.22em] text-sand-200 uppercase [animation-delay:950ms] sm:text-base lg:text-lg">
          {hero.title}
        </p>
        <ul className="mt-8 flex animate-fade-up flex-wrap justify-center gap-2.5 [animation-delay:1100ms] sm:gap-3">
          {hero.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-white backdrop-blur-sm sm:text-sm"
            >
              <svg aria-hidden viewBox="0 0 24 24" className="size-4 text-sand-200" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {highlight}
            </li>
          ))}
        </ul>
        <a
          href={hero.scrollTarget}
          className="group mt-10 grid size-16 animate-fade-in place-items-center rounded-full border border-white/40 text-white backdrop-blur-sm transition-colors duration-300 [animation-delay:1300ms] hover:border-sand-200 hover:bg-sand-200 hover:text-ochre-700"
        >
          <span className="sr-only">Scroll down to About us</span>
          {/* Same "download" arrow symbol as the live site's scroll button. */}
          <svg aria-hidden viewBox="0 0 24 24" className="size-7 animate-scroll-cue" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m-5-5 5 5 5-5" />
            <path d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
