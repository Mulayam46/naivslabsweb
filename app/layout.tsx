import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { WarningsSuppressor } from "@/components/warning-suppressor";
import { TawkChat } from "@/components/tawk-chat";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL("https://navislabs.in"),
  title: {
    default: "Navis · AI Chief of Staff for high-stakes decisions",
    template: "%s | NavisLabs",
  },
  description:
    "Navis is the AI Chief of Staff and decision intelligence system for modern teams. Turn scattered signals into ranked decisions, execute with per-channel policies, and learn from every outcome.",
  keywords: [
    "AI Chief of Staff",
    "Decision Intelligence",
    "Company Brain",
    "Decision Memory",
    "Navis AI",
    "NavisLabs",
    "AI for founders",
    "AI for operators",
    "Audit trace AI",
    "Decision Skills",
    "HireAI",
  ],
  authors: [{ name: "NavisLabs" }],
  creator: "NavisLabs",
  publisher: "NavisLabs",
  applicationName: "Navis",
  category: "AI · Decision Intelligence",
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
    title: "Navis · AI Chief of Staff for high-stakes decisions",
    description:
      "Decision infrastructure for modern teams. Company Brain, ranked decisions, per-channel action policies, and tamper-evident audit trace.",
    siteName: "NavisLabs",
    url: "https://navislabs.in",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/navisai.png",
        width: 1200,
        height: 630,
        alt: "Navis · AI Chief of Staff",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navis · AI Chief of Staff",
    description:
      "Turns scattered company data into ranked decisions, executes them, and learns from outcomes.",
    images: ["/navisai.png"],
    creator: "@navislabs",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0b1220",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(GeistSans.variable, "font-sans", inter.variable)}
      style={{ colorScheme: "light", backgroundColor: "var(--background)" }}
    >
      <body
        className={cn(GeistSans.className, "min-h-screen antialiased")}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text)",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        <WarningsSuppressor />
        {children}
        <TawkChat />
      </body>
    </html>
  );
}
