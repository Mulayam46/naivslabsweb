import { NextResponse } from "next/server";

export const runtime = "nodejs";

const TARGET_EMAIL = "hello@navislabs.in";

export async function POST(request: Request) {
  let body: { email?: string; source?: string } = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "homepage").slice(0, 64);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
