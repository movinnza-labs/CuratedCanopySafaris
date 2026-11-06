import { todayInIndia } from "@/lib/utils";
import { packages } from "./packages";
import type { Departure, SafariPackage } from "./types";

/** Published fares are "INR x/- + 5% GST". */
export const GST_RATE = 0.05;

/** Most guests one online booking can pay for (larger groups are arranged with the team). */
export const MAX_GUESTS_PER_BOOKING = 8;

/** Pickup choices on the booking form: the guest's own arrangement, or one of the package's group-transfer points. */
export function pickupOptions(pkg: SafariPackage): string[] {
  return ["Own arrangement", ...(pkg.pickupPoints ?? []).map((point) => `Group transfer from ${point}`)];
}

export function getPackagesForDestination(slug: string): SafariPackage[] {
  return packages.filter((pkg) => pkg.destinationSlug === slug);
}

export function getPackage(id: string): SafariPackage | undefined {
  return packages.find((pkg) => pkg.id === id);
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

/** A park's packages to show: those with dates still open, or all of them when none has any (so a holding card appears). */
export function getActivePackages(slug: string, today = todayInIndia()): SafariPackage[] {
  const all = getPackagesForDestination(slug);
  const open = all.filter((pkg) => splitDepartures(pkg, today).upcoming.length > 0);
  return open.length > 0 ? open : all;
}

/** A departure that can still be booked online on this site (it has no external booking form). */
export function getBookableDeparture(packageId: string, start: string, today = todayInIndia()) {
  const pkg = getPackage(packageId);
  const departure = pkg?.departures.find((d) => d.start === start);
  if (!pkg || !departure || departure.bookingUrl || !isUpcoming(departure, today)) return undefined;
  return { pkg, departure };
}

/** Fare for a booking, worked out on the server from the published price so it cannot be edited in the browser. */
export function quote(pkg: SafariPackage, guests: number) {
  const base = pkg.price.amount * guests;
  const gst = Math.round(base * GST_RATE * 100) / 100;
  return { perPerson: pkg.price.amount, base, gst, total: base + gst };
}

export function countUpcoming(slug: string, today = todayInIndia()): number {
  return getPackagesForDestination(slug).reduce((n, pkg) => n + splitDepartures(pkg, today).upcoming.length, 0);
}

/** Summary used on destination cards: the fare(s) and duration of the park's current packages. */
export function getPackageSummary(slug: string, today = todayInIndia()) {
  const pkgs = getActivePackages(slug, today);
  if (pkgs.length === 0) return undefined;
  const prices = pkgs.map((p) => p.price.amount);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const durations = [...new Set(pkgs.flatMap((p) => p.departures.map((d) => d.duration)))];
  const seasonYears = [...new Set(pkgs.flatMap((p) => p.departures.map((d) => d.start.slice(0, 4))))];
  return { min, max, durations, seasonYears, packageCount: pkgs.length };
}
