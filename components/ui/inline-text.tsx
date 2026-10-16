import Link from "next/link";
import { Fragment } from "react";
import type { Inline, RichBlock } from "@/lib/data/home";

export function InlineText({ parts, linkClassName }: { parts: Inline[]; linkClassName?: string }) {
  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
        if ("strong" in part) return <strong key={i}>{part.strong}</strong>;
        const external = /^https?:\/\//.test(part.href);
        if (external || part.href.startsWith("mailto:") || part.href.startsWith("tel:")) {
          return (
            <a
              key={i}
              href={part.href}
              className={linkClassName}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {part.text}
              {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
            </a>
          );
        }
        return (
          <Link key={i} href={part.href} className={linkClassName}>
            {part.text}
          </Link>
        );
      })}
    </>
  );
}

export function RichBlocks({ blocks, linkClassName }: { blocks: RichBlock[]; linkClassName?: string }) {
  return (
    <>
      {blocks.map((block, i) => {
        if ("p" in block)
          return (
            <p key={i}>
              <InlineText parts={block.p} linkClassName={linkClassName} />
            </p>
          );
        if ("ul" in block)
          return (
            <ul key={i}>
              {block.ul.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        return <div key={i} aria-hidden className="h-2" />;
      })}
    </>
  );
}
