import { cn } from "@/lib/utils";

type HomeHeadingProps = {
  eyebrow?: string;
  kicker?: string;
  title: string;
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/** Eyebrow / kicker / title stack used across the homepage (text is rendered exactly as provided). */
export function HomeHeading({ eyebrow, kicker, title, id, align = "left", tone = "light", className }: HomeHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-bold tracking-[0.28em] uppercase",
            align === "center" && "justify-center",
            dark ? "text-ochre-200" : "text-ochre-600",
          )}
        >
          <span aria-hidden className={cn("rule-draw h-px w-10 origin-right", dark ? "bg-ochre-200/70" : "bg-ochre-500/60")} />
          {eyebrow}
          {align === "center" ? <span aria-hidden className={cn("rule-draw h-px w-10 origin-left", dark ? "bg-ochre-200/70" : "bg-ochre-500/60")} /> : null}
        </p>
      ) : null}
      {kicker ? (
        <p className={cn("mt-4 text-sm font-semibold tracking-[0.2em] uppercase", dark ? "text-sand-200" : "text-ochre-700")}>{kicker}</p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "mt-3 text-[2.1rem] leading-[1.08] font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem]",
          dark ? "text-white" : "text-forest-900",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
