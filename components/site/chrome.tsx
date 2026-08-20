import Link from "next/link";
import { SystemBar } from "./system-bar";
import { Wordmark } from "./wordmark";
import { SkipLink } from "./ui";

/* ═══════════════════════════════════════════════════════════
   Site chrome — footer and interior-page scaffold.

   This module has NO "use client". Everything here is static markup,
   so it renders on the server and never reaches the browser bundle.
   That is not only a size win: the footer prints the current year, and
   a client-rendered year is a hydration mismatch waiting for New Year's
   Day — the prerendered HTML carries the build year while the browser
   computes the real one. Evaluated on the server it is simply baked in
   at build time and never recomputed.

   SystemBar is the one genuinely interactive piece and lives in
   ./system-bar with its own "use client". It is re-exported here so
   every page keeps importing site chrome from a single path.
═══════════════════════════════════════════════════════════ */

export { SystemBar };

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
  /* Server-only evaluation — see the module note above. Every deploy
     re-stamps this, and there is no client render to disagree with it. */
  const year = new Date().getFullYear();

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

          <p className="t-caption text-text-2">© {year} NavisLabs</p>
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
    /* The header and footer sit OUTSIDE <main> on purpose. A <header> or
       <footer> nested inside main gets no implicit `banner`/`contentinfo`
       role — those apply only at document scope — so nesting them costs
       screen-reader users landmark navigation on every page. */
    <>
      <SkipLink />

      {backdrop ? (
        <>
          <div aria-hidden className="page-canvas" />
          <div aria-hidden className="page-noise" />
        </>
      ) : null}

      <SystemBar />

      <main id="content">
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
      </main>

      <Footer />
    </>
  );
}
