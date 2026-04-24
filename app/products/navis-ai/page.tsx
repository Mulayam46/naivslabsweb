import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { productFamily } from "@/lib/site-data";

const product = productFamily.find((item) => item.slug === "navis-ai")!;

export const metadata: Metadata = {
  title: "Navis AI",
  description: "Navis AI is the decision intelligence product in development at NavisLabs.",
};

export default function NavisAIPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="px-4 pt-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              In development
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
              Navis AI gives teams a clearer next move.
            </h1>
            <p className="mt-5 text-lg leading-8" style={{ color: "var(--muted)" }}>
              The product watches work across meetings, messages, and workflows, builds memory over time, and turns fragmented signals into a practical decision layer.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#notify"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--text)",
                  color: "#f8fafc",
                }}
              >
                Join the waitlist
                <ArrowRight className="h-4 w-4" />
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
                Back to products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {product.pillars.map((pillar) => (
                <span
                  key={pillar.title}
                  className="rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--muted-strong)",
                    backgroundColor: "rgba(255,255,255,0.76)",
                  }}
                >
                  {pillar.title}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-[2rem] border p-7 shadow-[0_20px_80px_rgba(15,23,42,0.06)]"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "rgba(255,255,255,0.82)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: "var(--muted)" }}>
              Product vision
            </p>
            <div className="mt-5 space-y-4">
              {product.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex gap-3 rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "rgba(255,255,255,0.76)",
                  }}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: "var(--accent)" }} />
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight">{pillar.title}</h2>
                    <p className="mt-1 text-sm leading-6" style={{ color: "var(--muted)" }}>
                      {pillar.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {product.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[1.75rem] border p-6"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.72)",
                }}
              >
                <p className="text-3xl font-semibold tracking-tight">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em]" style={{ color: "var(--muted)" }}>
                  {metric.label}
                </p>
              </div>
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
              Waitlist
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Navis AI is still in development.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7" style={{ color: "var(--muted)" }}>
              If you want early access or want to follow the product launch, reach out and we&apos;ll keep you in the loop.
            </p>
            <Link
              href="mailto:hello@navislabs.ai"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold"
              style={{
                backgroundColor: "var(--text)",
                color: "#f8fafc",
              }}
            >
              Join via email
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
