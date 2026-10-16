import type { NamedItem } from "@/lib/data/types";

export function ZoneList({ items }: { items: NamedItem[] }) {
  return (
    <ol className="grid gap-5 sm:grid-cols-2">
      {items.map((zone, index) => (
        <li key={zone.name} className="relative overflow-hidden rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card">
          <span aria-hidden className="absolute -top-3 right-4 font-display text-7xl font-semibold text-sand-200">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="relative text-xl font-semibold text-forest-900">{zone.name}</h3>
          <p className="relative mt-2 leading-relaxed text-ink-600">{zone.description}</p>
        </li>
      ))}
    </ol>
  );
}
