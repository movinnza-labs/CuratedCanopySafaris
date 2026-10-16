import type { Destination } from "@/lib/data/types";
import { DestinationCard } from "./destination-card";

export function DestinationGrid({ destinations, priorityCount = 0 }: { destinations: Destination[]; priorityCount?: number }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {destinations.map((destination, index) => (
        <li key={destination.slug}>
          <DestinationCard destination={destination} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
