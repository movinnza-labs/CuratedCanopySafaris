import { Icon, type IconName } from "@/components/ui/icon";
import type { Destination } from "@/lib/data/types";

export function HowToReach({ howToReach }: { howToReach: NonNullable<Destination["howToReach"]> }) {
  const modes: { icon: IconName; label: string; text?: string }[] = [
    { icon: "plane", label: "By air", text: howToReach.byAir },
    { icon: "train", label: "By train", text: howToReach.byTrain },
    { icon: "road", label: "By road", text: howToReach.byRoad },
  ];
  const available = modes.filter((mode) => mode.text);

  return (
    <div>
      {howToReach.intro ? <p className="max-w-2xl text-lg leading-relaxed text-ink-600">{howToReach.intro}</p> : null}
      <ul className="mt-6 grid gap-5 md:grid-cols-3">
        {available.map((mode) => (
          <li key={mode.label} className="flex gap-4 rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-forest-50 text-forest-600">
              <Icon name={mode.icon} className="size-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-forest-900">{mode.label}</h3>
              <p className="mt-1 leading-relaxed text-ink-600">{mode.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
