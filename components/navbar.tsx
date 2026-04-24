"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "Research", href: "#research" },
  { label: "Company", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          ? "rgba(9,9,11,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
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
            className="rounded-md"
            style={{ objectFit: "contain" }}
          />
          <span
            className="font-serif text-lg tracking-tight"
            style={{
              color: "#f4f4f5",
              fontFamily: "var(--font-playfair), Georgia, serif",
            }}
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
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: "#71717a" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="https://navishire.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors"
            style={{ color: "#71717a" }}
          >
            Log in
          </Link>
          <Link
            href="https://app.navislabs.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-5 py-2 text-sm font-medium transition-all active:scale-95"
            style={{
              backgroundColor: "#f4f4f5",
              color: "#09090b",
            }}
          >
            Try Navis
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 items-center justify-center rounded-md transition-colors md:hidden"
          style={{ color: "#71717a" }}
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
              backgroundColor: "rgba(9,9,11,0.97)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex flex-col gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base transition-colors"
                  style={{ color: "#a1a1aa" }}
                >
                  {link.label}
                </Link>
              ))}
              <hr style={{ borderColor: "rgba(255,255,255,0.08)" }} />
              <Link
                href="https://app.navislabs.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 text-center text-sm font-medium"
                style={{ backgroundColor: "#f4f4f5", color: "#09090b" }}
              >
                Try Navis
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
