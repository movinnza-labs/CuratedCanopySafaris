"use server";

import { letUsKnow } from "@/lib/data/home";
import { site } from "@/lib/data/site";

type Field = "name" | "phone" | "email" | "message";

export type HomeEnquiryState = {
  status: "idle" | "success" | "error" | "fallback";
  fieldErrors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
  fallback?: { mailto: string; whatsapp: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// The live form's phone field is a WPForms "number" field: digits only.
const NUMBER = /^\d+$/;

function read(formData: FormData, key: string, max = 200) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/** Server action behind the homepage "Let Us Know" forms (replaces WPForms form #1921). */
export async function submitHomeEnquiry(_prev: HomeEnquiryState, formData: FormData): Promise<HomeEnquiryState> {
  // Honeypot, like the live form's hidden anti-spam field.
  if (read(formData, "company")) return { status: "success" };

  const values: Record<Field, string> = {
    name: read(formData, "name", 120),
    phone: read(formData, "phone", 20).replace(/[\s-]/g, ""),
    email: read(formData, "email", 160),
    message: read(formData, "message", 2000),
  };

  const { required, email, number } = letUsKnow.messages;
  const fieldErrors: HomeEnquiryState["fieldErrors"] = {};
  if (!values.name) fieldErrors.name = required;
  if (!values.phone) fieldErrors.phone = required;
  else if (!NUMBER.test(values.phone)) fieldErrors.phone = number;
  if (!values.email) fieldErrors.email = required;
  else if (!EMAIL.test(values.email)) fieldErrors.email = email;
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors, values };

  const text = [
    `${letUsKnow.title} — homepage enquiry`,
    `${letUsKnow.fields.name}: ${values.name}`,
    `${letUsKnow.fields.phone}: ${values.phone}`,
    `${letUsKnow.fields.email}: ${values.email}`,
    values.message && `Message: ${values.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const fallback = {
    mailto: `mailto:${site.contact.email}?subject=${encodeURIComponent(`${letUsKnow.title} — ${values.name}`)}&body=${encodeURIComponent(text)}`,
    whatsapp: `${site.contact.whatsappHref}?text=${encodeURIComponent(text)}`,
  };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (!webhook) return { status: "fallback", values, fallback };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form: "homepage-let-us-know", ...values, text, submittedAt: new Date().toISOString(), source: site.url }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("Homepage enquiry delivery failed", error);
    return { status: "fallback", values, fallback };
  }
  return { status: "success" };
}
