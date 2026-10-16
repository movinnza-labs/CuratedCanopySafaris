import Link from "next/link";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-sand-100/80">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-medium text-sand-50">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={cn("transition-colors hover:text-ochre-300")}>
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-sand-100/50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
