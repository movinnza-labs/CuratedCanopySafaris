import { AccordionItem } from "@/components/ui/accordion";
import { RichText } from "@/components/ui/rich-text";
import type { Faq } from "@/lib/data/types";

export function FaqList({ faqs, group }: { faqs: Faq[]; group: string }) {
  return (
    <div className="grid gap-3">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.question} title={faq.question} name={group} defaultOpen={index === 0}>
          <div className="grid gap-3 leading-relaxed [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-4">
            {faq.answer.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>
        </AccordionItem>
      ))}
    </div>
  );
}
