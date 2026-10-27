import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { RichText } from "@/components/ui/rich-text";
import { site } from "@/lib/data/site";
import type { BlogBlock } from "@/lib/data/types";

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="prose-safari">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "heading":
            return block.level === 2 ? <h2 key={key}>{block.text}</h2> : <h3 key={key}>{block.text}</h3>;
          case "paragraph":
            return (
              <p key={key}>
                <RichText text={block.text} />
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={key}>
                {block.items.map((item) => (
                  <li key={item.slice(0, 40)}>
                    <RichText text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "table":
            return (
              <div key={key} className="-mx-4 overflow-x-auto sm:mx-0">
                <table className="w-full min-w-[32rem] border-collapse overflow-hidden rounded-2xl text-left text-sm">
                  <thead className="bg-forest-900 text-sand-50">
                    <tr>
                      {block.head.map((cell) => (
                        <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                          {cell}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand-200 bg-white">
                    {block.rows.map((row, rowIndex) => (
                      <tr key={`${key}-${rowIndex}`}>
                        {row.map((cell, cellIndex) => (
                          <td key={`${key}-${rowIndex}-${cellIndex}`} className="px-4 py-3 align-top">
                            <RichText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={key} className="flex gap-4 rounded-2xl border border-ochre-200 bg-ochre-50 p-5 sm:p-6">
                <Icon name="info" className="mt-0.5 size-5 shrink-0 text-ochre-600" />
                <div>
                  {block.title ? <p className="font-semibold text-ochre-800">{block.title}</p> : null}
                  <p className={block.title ? "mt-1" : undefined}>
                    <RichText text={block.text} />
                  </p>
                </div>
              </aside>
            );
          case "faq":
            return (
              <section key={key} aria-labelledby={`${key}-title`} className="space-y-5">
                <h2 id={`${key}-title`}>{block.title ?? "Frequently asked questions"}</h2>
                {block.items.map((faq) => (
                  <div key={faq.question} className="space-y-2">
                    <h3>{faq.question}</h3>
                    <p>
                      <RichText text={faq.answer} />
                    </p>
                  </div>
                ))}
              </section>
            );
          case "cta":
            return (
              <aside key={key} className="flex gap-4 rounded-2xl border border-forest-200 bg-forest-50 p-5 sm:p-6">
                <Icon name="whatsapp" className="mt-0.5 size-5 shrink-0 text-forest-700" />
                <div>
                  <p className="font-semibold text-forest-900">{block.title}</p>
                  <p className="mt-1">
                    <RichText text={block.text} />
                  </p>
                  <ButtonLink
                    href={site.contact.whatsappHref}
                    external
                    variant="secondary"
                    size="sm"
                    icon="whatsapp"
                    iconPosition="start"
                    className="mt-4 no-underline"
                  >
                    {block.buttonLabel ?? "Chat on WhatsApp"}
                  </ButtonLink>
                </div>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
