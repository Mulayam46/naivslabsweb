import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { WarningsSuppressor } from "@/components/warning-suppressor";
import { Analytics } from "@/components/analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://navislabs.in"),
  title: {
    default: "Navis — Organizational Intelligence Infrastructure",
    template: "%s · Navis",
  },
  description:
    "Navis turns fragmented signals across email, meetings, Slack, and calendars into organizational understanding — so important work doesn\u2019t quietly slip. Built by NavisLabs.",
  keywords: [
    "Organizational Intelligence",
    "Founder Daily Brief",
    "Decision Intelligence",
    "Company Brain",
    "Navis AI",
    "NavisLabs",
    "AI for founders",
    "AI infrastructure",
    "Organizational memory",
  ],
  authors: [{ name: "NavisLabs" }],
  creator: "NavisLabs",
  publisher: "NavisLabs",
  applicationName: "Navis",
  category: "AI · Organizational Intelligence",
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
  icons: {
    icon: "/navis-logo.png",
    apple: "/navis-logo.png",
    shortcut: "/navis-logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Navis · Organizational Intelligence Infrastructure",
    description:
      "Navis turns fragmented company signals into continuously updated organizational understanding — so leaders know what matters before problems become expensive.",
    siteName: "NavisLabs",
    url: "https://navislabs.in",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Navis · Organizational Intelligence Infrastructure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navis · Organizational Intelligence Infrastructure",
    description:
      "Turns fragmented company signals into continuously updated organizational understanding.",
    images: ["/og.png"],
    creator: "@navislabs",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050816",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(GeistSans.variable, inter.variable, plexMono.variable, "font-sans")}
      style={{ colorScheme: "dark", backgroundColor: "var(--bg)" }}
    >
      <body
        className="min-h-screen antialiased font-sans"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--ink)",
        }}
      >
        <WarningsSuppressor />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
