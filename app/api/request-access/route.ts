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
  const label = (t: string) =>
    `<p style="margin:0 0 3px;font-family:${MONO};font-size:10px;letter-spacing:0.1em;color:#64748B;">${t}</p>`;
  const value = (t: string) =>
    `<p style="margin:0 0 16px;font-family:${SANS};font-size:14px;line-height:1.5;color:#0F172A;">${t}</p>`;
  const hr = `<hr style="border:none;border-top:1px solid #E2E8F0;margin:24px 0;" />`;
  const step = (t: string) =>
    `<p style="margin:0 0 10px;font-family:${SANS};font-size:14px;line-height:1.6;color:#0F172A;"><span style="color:#5B8CFF;">&rarr;</span>&nbsp;&nbsp;${t}</p>`;
  return `
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Request received &middot; We review every founder personally.&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<div style="background:#F8FAFC;padding:28px 12px;">
  <div style="max-width:480px;margin:0 auto;">
    <p style="margin:0 0 14px;font-family:${MONO};font-size:11px;letter-spacing:0.22em;color:#475569;">NAVISLABS</p>
    <div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:10px;padding:28px 24px;">
      <p style="margin:0;font-family:${MONO};font-size:12px;font-weight:600;letter-spacing:0.12em;color:#0F172A;">REQUEST RECEIVED</p>
      <p style="margin:6px 0 0;font-family:${MONO};font-size:11px;color:#64748B;">${p.ts} IST</p>
      <p style="margin:16px 0 0;font-family:${MONO};font-size:10px;letter-spacing:0.1em;color:#64748B;">STATUS</p>
      <p style="margin:3px 0 0;font-family:${SANS};font-size:14px;color:#0F172A;">Queued for review</p>
      <p style="margin:18px 0 0;font-family:${SANS};font-size:14px;line-height:1.65;color:#475569;">
        Your request is in the queue. We review every access request personally.
        If Navis is a fit for where you are right now, you&rsquo;ll hear from us within 48 hours.
      </p>
      ${hr}
      <p style="margin:0 0 14px;font-family:${MONO};font-size:10px;letter-spacing:0.12em;color:#64748B;">WHAT YOU SUBMITTED</p>
      ${label("FULL NAME")}${value(p.name)}
      ${label("COMPANY")}${value(p.company)}
      ${label("TEAM SIZE")}${value(p.teamSize)}
      ${label("CONTEXT LOST IN")}${value(p.contextTool)}
      ${label("WHAT SLIPPED")}
      <p style="margin:0;font-family:${SANS};font-size:14px;line-height:1.6;font-style:italic;color:#0F172A;">&ldquo;${p.whatSlipped}&rdquo;</p>
      ${hr}
      <p style="margin:0 0 14px;font-family:${MONO};font-size:10px;letter-spacing:0.12em;color:#64748B;">WHAT HAPPENS NEXT</p>
      ${step("We read your answer carefully")}
      ${step("If the problem matches what Navis is built to solve, we&rsquo;ll reach out")}
      ${step("Early access includes founder onboarding")}
      ${hr}
      <p style="margin:0;font-family:${SANS};font-size:13px;color:#0F172A;">Questions?</p>
      <p style="margin:2px 0 0;font-family:${SANS};font-size:13px;color:#475569;">Reply directly to this email.</p>
    </div>
    <p style="margin:16px 0 0;font-family:${MONO};font-size:10px;letter-spacing:0.12em;line-height:1.9;color:#64748B;">
      NAVISLABS &middot; BANGALORE<br/>
      <a href="https://navislabs.in" style="color:#64748B;text-decoration:none;">navislabs.in</a> &middot;
      <a href="mailto:hello@navislabs.in" style="color:#5B8CFF;text-decoration:none;">hello@navislabs.in</a>
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
