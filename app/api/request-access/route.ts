import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TARGET = "hello@navislabs.in";

/* Rate limit: 5 requests / 10 min per IP (in-memory). */
const hits = new Map<string, { n: number; t: number }>();
function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 600000) {
    if (hits.size > 5000) hits.clear();
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 5;
}

function istTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,sans-serif";
const MONO = "'SF Mono',SFMono-Regular,ui-monospace,Menlo,Consolas,monospace";

function confirmationHtml(p: {
  name: string;
  company: string;
  teamSize: string;
  contextTool: string;
  whatSlipped: string;
  ts: string;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 500 });
  }

  // Honeypot — bots fill hidden fields; pretend success.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ success: true });
  }
  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().toLowerCase().slice(0, 254);
  const company = String(body.company ?? "").trim().slice(0, 160);
  const teamSize = String(body.teamSize ?? "").trim().slice(0, 20);
  const contextTool = String(body.contextTool ?? "").trim().slice(0, 40);
  const whatSlipped = String(body.whatSlipped ?? "").trim().slice(0, 2000);

  if (!name || !company || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 500 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[request-access] RESEND_API_KEY not set");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const resend = new Resend(key);
  const ts = istTimestamp();
  const firstName = name.split(/\s+/)[0];

  try {
    const c = await resend.emails.send({
      from: "NavisLabs <hello@navislabs.in>",
      to: email,
      subject: `Your Navis access request — ${firstName}`,
      html: confirmationHtml({ name, company, teamSize, contextTool, whatSlipped, ts }),
    });
    if (c.error) throw new Error(c.error.message);

    const n = await resend.emails.send({
      from: "NavisLabs <hello@navislabs.in>",
      to: TARGET,
      replyTo: email,
      subject: `New request — ${company} · ${teamSize}`,
      text: `NEW ACCESS REQUEST
──────────────────
Received: ${ts} IST
──────────────────
NAME        ${name}
EMAIL       ${email}
COMPANY     ${company}
TEAM SIZE   ${teamSize}
──────────────────
CONTEXT LOST IN:
${contextTool}

WHAT SLIPPED:
"${whatSlipped}"
──────────────────
Reply to this email → goes directly to ${email}
navislabs.in`,
    });
    if (n.error) throw new Error(n.error.message);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[request-access]", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
