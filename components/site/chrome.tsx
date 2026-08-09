"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { EASE } from "./reveal";
import { cn } from "@/lib/utils";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

/* ═══════════════════════════════════════════════════════════
   Navigation

   Structure:  LOGO · Platform Solutions Integrations Security
               Company · Let's Talk

   Scroll:     transparent over the hero → past 30px it becomes a
               floating, blurred, rounded card that shrinks and
               takes a shadow. The header is `position: fixed`, so
               its size transition reflows only its own subtree.

   Every href below resolves to a real route or a real section id
   on the homepage. Nothing points at a page that doesn't exist.
═══════════════════════════════════════════════════════════ */

/* CTA lives in lib/site.ts — a Server Component cannot read a constant
   out of a "use client" module (it resolves to undefined). */

type NavItem = {
  label: string;
  href: string;
};

const NAV: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
];

/* An in-page anchor is never an "active page". Only real routes
   highlight — which is why two items can no longer light up at once. */
function isActive(pathname: string, href: string) {
  if (href.startsWith("#") || href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

/* ── Brand ───────────────────────────────────────────────── */

/* navis-logo.png is a dark-ground raster with no alpha — the black is
   baked into the file, so on this light canvas it lands as a square
   black tile. Rounding it turns that into the intended app-icon mark
   instead of something that reads as a broken image. Replace with a
   transparent SVG and this wrapper can go. */
function Wordmark({ size = 28 }: { size?: number }) {
  return (
    <span className="flex flex-shrink-0 items-center gap-2.5">
      <span
        className="flex flex-shrink-0 overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.26),
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <Image
          src="/navis-logo.png"
          alt=""
          width={size}
          height={size}
          className="object-contain"
          priority
        />
      </span>
      <span
        className="font-display t-body font-semibold tracking-[0.02em] text-text"
        style={{ letterSpacing: "0.01em" }}
      >
        NavisLabs
      </span>
    </span>
  );
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-9 items-center rounded-[10px] px-3 t-body font-medium tracking-[-0.006em] transition-colors duration-150",
        active ? "text-text" : "text-text-2 hover:bg-surface-alt hover:text-text",
      )}
    >
      {item.label}
    </Link>
  );
}

/* ── Mobile ──────────────────────────────────────────────── */

function Burger({ open }: { open: boolean }) {
  const bar = "block h-[1.5px] w-[18px] rounded-full bg-text transition-transform duration-200";
  return (
    <span className="flex h-[13px] w-[18px] flex-col justify-center gap-[5px]">
      <span className={bar} style={{ transform: open ? "translateY(6.5px) rotate(45deg)" : undefined }} />
      <span
        className="block h-[1.5px] w-[18px] rounded-full bg-text transition-opacity duration-200"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span className={bar} style={{ transform: open ? "translateY(-6.5px) rotate(-45deg)" : undefined }} />
    </span>
  );
}

function MobileNav({
  open,
  onClose,
  returnFocus,
}: {
  open: boolean;
  onClose: () => void;
  returnFocus: React.RefObject<HTMLButtonElement | null>;
}) {
  const panel = useRef<HTMLDivElement>(null);

  /* Scroll lock, Escape to close, focus into and back out of the drawer. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        returnFocus.current?.focus();
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(
      () => panel.current?.querySelector<HTMLElement>("a[href]")?.focus(),
      60,
    );

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose, returnFocus]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={panel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: EASE }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          /* z-60 — above the header, which sits at z-50. */
          className="fixed inset-0 z-[60] overflow-y-auto bg-canvas lg:hidden"
        >
          <div className="flex h-[72px] items-center justify-between px-[var(--gutter)]">
            <Link href="/" onClick={onClose} aria-label="NavisLabs — home">
              <Wordmark />
            </Link>
            <button
              type="button"
              onClick={() => {
                onClose();
                returnFocus.current?.focus();
              }}
              aria-label="Close navigation"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border"
            >
              <Burger open />
            </button>
          </div>

          <nav className="px-[var(--gutter)] pb-16 pt-4">
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 + i * 0.035, duration: 0.24, ease: EASE }}
                  className="border-b border-border"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-4 font-display t-body font-medium tracking-[-0.02em] text-text"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <MeetingTrigger size="lg" className="mt-8 w-full" onClick={onClose} />
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── The bar ─────────────────────────────────────────────── */

export function SystemBar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [floating, setFloating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center"
        style={{
          padding: floating ? "14px 16px 0" : "0px 0px 0",
          transition: `padding var(--t-nav) var(--ease)`,
        }}
      >
        <header
          className="pointer-events-auto w-full"
          style={{
            maxWidth: floating ? 1180 : 1600,
            borderRadius: floating ? "var(--r-nav)" : 0,
            background: floating ? "rgba(247,246,243,0.72)" : "transparent",
            border: `1px solid ${floating ? "var(--border)" : "transparent"}`,
            boxShadow: floating ? "var(--shadow-nav)" : "none",
            backdropFilter: floating && !reduce ? "blur(20px) saturate(1.6)" : undefined,
            WebkitBackdropFilter: floating && !reduce ? "blur(20px) saturate(1.6)" : undefined,
            transition: `max-width var(--t-nav) var(--ease), border-radius var(--t-nav) var(--ease), background var(--t-nav) var(--ease), border-color var(--t-nav) var(--ease), box-shadow var(--t-nav) var(--ease)`,
          }}
        >
          <div
            className="mx-auto flex items-center justify-between gap-6 px-[var(--gutter)]"
            style={{
              height: floating ? 60 : 72,
              transition: `height var(--t-nav) var(--ease)`,
            }}
          >
            <Link href="/" aria-label="NavisLabs — home" className="flex-shrink-0">
              <Wordmark />
            </Link>

            <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => (
                <DesktopItem key={item.label} item={item} pathname={pathname} />
              ))}
            </nav>

            <div className="flex flex-shrink-0 items-center gap-2">
              <MeetingTrigger size="sm" />
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border lg:hidden"
              >
                <Burger open={menuOpen} />
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        returnFocus={burgerRef}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Footer
═══════════════════════════════════════════════════════════ */

const FOOTER = [
  { label: "Platform", href: "/platform" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/company" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/navis-ai", external: true },
];

export function Footer() {
  return (
    /* One row. The CTA is a page section now, so the footer's only job
       is orientation and a copyright line. */
    <footer className="border-t border-border">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <Link href="/" aria-label="NavisLabs — home">
            <Wordmark size={26} />
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
              {FOOTER.map((l) =>
                l.external ? (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-caption text-text-2 transition-colors duration-150 hover:text-text"
                    >
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="t-caption text-text-2 transition-colors duration-150 hover:text-text"
                    >
                      {l.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <p className="t-caption text-text-2">
            © {new Date().getFullYear()} NavisLabs
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════
   Interior page scaffold
═══════════════════════════════════════════════════════════ */

export function PageShell({
  eyebrow,
  title,
  titleMuted,
  lede,
  children,
  backdrop = false,
}: {
  eyebrow: string;
  title: string;
  titleMuted?: string;
  /* ReactNode, not string: a page may need more than one paragraph here.
     Rendered in a div so callers can pass <p> elements without nesting. */
  lede?: React.ReactNode;
  children: React.ReactNode;
  /* Opt into the homepage's fixed backdrop. `main` paints no background
     of its own (body already carries --canvas), so a page that turns
     this on reads as one continuous surface instead of stacked bands. */
  backdrop?: boolean;
}) {
  return (
    <main>
      {backdrop ? (
        <>
          <div aria-hidden className="page-canvas" />
          <div aria-hidden className="page-noise" />
        </>
      ) : null}
      <SystemBar />
      <section className="pb-16 pt-[calc(var(--nav-h)+clamp(48px,7vw,96px))] md:pb-24">
        <div className="container">
          <p className="t-label anim-rise text-accent">{eyebrow}</p>
          <h1 className="t-heading anim-rise d-1 mt-6 max-w-[900px] text-text">
            {title}
            {titleMuted ? (
              <>
                <br />
                <span className="text-text-2">{titleMuted}</span>
              </>
            ) : null}
          </h1>
          {lede ? (
            <div className="t-body anim-rise d-2 mt-7 max-w-[660px]">{lede}</div>
          ) : null}
        </div>
      </section>
      {children}
      <Footer />
    </main>
  );
}
