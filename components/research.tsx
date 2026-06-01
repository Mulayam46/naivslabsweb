"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FeatureCarousel } from "@/components/ui/feature-carousel";

// Import your images
import navisAi2 from "@/public/navisai2.png";
import navisAi3 from "@/public/navisai3.png";
import navisAi4 from "@/public/navisai4.png";
import navisAi5 from "@/public/navisai5.png";
import incomingNavis from "@/public/incomingnavis.jpeg";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger (or re-trigger) whenever the section crosses the threshold
        setIsVisible(entry.isIntersecting);
      },
      {
        // Fire when at least 30% of the section is visible
        threshold: 0.3,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-slate-800 py-16 md:py-24"
      style={{ backgroundColor: "#03081e" }}
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="text-xs font-medium text-cyan-400">How it works</span>
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            From signals <span className="text-slate-500">to decisions.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Navis sits above your stack, structures every signal into memory,
            and turns it into one ranked decision with an executable next move.
          </p>
        </div>

        {/* Feature Carousel — no fixed height wrapper, let content size naturally */}
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[34px] bg-slate-800/50 p-2">
            <div className="relative z-10 rounded-[28px] bg-slate-900/50 p-2 backdrop-blur-sm">
              <FeatureCarousel
                active={isVisible}
                title="How Navis transforms your workflow"
                description="From raw signals to intelligent decisions — see the journey"
                step1img1Class={cn(
                  "pointer-events-none w-[50%] border border-stone-100/10 transition-all duration-500",
                  "rounded-[24px] left-[25%] top-[57%] md:left-[35px] md:top-[22%]",
                  "md:group-hover:translate-y-2"
                )}
                step1img2Class={cn(
                  "pointer-events-none w-[60%] border border-stone-100/10 transition-all duration-500",
                  "rounded-2xl left-[69%] top-[53%] md:top-[14%] md:left-[calc(50%+35px+1rem)]",
                  "md:group-hover:-translate-y-6"
                )}
                step2img1Class={cn(
                  "pointer-events-none w-[50%] rounded-t-[24px] border border-stone-100/10 transition-all duration-500",
                  "left-[25%] top-[69%] md:left-[35px] md:top-[22%]",
                  "md:group-hover:translate-y-2"
                )}
                step2img2Class={cn(
                  "pointer-events-none w-[40%] rounded-t-[24px] border border-stone-100/10 transition-all duration-500",
                  "rounded-2xl left-[70%] top-[53%] md:top-[18%] md:left-[calc(50%+27px+1rem)]",
                  "md:group-hover:-translate-y-6"
                )}
                step3imgClass={cn(
                  "pointer-events-none w-[90%] border border-stone-100/10 rounded-t-[24px] transition-all duration-500",
                  "left-[5%] top-[50%] md:top-[22%] md:left-[68px]"
                )}
                step4imgClass={cn(
                  "pointer-events-none w-[90%] border border-stone-100/10 rounded-t-[24px] transition-all duration-500",
                  "left-[5%] top-[50%] md:top-[22%] md:left-[68px]"
                )}
                image={{
                  step1light1: navisAi2,
                  step1light2: navisAi3,
                  step2light1: navisAi3,
                  step2light2: navisAi4,
                  step3light: navisAi5,
                  step4light: incomingNavis,
                  alt: "Navis AI feature demonstration",
                }}
                bgClass="bg-gradient-to-tr from-slate-900/90 to-slate-800/90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
