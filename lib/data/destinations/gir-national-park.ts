import type { Destination } from "../types";

export const gir: Destination = {
  slug: "gir-national-park",
  name: "Gir National Park",
  shortName: "Gir",
  state: "Gujarat",
  tagline: "In the Land of the Lion",
  summary:
    "Gir National Park stands apart from India’s other wild places. It covers 4 districts – Junagadh, Gir, Somnath and Amreli. This is the last natural home of the Asiatic lion, a species that has shaped—and been shaped by—this dry, open forest of western Gujarat.",
  seo: {
    title: "Gir Lion Safari Booking | Asiatic Lion Tours in Gujarat",
    description:
      "Book your Gir Lion Safari and witness the world’s last wild Asiatic lions in their natural habitat. Guided jungle safaris & tour packages available. Book now!",
  },
  imageKeys: ["girLions", "girLioness"],
  intro: [
    {
      heading: "In the Land of the Lion – Gir National Park",
      paragraphs: [
        "Gir National Park stands apart from India’s other wild places. It covers 4 districts – Junagadh, Gir, Somnath and Amreli. This is the last natural home of the Asiatic lion, a species that has shaped—and been shaped by—this dry, open forest of western Gujarat. Gir is not dense or remote; it is a working landscape where scrub, rocky hills, and wide valleys meet human life without sharp boundaries.",
        "The forest here is built for visibility. Trees grow spaced apart, the ground is largely open, and dry riverbeds cut long lines through the land. Heat dominates much of the year, and water dictates movement, drawing life toward streams and reservoirs during the harsher months. The terrain offers little concealment, yet it provides exactly what the lion requires—space, prey, and tolerance.",
        "Gir also has a healthy leopard population, although not frequently seen.",
        "Gir has a rich birdlife too. There are around 350 species of birds seen in and around Gir.",
        "What truly distinguishes Gir is coexistence. Maldhari communities live within the forest, grazing livestock and moving with the seasons. The lion survives not behind walls, but through long-standing acceptance, adapting to a landscape shared with people rather than separated from them.",
        "Gir’s lions are not symbols of wilderness at a distance; they are part of a living, negotiated space. Rooted in history, shaped by restraint, and sustained by balance, Gir remains one of the world’s rare places where a large predator endures not in isolation, but in continuity with the land and its people.",
      ],
    },
  ],
  about: {
    heading: "Gir National Park",
    paragraphs: [
      "Gir National Park, located in Gujarat across Junagadh, Gir Somnath, and Amreli districts, is the only place in the world where you can see Asiatic lions in the wild.",
      "The landscape is dry and open, with scrub forests, rocky hills, and wide valleys. Seasonal rivers and water sources attract animals, especially in summer, leading to more frequent and clearer wildlife sightings.",
    ],
  },
  wildlife: {
    heading: "Gir National Park Jungle Safari Experience",
    paragraphs: [
      "The Asiatic lion is the main highlight of a Gir safari. Unlike other reserves, lions here are often seen in open areas, resting under trees or walking along forest tracks.",
      "The park has a good population of prey animals like chital, sambar, nilgai, and wild boar, which helps maintain a healthy ecosystem.",
      "Leopards are also found in Gir, though they are harder to spot as they are more elusive.",
      "Overall, the safari experience here feels more open and easier to navigate, rather than dense and closed.",
      "Gir is also home to many bird species, with around 300–350 recorded. Birds can be seen near water bodies, in forests, and in open areas, adding to the overall experience.",
    ],
  },
  zones: {
    heading: "Safari Zones in Gir National Park",
    intro: "Gir has a few safari areas, each offering a slightly different experience.",
    items: [
      {
        name: "Gir Core Zone Safari",
        description: "The main safari area where you have the best chance of seeing Asiatic lions in their natural habitat.",
      },
      {
        name: "Gir Devalia Safari Park",
        description: "A fenced area where wildlife can be seen more easily in a shorter time, in a more controlled setting.",
      },
      {
        name: "Gir Interpretation Zone Safari",
        description:
          "Focuses more on understanding the ecosystem, while still offering chances to see wildlife in a controlled environment.",
      },
    ],
  },
  safariExperience: {
    heading: "Gir National Park Safari Timings",
    intro: "Timings may vary slightly depending on the season.",
    items: [
      { name: "Morning Safari", description: "Better chances of wildlife sightings." },
      { name: "Evening Safari", description: "Good for observing animal movement and enjoying the landscape." },
    ],
  },
  // NOTE: The original page labelled April – June as "Winter" and December – March as "Summer". The months and
  // notes are kept exactly as published; only the two season labels are swapped back. Flagged in AUDIT.md.
  bestTime: [
    {
      name: "Winter",
      months: "December – March",
      notes: ["Pleasant weather and good overall sightings."],
    },
    {
      name: "Summer",
      months: "April – June",
      notes: ["Higher chances of spotting lions near water sources."],
    },
    {
      name: "Monsoon",
      months: "July – October",
      notes: ["Park remains closed."],
    },
  ],
  howToReach: {
    byAir: "The nearest airport is Diu, with Rajkot offering better connectivity to major cities.",
    byTrain: "The closest railway stations are Junagadh and Veraval.",
    byRoad: "Gir is well connected by road from Ahmedabad, Rajkot, and Somnath.",
  },
};
