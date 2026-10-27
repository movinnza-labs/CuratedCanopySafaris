import { Icon } from "@/components/ui/icon";
import { destinationPromises, howToBook, safariTips } from "@/lib/data/content";

/** "Why Choose Curated Canopy Safaris", "How to Book" and "Tips for Safarists" — shared by every destination page. */
export function BookingEssentials({ destinationName }: { destinationName: string }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl bg-forest-900 p-7 text-sand-100 lg:row-span-2">
        <h3 className="text-2xl font-semibold text-sand-50">Why choose Curated Canopy Safaris</h3>
        <ul className="mt-6 space-y-5">
          {destinationPromises.map((item) => (
            <li key={item.name} className="flex gap-3">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-ochre-300" />
              <p>
                <span className="font-semibold text-sand-50">{item.name}</span>{" "}
                <span className="block text-sm leading-relaxed text-sand-100/75">{item.description}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-sand-300/70 bg-white p-7 shadow-card lg:col-span-2">
        <h3 className="text-2xl font-semibold text-forest-900">How to book your {destinationName} safari</h3>
        <ol className="mt-5 grid gap-4 sm:grid-cols-3">
          {howToBook.map((step, index) => (
            <li key={step} className="rounded-2xl bg-sand-50 p-5">
              <span className="font-display text-3xl font-semibold text-ochre-500">{index + 1}</span>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-3xl border border-sand-300/70 bg-white p-7 shadow-card lg:col-span-2">
        <h3 className="text-2xl font-semibold text-forest-900">Tips for safarists</h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {safariTips.map((tip) => (
            <li key={tip.name} className="flex gap-3">
              <Icon name="binoculars" className="mt-0.5 size-5 shrink-0 text-ochre-600" />
              <p className="text-sm leading-relaxed text-ink-600">
                <span className="block font-semibold text-forest-900">{tip.name}</span>{" "}
                {tip.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
