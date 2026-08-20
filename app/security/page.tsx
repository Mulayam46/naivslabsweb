import type { Metadata } from "next";
import { PageShell } from "@/components/site/chrome";
import { Reveal } from "@/components/site/reveal";
import { Button, Card, Container, Section, SectionHead, Dot } from "@/components/site/ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How NavisLabs treats your organization's most sensitive systems: read-only OAuth scopes, human approval on every action, full explainability, and isolated data that never trains shared models.",
  alternates: { canonical: "/security" },
};

const CONSTRAINTS: [string, string, string][] = [
  [
    "Scope",
    "Read-only, granted by your administrator",
    "NavisLabs connects through OAuth scopes your administrator explicitly grants, and which can be revoked at any time. It reads; it does not write to your systems or act on your accounts.",
  ],
  [
    "Control",
    "A person approves anything that acts",
    "NavisLabs prepares, drafts and recommends. Nothing leaves the system without human approval. There is no autonomous mode to turn on.",
  ],
  [
    "Explainability",
    "Every conclusion shows its work",
    "Each item traces to the specific signals that produced it — which thread, which meeting, which document. If NavisLabs cannot show why, it does not surface the claim.",
  ],
  [
    "Isolation",
    "Your data stays yours",
    "Your organization's data is never used to train shared or foundation models. Every recommendation and approved action writes to an audit log you can export.",
  ],
];

const DEPLOYMENT: [string, string][] = [
  ["Access model", "Least-privilege OAuth. No endpoint agents, no browser extensions, no inbox rules."],
  ["Data in transit", "TLS 1.2+ on every connection to your identity provider and source systems."],
  ["Revocation", "Scopes are revocable from your admin console at any time; ingestion stops immediately."],
  ["Audit", "Every surfaced conclusion and approved action is logged with its source signals."],
  ["Retention", "Configurable per deployment, including full deletion on request."],
];

export default function SecurityPage() {
  return (
    <PageShell
      eyebrow="Security"
      title="Trust is a design constraint,"
      titleMuted="not a page."
      lede="NavisLabs reads the most sensitive surface an organization has — its mail, calendars and conversations. These are the constraints the system is built under, stated plainly."
    >
      <Section id="constraints" ground="surface" line>
        <Container>
          <SectionHead eyebrow="Operating constraints" title="Four commitments the architecture enforces." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {CONSTRAINTS.map(([k, title, body], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <Card className="h-full p-7 md:p-8">
                  <span className="t-label text-text-2">{k}</span>
                  {/* h3, not h2 — SectionHead above already owns the h2
                      for this section, so a sibling h2 here would flatten
                      four cards into four peer sections. */}
                  <h3 className="t-strong mt-4 text-text">{title}</h3>
                  <p className="mt-3 t-body leading-relaxed text-text-2">{body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section ground="canvas">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <SectionHead eyebrow="Deployment" title="What your security team will ask." />
            <Reveal>
              <dl className="card p-7 md:p-8">
                {DEPLOYMENT.map(([k, v], i) => (
                  <div
                    key={k}
                    className={`grid gap-2 py-4 sm:grid-cols-[minmax(0,9rem)_1fr] sm:gap-6 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <dt className="t-label pt-1 text-text-2">{k}</dt>
                    <dd className="t-body leading-relaxed text-text-2">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section ground="surface" line>
        <Container>
          <div className="max-w-[760px]">
            <SectionHead eyebrow="Honest posture" title="What we do not claim." />
            <p className="mt-8 t-body leading-relaxed text-text-2">
              NavisLabs is early. We do not claim certifications we do not hold, logos we have
              not earned, or correctness that no probabilistic system can guarantee. What we
              do claim: least privilege, your approval on anything that acts, isolation of
              your data, and a traceable path behind every conclusion. If your security
              review needs something specific, ask us directly and we will answer plainly.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <MeetingTrigger />
              <Button href="mailto:hello@navislabs.in" variant="secondary">
                Send a security question
              </Button>
            </div>
            <p className="mt-8 flex items-center gap-2.5 t-caption text-text-2">
              <Dot signal="steady" />
              Security questions are answered by an engineer, not a form.
            </p>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
