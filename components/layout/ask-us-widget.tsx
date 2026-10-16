"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { askUs } from "@/lib/data/home";
import { cn } from "@/lib/utils";

type Tour = { name: string; park: string; duration: string; wildlife?: string[] };
type Park = { name: string; state: string; best_months: string };
type Faq = { q: string; a: string };
type AskResponse =
  | { type: "faq"; results: Faq[] }
  | { type: "park"; results: Park[] }
  | { type: "tour"; results: Tour[] }
  | { type?: string; results?: unknown[] };

type Message = { id: number; from: "bot" | "user"; body: React.ReactNode };

/** Renders an API answer exactly as the live widget does (FAQ, park list, or up to three tour cards). */
function renderAnswer(data: AskResponse): React.ReactNode {
  if (!data?.results?.length) {
    return (
      <>
        {askUs.noMatchPrefix}
        <em>{askUs.noMatchTerms}</em>.
      </>
    );
  }
  if (data.type === "faq") {
    const f = (data.results as Faq[])[0]!;
    return (
      <>
        <b>{f.q}</b>
        <br />
        {f.a}
      </>
    );
  }
  if (data.type === "park") {
    return (
      <>
        🌳 <b>{askUs.parksHeading}</b>
        {(data.results as Park[]).map((p) => (
          <span key={p.name} className="block">
            • <b>{p.name}</b> ({p.state}) — {p.best_months}
          </span>
        ))}
      </>
    );
  }
  return (
    <div className="grid gap-2">
      {(data.results as Tour[]).slice(0, 3).map((t) => (
        <div key={t.name} className="rounded-xl border border-forest-100 bg-white p-3 text-[0.8rem] leading-relaxed">
          <b className="text-forest-700">{t.name}</b>
          <br />🗺 {t.park}
          <br />⏱ {t.duration}
          <br />🐾 {(t.wildlife ?? []).slice(0, 3).join(", ")}
        </div>
      ))}
    </div>
  );
}

/** The live site's floating "Ask Us" Safari Assistant, rebuilt. */
export function AskUsWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", body: askUs.greeting }]);
  const nextId = useRef(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async () => {
    const q = input.trim();
    if (!q) return;
    setInput("");
    const userId = nextId.current++;
    const botId = nextId.current++;
    setMessages((m) => [...m, { id: userId, from: "user", body: q }, { id: botId, from: "bot", body: askUs.searching }]);
    let body: React.ReactNode;
    try {
      const res = await fetch(`/api/ask?query=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(String(res.status));
      body = renderAnswer((await res.json()) as AskResponse);
    } catch {
      body = (
        <>
          {askUs.errorPrefix}
          <Link href="/contact" className="font-semibold underline">
            {askUs.errorLink}
          </Link>
          {askUs.errorSuffix}
        </>
      );
    }
    setMessages((m) => m.map((msg) => (msg.id === botId ? { ...msg, body } : msg)));
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        title={askUs.buttonTitle}
        aria-expanded={open}
        aria-controls="ask-us-panel"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "fixed z-40 bg-[#2d5a27] font-semibold text-white shadow-xl transition-all duration-300 hover:bg-[#3d7a35]",
          // Right-edge vertical tab on desktop, pill at bottom-right on phones — as on the live site.
          "right-3.5 bottom-4 rounded-full px-5 py-3 text-sm",
          "sm:top-1/2 sm:right-0 sm:bottom-auto sm:-translate-y-1/2 sm:rounded-l-2xl sm:rounded-r-none sm:px-3 sm:py-5 sm:[writing-mode:vertical-rl] sm:hover:pr-4",
        )}
      >
        {askUs.buttonLabel}
      </button>

      <div
        id="ask-us-panel"
        role="dialog"
        aria-label={askUs.panelTitle.replace("🌿 ", "")}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 z-[60] flex h-[70vh] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:inset-x-auto sm:top-1/2 sm:right-16 sm:bottom-auto sm:h-[30rem] sm:w-[22rem] sm:-translate-y-1/2 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between bg-[#2d5a27] px-4 py-3.5 text-sm font-bold text-white">
          <span>{askUs.panelTitle}</span>
          <button
            type="button"
            title={askUs.closeTitle}
            aria-label={askUs.closeTitle}
            onClick={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
            className="grid size-8 place-items-center rounded-full text-lg leading-none hover:bg-white/15"
          >
            ✕
          </button>
        </div>
        <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-[#f9f7f3] p-3.5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "max-w-[88%] rounded-xl px-3.5 py-2.5 text-[0.8125rem] leading-relaxed",
                m.from === "bot" ? "self-start rounded-bl-sm bg-[#e8f0e6] text-[#1a3318]" : "self-end rounded-br-sm bg-[#2d5a27] text-white",
              )}
            >
              {m.body}
            </div>
          ))}
        </div>
        <form
          className="flex border-t border-sand-200 bg-white"
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <label htmlFor="ask-us-input" className="sr-only">
            {askUs.panelTitle}
          </label>
          <input
            id="ask-us-input"
            ref={inputRef}
            type="text"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={askUs.placeholder}
            className="min-w-0 flex-1 px-3 py-3 text-sm outline-none"
          />
          <button type="submit" className="bg-[#2d5a27] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#3d7a35]">
            {askUs.send}
          </button>
        </form>
      </div>
    </>
  );
}
