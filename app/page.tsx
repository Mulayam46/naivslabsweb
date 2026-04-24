import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { StatsBanner } from "@/components/stats-banner";
import { ProductGrid } from "@/components/product-grid";
import { HowItWorks } from "@/components/research";
import { NotifySection } from "@/components/notify-section";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col"
      style={{ backgroundColor: "#09090b" }}
    >
      <Navbar />

      {/* 1. Hook */}
      <Hero />

      {/* 2. Problem framing */}
      <StatsBanner />

      {/* 3. Product clarity */}
      <ProductGrid />

      {/* 4. How it works (high level) */}
      <HowItWorks />

      {/* 🔥 5. Conversion (moved up) */}
      <NotifySection />

      {/* 6. Credibility */}
      <About />

      {/* 7. Footer */}
      <Footer />
    </main>
  );
}