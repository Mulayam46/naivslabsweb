import { Navbar } from "@/components/navbar";
import { HowItWorks } from "@/components/research";
import { NotifySection } from "@/components/notify-section";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Hero2 } from "@/components/hero2";
import { AskNavis } from "@/components/ask-navis";
import { IncomingKnowledge } from "@/components/incoming-knowledge";
import { DecisionMemory } from "@/components/decision-memory";
import { Connections } from "@/components/connections";
import { MissionVision } from "@/components/mission-vision";
import { NavisProduct } from "@/components/navisproduct";
import { TheProblem } from "@/components/the-problem";
import { ProductShowcase } from "@/components/product-showcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero2 />
      <ProductShowcase />
      <TheProblem />

      {/* <IncomingKnowledge /> */}
      {/* <DecisionMemory /> */}
      <AskNavis />
      {/* <NavisProduct /> */}
      <HowItWorks />
      <Connections />
      <MissionVision />
      <About />
      <NotifySection />
      <Footer />
    </main>
  );
}
