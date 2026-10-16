import { formatInr } from "@/lib/utils";

/** Published fares are "INR x/- + 5% GST"; the GST note is always shown alongside the amount. */
export function Price({ amount, max, className }: { amount: number; max?: number; className?: string }) {
  const range = typeof max === "number" && max !== amount;
  return (
    <span className={className}>
      <span className="font-semibold">
        INR {formatInr(amount)}
        {range ? `–${formatInr(max)}` : ""}
      </span>
      <span className="text-[0.85em] opacity-75"> + 5% GST</span>
    </span>
  );
}
