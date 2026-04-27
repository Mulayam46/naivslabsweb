"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Products", href: "/#products" },
  { label: "HireAI", href: "/products/hireai" },
  { label: "Navis AI", href: "/products/navis-ai" },
  { label: "Company", href: "/#company" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const waitlistHref = pathname === "/" ? "#notify" : "/products#notify";

  function handleSectionClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (!href.startsWith("/#")) return; // let normal links pass through
    e.preventDefault();
    const id = href.slice(2); // strip "/#"
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(href);
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: scrolled
          ? "rgba(246,242,234,0.8)"
          : "rgba(246,242,234,0.5)",
        backdropFilter: scrolled ? "blur(18px)" : "blur(8px)",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <Image
            src="/navis-logo.png"
            alt="NavisLabs logo"
            width={28}
            height={28}
            priority
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

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleSectionClick(e, link.href)}
              className="text-sm transition-colors hover:opacity-80"
              style={{
                color: pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href.replace("/#", "/")))
                  ? "var(--text)"
                  : "var(--muted-strong)",
                fontWeight: pathname === link.href ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={waitlistHref}
            className="rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 hover:opacity-85 active:scale-95"
            style={{
              backgroundColor: "var(--text)",
              color: "#f8fafc",
            }}
          >
            Join waitlist
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors md:hidden"
            style={{ color: "var(--muted-strong)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="px-4 py-6 md:hidden"
            style={{
              backgroundColor: "rgba(246,242,234,0.96)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    handleSectionClick(e, link.href);
                    setMobileOpen(false);
                  }}
                  className="text-base transition-colors"
                  style={{ color: "var(--muted-strong)" }}
                >
                  {link.label}
                </Link>
              ))}
              <hr style={{ borderColor: "var(--border)" }} />
              <Link
                href={waitlistHref}
                onClick={() => setMobileOpen(false)}
                className="rounded-full px-5 py-2.5 text-center text-sm font-medium"
                style={{ backgroundColor: "var(--text)", color: "#f8fafc" }}
              >
                Join waitlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
