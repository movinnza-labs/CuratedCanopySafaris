"use server";

import { site } from "@/lib/data/site";

export type EnquiryField = "name" | "phone" | "email" | "city" | "destination" | "dates" | "message";

export type EnquiryState = {
  status: "idle" | "success" | "error" | "fallback";
  message?: string;
  fieldErrors?: Partial<Record<EnquiryField, string>>;
  values?: Partial<Record<EnquiryField, string>>;
  /** Pre-filled email/WhatsApp links when no delivery backend is configured or delivery failed. */
  fallback?: { mailto: string; whatsapp: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

function read(formData: FormData, key: EnquiryField, max = 200): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function composeMessage(values: Record<EnquiryField, string>): string {
  return [
    "New safari enquiry",
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Email: ${values.email}`,
    values.city && `City: ${values.city}`,
    values.destination && `Destination: ${values.destination}`,
    values.dates && `Preferred dates: ${values.dates}`,
    values.message && `Message: ${values.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // Honeypot: real visitors never see or fill this field.
  if (read(formData, "company" as EnquiryField)) {
    return { status: "success", message: "Thank you — our team will get in touch with you very soon." };
  }

  const values: Record<EnquiryField, string> = {
    name: read(formData, "name", 120),
    phone: read(formData, "phone", 30),
    email: read(formData, "email", 160),
    city: read(formData, "city", 120),
    destination: read(formData, "destination", 120),
    dates: read(formData, "dates", 120),
    message: read(formData, "message", 2000),
  };

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (values.name.length < 2) fieldErrors.name = "Please enter your full name.";
  if (!PHONE.test(values.phone)) fieldErrors.phone = "Please enter a valid phone number.";
  if (!EMAIL.test(values.email)) fieldErrors.email = "Please enter a valid email address.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }

  const text = composeMessage(values);
  const fallback = {
    mailto: `mailto:${site.contact.email}?subject=${encodeURIComponent(`Safari enquiry from ${values.name}`)}&body=${encodeURIComponent(text)}`,
    whatsapp: `${site.contact.whatsappHref}?text=${encodeURIComponent(text)}`,
  };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) {
    return {
      status: "fallback",
      message: "Almost there — send your enquiry to our team by email or WhatsApp using the buttons below.",
      values,
      fallback,
    };
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, text, submittedAt: new Date().toISOString(), source: site.url }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("Enquiry delivery failed", error);
    return {
      status: "fallback",
      message: "We couldn’t send your enquiry just now. Please send it by email or WhatsApp instead — your details are filled in.",
      values,
      fallback,
    };
  }

  return { status: "success", message: "Thank you — our team will get in touch with you very soon." };
}
