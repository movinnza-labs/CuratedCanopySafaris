import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase",
            align === "center" && "justify-center",
            dark ? "text-ochre-300" : "text-ochre-700",
          )}
        >
          <span aria-hidden className={cn("h-px w-8", dark ? "bg-ochre-300/60" : "bg-ochre-600/50")} />
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={id}
        className={cn(
          "text-3xl leading-tight font-semibold sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-sand-50" : "text-forest-900",
        )}
      >
        {title}
      </Heading>
      {intro ? (
        <div className={cn("mt-4 text-[15px] leading-relaxed", dark ? "text-sand-100/80" : "text-ink-600")}>{intro}</div>
      ) : null}
    </div>
  );
}
