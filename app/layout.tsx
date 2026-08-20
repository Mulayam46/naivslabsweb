import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@/components/analytics";
import { SiteJsonLd } from "@/components/site/jsonld";
import { MeetingProvider } from "@/components/meeting/meeting-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

/* Declared locally rather than imported from `geist/font/mono` purely so
   `preload` can be turned off. The package's own export preloads, which
   put a third 71 KB woff2 in the critical path alongside Geist Sans and
   Inter — and mono is only ever used for `.t-label` / `.t-mono`: small
   uppercase eyebrows and tabular numerals. Those can swap in a frame
   late without anyone noticing; the display face carrying the <h1>
   cannot. The file is vendored into app/fonts so this does not reach
   into node_modules internals.

   Fallback list and `adjustFontFallback: false` mirror the geist
   package's own configuration, so nothing about the rendering changes. */
const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Roboto Mono",
    "Menlo",
    "Monaco",
    "Liberation Mono",
    "DejaVu Sans Mono",
    "Courier New",
    "monospace",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://navislabs.in"),
  title: {
    default: "NavisLabs — Enterprise Intelligence Infrastructure",
    template: "%s · NavisLabs",
  },
  description:
    "NavisLabs connects the systems your organization already runs and continuously builds a live operational model your teams and AI agents use to make better decisions.",
  keywords: [
    "Enterprise Intelligence Infrastructure",
    "Organizational Intelligence",
    "Operational model",
    "Decision intelligence",
    "Enterprise AI",
    "NavisLabs",
  ],
  authors: [{ name: "NavisLabs" }],
  creator: "NavisLabs",
  publisher: "NavisLabs",
  applicationName: "NavisLabs",
  /* NOTE: `alternates` is deliberately NOT set here. Metadata fields
     are inherited by every child route, so a canonical declared on the
     root layout made /vision, /security and /how-it-works all canonicalize
     to "/". Each route now declares its own. */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  /* Open Graph and Twitter images are provided by app/opengraph-image.tsx
     (file convention). Do not re-declare `images` here — the convention
     already populates og:image and twitter:image for every route. */
  openGraph: {
    title: "NavisLabs — Enterprise Intelligence Infrastructure",
    description:
      "A live operational model of how your organization actually runs, built from the systems you already use.",
    siteName: "NavisLabs",
    url: "https://navislabs.in",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NavisLabs — Enterprise Intelligence Infrastructure",
    description:
      "A live operational model of how your organization actually runs, built from the systems you already use.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  /* Matches --canvas so mobile browser chrome blends with the page. */
  themeColor: "#F7F6F3",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, geistMono.variable, inter.variable)}
    >
      {/* suppressHydrationWarning, like <html> above. Browser extensions
          inject attributes onto <body> before React hydrates — ColorZilla
          adds cz-shortcut-listen, password managers and Grammarly add
          their own — and React reports every one as a mismatch it "won't
          patch up". None come from our render, and the noise buries real
          mismatches. This suppresses the attribute diff on this element
          only; children are still checked. */}
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        <SiteJsonLd />
        <Analytics />
        <MeetingProvider>{children}</MeetingProvider>
      </body>
    </html>
  );
}
