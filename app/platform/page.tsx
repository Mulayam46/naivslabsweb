import type { Metadata } from "next";
import {
  Building2, CalendarDays, Clock3, FolderKanban, GitBranch, Handshake,
  Layers, LineChart, Link2, Lock, Plug, Rocket, ScrollText, Search,
  ShieldCheck, SlidersHorizontal, Sparkles, Sunrise, UserCheck, Users,
} from "lucide-react";
import { PageShell } from "@/components/site/chrome";
import { MorningIntelligence } from "@/components/site/dashboard";
import { FaqJsonLd } from "@/components/site/jsonld";
import { BrandIcon, SOON_MARKS, SUPPORTED_MARKS } from "@/components/site/logos";
import { Reveal } from "@/components/site/reveal";
import { Button, Card, Container, Section, SectionHead } from "@/components/site/ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

/* The technical hub. A visitor arrives here already interested, so the
   page's job is to PROVE rather than explain: show the product, make the
   category difference obvious, show the evidence behind a conclusion, and
   be honest about which systems are actually live today. */

export const metadata: Metadata = {
  title: "Platform",
  description:
    "One operational model, continuously maintained from Gmail, Calendar, Slack and Docs — with the evidence behind every conclusion, the systems that are live today, and a one-week deployment.",
  alternates: { canonical: "/platform" },
};

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

/* ── Content ─────────────────────────────────────────────── */

const MODEL = [
  [Users, "People", "Responsibilities, expertise, availability"],
  [FolderKanban, "Projects", "Status, blockers, momentum, dependencies"],
  [Building2, "Customers", "Relationships, risk, open commitments"],
  [GitBranch, "Decisions", "What was decided, by whom, on what basis"],
  [Handshake, "Commitments", "Promised, delivered, overdue"],
  [CalendarDays, "Meetings", "Who met, what changed as a result"],
] as const;

/* The category difference in the fewest words that can carry it. */
const DIFFERENCE = [
  ["Searches documents on request", "Continuously understands how the organization changes"],
  ["Answers the question you asked", "Tells you what needs attention before you ask"],
  ["Starts cold in every session", "Remembers what was decided and what was promised"],
  ["Confident prose, no provenance", "Every conclusion traceable to its source signals"],
] as const;

const PIPELINE = [
  [Plug, "Connect", "Read-only scopes your administrator grants. No migration, no endpoint agents."],
  [Layers, "Understand", "Entities resolved across systems and held as one continuously updated model."],
  [Sparkles, "Reason", "What was promised, measured against what actually happened."],
  [UserCheck, "Approve", "A person decides. Nothing leaves the system without them."],
] as const;

const TRACE = [
  [Search, "Signals used", "4 email threads · 2 meetings · 1 usage report", "The exact records the conclusion was drawn from."],
  [LineChart, "Confidence", "High — four independent signals agree", "How strongly the evidence supports the claim."],
  [Link2, "Source links", "Renewal thread · Q3 review notes · Account usage", "One click back to the original record."],
  [Clock3, "Timeline", "No reply for 18 days · surfaced Tue 07:00", "When it changed, and what changed it."],
] as const;

const SECURITY = [
  [Lock, "Read-only", "Scopes your administrator grants, revocable at any time."],
  [UserCheck, "Human approval", "Nothing acts without a person deciding."],
  [ScrollText, "Audit trail", "Every conclusion logged with its source signals."],
  [ShieldCheck, "Organization-owned data", "Never used to train shared models."],
] as const;

const ROLLOUT = [
  [Plug, "Day 1", "Connect", "Your administrator grants read-only scopes. Nothing is migrated."],
  [SlidersHorizontal, "Week 1", "Calibrate", "NavisLabs builds the first model. We tune priorities with your team."],
  [Sunrise, "Week 2", "Operate", "Morning Intelligence begins, and sharpens every cycle."],
  [LineChart, "Week 4", "Review", "Leadership runs its weekly review from one operating picture."],
  [Layers, "Month 2", "Remember", "Decisions and commitments accumulate into durable organizational memory."],
  [Rocket, "Month 3", "Compound", "The model measurably sharpens what the organization acts on."],
] as const;

const FAQ = [
  [
    "Where does our data actually live?",
    "Your data stays in your systems. NavisLabs maintains a derived model inside your deployment, and retention is configurable — including full deletion on request.",
  ],
  [
    "Is access really read-only?",
    "Yes. NavisLabs connects through the OAuth scopes your administrator grants and never writes back to your systems. Revoke a scope and ingestion stops immediately.",
  ],
  [
    "Do you train models on our data?",
    "No. Your organization's data is never used to train shared or foundation models.",
  ],
  [
    "What happens when NavisLabs is wrong?",
    "Every conclusion carries the signals behind it, so you can check the reasoning before acting on it. Nothing acts autonomously, and a person approves anything that leaves the system.",
  ],
  [
    "How long does deployment take?",
    "Connection takes a day. The first model is built inside a week, and Morning Intelligence typically begins in week two. There is no migration project.",
  ],
  [
    "Which systems are supported today?",
    "Gmail, Google Calendar, Google Meet, Google Drive, Google Docs and Slack are live now. Everything else listed above is on the roadmap, and we will tell you where a system stands before you commit to anything.",
  ],
] as const;

/* ── Page ────────────────────────────────────────────────── */

export default function PlatformPage() {
  return (
    <PageShell
      backdrop
      eyebrow="Platform"
      title="One operational model,"
      titleMuted="shared across the organization."
      lede="Continuously maintained from Gmail, Calendar, Meet, Drive, Docs and Slack — the systems your work already lives in — then reported back each morning as what needs a decision."
    >
      {/* ── Show the product before explaining it ── */}
      <Section id="morning-intelligence" pad="sm">
        <Container>
          <Reveal>
            <div className="product-well mx-auto max-w-[1100px]">
              <MorningIntelligence className="product-surface" />
            </div>
          </Reveal>
          <p className="t-caption mx-auto mt-5 max-w-[1100px] text-text-2">
            Morning Intelligence · what NavisLabs produced from one organization&rsquo;s
            own systems, unedited in structure.
          </p>
        </Container>
      </Section>

      {/* ── The category difference: the fastest way to be understood ── */}
      <Section id="difference" pad="md">
        <Container>
          <SectionHead
            eyebrow="Why this is different"
            title={
              <>
                Not an assistant you query.{" "}
                <span className="text-text-2">A model that stays current.</span>
              </>
            }
            lede="Most AI tools wait to be asked, then start from nothing. NavisLabs maintains an understanding of the organization whether or not anyone is looking at it."
          />

          <Reveal delay={0.06}>
            <div className="mt-12 overflow-hidden rounded-card border border-border bg-surface">
              {/* The column heads only make sense once the two columns sit
                  side by side; below sm each cell labels itself instead. */}
              <div className="hidden border-b border-border sm:grid sm:grid-cols-2">
                <p className="t-label px-6 py-4 text-text-2">Traditional AI tools</p>
                <p className="t-label border-l border-border px-6 py-4 text-accent">NavisLabs</p>
              </div>

              {DIFFERENCE.map(([before, after], i) => (
                <div
                  key={after}
                  className={`grid sm:grid-cols-2 ${i > 0 ? "border-t border-border" : "sm:border-t-0"}`}
                >
                  <div className="px-6 py-6">
                    <p className="t-label text-text-2 sm:hidden">Traditional AI tools</p>
                    <p className="t-body mt-1.5 text-text-2 sm:mt-0">{before}</p>
                  </div>
                  <div className="border-t border-border px-6 py-6 sm:border-l sm:border-t-0">
                    <p className="t-label text-accent sm:hidden">NavisLabs</p>
                    <p className="t-body mt-1.5 text-text sm:mt-0">{after}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Operational model ── */}
      <Section id="operational-model" pad="md">
        <Container>
          <SectionHead
            eyebrow="Operational model"
            title="The organization, kept current."
            lede="Not documents retrieved on request. Entities that stay accurate as reality changes."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {MODEL.map(([Icon, name, detail], i) => (
              <Reveal key={name} delay={Math.min(i * 0.04, 0.2)}>
                <div className="h-full bg-surface p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-border text-accent">
                    <Icon {...ICON} />
                  </span>
                  <h3 className="t-strong mt-5 text-text">{name}</h3>
                  <p className="t-caption mt-2 leading-relaxed text-text-2">{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Architecture, drawn as the loop it actually is ── */}
      <Section id="architecture" pad="md">
        <Container>
          <SectionHead
            eyebrow="Architecture"
            title="Connect, understand, reason, approve — then again."
            lede="The pipeline does not run once. Every approval and every new signal feeds the next cycle."
          />

          <div className="mt-12">
            {/* Signal entering the pipeline. */}
            <div aria-hidden className="mb-6 hidden lg:block">
              <div className="flow-rail" />
            </div>

            <div className="grid gap-px overflow-hidden rounded-card border border-border bg-border lg:grid-cols-4">
              {PIPELINE.map(([Icon, title, body], i) => (
                <Reveal key={title} delay={i * 0.06}>
                  <div className="h-full bg-surface p-7">
                    <span className="t-mono t-label text-text-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-4 flex h-11 w-11 items-center justify-center rounded-[14px] border border-border text-accent">
                      <Icon {...ICON} />
                    </span>
                    <h3 className="t-strong mt-5 text-text">{title}</h3>
                    <p className="t-caption mt-2 leading-relaxed text-text-2">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* …and returning to the model, which is what makes it a loop. */}
            <div aria-hidden className="mt-6 hidden lg:block">
              <div className="flow-rail flow-rail-return" />
            </div>
            <p className="mt-5 flex items-center gap-2 t-caption text-text-2">
              <Sparkles strokeWidth={1.75} aria-hidden className="icon-inline text-accent" />
              Every outcome returns to the model, so the next cycle starts better informed.
            </p>
          </div>

          <div className="mt-8">
            <Button href="/how-it-works" variant="ghost">
              See the full architecture →
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Traceability: the proof, not the promise ── */}
      <Section id="traceability" pad="md">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <SectionHead
              eyebrow="Traceability"
              title="Every conclusion shows its work."
              lede="If NavisLabs cannot show why it surfaced something, it does not surface it. This is the same trace behind the first item in the panel above."
            />

            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-card border border-border bg-surface">
                <div className="border-b border-border bg-surface-alt px-6 py-4">
                  <p className="t-label text-text-2">Trace</p>
                  <p className="t-strong mt-1.5 text-text">
                    Acme Corp has gone quiet 34 days before renewal
                  </p>
                </div>

                <dl>
                  {TRACE.map(([Icon, term, value, note], i) => (
                    <div
                      key={term}
                      className={`flex items-start gap-4 px-6 py-5 ${i > 0 ? "border-t border-border" : ""}`}
                    >
                      <span className="mt-0.5 text-accent">
                        <Icon {...ICON} />
                      </span>
                      <div className="min-w-0">
                        <dt className="t-label text-text-2">{term}</dt>
                        <dd className="t-caption mt-1.5 text-text">{value}</dd>
                        <dd className="t-caption mt-1 leading-relaxed text-text-2">{note}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ── Integrations: honest about what is live today ── */}
      <Section id="integrations" pad="md">
        <Container>
          <SectionHead
            eyebrow="Integrations"
            title="Connects to the systems you already run."
            lede="Read-only, through the OAuth scopes your administrator grants."
            align="center"
          />

          <div className="mx-auto mt-12 max-w-[940px]">
            <div className="flex items-baseline justify-between gap-4">
              <p className="t-label text-text">Supported</p>
              <p className="t-caption text-text-2">{SUPPORTED_MARKS.length} systems</p>
            </div>
            <Reveal delay={0.04}>
              <ul className="mt-4 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {SUPPORTED_MARKS.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-center justify-between gap-4 bg-surface px-5 py-4"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <BrandIcon name={m.id} size={26} decorative />
                      <span className="t-caption truncate text-text">{m.label}</span>
                    </span>
                    <span className="t-label flex-shrink-0 text-text">Supported</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="mt-12 flex items-baseline justify-between gap-4">
              <p className="t-label text-text">Coming soon</p>
              <p className="t-caption text-text-2">{SOON_MARKS.length} on the roadmap</p>
            </div>
            <Reveal delay={0.04}>
              <ul className="mt-4 grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {SOON_MARKS.map((m) => (
                  <li
                    key={m.id}
                    className="is-soon flex items-center justify-between gap-4 bg-surface px-5 py-4"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <BrandIcon name={m.id} size={26} decorative />
                      <span className="t-caption truncate text-text-2">{m.label}</span>
                    </span>
                    <span className="t-label flex-shrink-0 text-text-2">Coming soon</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <p className="t-caption mx-auto mt-8 max-w-[64ch] text-center leading-relaxed text-text-2">
              Need a specific system? Let us know during your demo and we&rsquo;ll tell
              you exactly where it stands.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── Security ── */}
      <Section id="security" pad="md">
        <Container>
          <SectionHead eyebrow="Security" title="Trust is a design constraint." align="center" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SECURITY.map(([Icon, title, body], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <Card className="trust-card h-full p-6">
                  <span className="trust-icon flex h-12 w-12 items-center justify-center rounded-[16px] border border-border text-accent">
                    <Icon {...ICON} />
                  </span>
                  <h3 className="t-strong mt-5 text-text">{title}</h3>
                  <p className="t-caption mt-2 leading-relaxed text-text-2">{body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/security" variant="secondary">Read the security overview</Button>
          </div>
        </Container>
      </Section>

      {/* ── Deployment, all the way out ── */}
      <Section id="deployment" pad="md">
        <Container>
          <SectionHead
            eyebrow="Deployment"
            title="Live in a week. Compounding from there."
            lede="The first two weeks are setup. Everything after that is the model getting better at the organization it is watching."
          />
          <ol className="mt-12 max-w-[820px]">
            {ROLLOUT.map(([Icon, when, title, body], i) => (
              <Reveal as="li" key={title} delay={Math.min(i * 0.05, 0.25)}>
                <div className="relative grid grid-cols-[2.75rem_1fr] items-start gap-5 pb-10 sm:gap-8">
                  {i < ROLLOUT.length - 1 && (
                    <span aria-hidden className="absolute bottom-0 left-[1.375rem] top-12 w-px bg-border" />
                  )}
                  <span
                    className={`z-10 flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent ${
                      i < 3 ? "border border-border" : "border border-accent-line"
                    }`}
                  >
                    <Icon {...ICON} />
                  </span>
                  <div className="pt-2">
                    <span className="t-label text-text-2">{when}</span>
                    <h3 className="t-section mt-1.5 text-text">{title}</h3>
                    <p className="t-body mt-2 text-text-2">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── FAQ: the questions a security review asks anyway ── */}
      <Section id="faq" pad="md">
        <FaqJsonLd items={FAQ} />
        <Container>
          <SectionHead eyebrow="Questions" title="What your review will ask." />
          <Reveal delay={0.06}>
            <div className="mt-12 max-w-[860px] overflow-hidden rounded-card border border-border bg-surface">
              {FAQ.map(([q, a], i) => (
                <details key={q} className={`faq ${i > 0 ? "border-t border-border" : ""}`}>
                  <summary className="flex items-center justify-between gap-6 px-6 py-5">
                    <span className="t-strong text-text">{q}</span>
                    <span aria-hidden className="faq-mark flex-shrink-0 text-text-2">
                      <svg viewBox="0 0 12 12" width="12" height="12" fill="none">
                        <path
                          d="M6 1.5v9M1.5 6h9"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="t-caption max-w-[70ch] px-6 pb-6 leading-relaxed text-text-2">{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ── Close ── */}
      <Section id="demo" pad="lg">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[620px] text-center">
              <h2 className="t-heading text-text">
                Questions?{" "}
                <span className="text-text-2">Talk directly with the founders.</span>
              </h2>
              <p className="t-body mt-6 text-text-2">
                A 30-minute working session on your own systems. No slideware, no
                qualification call first.
              </p>
              <div className="mt-9 flex justify-center">
                <MeetingTrigger size="lg" />
              </div>
              <p className="t-caption mt-6 text-text-2">
                NavisLabs is currently deployed with a small group of design partners.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </PageShell>
  );
}
