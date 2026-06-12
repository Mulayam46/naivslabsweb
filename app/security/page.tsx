import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, ModuleLabel, Fade } from "@/components/site/chrome";

export const metadata: Metadata = {
  title: "Trust · Operating constraints",
  description:
    "How Navis treats your company's most sensitive data: read-only scopes, human-in-the-loop control, full explainability, and auditable actions.",
};

const CONSTRAINTS: [string, string, string][] = [
  [
    "SCOPE",
    "Read-only, granted by you",
    "Navis connects to Google Workspace and Slack through OAuth scopes you explicitly grant. It reads; it does not act on your accounts without you.",
  ],
  [
    "CONTROL",
    "Human-in-the-loop",
    "No autonomous fantasy. Navis recommends, prepares, and drafts — the founder approves anything that matters.",
  ],
  [
    "EXPLAINABILITY",
    "Every conclusion shows its work",
    "Each brief item traces to its source signals: which email, which meeting, which thread. If Navis can't show why, it doesn't say it.",
  ],
  [
    "AUDIT",
    "Everything is logged",
    "Every recommendation and approved action writes to an audit log. Your data stays yours — it is never used to train shared models.",
  ],
];

export default function SecurityPage() {
  return (
    <PageShell
      module="Trust"
      title="Trust is a design constraint,"
      titleMuted="not a page."
      intro="Navis reads the most sensitive surface a company has — its inbox, calendar, and conversations. These are the constraints the system is built under, stated plainly."
    >
      <section className="border-t border-line bg-bg-2 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="01" title="Operating constraints" />
          <div className="mx-auto mt-16 max-w-[920px]">
            {CONSTRAINTS.map(([k, title, body], i) => (
              <Fade key={k} delay={i * 0.05}>
                <div className="grid gap-3 border-t border-line py-9 last:border-b md:grid-cols-[12rem_1fr] md:gap-8">
                  <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-ink-3">
                    {k}
                  </span>
                  <div>
                    <h2 className="font-heading text-[21px] font-semibold tracking-[-0.015em] text-ink sm:text-[24px]">
                      {title}
                    </h2>
                    <p className="mt-2.5 max-w-[560px] text-[15px] leading-[1.75] text-ink-2">
                      {body}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="02" title="Honest posture" />
          <div className="mt-14 max-w-[760px]">
            <p className="text-[16.5px] leading-[1.8] text-ink-2">
              Navis is in private beta. We don&apos;t claim certifications we
              don&apos;t hold, logos we haven&apos;t earned, or correctness no
              probabilistic system can guarantee. What we do claim: least
              privilege, your approval on anything that matters, and a trace
              behind every conclusion. Security questions —{" "}
              <a
                href="mailto:hello@navislabs.in"
                className="text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
              >
                hello@navislabs.in
              </a>
              .
            </p>
            <Link
              href="/request-access"
              className="mt-10 inline-flex h-11 cursor-pointer items-center rounded-md bg-accent px-5 text-[13.5px] font-medium text-[#050816] transition-colors hover:bg-accent-ink"
            >
              Request access
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
