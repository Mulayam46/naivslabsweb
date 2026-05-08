import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { productFamily } from "@/lib/site-data";

const product = productFamily.find((item) => item.slug === "hireai")!;

export const metadata: Metadata = {
  title: "HireAI",
  description: "HireAI is NavisLabs' live AI hiring product for signal-driven recruiting.",
};

export default function HireAIPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <section className="px-4 pt-28 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Private preview
            </p>
            <h1 className="mt-3 text-5xl font-semibold tracking-tight sm:text-6xl">
              HireAI helps teams find signal faster.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              HireAI screens applicants, reads resumes at scale, and surfaces the best matches so hiring teams spend time where it matters.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800">
              <Clock3 className="h-4 w-4" />
              Access is temporarily limited while we resolve technical issues.
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={product.href}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold"
                style={{
                  backgroundColor: "var(--text)",
                  color: "#f8fafc",
                }}
              >
                Request access
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-full border px-5 text-sm font-semibold"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "rgba(255,255,255,0.94)",
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
                    backgroundColor: "rgba(255,255,255,0.92)",
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
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              What it does
            </p>
            <div className="mt-5 space-y-4">
              {product.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex gap-3 rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "rgba(248,250,252,0.92)",
                  }}
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight text-slate-950">{pillar.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
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
                  backgroundColor: "rgba(255,255,255,0.9)",
                }}
              >
                <p className="text-3xl font-semibold tracking-tight text-slate-950">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">
                  {metric.label}
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
