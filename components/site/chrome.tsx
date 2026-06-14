"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ─────────────────────────────────────────────
   Shared animation primitive
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Section / module label
───────────────────────────────────────────── */
export function ModuleLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
      <span className="text-accent">[{n}]</span>
      <span className="whitespace-nowrap">{title}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Nav config
───────────────────────────────────────────── */
const NAV = [
  { label: "Product",      href: "/#product" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Vision",       href: "/vision" },
  { label: "Security",     href: "/security" },
];

/* ─────────────────────────────────────────────
   Active helper
───────────────────────────────────────────── */
function isActive(pathname: string, href: string) {
  // Treat /#product as pointing to the home page
  const normalized = href === "/#product" ? "/" : href;
  return pathname === normalized;
}

/* ─────────────────────────────────────────────
   Brand logo — renders the real navis-logo.png
   The image already has a black/dark bg baked in,
   so we render it directly without a second box.
───────────────────────────────────────────── */
function NavLogo({ size = 28 }: { size?: number }) {
  return (
    <Image
      src="/navis-logo.png"
      alt="Navis logo"
      width={size}
      height={size}
      className="object-contain"
      priority
    />
  );
}

/* ─────────────────────────────────────────────
   Desktop nav link
   FIX: No active dot that shifts layout — use a
   gradient underline only. Color controlled via
   className (not style) so group-hover works.
───────────────────────────────────────────── */
function NavLink({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = isActive(pathname, href);
  return (
    <Link
      href={href}
      className={[
        "group relative py-1",
        "font-mono text-[11px] font-medium tracking-[0.08em] uppercase",
        "transition-colors duration-200",
        active ? "text-ink" : "text-ink-3 hover:text-ink",
      ].join(" ")}
    >
      {label}

      {/* Gradient underline — always rendered, width/opacity animated via style */}
      <span
        className="absolute -bottom-px left-0 h-px origin-left rounded-full transition-all duration-300 ease-out"
        style={{
          width: active ? "100%" : "0%",
          opacity: active ? 1 : 0,
          background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
        }}
      />

      {/* Neutral hover underline (only on inactive links) */}
      {!active && (
        <span className="absolute -bottom-px left-0 h-px w-0 origin-left rounded-full bg-line-strong transition-all duration-300 group-hover:w-full" />
      )}
    </Link>
  );
}

/* ─────────────────────────────────────────────
   Mobile drawer
   FIX: correct top offset (52px nav height),
        body scroll lock while open,
        AnimatePresence mode="sync"
───────────────────────────────────────────── */
function MobileDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  // Lock body scroll while drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence mode="sync">
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(4,6,15,0.75)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Floating card panel — top matches nav height of 52px */}
          <motion.div
            key="drawer"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="fixed inset-x-3 z-50 overflow-hidden rounded-2xl md:hidden"
            style={{
              top: "58px", // 52px nav + 6px gap
              background: "rgba(10,17,36,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow:
                "0 32px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset, 0 0 40px rgba(91,140,255,0.04)",
            }}
          >
            {/* Nav links */}
            <nav className="flex flex-col gap-0.5 p-2">
              {NAV.map((l, i) => {
                const active = isActive(pathname, l.href);
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.045, duration: 0.2, ease: EASE }}
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-all duration-150"
                      style={{
                        color: active ? "var(--ink)" : "var(--ink-3)",
                        background: active ? "rgba(91,140,255,0.1)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      }}
                      onMouseLeave={(e) => {
                        if (!active) (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {/* Accent indicator bar */}
                      <span
                        className="h-4 w-[2px] flex-shrink-0 rounded-full transition-all duration-200"
                        style={{ background: active ? "var(--accent)" : "transparent" }}
                      />
                      <span className="font-mono text-[12.5px] font-medium tracking-[0.06em]">
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer CTA */}
            <div
              className="p-3 pt-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Link
                href="/request-access"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-all duration-200"
                style={{
                  background: "rgba(91,140,255,0.12)",
                  border: "1px solid rgba(91,140,255,0.28)",
                  color: "var(--accent-ink)",
                }}
              >
                <span
                  className="h-[5px] w-[5px] rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                Request Access
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   Hamburger icon — animated to ✕
   FIX: use duration-[200ms] (valid Tailwind),
        correct translate amounts so bars cross
───────────────────────────────────────────── */
function Hamburger({ open }: { open: boolean }) {
  return (
    <span className="flex h-5 w-5 flex-col items-center justify-center gap-[5px]">
      <span
        className="block h-px w-[18px] rounded-full bg-ink-3 transition-all duration-[200ms] origin-center"
        style={open ? { transform: "translateY(6px) rotate(45deg)", background: "var(--ink)" } : {}}
      />
      <span
        className="block h-px w-[18px] rounded-full bg-ink-3 transition-all duration-[200ms]"
        style={open ? { opacity: 0, transform: "scaleX(0)" } : {}}
      />
      <span
        className="block h-px w-[18px] rounded-full bg-ink-3 transition-all duration-[200ms] origin-center"
        style={open ? { transform: "translateY(-6px) rotate(-45deg)", background: "var(--ink)" } : {}}
      />
    </span>
  );
}

/* ─────────────────────────────────────────────
   Main nav bar
───────────────────────────────────────────── */
export function SystemBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          background: scrolled
            ? "rgba(4,6,15,0.94)"
            : "rgba(4,6,15,0.5)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
        }}
      >
        <div className="mx-auto flex h-[52px] max-w-[1280px] items-center justify-between px-5 sm:px-6">

          {/* ── Left: brand + nav ── */}
          <div className="flex items-center gap-7">

            {/* Brand lockup: raw logo + wordmark, no double-box */}
            <Link
              href="/"
              className="group flex items-center gap-2 flex-shrink-0"
              aria-label="Navis — go to homepage"
            >
              <span className="transition-transform duration-300 group-hover:scale-110">
                <NavLogo size={28} />
              </span>
              <span className="font-mono text-[13px] font-semibold tracking-[0.16em] text-ink">
                NAVIS
              </span>
            </Link>

            {/* Vertical divider */}
            <span
              className="hidden h-5 w-px flex-shrink-0 md:block"
              style={{ background: "var(--line-strong)" }}
            />

            {/* Desktop links */}
            <nav
              className="hidden items-center gap-6 md:flex"
              aria-label="Main navigation"
            >
              {NAV.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} pathname={pathname} />
              ))}
            </nav>
          </div>

          {/* ── Right: status pill + CTA + hamburger ── */}
          <div className="flex items-center gap-3">

            {/* Live "Early Access" status — only on large screens */}
            <div
              className="hidden items-center gap-1.5 rounded-full px-2.5 py-[5px] xl:flex"
              style={{
                background: "rgba(16,185,129,0.07)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              {/* Simple opacity-pulsing green dot — not the blue cta-pulse */}
              <span
                className="h-[5px] w-[5px] flex-shrink-0 rounded-full"
                style={{
                  background: "#10b981",
                  animation: "pulse-dot 2.4s ease-in-out infinite",
                }}
              />
              <span
                className="font-mono text-[9.5px] font-medium uppercase tracking-[0.13em]"
                style={{ color: "#10b981" }}
              >
                Early Access
              </span>
            </div>

            {/* CTA button — visible sm and up */}
            <Link
              href="/request-access"
              className="hidden items-center rounded-md font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] transition-all duration-200 sm:flex"
              style={{
                padding: "6px 14px",
                border: "1px solid var(--line-strong)",
                color: "var(--ink)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent)";
                el.style.color = "var(--accent-ink)";
                el.style.background = "rgba(91,140,255,0.08)";
                el.style.boxShadow = "0 0 20px rgba(91,140,255,0.1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--line-strong)";
                el.style.color = "var(--ink)";
                el.style.background = "transparent";
                el.style.boxShadow = "none";
              }}
            >
              Request Access
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150 md:hidden"
              style={{
                background: menuOpen ? "var(--surface)" : "transparent",
                border: "1px solid",
                borderColor: menuOpen ? "var(--line-strong)" : "transparent",
              }}
            >
              <Hamburger open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered outside header to avoid stacking context issues */}
      <MobileDrawer
        open={menuOpen}
        pathname={pathname}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: "Product",        href: "/#product" },
  { label: "How It Works",   href: "/how-it-works" },
  { label: "Vision",         href: "/vision" },
  { label: "Security",       href: "/security" },
  { label: "Request Access", href: "/request-access" },
];

const FOOTER_SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/navis-ai",
    external: true,
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:hello@navislabs.in",
    external: false,
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line px-5 pb-10 pt-16 sm:px-6">
      <div className="mx-auto max-w-[1280px]">

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[1fr_160px_160px] sm:gap-16 lg:gap-24">

          {/* ── Brand ── */}
          <div>
            {/* Logo lockup */}
            <div className="flex items-center gap-3">
              <NavLogo size={30} />
              <div className="flex flex-col">
                <span className="font-mono text-[12.5px] font-semibold leading-none tracking-[0.16em] text-ink">
                  NAVIS
                </span>
                <span className="mt-0.5 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-ink-3">
                  by NavisLabs
                </span>
              </div>
            </div>

            <p className="mt-5 max-w-[280px] text-[13px] leading-[1.8] text-ink-2">
              Organizational intelligence for founder-led startups.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-2">
              {FOOTER_SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-3 transition-all duration-200"
                  style={{ border: "1px solid var(--line)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--line-strong)";
                    el.style.background = "var(--surface)";
                    el.style.color = "var(--ink)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--line)";
                    el.style.background = "transparent";
                    el.style.color = "var(--ink-3)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
              Bangalore, India
            </p>
          </div>

          {/* ── Navigation ── */}
          <div>
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-3">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] text-ink-3 transition-colors duration-200 hover:text-ink"
                  >
                    <span
                      className="h-px w-0 flex-shrink-0 rounded-full transition-all duration-300 group-hover:w-3"
                      style={{ background: "var(--accent)" }}
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ── */}
          <div>
            <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-3">
              Contact
            </p>
            <a
              href="mailto:hello@navislabs.in"
              className="font-mono text-[11px] tracking-[0.06em] text-ink-3 transition-colors duration-200 hover:text-ink"
            >
              hello@navislabs.in
            </a>

            {/* Early access CTA */}
            <div className="mt-6">
              <Link
                href="/request-access"
                className="inline-flex items-center gap-2 rounded-lg font-mono text-[10px] font-semibold uppercase tracking-[0.1em] transition-all duration-200"
                style={{
                  padding: "8px 14px",
                  border: "1px solid rgba(91,140,255,0.28)",
                  color: "var(--accent-ink)",
                  background: "rgba(91,140,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(91,140,255,0.5)";
                  el.style.background = "rgba(91,140,255,0.14)";
                  el.style.boxShadow = "0 0 20px rgba(91,140,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(91,140,255,0.28)";
                  el.style.background = "rgba(91,140,255,0.07)";
                  el.style.boxShadow = "none";
                }}
              >
                <span
                  className="h-[5px] w-[5px] flex-shrink-0 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                Get Early Access
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-12 flex flex-col items-start gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3">
            © {new Date().getFullYear()} NavisLabs · All rights reserved
          </p>

          <div
            className="flex items-center gap-1.5 rounded-full px-2.5 py-[5px]"
            style={{
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.16)",
            }}
          >
            <span
              className="h-[4px] w-[4px] flex-shrink-0 rounded-full"
              style={{
                background: "#10b981",
                animation: "pulse-dot 2.4s ease-in-out infinite",
              }}
            />
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-3">
              Accepting applications
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page scaffold for interior pages
───────────────────────────────────────────── */
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
      <section className="px-5 pb-24 pt-36 sm:px-6 md:pb-32 md:pt-44">
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
