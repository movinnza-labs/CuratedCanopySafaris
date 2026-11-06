"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { startBookingPayment, type BookingField, type BookingState } from "@/app/actions/payment";
import { buttonClasses } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn, formatInr } from "@/lib/utils";

const initialState: BookingState = { status: "idle" };

const fieldClass =
  "mt-1.5 block w-full rounded-xl border border-sand-300 bg-white px-4 py-3 text-base text-ink-900 transition-colors outline-none placeholder:text-ink-500/60 focus-visible:border-ochre-500 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ochre-500";

const rupees = (amount: number) => `₹${formatInr(Math.round(amount))}`;

type Props = {
  packageId: string;
  /** ISO start date of the departure. */
  date: string;
  perPerson: number;
  gstRate: number;
  maxGuests: number;
  pickupOptions: string[];
  /** Short park name for the pickup label, e.g. "Kanha". */
  parkName: string;
};

/** Book Now for one departure: guest details, then Easebuzz checkout for the full fare (the server recalculates it). */
export function BookingPaymentForm({ packageId, date, perPerson, gstRate, maxGuests, pickupOptions, parkName }: Props) {
  const [state, formAction, pending] = useActionState(startBookingPayment, initialState);
  const [guests, setGuests] = useState(Number(state.values?.guests) || 2);
  const formId = useId();
  const id = (name: BookingField) => `${formId}-${name}`;
  const error = (name: BookingField) =>
    state.fieldErrors?.[name] ? (
      <p id={`${id(name)}-error`} className="mt-1.5 text-sm font-medium text-red-600">
        {state.fieldErrors[name]}
      </p>
    ) : null;
  const invalid = (name: BookingField) =>
    state.fieldErrors?.[name] ? { "aria-invalid": true, "aria-describedby": `${id(name)}-error` } : {};

  const base = perPerson * guests;
  const gst = base * gstRate;

  const label = (name: BookingField, text: string) => (
    <label htmlFor={id(name)} className="text-sm font-semibold text-forest-900">
      {text}
      <span aria-hidden className="text-ochre-500"> *</span>
    </label>
  );

  return (
    <form action={formAction} noValidate className="grid gap-5" aria-describedby={state.message ? `${formId}-status` : undefined}>
      <input type="hidden" name="package" value={packageId} />
      <input type="hidden" name="date" value={date} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {label("name", "Full name (lead guest)")}
          <input
            id={id("name")}
            name="name"
            required
            autoComplete="name"
            defaultValue={state.values?.name}
            className={cn(fieldClass, state.fieldErrors?.name && "border-red-500")}
            {...invalid("name")}
          />
          {error("name")}
        </div>
        <div>
          {label("phone", "Mobile number")}
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="10-digit mobile"
            defaultValue={state.values?.phone}
            className={cn(fieldClass, state.fieldErrors?.phone && "border-red-500")}
            {...invalid("phone")}
          />
          {error("phone")}
        </div>
        <div>
          {label("email", "Email")}
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={state.values?.email}
            className={cn(fieldClass, state.fieldErrors?.email && "border-red-500")}
            {...invalid("email")}
          />
          {error("email")}
        </div>
        <div>
          {label("guests", "Number of guests")}
          <select
            id={id("guests")}
            name="guests"
            value={guests}
            onChange={(event) => setGuests(Number(event.target.value))}
            className={cn(fieldClass, state.fieldErrors?.guests && "border-red-500")}
            {...invalid("guests")}
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
          {error("guests")}
        </div>
        {/* Only ask when the package offers a group transfer; otherwise guests make their own way. */}
        {pickupOptions.length > 1 ? (
          <div>
            {label("pickup", `Getting to ${parkName}`)}
            <select
              id={id("pickup")}
              name="pickup"
              defaultValue={state.values?.pickup ?? pickupOptions[0]}
              className={cn(fieldClass, state.fieldErrors?.pickup && "border-red-500")}
              {...invalid("pickup")}
            >
              {pickupOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            {error("pickup")}
          </div>
        ) : (
          <input type="hidden" name="pickup" value={pickupOptions[0]} />
        )}
      </div>

      <dl aria-live="polite" className="grid gap-2 rounded-2xl bg-sand-100 p-5 text-sm text-ink-700">
        <div className="flex justify-between gap-4">
          <dt>
            {rupees(perPerson)} × {guests} {guests === 1 ? "guest" : "guests"}
          </dt>
          <dd>{rupees(base)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>GST ({Math.round(gstRate * 100)}%)</dt>
          <dd>{rupees(gst)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-sand-300 pt-2 text-base font-semibold text-forest-900">
          <dt>Total payable now</dt>
          <dd>{rupees(base + gst)}</dd>
        </div>
      </dl>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            id={id("terms")}
            name="terms"
            type="checkbox"
            required
            defaultChecked={state.values?.terms === "on"}
            className="mt-0.5 size-4 shrink-0 accent-ochre-600"
            {...invalid("terms")}
          />
          <span>
            I accept the inclusions, payment and cancellation terms for this safari and the{" "}
            <Link href="/refund-cancellation-policy" className="font-semibold text-ochre-700 underline-offset-4 hover:underline">
              Refund and Cancellation Policy
            </Link>
            .
          </span>
        </label>
        {error("terms")}
      </div>

      {state.message ? (
        <div id={`${formId}-status`} role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-3">
        <button type="submit" disabled={pending} className={buttonClasses({ size: "lg", className: "w-full justify-center disabled:opacity-70" })}>
          <Icon name="card" className="size-4" />
          {pending ? "Connecting to Easebuzz…" : `Pay ${rupees(base + gst)} securely`}
        </button>
        <p className="text-center text-sm text-ink-500">You will be taken to Easebuzz to pay by UPI, card, net banking or wallet.</p>
      </div>
    </form>
  );
}
