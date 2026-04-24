import Link from "next/link";

const FOOTER_LINKS = {
  Products: [
    { label: "HireAI", href: "/products/hireai" },
    { label: "Navis AI", href: "/products/navis-ai" },
    { label: "All products", href: "/products" },
  ],
  Company: [
    { label: "About", href: "/company" },
    { label: "Contact", href: "mailto:hello@navislabs.ai" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/navis-ai/about/" },
  ],
  Resources: [
    { label: "Homepage", href: "/" },
    { label: "Waitlist", href: "/products#notify" },
    { label: "GitHub", href: "https://github.com/navis-labs" },
  ],
};

export function Footer() {
  return (
    <footer
      className="px-4 py-16 md:px-8"
      style={{
        borderTop: "1px solid var(--border)",
        backgroundColor: "rgba(246,242,234,0.92)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.3fr_repeat(3,1fr)]">
          <div>
            <span className="text-lg font-semibold tracking-tight" style={{ color: "var(--text)" }}>
              NavisLabs
            </span>
            <p className="mt-3 max-w-sm text-sm leading-7" style={{ color: "var(--muted)" }}>
              A multi-product AI company building HireAI, Navis AI, and the public brand around them.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
              Bangalore · Global
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
                {category}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm transition-opacity hover:opacity-70"
                      style={{ color: "var(--muted-strong)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-16 flex flex-col gap-3 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
            NavisLabs © 2026
          </p>
          <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
            HireAI · Navis AI · Decision intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
