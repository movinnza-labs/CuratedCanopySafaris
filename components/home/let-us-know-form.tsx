"use client";

import { useActionState, useId, useState } from "react";
import { submitHomeEnquiry, type HomeEnquiryState } from "@/app/actions/home-enquiry";
import { letUsKnow } from "@/lib/data/home";
import { cn } from "@/lib/utils";

type Field = "name" | "phone" | "email" | "message";

// System messages. The live site's WPForms confirmation text could not be read without submitting a real
// enquiry, so these use the WPForms default wording — confirm before launch (see HOMEPAGE-AUDIT.md).
const SUCCESS_MESSAGE = "Thanks for contacting us! We will be in touch with you shortly.";
const FALLBACK_MESSAGE = "Please send your enquiry to our team by email or WhatsApp — your details are already filled in.";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: HTMLFormElement): Partial<Record<Field, string>> {
  const data = new FormData(form);
  const get = (k: Field) => String(data.get(k) ?? "").trim();
  const { required, email, number } = letUsKnow.messages;
  const errors: Partial<Record<Field, string>> = {};
  if (!get("name")) errors.name = required;
  const phone = get("phone").replace(/[\s-]/g, "");
  if (!phone) errors.phone = required;
  else if (!/^\d+$/.test(phone)) errors.phone = number;
  if (!get("email")) errors.email = required;
  else if (!EMAIL.test(get("email"))) errors.email = email;
  return errors;
}

const initial: HomeEnquiryState = { status: "idle" };

export function LetUsKnowForm() {
  const [state, action, pending] = useActionState(submitHomeEnquiry, initial);
  const [clientErrors, setClientErrors] = useState<Partial<Record<Field, string>>>({});
  const id = useId();
  const errors = { ...state.fieldErrors, ...clientErrors };

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-[1.5rem] bg-white/10 p-8 text-center backdrop-blur-sm">
        <svg aria-hidden viewBox="0 0 24 24" className="mx-auto size-12 text-sand-200" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 3 3 5-6" />
        </svg>
        <p className="mt-4 text-lg font-semibold text-white">{SUCCESS_MESSAGE}</p>
      </div>
    );
  }

  const input = (field: Exclude<Field, "message">, label: string, type: string, autoComplete: string, extra?: React.InputHTMLAttributes<HTMLInputElement>) => {
    const inputId = `${id}-${field}`;
    const err = errors[field];
    return (
      <div>
        <label htmlFor={inputId} className="text-sm font-bold tracking-wide text-white">
          {label} <span className="text-sand-200" aria-hidden>*</span>
          <span className="sr-only"> (required)</span>
        </label>
        <input
          id={inputId}
          name={field}
          type={type}
          autoComplete={autoComplete}
          required
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${inputId}-error` : undefined}
          defaultValue={state.values?.[field]}
          onInput={() => clientErrors[field] && setClientErrors((prev) => ({ ...prev, [field]: undefined }))}
          className={cn(
            "mt-2 block w-full rounded-xl border bg-white/95 px-4 py-3.5 text-base text-ink-900 shadow-sm transition-[border-color,box-shadow] duration-300 outline-none focus:border-sand-200 focus:bg-white focus:ring-4 focus:ring-sand-200/40",
            err ? "border-red-300 ring-2 ring-red-300/60" : "border-transparent",
          )}
          {...extra}
        />
        {err ? (
          <p id={`${inputId}-error`} className="mt-2 text-sm font-semibold text-[#ffe0d6]">
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  return (
    <form
      action={action}
      noValidate
      onSubmit={(event) => {
        const found = validate(event.currentTarget);
        setClientErrors(found);
        if (Object.keys(found).length) {
          event.preventDefault();
          const first = Object.keys(found)[0];
          event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        }
      }}
      className="grid gap-5"
    >
      {input("name", letUsKnow.fields.name, "text", "name")}
      {input("phone", letUsKnow.fields.phone, "tel", "tel", { inputMode: "numeric" })}
      {input("email", letUsKnow.fields.email, "email", "email")}
      <div>
        <label htmlFor={`${id}-message`} className="text-sm font-bold tracking-wide text-white">
          {letUsKnow.fields.message}
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          defaultValue={state.values?.message}
          className="mt-2 block w-full resize-y rounded-xl border border-transparent bg-white/95 px-4 py-3.5 text-base text-ink-900 shadow-sm transition-[border-color,box-shadow] duration-300 outline-none focus:border-sand-200 focus:bg-white focus:ring-4 focus:ring-sand-200/40"
        />
      </div>

      {/* Honeypot (the live form has an equivalent hidden anti-spam field). */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "fallback" && state.fallback ? (
        <div role="status" className="rounded-xl bg-white/12 p-4 text-sm text-white">
          <p>{FALLBACK_MESSAGE}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a href={state.fallback.mailto} className="rounded-full bg-sand-200 px-4 py-2 font-bold text-ochre-700 transition-colors hover:bg-white">
              Email
            </a>
            <a
              href={state.fallback.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-4 py-2 font-bold text-white transition-colors hover:bg-white hover:text-ochre-700"
            >
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      ) : null}

      <div>
        <button
          type="submit"
          disabled={pending}
          className="btn-sheen inline-flex min-w-36 items-center justify-center gap-2 rounded-full bg-sand-200 px-8 py-3.5 text-base font-bold tracking-wide text-ochre-700 shadow-lg transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-xl disabled:cursor-wait disabled:opacity-80"
        >
          {pending ? letUsKnow.submitting : letUsKnow.submit}
        </button>
      </div>
    </form>
  );
}
