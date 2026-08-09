import { Bot, LayoutGrid, Lock, ScrollText, ShieldCheck, UserCheck, Users } from "lucide-react";
import { SystemBar, Footer } from "./chrome";
import { MorningIntelligence } from "./dashboard";
import { BrandIcon, SUPPORTED_MARKS } from "./logos";
import { Pipeline } from "./pipeline";
import { Reveal, Enter, ScrollSettle } from "./reveal";
import { Card, Container, Eyebrow, Section } from "./ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";
import { FounderAvatar } from "@/components/meeting/founder-avatar";
import { FOUNDER_FACES, FOUNDER_SUMMARY } from "@/lib/meetings";
import { HeroFilm } from "./hero-film";

/* ═══════════════════════════════════════════════════════════
   Homepage — eight chapters of one story, not eight pages.

   Every scroll answers the next question:
     1 Hero          What is NavisLabs?
     2 Dashboard     What does it actually look like?
     3 Systems       Where does it get data from?
     4 Workflow      How does it work?
     5 Intelligence  What does it produce?
     6 Trust         Can I trust it?
     7 Founders      Who built it?
     8 CTA           How do I try it?

   Sections paint NO background. One fixed canvas sits behind the whole
   page (see .page-canvas), so the scroll reads continuously instead of
   as stacked white blocks separated by hairlines.

   Server Component. Only Reveal/Enter, Pipeline, the nav, the video
   and the meeting triggers cross to the client.
═══════════════════════════════════════════════════════════ */

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

/* Supported connectors only — this strip claims NavisLabs is watching
   them right now, so GitHub (roadmap) cannot appear here. */
const WATCHING = ["Gmail", "Slack", "Calendar", "Drive", "Docs", "Meet"];

/* ── 1 · Hero + 2 · Dashboard (one unit, overlapping) ───── */

function Hero() {
  return (
    <>
      <section className="relative flex min-h-[76vh] flex-col justify-center overflow-hidden pt-[calc(var(--nav-h)+clamp(40px,6vw,80px))]">
        <HeroFilm />

        <Container className="relative">
          <div className="mx-auto max-w-[880px] text-center">
            <Enter delay={0.05}>
              <Eyebrow>Introducing NavisLabs</Eyebrow>
            </Enter>

            <Enter delay={0.14}>
              <h1 className="t-display mt-6 text-text">
                The shared understanding{" "}
                <span className="text-text-2">for your organization.</span>
              </h1>
            </Enter>

            <Enter delay={0.26}>
              <p className="t-body mx-auto mt-7 max-w-[600px] text-text-2">
                NavisLabs continuously understands how your organization operates,
                turning activity across your business systems into trusted operational
                intelligence for people and AI agents.
              </p>
            </Enter>

            {/* One action, and only one. */}
            <Enter delay={0.34}>
              <div className="mt-10 flex justify-center">
                <MeetingTrigger size="lg" />
              </div>
            </Enter>

            <Enter delay={0.44}>
              <div className="mt-14 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-2">
                  <span className="dot bg-steady anim-breathe" aria-hidden />
                  <span className="t-label text-steady">Live</span>
                </span>
                <span className="t-caption text-text-2">Watching</span>
                {WATCHING.map((w) => (
                  <span key={w} className="t-caption text-text">
                    {w}
                  </span>
                ))}
              </div>
            </Enter>
          </div>
        </Container>
      </section>

      {/* Rises out of the hero as you scroll, rather than sitting below it. */}
      <div className="relative z-10">
        <Container>
          <ScrollSettle>
            <div className="product-well mx-auto max-w-[1100px]">
              <MorningIntelligence className="product-surface rounded-[28px]" />
            </div>
          </ScrollSettle>
        </Container>
      </div>
    </>
  );
}

/* ── 3 · Connected systems ───────────────────────────────── */

const CONSUMERS = [
  [Users, "People"],
  [LayoutGrid, "Applications"],
  [Bot, "AI agents"],
] as const;

/* A drawn line rather than an arrow — quieter, and it reads as flow. */
function Thread() {
  return (
    <div aria-hidden className="flex justify-center py-6">
      <span
        className="h-14 w-px"
        style={{
          background:
            "linear-gradient(var(--border), var(--accent-line) 55%, var(--accent))",
        }}
      />
    </div>
  );
}

function Systems() {
  return (
    <Section id="systems" pad="md">
      <Container>
        <h2 className="sr-only">Where NavisLabs gets its data</h2>

        <div className="mx-auto max-w-[820px]">
          <Reveal>
            <p className="t-label mb-5 text-center text-text-2">Your systems</p>
            {/* Supported only. This strip sits directly under a claim about
                what NavisLabs reads, so listing a roadmap connector here
                would read as "already connected". */}
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-5 rounded-card border border-border bg-surface px-8 py-7">
              {SUPPORTED_MARKS.map((m) => (
                <li key={m.id} className="flex items-center gap-2.5">
                  <BrandIcon name={m.id} size={22} decorative />
                  <span className="t-caption text-text-2">{m.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Thread />

          <Reveal delay={0.06}>
            <div className="accent-block px-6 py-10 text-center">
              <span
                aria-hidden
                className="anim-sheen absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.85),transparent)" }}
              />
              <p className="t-heading relative text-on-accent">NavisLabs</p>
              <p className="t-caption relative mt-2 text-on-accent-2">
                One live understanding of how the organization operates
              </p>
            </div>
          </Reveal>

          <Thread />

          <Reveal delay={0.1}>
            <ul className="grid grid-cols-3 gap-3">
              {CONSUMERS.map(([Icon, label]) => (
                <li
                  key={label}
                  className="flex flex-col items-center gap-2.5 rounded-panel border border-border bg-surface px-4 py-6"
                >
                  <Icon {...ICON} className="text-text-2" />
                  <span className="t-caption font-medium text-text">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ── 4 · How it works ────────────────────────────────────── */

function How() {
  return (
    <Section id="how" pad="md">
      <Container>
        <h2 className="sr-only">How NavisLabs works</h2>
        <Pipeline />
      </Container>
    </Section>
  );
}

/* ── 5 · Morning Intelligence ────────────────────────────── */

const BRIEF = [
  ["risk", "Revenue risk", "Acme has gone quiet 34 days before renewal."],
  ["accent", "Decision waiting", "Three approvals have been sitting with you."],
  ["watch", "Commitment due", "Board metrics were promised for Thursday."],
] as const;

const tone = { risk: "text-risk", watch: "text-watch", accent: "text-accent" } as const;
const dotTone = { risk: "bg-risk", watch: "bg-watch", accent: "bg-accent" } as const;

function Intelligence() {
  return (
    <Section id="intelligence" pad="md">
      <Container>
        <h2 className="sr-only">What NavisLabs produces</h2>

        <Reveal>
          <div
            className="mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-border bg-surface"
            style={{ boxShadow: "var(--shadow-lg)" }}
          >
            <div className="flex items-center justify-between border-b border-border px-7 py-4">
              <span className="t-label text-text">Morning Intelligence</span>
              <span className="inline-flex items-center gap-2">
                <span className="dot bg-steady anim-breathe" aria-hidden />
                <span className="t-label text-steady">Live</span>
              </span>
            </div>

            <div className="px-7 pt-9">
              <p className="t-caption text-text-2">Good morning, Anita.</p>
              <p className="t-section mt-1 text-text">Three things need your attention.</p>
            </div>

            <ul className="mt-7 grid md:grid-cols-3">
              {BRIEF.map(([t, label, body], i) => (
                <li
                  key={label}
                  className={`border-t border-border px-7 py-7 ${i > 0 ? "md:border-l" : ""}`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={`dot ${dotTone[t]}`} aria-hidden />
                    <span className={`t-label ${tone[t]}`}>{label}</span>
                  </span>
                  <p className="t-body mt-3 text-text">{body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── 6 · Trust ───────────────────────────────────────────── */

const TRUST = [
  [Lock, "Read-only", "NavisLabs reads through scopes your administrator grants, and never writes back to your systems."],
  [UserCheck, "Human approval", "Nothing acts on its own. A person approves anything that leaves the system."],
  [ScrollText, "Audit trail", "Every conclusion is logged with the signals behind it, exportable at any time."],
  [ShieldCheck, "Organization-owned", "Your data is never used to train shared models, and stays yours throughout."],
] as const;

function Trust() {
  return (
    <Section id="trust" pad="md">
      <Container>
        <h2 className="sr-only">Why enterprises trust NavisLabs</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(([Icon, title, body], i) => (
            <Reveal key={title} delay={i * 0.06}>
              <Card className="trust-card group flex h-full min-h-[300px] flex-col p-7">
                <span className="trust-icon flex h-12 w-12 items-center justify-center rounded-[16px] border border-border text-accent">
                  <Icon {...ICON} />
                </span>
                <h3 className="t-section mt-6 text-text">{title}</h3>
                <p className="t-caption mt-3 leading-relaxed text-text-2">{body}</p>
                <span
                  aria-hidden
                  className="mt-auto h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                  style={{ background: "var(--accent-line)" }}
                />
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ── 7 · Founders ────────────────────────────────────────── */

function Founders() {
  return (
    <Section id="founders" pad="md">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="t-heading text-text">
            Built by founders,{" "}
            <span className="text-text-2">not marketers.</span>
          </h2>
          <p className="t-body mt-5 text-text-2">
            Building organizational intelligence takes more than AI.
          </p>

          <Reveal delay={0.06}>
            {/* Names only. Titles live exclusively in the booking dialog —
                the homepage stays minimal, so do not render f.role here. */}
            <div className="mt-12 flex items-start justify-center gap-10 sm:gap-16">
              {FOUNDER_FACES.map((f) => (
                <div key={f.id} className="flex w-[140px] flex-col items-center">
                  <FounderAvatar founder={f} size={104} />
                  <p className="mt-4 text-[15px] font-medium text-text">{f.name}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <p className="t-body mx-auto mt-12 max-w-[62ch] text-text-2">{FOUNDER_SUMMARY}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <MeetingTrigger view="note" variant="secondary">
              Read our founder note
            </MeetingTrigger>
            <a
              href="https://www.linkedin.com/company/navis-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="t-caption text-text-2 transition-colors hover:text-text"
            >
              LinkedIn →
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ── 8 · CTA ─────────────────────────────────────────────── */

function Close() {
  return (
    <Section id="demo" pad="lg">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[680px] text-center">
            <h2 className="t-heading text-text">
              Ready to understand{" "}
              <span className="text-text-2">your organization?</span>
            </h2>
            <p className="t-body mt-6 text-text-2">30 minute working session.</p>

            <div className="mt-9 flex justify-center">
              <MeetingTrigger size="lg" />
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <span className="flex items-center">
                {FOUNDER_FACES.map((f, i) => (
                  <FounderAvatar
                    key={f.id}
                    founder={f}
                    size={40}
                    className={i > 0 ? "-ml-3" : undefined}
                  />
                ))}
              </span>
              <p className="t-caption text-text-2">
                We&rsquo;ll personally walk through your organization.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export function Home() {
  return (
    <main className="relative">
      {/* One canvas behind the entire scroll. */}
      <div aria-hidden className="page-canvas" />
      <div aria-hidden className="page-noise" />

      <SystemBar />
      <Hero />
      <Systems />
      <How />
      <Intelligence />
      <Trust />
      <Founders />
      <Close />
      <Footer />
    </main>
  );
}
