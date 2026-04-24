import Link from "next/link";

const FOOTER_LINKS = {
  Products: [
    { label: "Navis AI", href: "https://n-avis.live" },
    { label: "HireAI", href: "https://navishire.com" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/navis-ai/about/" },
    { label: "Contact", href: "mailto:hello@navislabs.ai" },
  ],
  Developers: [
    { label: "GitHub", href: "https://github.com/navis-labs" },
    { label: "Docs (coming soon)", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer
      className="px-4 py-16 md:px-8"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        backgroundColor: "#09090b",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">

          {/* Brand */}
          <div>
            <span
              className="font-serif text-lg"
              style={{
                color: "#f4f4f5",
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              NavisLabs
            </span>

            {/* 🔥 Strong brand line */}
            <p
              className="mt-3 max-w-xs text-sm font-light leading-relaxed"
              style={{ color: "#52525b" }}
            >
              AI that tells you what to do next.
              We turn your emails, meetings, and workflows into clear decisions.
            </p>

            <p className="mt-6 text-xs" style={{ color: "#3f3f46" }}>
              Bangalore · Global · Founded 2026
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p
                className="mb-4 text-xs font-medium uppercase tracking-widest"
                style={{ color: "#52525b" }}
              >
                {category}
              </p>

              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm transition-opacity hover:opacity-80"
                      style={{ color: "#71717a" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="mt-16 flex flex-col gap-3 pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs" style={{ color: "#3f3f46" }}>
            NavisLabs © 2026
          </p>

          {/* 🔥 Updated tags (more premium) */}
          <p className="text-xs" style={{ color: "#3f3f46" }}>
            Decision Intelligence · Context Memory · Agentic Systems
          </p>
        </div>
      </div>
    </footer>
  );
}