import type { Metadata } from "next";
import { PageShell, ModuleLabel, Fade } from "@/components/site/chrome";

export const metadata: Metadata = {
  title: "How Navis works · The system",
  description:
    "Eight layers, one loop: signals become organizational memory, reasoning, decisions, and learning. The architecture of organizational intelligence.",
};

const LAYERS: [string, string, string][] = [
  ["L1", "Signals", "Gmail · Calendar · Meet · Slack · Docs · Drive · CRM. Read continuously, never summarized away."],
  ["L2", "Organizational Memory", "People, projects, customers, meetings, decisions, commitments, relationships, history — remembered as one model."],
  ["L3", "Reasoning Engine", "Context assembly, pattern recognition, risk analysis, priority analysis. Why does this matter, and how much?"],
  ["L4", "Decision Engine", "What matters now? What should be delegated? What should be ignored? What creates leverage?"],
  ["L5", "Execution", "Drafts, briefs, tasks, workflows — prepared for you, approved by you."],
  ["L6", "Observation", "What happened? Did the customer respond? Did the project move?"],
  ["L7", "Learning", "Founder behavior, team behavior, decision outcomes — fed back into the model."],
  ["L8", "Organizational Intelligence", "The company gets smarter every week. The loop closes."],
];

const PRINCIPLES: [string, string][] = [
  ["HUMAN-IN-THE-LOOP", "No autonomous fantasy. Humans approve important actions."],
  ["TRUST-FIRST", "Every recommendation is explainable, traceable, auditable."],
  ["REALITY OVER DASHBOARDS", "The system models reality — not reports about it."],
  ["DAILY UTILITY", "The bar: a founder cannot start the day without it."],
];

export default function HowItWorksPage() {
  return (
    <PageShell
      module="The system"
      title="Eight layers."
      titleMuted="One loop."
      intro="Navis is not a feature set. It is a loop that turns raw organizational signals into understanding, decisions, and — over time — intelligence."
    >
      {/* The stack */}
      <section className="border-t border-line bg-bg-2 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="01" title="Architecture" />
          <div className="mx-auto mt-16 max-w-[860px]">
            {LAYERS.map(([id, name, body], i) => (
              <Fade key={id} delay={Math.min(i * 0.05, 0.3)}>
                <div className="relative grid grid-cols-[3.4rem_1fr] gap-5 pb-10 md:gap-8">
                  {/* rail */}
                  {i < LAYERS.length - 1 && (
                    <span className="absolute left-[1.05rem] top-8 bottom-0 w-px bg-line" />
                  )}
                  <span
                    className={
                      "z-10 flex h-9 w-9 items-center justify-center rounded-md border font-mono text-[10px] font-semibold tracking-[0.06em] " +
                      (i >= LAYERS.length - 1
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line bg-surface text-ink-3")
                    }
                  >
                    {id}
                  </span>
                  <div>
                    <h2
                      className={
                        "font-heading text-[21px] font-semibold tracking-[-0.015em] sm:text-[24px] " +
                        (i >= LAYERS.length - 1 ? "text-accent" : "text-ink")
                      }
                    >
                      {name}
                    </h2>
                    <p className="mt-2 max-w-[560px] text-[15px] leading-[1.7] text-ink-2">
                      {body}
                    </p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Operating principles */}
      <section className="border-t border-line px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="02" title="Operating principles" />
          <div className="mt-14 grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="font-heading text-[2.2rem] font-semibold leading-[1.06] tracking-[-0.03em] text-ink sm:text-[2.9rem]">
                Never build features.
                <br />
                <span className="text-ink-3">Build primitives.</span>
              </h2>
              <p className="mt-7 max-w-[400px] text-[15.5px] leading-[1.75] text-ink-2">
                Every part of Navis must strengthen organizational memory,
                organizational state, reasoning, decision quality, or learning
                loops. If it doesn&apos;t improve one of those five, it
                doesn&apos;t get built.
              </p>
            </div>
            <div className="self-center">
              {PRINCIPLES.map(([k, v], i) => (
                <Fade key={k} delay={i * 0.06}>
                  <div className="grid grid-cols-[10rem_1fr] items-baseline gap-5 border-t border-line py-6 last:border-b sm:grid-cols-[13rem_1fr]">
                    <span className="font-mono text-[10.5px] font-semibold tracking-[0.16em] text-ink-3">
                      {k}
                    </span>
                    <span className="text-[15px] leading-[1.7] text-ink-2">{v}</span>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
