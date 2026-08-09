import type { Metadata } from "next";
import { PageShell } from "@/components/site/chrome";
import { Reveal } from "@/components/site/reveal";
import { Button, Card, Container, Section, SectionHead } from "@/components/site/ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The architecture behind NavisLabs: eight layers that turn raw organizational signals into a live operational model, prioritized decisions, and a learning loop.",
  alternates: { canonical: "/how-it-works" },
};

const LAYERS: [string, string, string][] = [
  ["L1", "Signals", "Mail, calendar, meetings, chat, documents, drives and tickets — read continuously on a schedule, never summarized away."],
  ["L2", "Entity resolution", "The customer in the CRM, the thread in the inbox and the name in a meeting note are recognized as the same entity."],
  ["L3", "Organizational memory", "People, projects, customers, decisions, commitments, relationships and history, held as one durable model."],
  ["L4", "Operational state", "What is true right now: who owns what, what is moving, what has stalled, what was promised and not yet delivered."],
  ["L5", "Reasoning", "Context assembly, pattern recognition, risk and priority analysis. Why does this matter, to whom, and how much?"],
  ["L6", "Decision surface", "What needs a human today, what should be delegated, what can be ignored — ranked, owned and explained."],
  ["L7", "Observation", "What actually happened next. Did the customer reply? Did the review get done? Did the project move?"],
  ["L8", "Learning", "Outcomes feed back into the model. The organization's understanding of itself compounds every cycle."],
];

const ROLLOUT: [string, string, string][] = [
  ["Day 1", "Connect", "Your administrator grants read-only scopes. No migration, no endpoint agents, no change to how teams work."],
  ["Week 1", "Calibrate", "NavisLabs resolves entities and builds the first operational model. We tune priorities with your team."],
  ["Week 2", "Operate", "Morning Intelligence begins. Each cycle sharpens the model as it learns what your organization acts on."],
];

export default function HowItWorksPage() {
  return (
    <PageShell
      eyebrow="Architecture"
      title="Eight layers."
      titleMuted="One loop."
      lede="NavisLabs is not a feature set. It is a loop that turns raw organizational signals into understanding, decisions and — over time — compounding intelligence."
    >
      <Section ground="surface" line>
        <Container>
          <SectionHead eyebrow="The stack" title="From signal to intelligence." />
          <ol className="mx-auto mt-14 max-w-[880px]">
            {LAYERS.map(([id, name, body], i) => (
              <Reveal as="li" key={id} delay={Math.min(i * 0.04, 0.24)}>
                <div className="relative grid grid-cols-[3rem_1fr] gap-5 pb-9 md:gap-8">
                  {i < LAYERS.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[1.375rem] top-10 w-px bg-border"
                    />
                  )}
                  <span
                    className={`z-10 flex h-11 w-11 items-center justify-center rounded-[14px] border font-mono t-caption font-medium ${
                      i === LAYERS.length - 1
                        ? "border-accent-line bg-accent-wash text-accent"
                        : "border-border bg-surface text-text-2"
                    }`}
                  >
                    {id}
                  </span>
                  <div className="pt-1.5">
                    <h2
                      className={`t-section ${i === LAYERS.length - 1 ? "text-accent" : "text-text"}`}
                    >
                      {name}
                    </h2>
                    <p className="mt-2.5 max-w-[600px] t-body leading-relaxed text-text-2">
                      {body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section ground="canvas">
        <Container>
          <SectionHead
            eyebrow="Rollout"
            title="Live in a week, not a quarter."
            lede="There is no data migration and no implementation project. NavisLabs reads the systems you already run."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {ROLLOUT.map(([when, t, b], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <Card className="h-full p-7 md:p-8">
                  <span className="t-label text-text-2">{when}</span>
                  <h3 className="t-section mt-4 text-text">{t}</h3>
                  <p className="mt-3 t-body leading-relaxed text-text-2">{b}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section ground="surface" line>
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-[520px]">
              <h2 className="t-heading text-text">Want to see it on your systems?</h2>
              <p className="t-body mt-4">
                Thirty minutes, a read-only scope, and a written summary of what the model found.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <MeetingTrigger size="lg" />
              <Button href="/security" variant="secondary" size="lg">Security overview</Button>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
