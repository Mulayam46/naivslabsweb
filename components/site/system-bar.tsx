"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { EASE } from "./reveal";
import { Wordmark } from "./wordmark";
import { cn } from "@/lib/utils";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

/* ═══════════════════════════════════════════════════════════
   Navigation — the only part of the site chrome that needs client JS.

   Structure:  LOGO · Platform Solutions Resources Company · Book Demo

   Scroll:     transparent over the hero → past 30px it becomes a
               floating, blurred, rounded card that shrinks and
               takes a shadow. The header is `position: fixed`, so
               its size transition reflows only its own subtree.

   Every href below resolves to a real route or a real section id
   on the homepage. Nothing points at a page that doesn't exist.

   Footer and PageShell deliberately live in chrome.tsx, which has no
   "use client" — they are static markup and belong on the server.
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
              <Wordmark priority />
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
