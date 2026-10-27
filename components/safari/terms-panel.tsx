import { Icon } from "@/components/ui/icon";
import type { TermsPolicy } from "@/lib/data/types";

export function TermsPanel({ terms }: { terms: TermsPolicy }) {
  return (
    // Two columns only when the panel itself is wide enough (it also sits in the narrow schedule sidebar).
    <div className="@container">
      <div className="grid gap-8 @lg:grid-cols-2">
      <div>
        <h3 className="font-sans text-sm font-bold tracking-wide text-forest-900 uppercase">What is included</h3>
        <ul className="mt-3 space-y-2.5">
          {terms.included.map((item) => (
            <li key={item} className="flex gap-3 text-ink-700">
              <Icon name="check" className="mt-0.5 size-5 shrink-0 text-forest-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-sans text-sm font-bold tracking-wide text-forest-900 uppercase">What is not included</h3>
        <ul className="mt-3 space-y-2.5">
          {terms.notIncluded.map((item) => (
            <li key={item} className="flex gap-3 text-ink-700">
              <Icon name="x" className="mt-0.5 size-5 shrink-0 text-ochre-600" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-sans text-sm font-bold tracking-wide text-forest-900 uppercase">Payment terms</h3>
        <ul className="mt-3 space-y-2 text-ink-700">
          {terms.payment.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-sans text-sm font-bold tracking-wide text-forest-900 uppercase">Cancellation terms</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-700 marker:text-ochre-500">
          {terms.cancellation.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
