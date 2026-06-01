"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Brain, Sparkles, CheckCircle2, Shield, Zap } from "lucide-react";

const EASING = [0.22, 1, 0.36, 1] as const;

const PRODUCTS = [
    {
        id: "navis-ai",
        tag: "Live · Private Beta",
        tagColor: "#34d399",
        name: "Navis AI",
        description:
            "Your AI Chief of Staff. Reads Gmail, Slack, and Calendar — structures every signal into memory, ranks your open decisions by impact, and executes with a tamper-evident audit trace.",
        image: "/navisai.png",
        href: "/products/navis-ai",
        accent: "#06b6d4",
        gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
        features: [
            { text: "Decision Intelligence", icon: Brain },
            { text: "Tamper-proof Audit", icon: Shield },
            { text: "Multi-channel Sync", icon: Zap },
        ],
        metrics: [
            { label: "Signal Processing", value: "10K+", unit: "msgs/day" },
            { label: "Decision Accuracy", value: "99.2", unit: "%" },
        ],
    },
];

// Floating particles background component
const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        size: Math.random() * 2 + 0.5,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-cyan-500/30"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, p.x > 50 ? -20 : 20, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

// Animated border gradient component
const AnimatedBorder = ({ accent, isHovered }: { accent: string; isHovered: boolean }) => (
    <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
            background: `radial-gradient(circle at 50% 0%, ${accent}80, transparent 70%)`,
            filter: "blur(12px)",
        }}
    />
);

export function ProductShowcase() {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: EASING },
        },
    };

    return (
        <section
            ref={ref}
            className="relative overflow-hidden"
            style={{ backgroundColor: "#020617" }}
        >
            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px]" />
            </div>

            <FloatingParticles />

            <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">

                {/* Header with enhanced animation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: EASING }}
                    className="mb-20 text-center"
                >
                    {/* Decorative badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ delay: 0.1, duration: 0.4 }}
                    >
                        <Sparkles className="h-3 w-3 text-cyan-400" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-cyan-300">
                            Flagship Product
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.7, ease: EASING }}
                    >
                        Intelligence that
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            works for you
                        </span>
                    </motion.h2>

                    <motion.p
                        className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.25, duration: 0.6 }}
                    >
                        One product. Breakthrough AI. Built for decision-makers who demand clarity.
                    </motion.p>

                    {/* Animated underline */}
                    <motion.div
                        className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mt-8"
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
                    />
                </motion.div>

                {/* Product grid - centered single card with wider image */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="flex justify-center"
                >
                    {PRODUCTS.map((product) => (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            className="w-full max-w-5xl"
                            onMouseEnter={() => setHoveredCard(product.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <Link href={product.href} className="group block h-full">
                                <div className="relative h-full">
                                    <AnimatedBorder accent={product.accent} isHovered={hoveredCard === product.id} />

                                    <motion.div
                                        className="relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500"
                                        style={{
                                            borderColor: hoveredCard === product.id ? `${product.accent}50` : "rgba(51,65,85,0.4)",
                                            backgroundColor: "rgba(15,23,42,0.3)",
                                            backdropFilter: "blur(2px)",
                                        }}
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                    >
                                        {/* Screenshot container - wider aspect ratio for desktop */}
                                        <div
                                            className="relative w-full overflow-hidden"
                                            style={{ aspectRatio: "21/9" }}
                                        >
                                            {/* Gradient overlays */}
                                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-90" />
                                            <div className="absolute inset-0 z-10 bg-gradient-to-r from-cyan-500/5 to-transparent pointer-events-none" />
                                            <div className="absolute bottom-0 left-0 right-0 h-32 z-10 bg-gradient-to-t from-[#0f172a] to-transparent" />

                                            <motion.div
                                                className="relative w-full h-full"
                                                animate={{
                                                    scale: hoveredCard === product.id ? 1.03 : 1,
                                                }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            >
                                                <Image
                                                    src={product.image}
                                                    alt={`${product.name} interface`}
                                                    fill
                                                    className="object-cover object-top"
                                                    sizes="(max-width: 1024px) 100vw, 80vw"
                                                    priority
                                                />
                                            </motion.div>

                                            {/* Live tag with enhanced animation */}
                                            <motion.div
                                                className="absolute left-6 top-6 z-20"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={inView ? { x: 0, opacity: 1 } : {}}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                            >
                                                <span
                                                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] shadow-lg"
                                                    style={{
                                                        backgroundColor: `${product.tagColor}15`,
                                                        color: product.tagColor,
                                                        border: `1px solid ${product.tagColor}30`,
                                                        backdropFilter: "blur(8px)",
                                                    }}
                                                >
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <motion.span
                                                            className="absolute inline-flex h-full w-full rounded-full"
                                                            style={{ backgroundColor: product.tagColor }}
                                                            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                        />
                                                        <span
                                                            className="relative inline-flex h-1.5 w-1.5 rounded-full"
                                                            style={{ backgroundColor: product.tagColor }}
                                                        />
                                                    </span>
                                                    {product.tag}
                                                </span>
                                            </motion.div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col p-8 md:p-10">
                                            {/* Header with icon */}
                                            <motion.div
                                                className="flex items-center gap-4 mb-6"
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={inView ? { x: 0, opacity: 1 } : {}}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                            >
                                                <motion.div
                                                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${product.accent}20, ${product.accent}05)`,
                                                        border: `1px solid ${product.accent}30`,
                                                    }}
                                                    whileHover={{ scale: 1.05, rotate: 5 }}
                                                    transition={{ type: "spring", stiffness: 400 }}
                                                >
                                                    <Brain className="h-6 w-6" style={{ color: product.accent }} />
                                                </motion.div>
                                                <div>
                                                    <h3 className="text-2xl font-semibold text-white tracking-tight">
                                                        {product.name}
                                                    </h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="h-1 w-1 rounded-full bg-cyan-400" />
                                                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                                                            AI Chief of Staff
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Description */}
                                            <motion.p
                                                className="text-[15px] leading-relaxed text-slate-300 max-w-2xl"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: 0.55, duration: 0.5 }}
                                            >
                                                {product.description}
                                            </motion.p>

                                            {/* Features grid */}
                                            <motion.div
                                                className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: 0.6, duration: 0.5 }}
                                            >
                                                {product.features.map((feature, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        className="flex items-center gap-2.5 rounded-xl bg-slate-800/30 px-3 py-2.5 border border-slate-700/30"
                                                        whileHover={{
                                                            borderColor: `${product.accent}40`,
                                                            backgroundColor: `${product.accent}05`,
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <feature.icon className="h-4 w-4 text-cyan-400" />
                                                        <span className="text-[12px] font-medium text-slate-300">
                                                            {feature.text}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>


                                            {/* CTA Button */}
                                            <motion.div
                                                className="mt-8"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                                transition={{ delay: 0.7, duration: 0.5 }}
                                            >
                                                <motion.div
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono text-[13px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${product.accent}15, ${product.accent}05)`,
                                                        border: `1px solid ${product.accent}40`,
                                                        color: product.accent,
                                                    }}
                                                    whileHover={{
                                                        scale: 1.02,
                                                        background: `linear-gradient(135deg, ${product.accent}25, ${product.accent}10)`,
                                                        borderColor: product.accent,
                                                        gap: "0.75rem",
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Explore {product.name}
                                                    <motion.div
                                                        animate={{ x: hoveredCard === product.id ? [0, 5, 0] : 0 }}
                                                        transition={{ duration: 1, repeat: hoveredCard === product.id ? Infinity : 0, ease: "easeInOut" }}
                                                    >
                                                        <ArrowRight className="h-4 w-4" />
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        {/* Decorative accent line at bottom */}
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: hoveredCard === product.id ? 1 : 0 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    </motion.div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust indicator */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-500">
                        <CheckCircle2 className="h-3 w-3 text-cyan-500" />
                        <span>Built for enterprise-grade security & compliance</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default ProductShowcase;