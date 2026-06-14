"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Fade({
  children,
  delay = 0,
  className,
  to = 1,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  to?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: to, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ModuleLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
      <span className="text-accent">[{n}]</span>
      <span className="whitespace-nowrap">{title}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

const NAV = [
  { label: "PRODUCT", href: "/#product" },
  { label: "HOW IT WORKS", href: "/how-it-works" },
  { label: "VISION", href: "/vision" },
  { label: "SECURITY", href: "/security" },
];

export function SystemBar() {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex h-12 max-w-[1280px] items-center justify-between px-6 font-mono text-[11px] tracking-[0.08em]">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-ink">
            NAVIS
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  (pathname === l.href.replace("/#product", "/")
                    ? "text-ink "
                    : "text-ink-3 ") +
                  "relative transition-colors duration-200 hover:text-ink"
                }
              >
                {l.label}
                {pathname === l.href && (
                  <span className="absolute -bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent" />
                )}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="/request-access"
            className="cursor-pointer border border-line-strong px-3 py-1 text-ink transition-colors duration-200 hover:border-ink hover:text-ink "
          >
            REQUEST ACCESS
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto grid max-w-[1280px] gap-10 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="font-heading text-[16px] font-semibold tracking-[-0.01em] text-ink">
            NAVIS
          </p>
          <p className="mt-3 max-w-[320px] text-[13.5px] leading-[1.7] text-ink-2">
            Organizational intelligence for founder-led startups.
          </p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] leading-[2.2] text-ink-3">
            Built by NavisLabs
            <br />
            Bangalore, India
            <br />
            <a href="mailto:hello@navislabs.in" className="transition-colors hover:text-ink">
              hello@navislabs.in
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-[10.5px] tracking-[0.1em] text-ink-3 sm:items-end">
          <Link href="/vision" className="transition-colors hover:text-ink">ABOUT NAVISLABS</Link>
          <a href="https://www.linkedin.com/company/navis-ai" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">LINKEDIN</a>
          <Link href="/request-access" className="text-ink transition-colors hover:text-accent-ink">REQUEST ACCESS</Link>
        </div>
      </div>
    </footer>
  );
}

/* Page scaffold for interior pages */
export function PageShell({
  module,
  title,
  titleMuted,
  intro,
  children,
}: {
  module: string;
  title: string;
  titleMuted?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="bg-bg text-ink">
      <SystemBar />
      <section className="px-6 pb-24 pt-36 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-[1280px]">
          <ModuleLabel n="00" title={module} />
          <h1 className="mt-12 max-w-[900px] font-heading text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[3.6rem] md:text-[4.2rem]">
            {title}
            {titleMuted ? (
              <>
                <br />
                <span className="text-ink-3">{titleMuted}</span>
              </>
            ) : null}
          </h1>
          {intro ? (
            <p className="mt-8 max-w-[540px] text-[16.5px] leading-[1.75] text-ink-2">
              {intro}
            </p>
          ) : null}
        </div>
      </section>
      {children}
      <Footer />
    </main>
  );
}
