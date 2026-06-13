import type { Metadata } from "next";
import Link from "next/link";
import { SystemBar, Footer, ModuleLabel } from "@/components/site/chrome";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false },
};

export default function RequestReceivedPage() {
  return (
    <main className="flex min-h-screen flex-col bg-bg text-ink">
      <SystemBar />
      <section className="flex flex-1 items-center px-6 py-32">
        <div className="mx-auto w-full max-w-[640px]">
          <ModuleLabel n="00" title="Request received" />
          <h1 className="mt-10 font-heading text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[3.2rem]">
            We&apos;re reading it
            <br />
            <span className="text-ink-3">personally.</span>
          </h1>
          <p className="mt-7 max-w-[440px] text-[15.5px] leading-[1.75] text-ink-2">
            Your request is in the queue. If Navis is a fit for where you are
            right now, you&apos;ll hear from us within 48 hours. A confirmation
            is on its way to your inbox.
          </p>
          <div className="mt-10">
            {[
              ["01", "We read your submission personally."],
              ["02", "We evaluate fit."],
              ["03", "If there's alignment, we'll reach out directly."],
            ].map(([n, t]) => (
              <div key={n} className="grid grid-cols-[2.6rem_1fr] items-baseline gap-4 border-t border-line py-5 last:border-b">
                <span className="font-mono text-[11px] text-ink-3">{n}</span>
                <span className="text-[15px] leading-[1.7] text-ink-2">{t}</span>
              </div>
            ))}
          </div>
          <div className="mt-12 flex items-center gap-6">
            <Link
              href="/"
              className="inline-flex h-11 cursor-pointer items-center rounded-md bg-white/[0.04] px-5 text-[13.5px] font-medium text-ink ring-1 ring-white/[0.09] transition-colors hover:ring-accent/60"
            >
              ← Back to Navis
            </Link>
            <a href="mailto:hello@navislabs.in" className="font-mono text-[11px] tracking-[0.08em] text-ink-3 transition-colors hover:text-ink">
              HELLO@NAVISLABS.IN
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
