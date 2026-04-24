import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NavisLabs — AI that tells you what to do next",
  description:
    "NavisLabs builds AI that understands your work — emails, meetings, and workflows — and turns them into clear decisions.",
  icons: {
    icon: "/navis-logo.png",
    apple: "/navis-logo.png",
    shortcut: "/navis-logo.png",
  },
  openGraph: {
    title: "NavisLabs — AI that tells you what to do next",
    description:
      "Stop guessing. Navis observes your work and tells you what actually matters.",
    siteName: "NavisLabs",
    locale: "en_US",
    type: "website",
    images: [{ url: "/navis-logo.png", width: 800, height: 800, alt: "NavisLabs" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, playfair.variable)}
      style={{ colorScheme: "dark", backgroundColor: "#09090b" }}
    >
      <body
        className={cn(
          GeistSans.className,
          "min-h-screen antialiased"
        )}
        style={{
          backgroundColor: "#09090b",
          color: "#e4e4e7",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
