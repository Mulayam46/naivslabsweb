import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Analytics } from "@/components/analytics";
import { SiteJsonLd } from "@/components/site/jsonld";
import { MeetingProvider } from "@/components/meeting/meeting-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
  openGraph: {
    title: "NavisLabs — Enterprise Intelligence Infrastructure",
    description:
      "A live operational model of how your organization actually runs, built from the systems you already use.",
    siteName: "NavisLabs",
    url: "https://navislabs.in",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "NavisLabs — Enterprise Intelligence Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NavisLabs — Enterprise Intelligence Infrastructure",
    description:
      "A live operational model of how your organization actually runs, built from the systems you already use.",
    images: ["/og.png"],
    creator: "@navislabs",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  /* Matches --canvas so mobile browser chrome blends with the page. */
  themeColor: "#FAFAFA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable, inter.variable)}
    >
      <body className="min-h-screen antialiased">
        <SiteJsonLd />
        <Analytics />
        <MeetingProvider>{children}</MeetingProvider>
      </body>
    </html>
  );
}
