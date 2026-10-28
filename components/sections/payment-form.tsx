"use client";

import { useActionState, useId } from "react";
import { startPayment, type PaymentField, type PaymentState } from "@/app/actions/payment";
import { buttonClasses } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const initialState: PaymentState = { status: "idle" };

const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-base text-ink-900 transition-colors outline-none placeholder:text-ink-500/60 focus-visible:border-ochre-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ochre-500";

export function PaymentForm() {
  const [state, formAction, pending] = useActionState(startPayment, initialState);
  const formId = useId();

  function Field({
    name,
    label,
    type = "text",
    required,
    autoComplete,
    placeholder,
    inputMode,
    hint,
  }: {
    name: PaymentField;
    label: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    hint?: string;
  }) {
    const id = `${formId}-${name}`;
    const err = state.fieldErrors?.[name];
    const describedBy = [err && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
    return (
      <div>
        <label htmlFor={id} className="text-sm font-semibold text-forest-900">
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
          inputMode={inputMode}
          defaultValue={state.values?.[name]}
          aria-invalid={err ? true : undefined}
          aria-describedby={describedBy}
          className={cn(fieldClass, err && "border-red-500")}
        />
        {hint ? (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink-500">
            {hint}
          </p>
        ) : null}
        {err ? (
          <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-600">
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
        {Field({ name: "phone", label: "Mobile number", type: "tel", required: true, autoComplete: "tel", placeholder: "10-digit mobile" })}
        {Field({ name: "email", label: "Email", type: "email", required: true, autoComplete: "email" })}
        {Field({ name: "amount", label: "Amount (₹)", required: true, inputMode: "decimal", placeholder: "e.g. 15000" })}
      </div>
      {Field({
        name: "reference",
        label: "Booking reference or safari",
        placeholder: "e.g. Kanha, 12–15 March 2027",
        hint: "Helps our team match your payment to your booking.",
      })}

      {state.message ? (
        <div id={`${formId}-status`} role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-3">
        <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "w-full justify-center disabled:opacity-70" })}>
          <Icon name="card" className="size-4" />
          {pending ? "Connecting to Easebuzz…" : "Proceed to secure payment"}
        </button>
        <p className="text-center text-sm text-ink-500">You will be taken to Easebuzz to complete the payment.</p>
      </div>
    </form>
  );
}
