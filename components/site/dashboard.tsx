import { cn } from "@/lib/utils";
import { Dot, type Signal } from "./ui";

/* ═══════════════════════════════════════════════════════════
   Morning Intelligence — the product preview.

   Deliberately a LIGHT surface. The old preview was a dark card
   that inherited light-theme text tokens and rendered at ~1:1
   contrast. Building it on the same surface tokens as the rest of
   the site means that class of bug can't come back.

   Presentational only — no hooks, so it stays a Server Component.
═══════════════════════════════════════════════════════════ */

type Priority = {
  signal: Signal;
  tag: string;
  title: string;
  detail: string;
  because: string;
  owner: string;
};

const PRIORITIES: Priority[] = [
  {
    signal: "risk",
    tag: "Revenue at risk",
    title: "Acme Corp has gone quiet 34 days before renewal",
    detail: "No reply on the renewal thread in 18 days. Two support escalations closed last month.",
    because: "Renewal thread inactive · sentiment down across 4 threads · usage flat 3 weeks",
    owner: "Priya S.",
  },
  {
    signal: "watch",
    tag: "Delivery blocked",
    title: "Platform hiring loop is blocked on your review",
    detail: "Two candidates have been waiting 12 days. The loop stalls at this stage every cycle.",
    because: "2 scorecards unsubmitted · median stage time exceeded by 9 days",
    owner: "You",
  },
  {
    signal: "watch",
    tag: "Commitment due",
    title: "Updated metrics were promised to the board Thursday",
    detail: "Committed 9 days ago in the Q3 review. The data room has not been touched since.",
    because: "Commitment extracted from meeting notes · no linked activity since",
    owner: "You",
  },
];

type Tile = {
  label: string;
  value: string;
  note: string;
  signal: Signal;
};

const TILES: Tile[] = [
  { label: "Critical risks", value: "3", note: "2 customer · 1 delivery", signal: "risk" },
  { label: "Decisions", value: "7", note: "3 awaiting you", signal: "accent" },
  { label: "Commitments", value: "24", note: "5 past due", signal: "watch" },
  { label: "Customers", value: "48", note: "6 need attention", signal: "accent" },
  { label: "Projects", value: "12", note: "2 slipping", signal: "watch" },
];

const RAIL = [
  { label: "Today's priorities", count: "3", active: true },
  { label: "Critical risks", count: "3", active: false },
  { label: "Decisions", count: "7", active: false },
  { label: "Commitments", count: "24", active: false },
  { label: "Customers", count: "48", active: false },
  { label: "Projects", count: "12", active: false },
];

const signalText: Record<Signal, string> = {
  risk: "text-risk",
  watch: "text-watch",
  steady: "text-steady",
  accent: "text-accent",
};

function PriorityRow({ item, index }: { item: Priority; index: number }) {
  return (
    <li className={cn("px-5 py-5 md:px-6", index > 0 && "border-t border-border")}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className={cn("inline-flex items-center gap-2 t-label", signalText[item.signal])}>
          <Dot signal={item.signal} />
          {item.tag}
        </span>
        <span className="t-label text-text-2">Owner · {item.owner}</span>
      </div>

      <h4 className="t-strong mt-2.5 text-text">{item.title}</h4>
      <p className="mt-1.5 t-caption leading-relaxed text-text-2">{item.detail}</p>

      <p className="mt-3 flex flex-wrap items-baseline gap-x-2 rounded-[10px] bg-surface-alt px-3 py-2 t-caption leading-relaxed text-text-2">
        <span className="t-label text-text-2">Because</span>
        <span className="font-mono t-caption">{item.because}</span>
      </p>
    </li>
  );
}

export function MorningIntelligence({ className }: { className?: string }) {
  return (
    <div
      className={cn("overflow-hidden rounded-card border border-border bg-surface", className)}
      style={{ boxShadow: "var(--shadow-lg)" }}
      role="img"
      aria-label="Morning Intelligence dashboard: three priorities for today — an at-risk renewal, a blocked hiring loop, and a board commitment due — alongside counts for critical risks, decisions, commitments, customers and projects."
    >
      {/* ── Product chrome ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface-alt px-5 py-3.5 md:px-6">
        <div className="flex items-center gap-3">
          <span className="t-label text-text">Morning Intelligence</span>
          <span className="hidden t-caption text-text-2 sm:inline">Northwind Systems</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="t-mono t-caption text-text-2">Tue 07:00 IST</span>
          <span className="inline-flex items-center gap-2">
            <span className="dot bg-steady anim-breathe" aria-hidden />
            <span className="t-label text-steady">Live</span>
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,200px)_minmax(0,1fr)]">
        {/* ── Section rail ── */}
        <nav
          aria-hidden
          className="rail flex gap-1 border-b border-border bg-surface px-3 py-3 lg:flex-col lg:gap-0.5 lg:border-b-0 lg:border-r lg:px-3 lg:py-4"
        >
          {RAIL.map((r) => (
            <span
              key={r.label}
              className={cn(
                "flex flex-shrink-0 items-center justify-between gap-3 rounded-[10px] px-3 py-2 t-caption lg:flex-shrink",
                r.active ? "bg-surface-alt font-medium text-text" : "text-text-2",
              )}
            >
              <span className="whitespace-nowrap">{r.label}</span>
              <span className="t-mono t-caption text-text-2">{r.count}</span>
            </span>
          ))}
        </nav>

        {/* ── Main ── */}
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-4 px-5 pb-1 pt-5 md:px-6">
            <div>
              <p className="t-caption text-text-2">Good morning, Anita.</p>
              <p className="t-section mt-0.5 text-text">Three things need you today.</p>
            </div>
          </div>

          <ul className="mt-3 border-t border-border">
            {PRIORITIES.map((p, i) => (
              <PriorityRow key={p.title} item={p} index={i} />
            ))}
          </ul>

          {/* ── Roll-up tiles ── */}
          <div className="grid grid-cols-2 border-t border-border sm:grid-cols-3 lg:grid-cols-5">
            {TILES.map((t, i) => (
              <div
                key={t.label}
                className={cn(
                  "border-border px-4 py-4",
                  i > 0 && "border-l",
                  i >= 2 && "border-t sm:border-t-0",
                  i >= 2 && i % 2 === 0 && "border-l-0 sm:border-l",
                  i === 3 && "sm:border-t lg:border-t-0",
                  i === 4 && "sm:border-t sm:border-l-0 lg:border-t-0 lg:border-l",
                )}
              >
                <p className="t-label text-text-2">{t.label}</p>
                <p className="t-mono mt-2 t-body font-medium leading-none text-text">
                  {t.value}
                </p>
                <p className="mt-2 flex items-center gap-1.5 t-caption text-text-2">
                  <Dot signal={t.signal} />
                  {t.note}
                </p>
              </div>
            ))}
          </div>

          {/* ── Provenance ── */}
          <div className="border-t border-border bg-surface-alt px-5 py-3 md:px-6">
            <p className="t-mono t-caption leading-relaxed text-text-2">
              1,284 signals processed · 3,410 entities updated ·{" "}
              <span className="text-text">every conclusion traceable to source</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
