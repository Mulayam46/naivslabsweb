"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SystemBar, Footer, ModuleLabel } from "./chrome";

const FIELD =
  "h-12 w-full rounded-md bg-white/[0.04] px-4 font-mono text-[13px] text-ink outline-none ring-1 ring-white/[0.09] transition-shadow placeholder:text-ink-3 focus:ring-accent/60 disabled:opacity-60";

const LABEL =
  "mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-3";

const TOOLS = ["Gmail", "Slack", "Calendar", "Google Drive", "Notion", "All of them equally"];
const SIZES = ["1–5", "6–15", "16–50", "50+"];

export function RequestAccess() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [contextTool, setContextTool] = useState("");
  const [whatSlipped, setWhatSlipped] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit() {
    if (state === "loading") return;
    if (!name || !email || !company) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      const res = await fetch("/api/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, teamSize, contextTool, whatSlipped }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error();
      router.push("/request-received");
    } catch {
      setState("error");
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <SystemBar />

      <section className="flex flex-1 items-start px-6 pb-24 pt-32 md:pt-36">
        <div className="mx-auto w-full max-w-[640px]">
          <ModuleLabel n="00" title="Request Access" />
          <h1 className="mt-10 font-heading text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-[2.9rem]">
            Private beta.
            <br />
            <span className="text-ink-3">Founder-led startups only.</span>
          </h1>
          <p className="mt-6 max-w-[460px] text-[15.5px] leading-[1.7] text-ink-2">
            We review every request personally. If Navis is a fit, you&apos;ll
            hear from us within 48 hours.
          </p>

          {state === "done" ? (
            <div className="mt-14 rounded-[16px] bg-[rgba(13,20,36,0.78)] p-8 ring-1 ring-white/[0.09]">
              <p className="font-mono text-[12px] font-semibold tracking-[0.1em] text-ink">
                [REQUEST RECEIVED]
              </p>
              <p className="mt-5 text-[15px] leading-[1.75] text-ink-2">
                We&apos;ll review and respond within 48 hours.
                <br />
                Check your inbox for a confirmation.
              </p>
              <p className="mt-5 font-mono text-[12px] text-ink-3">
                In the meantime — hello@navislabs.in
              </p>
            </div>
          ) : (
            <div className="mt-12 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="ra-name" className={LABEL}>Full name</label>
                  <input
                    id="ra-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    disabled={state === "loading"}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="ra-email" className={LABEL}>Email</label>
                  <input
                    id="ra-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    disabled={state === "loading"}
                    className={FIELD}
                  />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="ra-company" className={LABEL}>Company name</label>
                  <input
                    id="ra-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company name"
                    disabled={state === "loading"}
                    className={FIELD}
                  />
                </div>
                <div>
                  <label htmlFor="ra-size" className={LABEL}>Team size</label>
                  <select
                    id="ra-size"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    disabled={state === "loading"}
                    className={FIELD + " cursor-pointer appearance-none"}
                  >
                    <option value="" disabled>Select…</option>
                    {SIZES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="ra-tool" className={LABEL}>
                  What tool do you lose the most context in?
                </label>
                <select
                  id="ra-tool"
                  value={contextTool}
                  onChange={(e) => setContextTool(e.target.value)}
                  disabled={state === "loading"}
                  className={FIELD + " cursor-pointer appearance-none"}
                >
                  <option value="" disabled>Select…</option>
                  {TOOLS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ra-slipped" className={LABEL}>
                  What&apos;s the most expensive thing that has slipped through
                  the cracks at your company?
                </label>
                <textarea
                  id="ra-slipped"
                  rows={3}
                  value={whatSlipped}
                  onChange={(e) => setWhatSlipped(e.target.value)}
                  placeholder="Be specific. This is how we decide if Navis is a fit for you."
                  disabled={state === "loading"}
                  className={FIELD + " h-auto resize-none py-3"}
                />
              </div>

              <div>
                <button
                  onClick={submit}
                  disabled={state === "loading"}
                  className="h-12 w-full cursor-pointer rounded-md bg-accent px-6 text-[13.5px] font-medium text-[#04060f] transition-colors hover:bg-accent-ink disabled:opacity-70 sm:w-auto"
                >
                  {state === "loading" ? "Reviewing..." : "Request access →"}
                </button>
                {state === "error" && (
                  <p className="mt-3 font-mono text-[11px] tracking-[0.04em] text-critical">
                    Something went wrong. Email us directly at hello@navislabs.in
                  </p>
                )}
              </div>
            </div>
          )}

          <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.16em] leading-[2.1] text-ink-3">
            Private beta · Google Workspace + Slack ·
            <br className="sm:hidden" /> human-in-the-loop · auditable
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
