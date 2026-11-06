// "A Glimpse of Our Real Safari Experiences": photos and videos from Curated Canopy Safaris trips, shared by the team (Nov 2026).
// Files live in public/images/gallery (photos and video posters) and public/media/gallery (videos, H.264 with faststart).
// Captions describe only what is visible; a park is named only where the footage itself names it.

export type GalleryItem = {
  id: string;
  type: "photo" | "video";
  /** Photo file, or the video's poster frame. */
  image: string;
  /** Video file (videos only). */
  video?: string;
  width: number;
  height: number;
  caption: string;
  /** Park, where the photo or video names it. */
  place?: string;
  /** Length in seconds (videos only). */
  duration?: number;
  /** Shown on the homepage mosaic: a lead tile, two portrait photos, then four landscape items. */
  featured?: boolean;
};

const photo = (id: string, width: number, height: number, caption: string, extra: Partial<GalleryItem> = {}): GalleryItem => ({
  id,
  type: "photo",
  image: `/images/gallery/${id}.jpg`,
  width,
  height,
  caption,
  ...extra,
});

const video = (id: string, width: number, height: number, duration: number, caption: string, extra: Partial<GalleryItem> = {}): GalleryItem => ({
  id,
  type: "video",
  image: `/images/gallery/${id}-poster.jpg`,
  video: `/media/gallery/${id}.mp4`,
  width,
  height,
  duration,
  caption,
  ...extra,
});

export const galleryIntro = {
  eyebrow: "From our safaris",
  title: "A Glimpse of Our Real Safari Experiences",
  text: "Authentic moments from our own safaris: wildlife sightings, early-morning drives and the guests who shared them with us. Every photo and video here was taken on a Curated Canopy Safaris trip.",
};

/** In display order: wildlife first, then the drives, then our guests. */
export const gallery: GalleryItem[] = [
  video("tiger-crossing-khapa-kanha", 640, 368, 88, "A tiger crosses the forest track", { place: "Khapa Buffer, Kanha", featured: true }),
  photo("tiger-at-waterhole", 720, 1280, "A tiger walks down to a forest waterhole", { featured: true }),
  photo("tiger-resting-on-track", 720, 1280, "Guests watch a tiger resting on the track from their gypsy", { featured: true }),
  photo("guests-in-sal-forest", 1280, 720, "Our guests together in the sal forest", { featured: true }),
  video("chital-doe-and-fawn", 640, 368, 7, "A chital doe nursing her fawn", { featured: true }),
  photo("guests-on-morning-safari", 1280, 720, "Cameras ready on a morning safari", { featured: true }),
  video("morning-drive-kanha", 368, 640, 24, "Morning drive through the forest", { place: "Kanha National Park" }),
  photo("gypsies-waiting-on-track", 720, 1280, "Safari gypsies wait quietly on the forest track"),
  video("birds-on-termite-mound", 640, 368, 26, "Birds perched on a termite mound in the meadow"),
  photo("group-beside-gypsy", 1280, 720, "A group photo beside the safari gypsy", { featured: true }),
  video("naturalist-and-tracker-kanha", 640, 368, 32, "Scanning the forest with our guide and tracker", { place: "Kanha National Park" }),
  photo("ready-for-the-drive", 720, 1280, "Ready for the next drive"),
  video("deer-on-forest-track", 640, 368, 68, "A deer pauses on the forest track"),
  photo("gypsies-at-park-gate", 1280, 720, "Safari gypsies lined up at the park gate"),
  video("night-drive", 480, 848, 47, "Headlights on the forest road during a night drive"),
  photo("group-at-the-lodge", 1280, 720, "Guests gather for a group photo"),
  photo("photographing-from-gypsy", 720, 1280, "Guests photographing wildlife from the gypsy"),
  video("through-the-forest", 640, 368, 49, "On the move through the forest"),
  photo("convoy-in-the-forest", 720, 1280, "A line of gypsies in the forest"),
  photo("guests-at-park-entrance", 1280, 720, "Guests at the park entrance"),
];

export const galleryCounts = {
  photos: gallery.filter((item) => item.type === "photo").length,
  videos: gallery.filter((item) => item.type === "video").length,
};
