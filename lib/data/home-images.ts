// Homepage media: the highest-resolution copy of each image served by curatedcanopysafaris.com
// (the server's largest available size is 1600px wide). Images are not upscaled.
// Alt text follows the live site's alt attributes, with wrong park names fixed and guest names added for launch;
// "" marks images the live site used decoratively.
export type HomeImage = { src: string; alt: string; width: number; height: number; source: string };

export const homeImages = {
  "logo": {
    "src": "/images/home/curated-canopy-safaris-logo.png",
    "alt": "Curated Canopy Safaris",
    "width": 1032,
    "height": 240,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/01/logo-1.png"
  },
  "pugmarkLogo": {
    "src": "/images/home/pugmark-safaris-logo.jpg",
    "alt": "Pugmark Safaris",
    "width": 1131,
    "height": 883,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/01/Coffee-Break.jpg"
  },
  "aboutRaptor": {
    "src": "/images/home/about-tadoba-andhari-tiger-reserve.jpg",
    "alt": "Tadoba Andhari Tiger Reserve",
    "width": 430,
    "height": 553,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/ghfe-1-e1770257071326.jpg"
  },
  "ynTiger": {
    "src": "/images/home/young-naturalist-tiger.jpg",
    "alt": "",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/01/IMG_2586-Copy.jpg"
  },
  "ynShrike": {
    "src": "/images/home/young-naturalist-shrike.jpg",
    "alt": "",
    "width": 750,
    "height": 511,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/01/IMG_4409-1-e1769598670116.jpg"
  },
  "whyChital": {
    "src": "/images/home/why-choose-chital.jpg",
    "alt": "",
    "width": 1600,
    "height": 1029,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/01/chital-stag-and-fawn-kanha-NP.jpg"
  },
  "customEagle": {
    "src": "/images/home/custom-expeditions-tadoba.jpg",
    "alt": "Tadoba National Park",
    "width": 1600,
    "height": 2218,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Tadoba-2-1-scaled.jpg"
  },
  "enquiryStork": {
    "src": "/images/home/let-us-know-black-necked-stork.jpg",
    "alt": "black necked stork",
    "width": 694,
    "height": 493,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/black-necked-stork-Copy-e1770617688140.jpg"
  },
  "enquiryKanha": {
    "src": "/images/home/let-us-know-kanha.jpg",
    "alt": "Kanha National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Kanha-2nd-image.jpg"
  },
  "kanhaThumb": {
    "src": "/images/home/kanha-thumb.jpg",
    "alt": "Kanha National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_2661.jpg"
  },
  "kanhaBox": {
    "src": "/images/home/kanha-hardground-barahsingha.jpg",
    "alt": "Hard-ground barasingha in Kanha National Park",
    "width": 753,
    "height": 493,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Hardground-Barahsingha-e1770615176107.jpg"
  },
  "bandhavgarhThumb": {
    "src": "/images/home/bandhavgarh-tigress-on-river-bed.jpg",
    "alt": "Tigress on a riverbed in Bandhavgarh National Park",
    "width": 1600,
    "height": 1031,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/tigress-on-river-bed-in-bandhavgarh.jpg"
  },
  "bandhavgarhBox": {
    "src": "/images/home/bandhavgarh-national-park.jpg",
    "alt": "Bandhavgarh National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_0536-Copy-2-scaled.jpg"
  },
  "penchThumb": {
    "src": "/images/home/pench-crouching-tigress.jpg",
    "alt": "crouching tigress",
    "width": 537,
    "height": 630,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/crouching-tigress-k-e1770295618277.jpg"
  },
  "penchBox": {
    "src": "/images/home/pench-national-park.jpg",
    "alt": "Tigress in Pench National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_0624-scaled.jpg"
  },
  "pannaThumb": {
    "src": "/images/home/panna-thumb.jpg",
    "alt": "Panna National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_1963-1.jpg"
  },
  "pannaBox": {
    "src": "/images/home/panna-national-park.jpg",
    "alt": "Panna National Park",
    "width": 1600,
    "height": 1031,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Panna-2.jpg"
  },
  "satpuraThumb": {
    "src": "/images/home/satpura-thumb.jpg",
    "alt": "Satpura National Park",
    "width": 1600,
    "height": 1567,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Satpura-2.jpg"
  },
  "satpuraBox": {
    "src": "/images/home/satpura-national-park.jpg",
    "alt": "Satpura National Park",
    "width": 1600,
    "height": 1031,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Satpura.jpg"
  },
  "tadobaThumb": {
    "src": "/images/home/tadoba-thumb.jpg",
    "alt": "Tadoba Andhari Tiger Reserve",
    "width": 700,
    "height": 600,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_2661-2-1.jpg"
  },
  "tadobaBox": {
    "src": "/images/home/tadoba-national-park.jpg",
    "alt": "Tadoba Andhari Tiger Reserve",
    "width": 1600,
    "height": 2218,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Tadoba-2-scaled.jpg"
  },
  "dudhwaThumb": {
    "src": "/images/home/dudhwa-thumb.jpg",
    "alt": "Dudhwa National Park / Kishanpur Wildlife Sanctuary",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_7141.jpg"
  },
  "dudhwaBox": {
    "src": "/images/home/dudhwa-kishanpur.jpg",
    "alt": "Dudhwa National Park / Kishanpur Wildlife Sanctuary",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/vulture.jpg"
  },
  "pilibhitThumb": {
    "src": "/images/home/pilibhit-thumb.jpg",
    "alt": "Pilibhit Tiger Reserve",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/IMG_2586-Copy.jpg"
  },
  "pilibhitBox": {
    "src": "/images/home/pilibhit-national-park.jpg",
    "alt": "Pilibhit Tiger Reserve",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Pilibhit-scaled.jpg"
  },
  "corbettThumb": {
    "src": "/images/home/jim-corbett-thumb.jpg",
    "alt": "Jim Corbett National Park",
    "width": 700,
    "height": 600,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Jim-Corbett-2.jpg"
  },
  "corbettBox": {
    "src": "/images/home/jim-corbett-national-park.jpg",
    "alt": "Jim Corbett National Park",
    "width": 1600,
    "height": 1920,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Jim-Corbett.jpg"
  },
  "kazirangaThumb": {
    "src": "/images/home/kaziranga-thumb.jpg",
    "alt": "Kaziranga National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Kaziranga-2.jpg"
  },
  "kazirangaBox": {
    "src": "/images/home/kaziranga-national-park.jpg",
    "alt": "Kaziranga National Park",
    "width": 555,
    "height": 659,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/gfe-e1770293050430.jpg"
  },
  "ranthamboreThumb": {
    "src": "/images/home/ranthambore-thumb.jpg",
    "alt": "Ranthambore National Park",
    "width": 756,
    "height": 545,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/Ranthambore-e1770294067150.jpg"
  },
  "ranthamboreBox": {
    "src": "/images/home/ranthambore-chital-stag-and-fawn.jpg",
    "alt": "Chital deer in Ranthambore National Park",
    "width": 1600,
    "height": 1029,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/01/chital-stag-and-fawn-kanha-NP.jpg"
  },
  "girThumb": {
    "src": "/images/home/gir-lion-thumb.jpg",
    "alt": "Asiatic lion in Gir National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/gir-lion.jpg"
  },
  "girBox": {
    "src": "/images/home/gir-lion.jpg",
    "alt": "Asiatic lion in Gir National Park",
    "width": 1600,
    "height": 1067,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/gir-lion-2-scaled.jpg"
  },
  "t1": {
    "src": "/images/home/testimonial-dr-suneet-raut.jpg",
    "alt": "Dr Suneet Raut",
    "width": 1080,
    "height": 1543,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-10-at-11.53.51.jpeg"
  },
  "t2": {
    "src": "/images/home/testimonial-dr-susheela-raut.jpg",
    "alt": "Dr. Susheela Raut",
    "width": 720,
    "height": 1280,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-10-at-11.53.52.jpeg"
  },
  "t3": {
    "src": "/images/home/testimonial-dr-geeta-raju.jpg",
    "alt": "Dr. Geeta Raju",
    "width": 583,
    "height": 644,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-10-at-11.54.15.jpeg"
  },
  "t4": {
    "src": "/images/home/testimonial-dr-surya-raju.jpg",
    "alt": "Dr. Surya Raju",
    "width": 806,
    "height": 1215,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-10-at-19.16.48.jpeg"
  },
  "t5": {
    "src": "/images/home/testimonial-dr-shobha-sankhe.jpg",
    "alt": "Dr. Shobha Sankhe",
    "width": 584,
    "height": 1145,
    "source": "https://curatedcanopysafaris.com/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-11-at-10.39.18.jpeg"
  }
} as const satisfies Record<string, HomeImage>;

export type HomeImageKey = keyof typeof homeImages;
