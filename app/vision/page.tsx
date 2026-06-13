import type { Metadata } from "next";
import Link from "next/link";
import { PageShell, ModuleLabel, Fade } from "@/components/site/chrome";

export const metadata: Metadata = {
  title: "The thesis · Organizational intelligence",
  description:
    "AI is becoming abundant. Organizational intelligence is scarce. The Navis thesis: context — not more intelligence — is the bottleneck.",
};

const NOT = ["A chatbot", "A search engine", "A note-taking app", "A task manager", "A copilot wrapper", "An AI assistant"];

const STATE: [string, string][] = [
  ["PEOPLE", "Responsibilities, expertise, trust, influence"],
  ["PROJECTS", "Status, blockers, momentum"],
  ["CUSTOMERS", "Relationships, risk, opportunities"],
  ["DECISIONS", "Why they were made, by whom, with what outcome"],
  ["COMMITMENTS", "Promised, delivered, overdue"],
  ["RELATIONSHIPS", "Internal, external, investor, customer, hiring"],
  ["STRATEGY", "Goals, priorities, direction"],
];

const ARC = [
  "Reality", "Signals", "Organizational State", "Understanding", "Reasoning",
  "Decisions", "Actions", "Outcomes", "Learning", "Intelligence", "Adaptive Organization",
];

const SUCCESS: [string, string][] = [
  ["SHORT-TERM", "A founder cannot start the day without Navis."],
  ["MID-TERM", "Company decisions measurably improve because of Navis."],
  ["LONG-TERM", "Every AI-native company runs on organizational intelligence."],
];

export default function VisionPage() {
  return (
    <PageShell
      module="The thesis"
      title="AI is becoming abundant."
      titleMuted="Organizational intelligence is scarce."
      intro="Most AI companies believe more intelligence solves the problem. We believe context does. The bottleneck is no longer the model — it is organizational memory, state, and decision continuity."
    >
      {/* Not / Is */}
      <section className="border-t border-line bg-bg-2 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="01" title="What Navis is" />
          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-3">
                Navis is not
              </p>
              <ul className="mt-6">
                {NOT.map((n, i) => (
                  <Fade key={n} delay={i * 0.04}>
                    <li className="border-t border-line py-4 text-[17px] text-ink-3/70 line-through decoration-ink-3/40 decoration-1 last:border-b sm:text-[19px]">
                      {n}
                    </li>
                  </Fade>
                ))}
              </ul>
              <p className="mt-5 text-[14px] text-ink-3">Those are products.</p>
            </div>
            <div className="self-center">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.16em] text-accent">
                Navis is
              </p>
              <p className="mt-6 font-heading text-[3.4rem] font-semibold leading-[1.0] tracking-[-0.035em] text-ink sm:text-[4.6rem]">
                Infrastructure
              </p>
              <p className="mt-5 max-w-[440px] font-heading text-[1.3rem] font-medium leading-[1.45] tracking-[-0.015em] text-ink-2 sm:text-[1.5rem]">
                — the layer that turns information into understanding,
                understanding into decisions, and decisions into organizational
                intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational state */}
      <section className="border-t border-line px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="02" title="Organizational state" />
          <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="font-heading text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[2.9rem]">
                A living model
                <br />
                <span className="text-ink-3">of the company.</span>
              </h2>
              <p className="mt-7 max-w-[400px] text-[15.5px] leading-[1.75] text-ink-2">
                The organizational state is the most important asset Navis
                creates: a continuously updated model of what is actually
                happening — not a report about what happened.
              </p>
            </div>
            <div className="grid gap-4 self-center sm:grid-cols-2 lg:grid-cols-2">
              {STATE.map(([k, v], i) => (
                <Fade key={k} delay={i * 0.04}>
                  <div className="h-full rounded-lg bg-white/[0.02] p-5 ring-1 ring-white/[0.07] transition-shadow duration-300 hover:ring-accent/40">
                    <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-ink-3">
                      {k}
                    </span>
                    <p className="mt-2.5 text-[13.5px] leading-[1.65] text-ink-2">{v}</p>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The arc */}
      <section className="border-t border-line bg-bg-2 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="03" title="The trajectory" />
          <h2 className="mt-14 max-w-[760px] font-heading text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.9rem]">
            Today: Founder Daily Brief.
            <br />
            <span className="text-ink-3">Tomorrow: organizational intelligence.</span>
          </h2>
          <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3.5">
            {ARC.map((s, i) => (
              <Fade key={s} delay={Math.min(i * 0.05, 0.4)}>
                <span className="flex items-center gap-3">
                  <span
                    className={
                      "whitespace-nowrap rounded-full px-4 py-1.5 font-heading text-[14px] font-medium tracking-[-0.01em] ring-1 sm:text-[16px] " +
                      (s === "Organizational State"
                        ? "bg-accent-soft text-accent ring-accent/50"
                        : i >= ARC.length - 2
                          ? "text-accent ring-accent/30"
                          : "bg-white/[0.02] text-ink ring-white/[0.08]")
                    }
                  >
                    {s}
                  </span>
                  {i < ARC.length - 1 && <span className="text-ink-3">→</span>}
                </span>
              </Fade>
            ))}
          </div>
          <p className="mt-12 max-w-[480px] text-[15.5px] leading-[1.75] text-ink-2">
            The company becomes capable of understanding itself. Every cycle
            through the loop makes the model sharper — that compounding is the
            moat, and the category.
          </p>
        </div>
      </section>

      {/* Success + the question */}
      <section className="border-t border-line px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="04" title="What success looks like" />
          <div className="mt-14 max-w-[860px]">
            {SUCCESS.map(([k, v], i) => (
              <Fade key={k} delay={i * 0.06}>
                <div className="grid grid-cols-[8rem_1fr] items-baseline gap-5 border-t border-line py-7 last:border-b sm:grid-cols-[11rem_1fr]">
                  <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-ink-3">
                    {k}
                  </span>
                  <span className="font-heading text-[19px] font-medium tracking-[-0.015em] text-ink sm:text-[22px]">
                    {v}
                  </span>
                </div>
              </Fade>
            ))}
          </div>

          <Fade delay={0.15}>
            <div className="mt-24 max-w-[760px]">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-3">
                The question we expect to spend a decade on
              </p>
              <p className="mt-6 font-heading text-[1.9rem] font-semibold leading-[1.2] tracking-[-0.025em] text-ink sm:text-[2.5rem]">
                Can organizations become{" "}
                <span className="text-accent">continuously learning systems?</span>
              </p>
              <Link
                href="/request-access"
                className="mt-10 inline-flex h-11 cursor-pointer items-center rounded-md bg-accent px-5 text-[13.5px] font-medium text-[#050816] transition-colors hover:bg-accent-ink"
              >
                Request access
              </Link>
            </div>
          </Fade>
        </div>
      </section>
    </PageShell>
  );
}
