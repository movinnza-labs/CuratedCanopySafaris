"use client";

import { useEffect, useRef } from "react";

type HeroVideoProps = { src: string; srcSmall: string; poster: string };

/**
 * Background video, same behaviour as the live site (autoplay, muted, loop, plays inline on mobile).
 * The <video> is in the server HTML so the browser starts it immediately; the poster shows the first frame
 * until playback begins. The effect below re-asserts `muted` and calls play(), because React does not
 * serialise the `muted` attribute into server HTML, which some browsers require for autoplay.
 */
export function HeroVideo({ src, srcSmall, poster }: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    const tryPlay = () => {
      video.play().catch(() => {
        /* Autoplay blocked (e.g. battery saver): the poster frame stays visible. */
      });
    };
    tryPlay();
    // Resume if the tab was hidden and the browser paused it.
    const onVisible = () => document.visibilityState === "visible" && video.paused && tryPlay();
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={srcSmall} type="video/mp4" media="(max-width: 899px)" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
