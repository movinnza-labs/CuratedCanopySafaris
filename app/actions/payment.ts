"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MAX_GUESTS_PER_BOOKING, getBookableDeparture, pickupOptions, quote } from "@/lib/data/departures";
import { easebuzzConfig, initiatePayment } from "@/lib/payments/easebuzz";

export type PaymentField = "name" | "phone" | "email" | "amount" | "reference";

export type PaymentState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<PaymentField, string>>;
  values?: Partial<Record<PaymentField, string>>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Easebuzz's own limits on these fields (see its PHP kit's _validateInitiatePaymentParams).
const NAME = /^[a-zA-Z0-9&'\-._ ()/,@]{2,150}$/;
const PHONE = /^(\+\d{1,4}-?)?\d{10}$/;
const AMOUNT = /^\d{1,7}(\.\d{1,2})?$/;

function read(formData: FormData, key: PaymentField, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** The site's own origin, so Easebuzz returns the guest to whichever host (live or staging) started the payment. */
async function origin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export async function startPayment(_previous: PaymentState, formData: FormData): Promise<PaymentState> {
  const values: Record<PaymentField, string> = {
    name: read(formData, "name", 150),
    phone: read(formData, "phone", 20).replace(/[\s()]/g, ""),
    email: read(formData, "email", 160),
    amount: read(formData, "amount", 12).replace(/,/g, ""),
    reference: read(formData, "reference", 60),
  };

  const fieldErrors: PaymentState["fieldErrors"] = {};
  if (!NAME.test(values.name)) fieldErrors.name = "Please enter your full name (letters, numbers and . , ' - only).";
  if (!PHONE.test(values.phone)) fieldErrors.phone = "Please enter a 10-digit mobile number.";
  if (!EMAIL.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  const amount = Number(values.amount);
  if (!AMOUNT.test(values.amount) || amount < 1) fieldErrors.amount = "Please enter the amount in rupees (minimum ₹1).";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const config = easebuzzConfig();
  if (!config) {
    console.error("EASEBUZZ_KEY / EASEBUZZ_SALT are not set");
    return { status: "error", message: "Online payment is unavailable right now. Please contact our team to pay.", values };
  }

  const base = await origin();
  const result = await initiatePayment(
    {
      txnid: `CCS${Date.now()}${randomBytes(3).toString("hex")}`.toUpperCase(),
      amount: amount.toFixed(2),
      productinfo: "Safari booking payment",
      firstname: values.name,
      email: values.email,
      phone: values.phone.replace(/^\+91-?/, ""),
      surl: `${base}/api/payment/return`,
      furl: `${base}/api/payment/return`,
      udf1: values.reference.replace(/[^a-zA-Z0-9 \-/]/g, ""),
    },
    config,
  );

  if ("error" in result) {
    return { status: "error", message: `We could not start the payment: ${result.error} Please try again or contact our team.`, values };
  }
  redirect(result.url);
}

export type BookingField = "name" | "phone" | "email" | "guests" | "pickup" | "terms";

export type BookingState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<BookingField, string>>;
  values?: Partial<Record<BookingField, string>>;
};

/**
 * Book Now for a published departure: the package and date come from hidden fields, and the amount is
 * worked out here from the published fare (+ GST) and the number of guests, never taken from the browser.
 */
export async function startBookingPayment(_previous: BookingState, formData: FormData): Promise<BookingState> {
  const text = (key: string, max: number) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim().slice(0, max) : "";
  };
  const values: Record<BookingField, string> = {
    name: text("name", 150),
    phone: text("phone", 20).replace(/[\s()]/g, ""),
    email: text("email", 160),
    guests: text("guests", 2),
    pickup: text("pickup", 80),
    terms: formData.get("terms") === "on" ? "on" : "",
  };

  const booking = getBookableDeparture(text("package", 80), text("date", 10));
  if (!booking) {
    return { status: "error", message: "This departure is no longer open for online booking. Please pick another date or contact our team.", values };
  }

  const guests = Number(values.guests);
  const fieldErrors: BookingState["fieldErrors"] = {};
  if (!NAME.test(values.name)) fieldErrors.name = "Please enter your full name (letters, numbers and . , ' - only).";
  if (!PHONE.test(values.phone)) fieldErrors.phone = "Please enter a 10-digit mobile number.";
  if (!EMAIL.test(values.email)) fieldErrors.email = "Please enter a valid email address.";
  if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS_PER_BOOKING) {
    fieldErrors.guests = `Please choose between 1 and ${MAX_GUESTS_PER_BOOKING} guests.`;
  }
  if (!pickupOptions(booking.pkg).includes(values.pickup)) fieldErrors.pickup = "Please choose how you will reach the park.";
  if (!values.terms) fieldErrors.terms = "Please accept the inclusions, payment and cancellation terms.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const config = easebuzzConfig();
  if (!config) {
    console.error("EASEBUZZ_KEY / EASEBUZZ_SALT are not set");
    return { status: "error", message: "Online payment is unavailable right now. Please contact our team to book.", values };
  }

  const { pkg, departure } = booking;
  const base = await origin();
  const result = await initiatePayment(
    {
      txnid: `CCS${Date.now()}${randomBytes(3).toString("hex")}`.toUpperCase(),
      amount: quote(pkg, guests).total.toFixed(2),
      productinfo: (pkg.title ?? "Safari booking").replace(/[^a-zA-Z0-9 \-.,()]/g, ""),
      firstname: values.name,
      email: values.email,
      phone: values.phone.replace(/^\+91-?/, ""),
      surl: `${base}/api/payment/return`,
      furl: `${base}/api/payment/return`,
      // Lets the team match the payment to the departure in the Easebuzz dashboard.
      udf1: `${pkg.id} ${departure.start}`,
      udf2: `${guests} guests`,
      udf3: values.pickup,
    },
    config,
  );

  if ("error" in result) {
    return { status: "error", message: `We could not start the payment: ${result.error} Please try again or contact our team.`, values };
  }
  redirect(result.url);
}
