import type { Metadata } from "next";
import { PageShell } from "@/components/site/chrome";
import { Crosshair, Layers, ShieldCheck, UserCheck } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { BrandIcon, MARKS } from "@/components/site/logos";
import { Container, Section, SectionHead } from "@/components/site/ui";
import { CONTACT_EMAIL } from "@/lib/site";

/* /company has ONE job: convince a CTO, COO or VP that NavisLabs is a
   company worth working with. It answers who we are, why we exist, why
   now, what guides us, and whether we can be trusted.

   It does NOT teach the product. "What NavisLabs understands", the
   connect → understand → recommend flow, Morning Intelligence and the
   entity model all belong on the platform page, where a visitor has
   already opted into learning how it works. */

export const metadata: Metadata = {
  title: "Company",
  description:
    "NavisLabs builds the operational intelligence layer for AI-native organizations — infrastructure that gives a company a continuously updated understanding of how it operates.",
  alternates: { canonical: "/company" },
};

/* Principle icons come from Lucide like every other UI icon —
   the hand-drawn set they replaced was a second visual language. */

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

const PRINCIPLES: [typeof Crosshair, string, string][] = [
  [Crosshair, "Reality before assumptions", "We model how work actually happens."],
  [ShieldCheck, "Trust before automation", "Every recommendation must be explainable."],
  [
    UserCheck,
    "Human judgment remains central",
    "People approve actions that affect the organization.",
  ],
  [Layers, "Build infrastructure", "We build the layer intelligent work depends on."],
];

export default function CompanyPage() {
  return (
    <PageShell
      eyebrow="Company"
      title="Building Organizational Intelligence Infrastructure."
      lede={
        <>
          <p className="t-section text-text">
            The operational intelligence layer for AI-native organizations.
          </p>
          <p className="mt-7">
            NavisLabs is building the infrastructure that continuously understands how an
            organization operates.
          </p>
          <p className="mt-5">
            As AI agents become part of everyday work, organizations need more than
            powerful models. They need a shared understanding of people, projects,
            decisions, commitments and work itself. That&rsquo;s what we&rsquo;re building.
          </p>
        </>
      }
    >
      {/* ── Why NavisLabs exists ── */}
      <Section ground="surface" line>
        <Container>
          <SectionHead
            eyebrow="Why NavisLabs exists"
            title={
              <>
                Organizations don&rsquo;t have an information problem.{" "}
                <span className="text-text-2">They have an understanding problem.</span>
              </>
            }
            lede="Every organization already contains the information required to make better decisions. It lives in the systems they use every day."
          />

          <Reveal delay={0.06}>
            <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-7">
              {MARKS.map((m) => (
                <li
                  key={m.id}
                  className="group flex items-center gap-2.5"
                >
                  <BrandIcon name={m.id} size={24} />
                  <span className="t-caption text-text-2">{m.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-14 max-w-[620px] border-t border-border pt-10">
            <p className="t-section text-text">
              The information already exists. It simply never becomes one continuously
              updated understanding of the organization.
            </p>
            <p className="mt-6 t-body leading-relaxed text-text-2">
              NavisLabs exists to build that understanding.
            </p>
          </div>
        </Container>
      </Section>

      {/* ── What we build ── */}
      <Section ground="canvas" line>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <SectionHead eyebrow="What we build" title="One shared understanding." />
            <div className="max-w-[62ch]">
              <p className="t-body">
                NavisLabs builds the infrastructure that gives organizations a continuously
                updated understanding of how they operate.
              </p>
              <p className="mt-7 t-body leading-relaxed text-text-2">
                Instead of replacing the systems companies already use, NavisLabs connects to
                them through administrator-approved, read-only access and turns fragmented
                operational activity into one shared understanding for people and AI
                agents.
              </p>
              <p className="mt-6 t-body leading-relaxed text-text-2">
                The result is a continuously updated operational model that helps
                organizations make better decisions every day.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Why now ── */}
      <Section ground="surface" line>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <SectionHead
              eyebrow="Why now"
              title={
                <>
                  AI made intelligence abundant.{" "}
                  <span className="text-text-2">Organizational understanding did not.</span>
                </>
              }
            />
            <div className="max-w-[62ch]">
              <p className="t-body">
                As companies deploy AI across engineering, sales, operations and support,
                they need more than better models. They need trusted organizational
                context.
              </p>
              <p className="mt-7 border-t border-border pt-7 t-body leading-relaxed text-text-2">
                We believe that context becomes foundational infrastructure for every
                AI-native company.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Principles ── */}
      <Section ground="canvas" line>
        <Container>
          <SectionHead eyebrow="Our principles" title="What guides the company." />

          <ol className="mt-14 max-w-[820px]">
            {PRINCIPLES.map(([Icon, title, body], i) => (
              <Reveal as="li" key={title} delay={i * 0.06}>
                <div className="relative grid grid-cols-[2.75rem_1fr] items-start gap-5 pb-10 sm:gap-8">
                  {i < PRINCIPLES.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-[1.375rem] top-12 w-px bg-border"
                    />
                  )}
                  <span className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-accent">
                    <Icon {...ICON} />
                  </span>
                  <div className="pt-2">
                    <h3 className="t-section text-text">{title}</h3>
                    <p className="mt-2 t-body leading-relaxed text-text-2">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Today ── */}
      <Section ground="surface" line>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
            <SectionHead eyebrow="Today" title="Building with selected design partners." />
            <div className="max-w-[62ch]">
              <p className="t-body">
                NavisLabs is being deployed with a small group of design partners as we prepare
                the first production release.
              </p>
              <p className="mt-7 t-body leading-relaxed text-text-2">
                Instead of asking organizations to believe our claims, we connect to their
                existing systems and show what NavisLabs understands about their organization.
                The product should earn trust through reality rather than promises.
              </p>
              <p className="mt-9 t-caption text-text-2">
                NavisLabs · Bangalore, India ·{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
