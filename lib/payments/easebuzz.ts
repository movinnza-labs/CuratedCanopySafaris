// Easebuzz hosted checkout, ported from the official PHP kit (github.com/easebuzz/paywitheasebuzz-php-lib).
// Server-only: the salt signs every request and must never reach the browser.
import { createHash, timingSafeEqual } from "node:crypto";

type Env = "test" | "prod";

export type EasebuzzConfig = { key: string; salt: string; env: Env };

export function easebuzzConfig(): EasebuzzConfig | null {
  const key = process.env.EASEBUZZ_KEY?.trim();
  const salt = process.env.EASEBUZZ_SALT?.trim();
  if (!key || !salt) return null;
  return { key, salt, env: process.env.EASEBUZZ_ENV === "prod" ? "prod" : "test" };
}

const payBase = (env: Env) => (env === "prod" ? "https://pay.easebuzz.in/" : "https://testpay.easebuzz.in/");

const sha512 = (value: string) => createHash("sha512").update(value).digest("hex");

const UDFS = ["udf1", "udf2", "udf3", "udf4", "udf5", "udf6", "udf7", "udf8", "udf9", "udf10"] as const;

export type PaymentRequest = {
  txnid: string;
  /** Rupees with two decimals, e.g. "1500.00". */
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  udf1?: string;
};

/** key|txnid|amount|productinfo|firstname|email|udf1|…|udf10|salt */
function requestHash(params: PaymentRequest, { key, salt }: EasebuzzConfig) {
  const record = params as Record<string, string | undefined>;
  const fields = [key, params.txnid, params.amount, params.productinfo, params.firstname, params.email, ...UDFS.map((u) => record[u] ?? "")];
  return sha512([...fields, salt].join("|"));
}

/** Calls initiateLink and returns the checkout URL to send the guest to. */
export async function initiatePayment(params: PaymentRequest, config: EasebuzzConfig): Promise<{ url: string } | { error: string }> {
  const body = new URLSearchParams();
  for (const [name, value] of Object.entries({ ...params, key: config.key, hash: requestHash(params, config) })) {
    if (value) body.set(name, value);
  }

  try {
    const response = await fetch(`${payBase(config.env)}payment/initiateLink`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body,
      signal: AbortSignal.timeout(30_000),
      cache: "no-store",
    });
    const json = (await response.json()) as { status?: number; data?: unknown; error_desc?: string };
    if (json.status === 1 && typeof json.data === "string" && /^[a-f0-9]{64}$/.test(json.data)) {
      return { url: `${payBase(config.env)}pay/${json.data}` };
    }
    console.error("Easebuzz initiateLink rejected the request", json);
    return { error: typeof json.data === "string" ? json.data : (json.error_desc ?? "Payment could not be started.") };
  } catch (error) {
    console.error("Easebuzz initiateLink failed", error);
    return { error: "The payment gateway could not be reached." };
  }
}

/** Checks the hash Easebuzz posts back: salt|status|udf10|…|udf1|email|firstname|productinfo|amount|txnid|key */
export function verifyResponse(fields: Record<string, string>, { salt }: EasebuzzConfig): boolean {
  const order: string[] = [...[...UDFS].reverse(), "email", "firstname", "productinfo", "amount", "txnid", "key"];
  const expected = sha512([salt, fields.status ?? "", ...order.map((name) => fields[name] ?? "")].join("|"));
  const received = (fields.hash ?? "").toLowerCase();
  return received.length === expected.length && timingSafeEqual(Buffer.from(received), Buffer.from(expected));
}
