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
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <Hero />
      <StatsBanner />
      <ProductGrid />
      <HowItWorks />
      <About />
      <NotifySection />
      <Footer />
    </main>
  );
}
