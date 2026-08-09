import type { Metadata } from "next";
import { PageShell } from "@/components/site/chrome";
import { Reveal } from "@/components/site/reveal";
import { Button, Card, Chip, Container, Section, SectionHead } from "@/components/site/ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

export const metadata: Metadata = {
  title: "Thesis",
  description:
    "The long-form NavisLabs thesis: intelligence is becoming abundant while organizational context stays scarce. Why the operational model — not the model — is the bottleneck.",
  alternates: { canonical: "/vision" },
};

const STATE: [string, string][] = [
  ["People", "Responsibilities, expertise, influence, availability"],
  ["Projects", "Status, blockers, momentum, dependencies"],
  ["Customers", "Relationships, risk, open commitments, sentiment"],
  ["Decisions", "What was decided, by whom, on what basis, with what outcome"],
  ["Commitments", "Promised, delivered, overdue, renegotiated"],
  ["Relationships", "Internal, customer, investor, partner, candidate"],
  ["Strategy", "Goals, priorities, and how work actually maps to them"],
];

const ARC = [
  "Reality", "Signals", "Operational State", "Understanding",
  "Reasoning", "Decisions", "Actions", "Outcomes", "Learning",
  "Intelligence", "Adaptive Organization",
];

const SUCCESS: [string, string][] = [
  ["Short term", "An operating team cannot start the week without NavisLabs."],
  ["Mid term", "Decision quality measurably improves because of it."],
  ["Long term", "Every AI-native enterprise runs on an operational model like this one."],
];

export default function VisionPage() {
  return (
    <PageShell
      eyebrow="Thesis"
      title="Intelligence is becoming abundant."
      titleMuted="Organizational context is scarce."
      lede="Most AI companies believe more intelligence solves the problem. We believe context does. The bottleneck is no longer the model — it is organizational memory, operational state and decision continuity."
    >
      <Section ground="surface" line>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <SectionHead
              eyebrow="Operational state"
              title="A living model of the organization."
              lede="The operational state is the most valuable asset NavisLabs creates: a continuously updated model of what is actually happening — not a report about what happened."
            />
            <div className="grid gap-4 self-center sm:grid-cols-2">
              {STATE.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.04}>
                  <Card className="h-full p-5">
                    <span className="t-label text-text-2">{k}</span>
                    <p className="mt-2.5 t-caption leading-relaxed text-text-2">{v}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section ground="canvas">
        <Container>
          <SectionHead
            eyebrow="The trajectory"
            title="Today, a morning brief. Tomorrow, the intelligence layer."
          />
          <Reveal delay={0.08}>
            <div className="mt-12 flex flex-wrap items-center gap-2">
              {ARC.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <Chip
                    className={
                      i >= ARC.length - 2
                        ? "border-accent-line bg-accent-wash text-accent"
                        : s === "Operational State"
                          ? "border-border-strong text-text"
                          : ""
                    }
                  >
                    {s}
                  </Chip>
                  {i < ARC.length - 1 && (
                    <span aria-hidden className="t-caption text-text-2">
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </Reveal>
          <p className="mt-12 max-w-[560px] t-body leading-relaxed text-text-2">
            The organization becomes capable of understanding itself. Every cycle through
            the loop makes the model sharper — and that compounding is both the moat and
            the category.
          </p>
        </Container>
      </Section>

      <Section ground="surface" line>
        <Container>
          <SectionHead eyebrow="What success looks like" title="Three horizons." />
          <div className="mt-14 max-w-[880px]">
            {SUCCESS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <div className="grid items-baseline gap-3 border-t border-border py-7 last:border-b sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-8">
                  <span className="t-label text-text-2">{k}</span>
                  <span className="t-strong text-text">{v}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <div className="mt-20 max-w-[760px]">
              <p className="t-label text-text-2">The question we expect to spend a decade on</p>
              <p className="t-heading mt-6 text-text">
                Can organizations become{" "}
                <span className="text-accent">continuously learning systems?</span>
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <MeetingTrigger size="lg" />
                <Button href="/company" variant="secondary" size="lg">About NavisLabs</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
