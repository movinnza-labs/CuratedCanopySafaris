import type { Itinerary } from "@/lib/data/types";

export function ItineraryPanel({ itinerary }: { itinerary: Itinerary }) {
  return (
    <div>
      {itinerary.subtitle ? <p className="mb-4 text-sm font-semibold text-ink-500">{itinerary.subtitle}</p> : null}
      <ol className="relative space-y-6 border-l-2 border-ochre-200 pl-6">
        {itinerary.days.map((day) => (
          <li key={day.label} className="relative">
            <span aria-hidden className="absolute top-1 -left-[1.95rem] size-3.5 rounded-full border-2 border-ochre-500 bg-white" />
            <p className="font-sans text-sm font-bold tracking-wide text-ochre-700 uppercase">{day.label}</p>
            <p className="mt-1 leading-relaxed text-ink-700">{day.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
