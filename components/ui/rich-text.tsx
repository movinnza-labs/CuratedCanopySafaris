import Link from "next/link";
import { Fragment } from "react";

// Supports the two inline forms used in the data files: [label](href) and **bold**.
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [, label, href, bold] = match;
    if (label && href) {
      const external = /^https?:\/\//.test(href);
      nodes.push(
        external ? (
          <a key={index} href={href} target="_blank" rel="noopener noreferrer">
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link key={index} href={href}>
            {label}
          </Link>
        ),
      );
    } else if (bold) {
      nodes.push(<strong key={index}>{bold}</strong>);
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes.map((node, i) => (typeof node === "string" ? <Fragment key={`t${i}`}>{node}</Fragment> : node))}</>;
}
