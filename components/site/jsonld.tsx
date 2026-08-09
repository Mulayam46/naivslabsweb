/* Structured data.

   "Navis" collides with a large maritime terminal-operating-systems
   vendor, a yachting product on trynavis.com and NavVis. Organization
   schema with `sameAs` is how Google and AI assistants tell those apart
   from us, so this is disambiguation first and rich results second.

   Server Component — no hooks, no client JS. The JSON is built with
   JSON.stringify from a typed object rather than a template string, so
   nothing user-supplied can break out of the <script> block. */

const SITE = "https://navislabs.in";

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "NavisLabs",
  legalName: "NavisLabs",
  url: SITE,
  logo: `${SITE}/icon.png`,
  description:
    "NavisLabs builds Enterprise Intelligence Infrastructure — a continuously updated operational model of how an organization actually runs, built from the systems it already uses.",
  foundingDate: "2025",
  email: "hello@navislabs.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangalore",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/navis-ai",
    "https://github.com/navislabs",
  ],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "NavisLabs",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: "en",
};

const GRAPH = {
  "@context": "https://schema.org",
  "@graph": [ORGANIZATION, WEBSITE],
};

export function SiteJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(GRAPH) }}
    />
  );
}

/** Mirrors a page's visible FAQ so the answers can win a rich result. */
export function FaqJsonLd({ items }: { items: readonly (readonly [string, string])[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
