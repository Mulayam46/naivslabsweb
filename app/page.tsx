import { Navbar } from "@/components/navbar";
import { StatsBanner } from "@/components/stats-banner";
import { HowItWorks } from "@/components/research";
import { NotifySection } from "@/components/notify-section";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Hero2 } from "@/components/hero2";
import { AskNavis } from "@/components/ask-navis";
import { IncomingKnowledge } from "@/components/incoming-knowledge";
import { DecisionMemory } from "@/components/decision-memory";
import { Connections } from "@/components/connections";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero2 />
      <IncomingKnowledge />
      <DecisionMemory />
      <AskNavis />
      <StatsBanner />
      <HowItWorks />
      <Connections />
      <About />
      <NotifySection />
      <Footer />
    </main>
  );
}
