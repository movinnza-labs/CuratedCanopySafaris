"use client";

import { useActionState, useId } from "react";
import { submitEnquiry, type EnquiryField, type EnquiryState } from "@/app/actions/enquiry";
import { buttonClasses } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type EnquiryFormProps = {
  destinations: string[];
  defaultDestination?: string;
  showCity?: boolean;
  tone?: "light" | "dark";
};

const initialState: EnquiryState = { status: "idle" };

export function EnquiryForm({ destinations, defaultDestination, showCity = false, tone = "light" }: EnquiryFormProps) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const formId = useId();
  const dark = tone === "dark";

  if (state.status === "success") {
    return (
      <div role="status" className={cn("rounded-2xl p-8 text-center", dark ? "bg-white/10 text-sand-50" : "bg-forest-50 text-forest-900")}>
        <Icon name="check" className="mx-auto size-10 text-ochre-500" />
        <p className="mt-4 font-display text-2xl">{state.message}</p>
      </div>
    );
  }

  const value = (field: EnquiryField) => state.values?.[field];
  const error = (field: EnquiryField) => state.fieldErrors?.[field];

  const fieldClass = cn(
    "mt-1.5 block w-full rounded-xl border px-4 py-3 text-base transition-colors outline-none focus-visible:outline-2 focus-visible:outline-offset-0",
    dark
      ? "border-white/15 bg-white/5 text-sand-50 placeholder:text-sand-100/40 focus-visible:border-ochre-400 focus-visible:outline-ochre-400"
      : "border-sand-300 bg-white text-ink-900 placeholder:text-ink-500/60 focus-visible:border-ochre-500 focus-visible:outline-ochre-500",
  );
  const labelClass = cn("text-sm font-semibold", dark ? "text-sand-100" : "text-forest-900");
  const errorClass = "mt-1.5 text-sm font-medium text-red-600";

  function Field({
    name,
    label,
    type = "text",
    required,
    autoComplete,
    placeholder,
  }: {
    name: EnquiryField;
    label: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
  }) {
    const id = `${formId}-${name}`;
    const err = error(name);
    return (
      <div>
        <label htmlFor={id} className={labelClass}>
          {label}
          {required ? <span aria-hidden className="text-ochre-500"> *</span> : <span className="font-normal opacity-70"> (optional)</span>}
        </label>
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          placeholder={placeholder}
          defaultValue={value(name)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-error` : undefined}
          className={cn(fieldClass, err && "border-red-500")}
        />
        {err ? (
          <p id={`${id}-error`} className={errorClass}>
            {err}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-5" aria-describedby={state.message ? `${formId}-status` : undefined}>
      <div className="grid gap-5 sm:grid-cols-2">
        {Field({ name: "name", label: "Full name", required: true, autoComplete: "name" })}
        {Field({ name: "phone", label: "Phone number", type: "tel", required: true, autoComplete: "tel" })}
        {Field({ name: "email", label: "Email", type: "email", required: true, autoComplete: "email" })}
        {showCity
          ? Field({ name: "city", label: "City", autoComplete: "address-level2" })
          : Field({ name: "dates", label: "Preferred dates", placeholder: "e.g. April 2027" })}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${formId}-destination`} className={labelClass}>
            Destination <span className="font-normal opacity-70">(optional)</span>
          </label>
          <select
            id={`${formId}-destination`}
            name="destination"
            defaultValue={value("destination") ?? defaultDestination ?? ""}
            className={cn(fieldClass, "appearance-none bg-[length:1.25rem] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23c07a26' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            }}
          >
            <option value="">Not sure yet / multiple parks</option>
            {destinations.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {showCity ? Field({ name: "dates", label: "Preferred dates", placeholder: "e.g. April 2027" }) : null}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className={labelClass}>
          Message <span className="font-normal opacity-70">(optional)</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          defaultValue={value("message")}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {/* Honeypot field for bots (checked in app/actions/enquiry.ts): off-screen, unfocusable and hidden from assistive technology. */}
      <div aria-hidden inert className="pointer-events-none absolute -left-[9999px] h-px w-px overflow-hidden opacity-0">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.message ? (
        <div
          id={`${formId}-status`}
          role={state.status === "error" ? "alert" : "status"}
          className={cn(
            "rounded-xl px-4 py-3 text-sm font-medium",
            state.status === "error" ? "bg-red-50 text-red-700" : dark ? "bg-white/10 text-sand-50" : "bg-ochre-50 text-ochre-800",
          )}
        >
          {state.message}
          {state.fallback ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <a href={state.fallback.mailto} className={buttonClasses({ variant: "secondary", size: "sm" })}>
                <Icon name="mail" className="size-4" /> Send by email
              </a>
              <a
                href={state.fallback.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "outline", size: "sm" })}
              >
                <Icon name="whatsapp" className="size-4" /> Send on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={pending} className={buttonClasses({ size: "lg" })}>
          {pending ? "Sending…" : "Send enquiry"}
          <Icon name="arrowRight" className="size-4" />
        </button>
        <p className={cn("text-sm", dark ? "text-sand-100/70" : "text-ink-500")}>Our team will get in touch with you very soon.</p>
      </div>
    </form>
  );
}
