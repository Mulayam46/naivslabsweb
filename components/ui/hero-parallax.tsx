"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { companyStats, productFamily } from "@/lib/site-data";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";

const EASING = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.8, ease: EASING },
  }),
};



export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-1100, 200]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[250vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <section className="relative z-10 px-4 pt-4 pb-0 md:px-8">
      {/* subtle gradient accent */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 15%, rgba(29,78,216,0.07), transparent 40%), radial-gradient(circle at 80% 20%, rgba(15,23,42,0.03), transparent 40%)",
        }}
      />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 pb-8 pt-4 lg:grid-cols-[1.2fr_0.8fr] lg:pt-6">
        {/* ── Left column ── */}
        <div className="max-w-2xl rounded-2xl bg-white/80 backdrop-blur-md p-6 lg:bg-transparent lg:backdrop-blur-none lg:p-0">
          {/* eyebrow badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.26em] text-slate-500"
          >
            <Sparkles className="h-3 w-3 text-blue-600" />
            NavisLabs · multi-product AI company
          </motion.div>

          {/* headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl font-semibold leading-[1.05] tracking-tight text-slate-900 text-balance sm:text-5xl md:text-6xl lg:text-[4.5rem] [text-shadow:0_1px_12px_rgba(255,255,255,0.8)]"
          >
            AI products for hiring, context, and the next decision.
          </motion.h1>

          {/* sub-copy */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-5 max-w-xl text-base leading-7 text-slate-500 text-balance"
          >
            NavisLabs builds focused products that help teams hire with more
            signal and work with more clarity. HireAI is live, and Navis AI is
            becoming the decision layer for modern organizations.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <MovingBorderButton
              as={Link}
              href="/products"
              borderRadius="2rem"
              duration={3500}
              containerClassName="h-11 w-auto"
              borderClassName="h-40 w-40 bg-[conic-gradient(from_0deg,#6366f1,#a78bfa,#ec4899,#f97316,#0ea5e9,#6366f1)] opacity-100"
              className="group inline-flex gap-2 px-7 text-sm font-semibold text-white bg-[#0a0a0a] border-transparent"
            >
              Explore products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </MovingBorderButton>
            <Link
              href="#notify"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 active:scale-[0.98]"
            >
              Join the waitlist
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 grid max-w-lg grid-cols-4 gap-3"
          >
            {companyStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <div className="text-xl font-semibold tracking-tight text-slate-900">
                  {item.value}
                </div>
                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column — product card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASING, delay: 0.15 }}
          className="relative"
        >
          {/* glow */}
          <div
            aria-hidden
            className="absolute -inset-4 rounded-3xl blur-2xl"
            style={{ background: "radial-gradient(circle, rgba(29,78,216,0.10), transparent 70%)" }}
          />

          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
            {/* card header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                  Product family
                </p>
                <h2 className="mt-0.5 text-base font-semibold text-slate-900">
                  Two products. One company.
                </h2>
              </div>
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Live &amp; shipping
              </span>
            </div>

            {/* product rows */}
            <div className="divide-y divide-slate-100">
              {productFamily.map((product) => (
                <div
                  key={product.slug}
                  className="group px-5 py-4 transition-colors duration-150 hover:bg-slate-50"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                        {product.eyebrow}
                      </p>
                      <h3 className="mt-0.5 text-base font-semibold text-slate-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {product.blurb}
                      </p>
                    </div>
                    <span
                      className="mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      style={{
                        borderColor:
                          product.status === "live"
                            ? "rgba(22,163,74,0.3)"
                            : "rgba(217,119,6,0.3)",
                        backgroundColor:
                          product.status === "live"
                            ? "rgba(22,163,74,0.08)"
                            : "rgba(217,119,6,0.08)",
                        color:
                          product.status === "live" ? "#15803d" : "#b45309",
                      }}
                    >
                      {product.status === "live" ? "Live" : "In dev"}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs font-semibold">
                    <Link
                      href={product.secondaryHref}
                      className="text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
                    >
                      {product.secondaryCta}
                    </Link>
                    <Link
                      href={product.href}
                      target={product.slug === "hireai" ? "_blank" : undefined}
                      rel={product.slug === "hireai" ? "noopener noreferrer" : undefined}
                      className="text-blue-600 underline-offset-2 hover:underline"
                    >
                      {product.cta} →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-[30rem] relative shrink-0"
    >
      <a
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <img
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={product.title}
        />
      </a>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};
