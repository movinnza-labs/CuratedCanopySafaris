import { todayInIndia } from "@/lib/utils";
import { packages } from "./packages";
import type { Departure, SafariPackage } from "./types";

export function getPackagesForDestination(slug: string): SafariPackage[] {
  return packages.filter((pkg) => pkg.destinationSlug === slug);
}

/** A departure can be booked until the day it starts (India time). */
export function isUpcoming(departure: Departure, today = todayInIndia()): boolean {
  return departure.start > today;
}

export function splitDepartures(pkg: SafariPackage, today = todayInIndia()) {
  const upcoming = pkg.departures.filter((d) => isUpcoming(d, today));
  const past = pkg.departures.filter((d) => !isUpcoming(d, today));
  return { upcoming, past };
}

export function countUpcoming(slug: string, today = todayInIndia()): number {
  return getPackagesForDestination(slug).reduce((n, pkg) => n + splitDepartures(pkg, today).upcoming.length, 0);
}

/** Summary used on destination cards: the published fare(s) and duration for the park. */
export function getPackageSummary(slug: string) {
  const pkgs = getPackagesForDestination(slug);
  if (pkgs.length === 0) return undefined;
  const prices = pkgs.map((p) => p.price.amount);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const durations = [...new Set(pkgs.flatMap((p) => p.departures.map((d) => d.duration)))];
  const seasonYears = [...new Set(pkgs.flatMap((p) => p.departures.map((d) => d.start.slice(0, 4))))];
  return { min, max, durations, seasonYears, packageCount: pkgs.length };
}
