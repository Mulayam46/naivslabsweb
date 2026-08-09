import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Code2, Compass, Headset, Inbox, RefreshCw, Settings2,
  TrendingUp, TriangleAlert, UserMinus,
} from "lucide-react";
import { PageShell } from "@/components/site/chrome";
import { AVAILABLE_MARKS, BrandIcon } from "@/components/site/logos";
import { Reveal } from "@/components/site/reveal";
import { Button, Card, Container, Section, SectionHead } from "@/components/site/ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

/* A Solutions page does not explain the product — it shows what each
   team gets out of it.

   The word "model" is deliberately absent from the hero. It is precise
   internally and ambiguous everywhere else: a cold visitor reads it as
   an LLM, a data model or an operating model. "Understanding" carries
   the same claim and connects straight to the homepage positioning. */

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "One understanding, different decisions. Engineering, operations, sales, customer success and leadership all work from the same continuously updated understanding of the organization.",
  alternates: { canonical: "/solutions" },
};

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

const TEAMS = [
  {
    Icon: Code2,
    fn: "Engineering",
    question: "Where is delivery actually blocked?",
    answer: "The platform hiring loop is blocked on three pending reviews.",
    because: "2 scorecards unsubmitted · median stage time exceeded by 9 days",
  },
  {
    Icon: Settings2,
    fn: "Operations",
    question: "What is actually happening across the business?",
    answer: "Five commitments made this quarter are now past due across three teams.",
    because: "Extracted from meeting notes · no linked activity since",
  },
  {
    Icon: TrendingUp,
    fn: "Sales",
    question: "Which accounts are going quiet?",
    answer: "Acme Corp has gone quiet 34 days before renewal.",
    because: "Renewal thread inactive 18 days · sentiment down across 4 threads",
  },
  {
    Icon: Headset,
    fn: "Customer Success",
    question: "Who needs attention before renewal?",
    answer: "Six accounts have open commitments with nobody assigned this week.",
    because: "2 escalations closed last month · usage flat 3 weeks",
  },
  {
    Icon: Compass,
    fn: "Leadership",
    question: "What needs a decision today?",
    answer: "Three things need you. Board metrics promised for Thursday is one of them.",
    because: "Committed in the Q3 review 9 days ago · data room untouched since",
  },
] as const;

const EROSION = [
  [UserMinus, "Context lives in people.", "When they leave, the reasoning leaves with them."],
  [RefreshCw, "Decisions get made twice.", "Nobody can find what was decided in March, so it reopens in September."],
  [Inbox, "Commitments are lost in inboxes.", "Nothing tracks the gap between what was promised and what happened."],
  [TriangleAlert, "Risk arrives late.", "By the time it reaches a dashboard, it is already expensive."],
] as const;

/* A drawn line rather than an arrow — the same thread the homepage uses,
   so the two diagrams read as one idea continued. */
function Thread() {
  return (
    <div aria-hidden className="flex justify-center py-5">
      <span
        className="h-12 w-px"
        style={{
          background: "linear-gradient(var(--border), var(--accent-line) 55%, var(--accent))",
        }}
      />
    </div>
  );
}

/* The whole page in one picture: systems in, one understanding, every
   team out. Nothing here is decorative — it is the argument. */
function Diagram() {
  return (
    <div className="mx-auto max-w-[860px]">
      <Reveal>
        <p className="t-label mb-4 text-center text-text-2">Your systems</p>
        <ul className="flex flex-wrap justify-center gap-x-7 gap-y-4 rounded-card border border-border bg-surface px-7 py-6">
          {AVAILABLE_MARKS.map((m) => (
            <li key={m.id} className="group flex items-center gap-2">
              <BrandIcon name={m.id} />
              <span className="t-caption text-text-2">{m.label}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Thread />

      <Reveal delay={0.06}>
        <div className="relative overflow-hidden rounded-card border border-accent-line bg-accent-wash px-6 py-9 text-center">
          <span
            aria-hidden
            className="anim-sheen absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg,transparent,var(--accent),transparent)" }}
          />
          <p className="t-heading text-text">NavisLabs</p>
          <p className="t-caption mt-2 text-text-2">
            One continuously updated understanding of the organization
          </p>
        </div>
      </Reveal>

      <Thread />

      <Reveal delay={0.1}>
        <p className="t-label mb-4 text-center text-text-2">Every team</p>
        <ul className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
          {TEAMS.map(({ Icon, fn }) => (
            <li
              key={fn}
              className="flex flex-col items-center gap-2.5 bg-surface px-3 py-6 text-center"
            >
              <Icon {...ICON} className="icon-ui text-accent" />
              <span className="t-caption text-text">{fn}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function SolutionsPage() {
  return (
    <PageShell
      backdrop
      eyebrow="Solutions"
      title="One understanding."
      titleMuted="Different decisions."
      lede="NavisLabs continuously maintains a shared understanding of your organization. Engineering, Sales, Operations, Customer Success and Leadership all work from the same source of truth — each simply arrives with a different question."
    >
      {/* ── The whole page, in five seconds ── */}
      <Section id="shared-understanding" pad="sm">
        <Container>
          <Diagram />
        </Container>
      </Section>

      {/* ── Why it matters ── */}
      <Section id="problem" pad="md">
        <Container>
          <SectionHead
            eyebrow="The problem"
            title={<>Nothing breaks. <span className="text-text-2">It erodes.</span></>}
            lede="Without a shared understanding, every team rebuilds its own — from memory, from threads, from whoever happens to still be there."
          />
          <div className="mt-12 grid gap-x-12 gap-y-11 sm:grid-cols-2">
            {EROSION.map(([Icon, title, body], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <div className="max-w-[44ch]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-border bg-surface text-accent">
                    <Icon {...ICON} />
                  </span>
                  <h3 className="t-strong mt-5 text-text">{title}</h3>
                  <p className="t-body mt-2 text-text-2">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── One card per team: question, answer, evidence ── */}
      <Section id="by-team" pad="md">
        <Container>
          <SectionHead
            eyebrow="By team"
            title="Same source. Different question."
            lede="Each of these is a real shape of answer, with the signals that produced it."
          />

          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {TEAMS.map(({ Icon, fn, question, answer, because }, i) => (
              <Reveal
                key={fn}
                delay={Math.min(i * 0.05, 0.2)}
                className={i === TEAMS.length - 1 ? "lg:col-span-2" : undefined}
              >
                <Card className="flex h-full flex-col p-6">
                  <span className="flex items-center gap-2.5">
                    <Icon {...ICON} className="icon-ui text-accent" />
                    <span className="t-label text-text-2">{fn}</span>
                  </span>

                  <p className="t-label mt-6 text-text-2">Question</p>
                  <h3 className="t-strong mt-1.5 text-text">
                    &ldquo;{question}&rdquo;
                  </h3>

                  <p className="t-label mt-6 text-text-2">NavisLabs answers</p>
                  <p className="t-body mt-1.5 text-text">{answer}</p>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 rounded-[10px] bg-surface-alt px-3 py-2 t-caption leading-relaxed text-text-2">
                    <span className="t-label text-text-2">Because</span>
                    <span className="t-mono t-caption">{because}</span>
                  </p>

                  <Link
                    href="/platform#morning-intelligence"
                    className="group mt-auto inline-flex items-center gap-1.5 pt-6 t-caption font-medium text-accent"
                  >
                    See it in Morning Intelligence
                    <ArrowRight
                      strokeWidth={1.75}
                      aria-hidden
                      className="icon-inline transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                    />
                  </Link>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <MeetingTrigger size="lg" />
            <Button href="/platform" variant="secondary" size="lg">See the platform</Button>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
