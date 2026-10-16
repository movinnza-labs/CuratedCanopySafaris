export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Today's date in India (YYYY-MM-DD), used to decide whether a departure is still upcoming.
 * Set DEPARTURES_AS_OF=YYYY-MM-DD to preview the schedules as of another date (QA only).
 */
export function todayInIndia(now: Date = new Date()): string {
  const override = process.env.DEPARTURES_AS_OF;
  if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }): string {
  return new Intl.DateTimeFormat("en-IN", { ...options, timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount);
}
