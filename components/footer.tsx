"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { label: "Navis AI", href: "/products/navis-ai" },
  { label: "Products", href: "/products" },
  { label: "Company", href: "/company" },
  { label: "Contact", href: "mailto:hello@navislabs.in", external: true },
];

export function Footer() {
  const pathname = usePathname();
  const waitlistHref = pathname === "/" || pathname === "/products" ? "#notify" : "/products#notify";

  return (
    <footer className="mt-20 border-t border-black/8 bg-[#f7f3eb]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 md:px-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <Link href="/" className="text-lg font-semibold tracking-tight text-slate-950">
              NavisLabs
            </Link>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              AI products for focused teams. Simple tools for better decisions and execution.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-slate-950"
              >
                {link.label}
              </Link>
            ))}
            <Link href={waitlistHref} className="transition-colors hover:text-slate-950">
              Waitlist
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/8 pt-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2025 NavisLabs</p>
          <a
            href="mailto:hello@navislabs.in"
            className="transition-colors hover:text-slate-900"
          >
            hello@navislabs.in
          </a>
        </div>
      </div>
    </footer>
  );
}
