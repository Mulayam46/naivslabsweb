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
}) {
  const row = (k: string, v: string) => `
    <tr><td style="padding:14px 0;border-bottom:1px solid #E2E8F0;">
      <p style="margin:0;font-family:${MONO};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#475569;">${k}</p>
      <p style="margin:6px 0 0;font-family:${SANS};font-size:15px;line-height:1.6;color:#0F172A;">${v}</p>
    </td></tr>`;
  return `
<div style="background:#FAFBFC;padding:48px 16px;">
  <div style="max-width:560px;margin:0 auto;">
    <p style="margin:0 0 20px;font-family:${MONO};font-size:12px;letter-spacing:0.24em;color:#475569;">NAVISLABS</p>
    <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:12px;padding:40px;">
      <h1 style="margin:0;font-family:${SANS};font-size:22px;font-weight:600;letter-spacing:-0.01em;color:#0F172A;">Request received.</h1>
      <p style="margin:8px 0 0;font-family:${MONO};font-size:12px;color:#475569;">${p.ts} IST</p>
      <p style="margin:28px 0 0;font-family:${SANS};font-size:15px;line-height:1.7;color:#475569;">
        Your request is in the queue. We review every access request personally.
        If Navis is a fit for where you are right now, you&rsquo;ll hear from us within 48 hours.
      </p>
      <p style="margin:40px 0 4px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;color:#475569;">WHAT YOU SUBMITTED</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Full name", p.name)}
        ${row("Company", p.company)}
        ${row("Team size", p.teamSize)}
        ${row("Context lost in", p.contextTool)}
        ${row("What slipped", `&ldquo;${p.whatSlipped}&rdquo;`)}
      </table>
      <p style="margin:40px 0 12px;font-family:${MONO};font-size:11px;letter-spacing:0.12em;color:#475569;">WHAT HAPPENS NEXT</p>
      <ol style="margin:0;padding-left:18px;font-family:${SANS};font-size:15px;line-height:2.1;color:#0F172A;">
        <li>We read your submission personally.</li>
        <li>We evaluate fit.</li>
        <li>If there&rsquo;s alignment, we&rsquo;ll reach out directly.</li>
      </ol>
      <hr style="border:none;border-top:1px solid #E2E8F0;margin:40px 0 28px;" />
      <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.7;color:#0F172A;">Questions?</p>
      <p style="margin:4px 0 0;font-family:${SANS};font-size:14px;line-height:1.7;color:#475569;">Reply to this email. We read everything.</p>
    </div>
    <p style="margin:24px 0 0;font-family:${MONO};font-size:11px;letter-spacing:0.12em;line-height:2;color:#475569;">
      NAVISLABS<br/>Bangalore<br/><a href="mailto:hello@navislabs.in" style="color:#5B8CFF;text-decoration:none;">hello@navislabs.in</a>
    </p>
  </div>
</div>`;
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
      from: "Navis <hello@navislabs.in>",
      to: email,
      subject: `Your Navis access request — ${firstName}`,
      html: confirmationHtml({ name, company, teamSize, contextTool, whatSlipped, ts }),
    });
    if (c.error) throw new Error(c.error.message);

    const n = await resend.emails.send({
      from: "Navis System <hello@navislabs.in>",
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
