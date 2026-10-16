import { NextResponse, type NextRequest } from "next/server";

// The live "Ask Us" widget queries this WordPress REST endpoint. It sends no CORS headers, so the browser
// cannot call it from this app directly; this route forwards the query server-side.
const UPSTREAM = process.env.ASK_API_URL ?? "https://curatedcanopysafaris.com/wp-json/ccs/v1/ask";

export async function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("query") ?? "").trim().slice(0, 200);
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  try {
    const response = await fetch(`${UPSTREAM}?query=${encodeURIComponent(query)}`, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 3600 },
    });
    if (!response.ok) throw new Error(`Upstream responded ${response.status}`);
    const data: unknown = await response.json();
    return NextResponse.json(data, { headers: { "Cache-Control": "public, max-age=300" } });
  } catch (error) {
    console.error("Ask Us upstream failed", error);
    return NextResponse.json({ error: "Upstream unavailable" }, { status: 502 });
  }
}
