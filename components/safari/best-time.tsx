import { Icon, type IconName } from "@/components/ui/icon";
import type { Season } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const seasonStyle: Record<Season["name"], { icon: IconName; accent: string }> = {
  Winter: { icon: "snowflake", accent: "bg-forest-50 text-forest-600" },
  Summer: { icon: "sun", accent: "bg-ochre-50 text-ochre-600" },
  Monsoon: { icon: "cloudRain", accent: "bg-sand-200 text-ink-600" },
};

export function BestTime({ seasons }: { seasons: Season[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {seasons.map((season) => {
        const style = seasonStyle[season.name];
        return (
          <li key={season.name} className="rounded-3xl border border-sand-300/70 bg-white p-6 shadow-card">
            <span className={cn("grid size-12 place-items-center rounded-2xl", style.accent)}>
              <Icon name={style.icon} className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold text-forest-900">{season.name}</h3>
            {season.months ? <p className="mt-1 text-sm font-semibold text-ochre-700">{season.months}</p> : null}
            <ul className="mt-3 space-y-2 leading-relaxed text-ink-600">
              {season.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
