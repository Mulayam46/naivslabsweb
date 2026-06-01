"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const FOOTER_LINKS = {
  product: [
    { label: "Navis AI", href: "/products/navis-ai" },
    { label: "Waitlist", href: "#notify" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About", href: "/company" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const waitlistHref = pathname === "/" || pathname === "/products" ? "#notify" : "/products#notify";

  // Update waitlist href for footer links
  const updatedProductLinks = FOOTER_LINKS.product.map(link => 
    link.label === "Waitlist" ? { ...link, href: waitlistHref } : link
  );

  return (
    <footer
      className="border-t transition-all duration-500"
      style={{
        borderColor: "rgba(51,65,85,0.5)",
        backgroundColor: "#f6f2ea",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Section - Same as navbar */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
            >
              <Image
                src="/navis-logo.png"
                alt="NavisLabs logo"
                width={28}
                height={28}
                className="rounded-md border border-black/5 bg-white object-contain shadow-sm"
                style={{ objectFit: "contain" }}
              />
              <span
                className="text-lg font-semibold tracking-tight"
                style={{ color: "var(--text)" }}
              >
                NavisLabs
              </span>
            </Link>
            
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--muted-strong)" }}>
              Building decision intelligence infrastructure for focused teams.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              <a
                href="mailto:hello@navislabs.in"
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--muted-strong)" }}
              >
                Email
              </a>
              <a
                href="https://linkedin.com/company/navislabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--muted-strong)" }}
              >
                LinkedIn
              </a>
              <a
                href="https://twitter.com/navislabs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--muted-strong)" }}
              >
                Twitter
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              
              {/* Product Links */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70" style={{ color: "var(--text)" }}>
                  Product
                </h3>
                <ul className="mt-4 space-y-2">
                  {updatedProductLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "var(--muted-strong)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70" style={{ color: "var(--text)" }}>
                  Company
                </h3>
                <ul className="mt-4 space-y-2">
                  {FOOTER_LINKS.company.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "var(--muted-strong)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider opacity-70" style={{ color: "var(--text)" }}>
                  Legal
                </h3>
                <ul className="mt-4 space-y-2">
                  {FOOTER_LINKS.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: "var(--muted-strong)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-8 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "rgba(51,65,85,0.3)" }}
        >
          <p className="text-xs" style={{ color: "var(--muted-strong)" }}>
            © 2025 NavisLabs. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <a
              href="mailto:hello@navislabs.in"
              className="transition-colors hover:opacity-80"
              style={{ color: "var(--muted-strong)" }}
            >
              hello@navislabs.in
            </a>
            
            <a
              href="/status"
              className="inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
              style={{ color: "var(--muted-strong)" }}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              Status
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;