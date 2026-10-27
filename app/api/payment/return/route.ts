import { NextResponse, type NextRequest } from "next/server";
import { easebuzzConfig, verifyResponse } from "@/lib/payments/easebuzz";

/**
 * Easebuzz POSTs the result here (surl and furl) once the guest leaves its checkout.
 * The hash is verified before the outcome is shown; anything unverified is shown as "unverified", never as paid.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData();
  const fields: Record<string, string> = {};
  for (const [name, value] of form) if (typeof value === "string") fields[name] = value;

  const config = easebuzzConfig();
  const verified = config !== null && verifyResponse(fields, config);
  if (!verified) console.error("Easebuzz response failed hash verification", { txnid: fields.txnid, status: fields.status });

  const status = !verified ? "unverified" : fields.status === "success" ? "success" : fields.status === "userCancelled" ? "cancelled" : "failed";
  const host = request.headers.get("x-forwarded-host");
  const origin = host ? `${request.headers.get("x-forwarded-proto") ?? "https"}://${host}` : request.nextUrl.origin;
  const target = new URL("/pay/result", origin);
  target.searchParams.set("status", status);
  if (fields.txnid) target.searchParams.set("txnid", fields.txnid);
  if (verified && fields.amount) target.searchParams.set("amount", fields.amount);
  if (verified && fields.easepayid) target.searchParams.set("ref", fields.easepayid);

  // 303 turns Easebuzz's POST into a GET for the result page.
  return NextResponse.redirect(target, 303);
}
