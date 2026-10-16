import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import { SectionHeading } from "@/components/ui/section-heading";
import type { BookingBlock, BookingSection } from "@/lib/data/types";

function BlockBody({ block }: { block: BookingBlock }) {
  return (
    <>
      {block.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="leading-relaxed text-ink-600">
          <RichText text={paragraph} />
        </p>
      ))}
      {block.items?.length ? (
        <ul className="grid gap-4">
          {block.items.map((item) => (
            <li key={item.slice(0, 40)} className="flex gap-3 leading-relaxed text-ink-600">
              <Icon name="check" className="mt-1 size-5 shrink-0 text-ochre-600" />
              <p>
                <RichText text={item} />
              </p>
            </li>
          ))}
        </ul>
      ) : null}
      {block.table ? (
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <table className="w-full min-w-[32rem] border-collapse overflow-hidden rounded-2xl text-left text-sm">
            <thead className="bg-forest-900 text-sand-50">
              <tr>
                {block.table.head.map((cell) => (
                  <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-200 bg-white">
              {block.table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={cell} scope="row" className="px-4 py-3 align-top font-semibold text-forest-900">
                        {cell}
                      </th>
                    ) : (
                      <td key={cell} className="px-4 py-3 align-top text-ink-600">
                        <RichText text={cell} />
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {block.closing?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="leading-relaxed text-ink-600">
          <RichText text={paragraph} />
        </p>
      ))}
    </>
  );
}

/** Booking-service sections for international travellers (permits, zones, guides, pricing). */
export function BookingSections({ sections }: { sections: BookingSection[] }) {
  return (
    <div className="grid gap-16 sm:gap-20">
      {sections.map((section, index) => (
        <Container key={section.heading} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id={index === 0 ? "booking-title" : undefined}
              eyebrow={index === 0 ? "Booking with us" : undefined}
              title={section.heading}
            />
          </div>
          <div className="grid gap-5 text-lg [&_a]:font-semibold [&_a]:text-forest-700 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-ochre-700 lg:col-span-7">
            <BlockBody block={section} />
            {section.subsections?.map((sub) => (
              <article
                key={sub.heading}
                className="grid gap-4 rounded-3xl border border-sand-300/70 bg-white p-6 text-base shadow-card sm:p-8"
              >
                <h3 className="text-xl font-semibold text-forest-900 sm:text-2xl">{sub.heading}</h3>
                <BlockBody block={sub} />
              </article>
            ))}
          </div>
        </Container>
      ))}
    </div>
  );
}
