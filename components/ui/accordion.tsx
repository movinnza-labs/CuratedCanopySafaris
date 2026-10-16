import { cn } from "@/lib/utils";
import { Icon } from "./icon";

type AccordionItemProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /** Items sharing a name behave as an exclusive group (only one open at a time). */
  name?: string;
};

/** Native <details>/<summary>: keyboard and screen-reader accessible with no client JavaScript. */
export function AccordionItem({ title, children, defaultOpen, className, name }: AccordionItemProps) {
  return (
    <details
      name={name}
      open={defaultOpen}
      className={cn("group rounded-2xl border border-sand-300/70 bg-white/70 transition-colors open:bg-white", className)}
    >
      <summary className="flex items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-forest-900 sm:px-6">
        <span>{title}</span>
        <Icon
          name="chevronDown"
          className="size-5 shrink-0 text-ochre-600 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-5 pb-5 text-ink-700 sm:px-6">{children}</div>
    </details>
  );
}
