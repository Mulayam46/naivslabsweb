import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { companyPillars } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Company",
  description: "Learn about NavisLabs, the company behind HireAI and Navis AI.",
};

const facts = [
  { value: "Bangalore", label: "Headquarters" },
  { value: "2025", label: "Founded" },
  { value: "Global", label: "Scope" },
  { value: "2", label: "Core products" },
];

export default function CompanyPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="px-4 pt-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              Company
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
              The company story behind the product family.
            </h1>
            <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
              NavisLabs exists to build practical AI products that reduce friction in important workflows.
              We are organized around product, not hype.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="mailto:hello@navislabs.in"
                className="inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--text)",
                  color: "#f8fafc",
                }}
              >
                Contact the team
              </Link>
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.74)",
                  color: "var(--text)",
                }}
              >
                View products
              </Link>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(15,23,42,0.06)",
            }}
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1.5 p-6 sm:p-8"
                style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
              >
                <span className="text-2xl font-semibold tracking-tight">{fact.value}</span>
                <span className="text-xs uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
                  {fact.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {companyPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-[1.75rem] border p-6"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.76)",
                }}
              >
                <h2 className="text-lg font-semibold tracking-tight">{pillar.title}</h2>
                <p className="mt-3 text-sm leading-7" style={{ color: "var(--muted)" }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
