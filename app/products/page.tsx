import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { productFamily } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore the NavisLabs product family: HireAI and Navis AI.",
};

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="px-4 pt-28 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              Products
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
              A focused family of AI products.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8" style={{ color: "var(--muted)" }}>
              Each NavisLabs product solves a specific problem. The goal is a clear portfolio, not a crowded catalog.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {productFamily.map((product) => (
              <article
                key={product.slug}
                className="rounded-[2rem] border p-7 shadow-[0_20px_80px_rgba(15,23,42,0.06)]"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.8)",
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
                  {product.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">{product.name}</h2>
                <p className="mt-4 text-base leading-7" style={{ color: "var(--muted)" }}>
                  {product.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {product.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border p-4"
                      style={{
                        borderColor: "var(--border)",
                        backgroundColor: "rgba(255,255,255,0.72)",
                      }}
                    >
                      <p className="text-xl font-semibold tracking-tight">{metric.value}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={product.secondaryHref}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold"
                    style={{
                      borderColor: "var(--border)",
                      color: "var(--text)",
                      backgroundColor: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {product.secondaryCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={product.href}
                    target={product.slug === "hireai" ? "_blank" : undefined}
                    rel={product.slug === "hireai" ? "noopener noreferrer" : undefined}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                    style={{
                      backgroundColor: "var(--text)",
                      color: "#f8fafc",
                    }}
                  >
                    {product.cta}
                    {product.slug === "hireai" ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="notify" className="px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div
            className="rounded-[2rem] border px-6 py-10 text-center shadow-[0_20px_80px_rgba(15,23,42,0.05)]"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(255,255,255,0.78)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              Stay updated
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Want the next product update from NavisLabs?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7" style={{ color: "var(--muted)" }}>
              We&apos;ll use the same public front door for future launches, so this page can scale as the company grows.
            </p>
            <Link
              href="mailto:hello@navislabs.in"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
              style={{
                backgroundColor: "var(--text)",
                color: "#f8fafc",
              }}
            >
              Email the team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
