import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Layers, ShieldCheck, Telescope } from "lucide-react";
import { PageShell } from "@/components/site/chrome";
import { Reveal } from "@/components/site/reveal";
import { Card, Container, Section, SectionHead } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Read the NavisLabs thesis, the platform architecture, and how we treat your organization's data.",
  alternates: { canonical: "/resources" },
};

const ICON = { strokeWidth: 1.75, "aria-hidden": true, className: "icon-ui" } as const;

/* Only what exists. Documentation and Blog are deliberately absent —
   listing links to pages that have not shipped costs more trust than
   a shorter index. Add each here the moment its page is live. */
const RESOURCES = [
  [Telescope, "Vision", "Why organizational context becomes foundational infrastructure.", "/vision"],
  [Layers, "Architecture", "The eight layers that turn signals into understanding.", "/how-it-works"],
  [ShieldCheck, "Security", "Scopes, approval, audit trail and data ownership.", "/security"],
] as const;

export default function ResourcesPage() {
  return (
    <PageShell
      eyebrow="Resources"
      title="How NavisLabs thinks,"
      titleMuted="and how it is built."
      lede="The longer reads: our thesis on organizational intelligence, the architecture underneath the product, and the constraints we operate under."
    >
      <Section ground="surface" pad="md" line>
        <Container>
          <SectionHead eyebrow="Reading" title="Start here." />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {RESOURCES.map(([Icon, title, body, href], i) => (
              <Reveal key={title} delay={i * 0.06}>
                <Link href={href} className="group block h-full">
                  <Card className="h-full p-7 transition-colors duration-300 group-hover:border-border-strong">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-border text-accent">
                      <Icon {...ICON} />
                    </span>
                    <h2 className="t-section mt-5 text-text">{title}</h2>
                    <p className="t-caption mt-2.5 leading-relaxed text-text-2">{body}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 t-caption font-medium text-accent">
                      Read
                      <ArrowRight
                        strokeWidth={1.75}
                        aria-hidden
                        className="icon-inline transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </PageShell>
  );
}
