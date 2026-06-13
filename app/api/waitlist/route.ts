import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TARGET_EMAIL = "hello@navislabs.in";

/* Rate limit: 5 requests / 10 min per IP (in-memory; resets on deploy). */
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > WINDOW) {
    if (hits.size > 5000) hits.clear();
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: { email?: string; source?: string; company_url?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — hidden field humans never fill. Pretend success for bots.
  if (typeof body.company_url === "string" && body.company_url.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "homepage").slice(0, 64);

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;

  if (resendKey && resendFrom) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        from: resendFrom,
        to: TARGET_EMAIL,
        reply_to: email,
        subject: `New waitlist signup · ${email}`,
        text: `Source: ${source}\nEmail: ${email}\nReceived: ${new Date().toISOString()}`,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("Resend failed:", text);
      return NextResponse.json({ ok: false, error: "Email service failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
    body: JSON.stringify({
      email,
      source,
      received: new Date().toISOString(),
      _subject: `New waitlist signup · ${email}`,
      _replyto: email,
    }),
  });

  if (!fsRes.ok) {
    const text = await fsRes.text();
    console.error("FormSubmit failed:", text);
    return NextResponse.json({ ok: false, error: "Submission failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
