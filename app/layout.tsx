import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "NavisLabs",
    template: "%s | NavisLabs",
  },
  description:
    "NavisLabs is a multi-product AI company building HireAI and Navis AI for hiring and decision intelligence.",
  keywords: [
    "NavisLabs",
    "HireAI",
    "Navis AI",
    "AI products",
    "decision intelligence",
    "hiring automation",
  ],
  icons: {
    icon: "/navis-logo.png",
    apple: "/navis-logo.png",
    shortcut: "/navis-logo.png",
  },
  openGraph: {
    title: "NavisLabs",
    description:
      "A clean multi-product AI company site for HireAI and Navis AI.",
    siteName: "NavisLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NavisLabs",
    description:
      "A clean multi-product AI company site for HireAI and Navis AI.",
  },
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
        {children}
      </body>
    </html>
  );
}
