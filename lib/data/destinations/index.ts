import type { Destination } from "../types";
import { bandhavgarh } from "./bandhavgarh-national-park";
import { dudhwa } from "./dudhwa-national-park";
import { gir } from "./gir-national-park";
import { jimCorbett } from "./jim-corbett-national-park";
import { kanha } from "./kanha-national-park";
import { kaziranga } from "./kaziranga-national-park";
import { panna } from "./panna-national-park";
import { pench } from "./pench-national-park";
import { pilibhit } from "./pilibhit-tiger-reserve";
import { ranthambore } from "./ranthambore-national-park";
import { satpura } from "./satpura-tiger-reserve";
import { tadoba } from "./tadoba-andhari-tiger-reserve";

/** In the order the original Safari Packages page lists them. */
export const destinations: Destination[] = [
  kanha,
  bandhavgarh,
  pench,
  panna,
  satpura,
  tadoba,
  dudhwa,
  pilibhit,
  jimCorbett,
  kaziranga,
  ranthambore,
  gir,
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

export function getDestinationName(slug: string): string {
  return getDestination(slug)?.name ?? slug;
}
