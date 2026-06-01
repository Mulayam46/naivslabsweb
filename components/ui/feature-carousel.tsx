"use client"

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"
import Image, { type StaticImageData } from "next/image"
import clsx from "clsx"
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  type MotionStyle,
  type MotionValue,
  type Variants,
} from "motion/react"
import Balancer from "react-wrap-balancer"
import { Mail, Hash } from "lucide-react"

import { cn } from "@/lib/utils"

// Types
type WrapperStyle = MotionStyle & {
  "--x": MotionValue<string>
  "--y": MotionValue<string>
}

interface CardProps {
  title: string
  description: string
  bgClass?: string
}

interface ImageSet {
  step1dark1?: StaticImageData | string
  step1dark2?: StaticImageData | string
  step1light1: StaticImageData | string
  step1light2: StaticImageData | string
  step2dark1?: StaticImageData | string
  step2dark2?: StaticImageData | string
  step2light1: StaticImageData | string
  step2light2: StaticImageData | string
  step3dark?: StaticImageData | string
  step3light: StaticImageData | string
  step4light: StaticImageData | string
  alt: string
}

interface FeatureCarouselProps extends CardProps {
  step1img1Class?: string
  step1img2Class?: string
  step2img1Class?: string
  step2img2Class?: string
  step3imgClass?: string
  step4imgClass?: string
  image: ImageSet
}

interface StepImageProps {
  src: StaticImageData | string
  alt: string
  className?: string
  style?: React.CSSProperties
  width?: number
  height?: number
}

interface Step {
  id: string
  name: string
  title: string
  description: string
  color?: string
  bg?: string
  checks?: string[]
}

// Constants
const TOTAL_STEPS = 4

// Updated steps with data from HowItWorks
const steps: Step[] = [
  {
    id: "1",
    name: "Capture",
    title: "Capture every signal",
    description: "Navis plugs into the tools you already use. Email threads, Slack messages, calendar events, meeting transcripts, and docs flow in continuously — no migration, no new inbox.",
    color: "#38bdf8",
    bg: "#0284c7",
    checks: ["OAuth in under 2 minutes", "Read-only scopes, revocable any time", "Tokens encrypted at rest"],
  },
  {
    id: "2",
    name: "Structure",
    title: "Structure into memory",
    description: "Every signal becomes a typed event with extracted entities and writes to one of four memory types. Navis knows who matters, what's at risk, what's been decided, and what changed today.",
    color: "#a78bfa",
    bg: "#7c3aed",
    checks: ["4 memory types · cited per answer", "Operating rules with provenance", "Behavior layer adapts to how you work"],
  },
  {
    id: "3",
    name: "Apply",
    title: "Apply Decision Skills",
    description: "Versioned, reusable skills — your company's decision playbook. When a pattern matches, Navis simulates outcomes against modeled stakeholders, scores paths, and surfaces the recommendation with a confidence score.",
    color: "#34d399",
    bg: "#059669",
    checks: ["Versioned skills · v1 → v2 → v3 evolution", "Simulated outcomes before you act", "Confidence drops when memory is stale"],
  },
  {
    id: "4",
    name: "Execute",
    title: "Execute. Trace. Learn.",
    description: "Nothing executes without control. Per-channel policies gate every external action, real connectors run the work, a tamper-evident trace lands in the Audit Log, and the outcome trains the next recommendation.",
    color: "#fbbf24",
    bg: "#d97706",
    checks: ["Auto · Confirm · Approval · Blocked policies", "Tamper-evident Decision Trace per action", "Outcomes feed Decision Memory · skill confidence updates"],
  },
]

// ── Intro Sequence Component for Step 1 ──
type Phase =
  | { type: 'divider' }
  | {
    type: 'bar';
    labels: string[];
    icons: string[];
    duration: number;
    tokenTarget?: number;
    showPercent?: boolean;
  }
  | { type: 'lines'; lines: string[] }
  | { type: 'message'; text: string };

interface RenderedItem {
  id: string;
  phase: Phase;
  lineIndex?: number;
}

function Divider() {
  return (
    <div
      style={{
        color: 'rgba(56, 189, 248, 0.3)',
        fontSize: 12,
        letterSpacing: '1px',
        fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
      }}
    >
      {'─'.repeat(40)}
    </div>
  );
}

function ShimmerLoader({
  labels,
  icons,
  duration,
  tokenTarget,
  showPercent = true,
  onComplete,
}: {
  labels: string[];
  icons: string[];
  duration: number;
  tokenTarget?: number;
  showPercent?: boolean;
  onComplete?: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [percent, setPercent] = useState(0);
  const [tokens, setTokens] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const steps = 20;
    let frame = 0;
    const stepTime = duration / steps;

    const animatePercent = () => {
      if (frame >= steps) {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        return;
      }
      frame++;
      setPercent(Math.min(100, Math.round((frame / steps) * 100)));
      frameRef.current = requestAnimationFrame(animatePercent);
    };
    frameRef.current = requestAnimationFrame(animatePercent);

    const labelInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % labels.length);
    }, duration / labels.length);
    intervalRef.current = labelInterval;

    if (tokenTarget) {
      const totalTokens = tokenTarget * 1000;
      const tokenDuration = duration;
      let tokenFrame = 0;
      const tokenSteps = 60;
      const tokenStepTime = tokenDuration / tokenSteps;

      const animateTokens = () => {
        if (tokenFrame >= tokenSteps) {
          return;
        }
        tokenFrame++;
        const value = Math.min(totalTokens, Math.round((tokenFrame / tokenSteps) * totalTokens));
        setTokens(value);
        setTimeout(animateTokens, tokenStepTime);
      };
      animateTokens();
    }

    const timeout = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      onComplete?.();
    }, duration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearTimeout(timeout);
    };
  }, [duration, labels.length, tokenTarget, onComplete]);

  return (
    <div style={{ fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        <span style={{ color: '#38bdf8', fontSize: 14 }}>{icons[currentIndex % icons.length]}</span>
        <span style={{ color: '#cbd5e1', fontSize: 13, fontWeight: 500 }}>{labels[currentIndex]}</span>
        {showPercent && (
          <span style={{ color: '#34d399', fontSize: 12, marginLeft: 'auto' }}>{percent}%</span>
        )}
        {tokenTarget !== undefined && (
          <span style={{ color: '#a78bfa', fontSize: 12 }}>{(tokens / 1000).toFixed(1)}k tokens</span>
        )}
      </div>
      <div style={{ height: 2, background: '#1e293b', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #38bdf8, #a78bfa)',
            transition: 'width 0.05s linear',
          }}
        />
      </div>
    </div>
  );
}

function TypeWritter({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => onComplete?.(), 300);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <div style={{ color: '#94a3b8', fontSize: 13, fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace" }}>
      <span className="flex items-center gap-2">
        {text.includes('Google') && <Mail className="h-3 w-3 text-red-400" />}
        {text.includes('Slack') && <Hash className="h-3 w-3 text-purple-400" />}
        <span>{displayText}</span>
        {isTyping && (
          <span
            style={{
              display: 'inline-block',
              width: 2,
              height: 12,
              backgroundColor: '#38bdf8',
              animation: 'blink 1s step-end infinite',
            }}
          />
        )}
      </span>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

const STEP1_SEQUENCE: Phase[] = [
  { type: 'divider' },
  {
    type: 'bar',
    labels: ['Connecting to Gmail...', 'Scanning inbox...', 'Detecting threads...', 'Profiling priorities...'],
    icons: ['📧', '📨', '✉️', '📬'],
    duration: 3000,
    tokenTarget: 0.6,
    showPercent: true,
  },
  {
    type: 'lines',
    lines: ['✓ Gmail Connected', '✓ 12 priority threads found', '✓ 3 customer commitments detected'],
  },
  { type: 'divider' },
  {
    type: 'bar',
    labels: ['Connecting to Slack...', 'Fetching channels...', 'Detecting blockers...', 'Analyzing patterns...'],
    icons: ['💬', '#️⃣', '🔍', '📊'],
    duration: 3000,
    tokenTarget: 0.4,
    showPercent: false,
  },
  {
    type: 'lines',
    lines: ['✓ Slack Connected', '✓ 8 active channels scanned', '✓ 2 decision blockers identified'],
  },
  { type: 'divider' },
  {
    type: 'message',
    text: '✓ Google & Slack successfully connected → Memory ready 🧠',
  },
  { type: 'divider' },
];

function IntroSequence({ onComplete }: { onComplete?: () => void }) {
  const [items, setItems] = useState<RenderedItem[]>([]);
  const phaseRef = useRef(0);
  const lineRef = useRef(0);
  const completedRef = useRef(false);

  const advance = useCallback(() => {
    const phase = STEP1_SEQUENCE[phaseRef.current];
    if (!phase) {
      if (!completedRef.current) {
        completedRef.current = true;
        onComplete?.();
      }
      return;
    }

    if (phase.type === 'divider') {
      setItems((prev) => [...prev, { id: `divider-${phaseRef.current}`, phase }]);
      phaseRef.current++;
      setTimeout(advance, 80);
      return;
    }

    if (phase.type === 'bar') {
      setItems((prev) => [...prev, { id: `bar-${phaseRef.current}`, phase }]);
      phaseRef.current++;
      return;
    }

    if (phase.type === 'lines') {
      lineRef.current = 0;
      phaseRef.current++;
      typeNextLine(phase.lines);
      return;
    }

    if (phase.type === 'message') {
      setItems((prev) => [...prev, { id: `msg-${phaseRef.current}`, phase }]);
      phaseRef.current++;
      setTimeout(advance, 400);
      return;
    }
  }, [onComplete]);

  function typeNextLine(lines: string[]) {
    const idx = lineRef.current;
    if (idx >= lines.length) {
      setTimeout(advance, 200);
      return;
    }
    setItems((prev) => [
      ...prev,
      {
        id: `line-${phaseRef.current - 1}-${idx}`,
        phase: { type: 'lines', lines },
        lineIndex: idx,
      },
    ]);
    lineRef.current++;
  }

  useEffect(() => {
    setTimeout(advance, 300);
  }, []);

  return (
    <div
      style={{
        background: '#0f0e17',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
        borderRadius: 16,
        border: '1px solid rgba(56, 189, 248, 0.2)',
      }}
    >
      {items.map((item) => {
        const { id, phase } = item;

        if (phase.type === 'divider') return <Divider key={id} />;

        if (phase.type === 'bar') {
          return (
            <ShimmerLoader
              key={id}
              labels={phase.labels}
              icons={phase.icons}
              duration={phase.duration}
              tokenTarget={phase.tokenTarget}
              showPercent={phase.showPercent}
              onComplete={() => {
                setTimeout(advance, 150);
              }}
            />
          );
        }

        if (phase.type === 'lines' && item.lineIndex !== undefined) {
          const isLast = item.lineIndex === phase.lines.length - 1;
          return (
            <TypeWritter
              key={id}
              text={phase.lines[item.lineIndex]}
              onComplete={() => {
                setTimeout(() => typeNextLine(phase.lines), isLast ? 0 : 200);
              }}
            />
          );
        }

        if (phase.type === 'message') {
          return (
            <div
              key={id}
              style={{
                color: '#34d399',
                fontWeight: 700,
                fontSize: 13,
                paddingLeft: 4,
              }}
            >
              {phase.text}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

/**
 * Animation presets for reusable motion configurations.
 */
const ANIMATION_PRESETS = {
  fadeInScale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
} as const

type AnimationPreset = keyof typeof ANIMATION_PRESETS

interface AnimatedStepImageProps extends StepImageProps {
  preset?: AnimationPreset
  delay?: number
  onAnimationComplete?: () => void
}

function useNumberCycler(
  totalSteps: number = TOTAL_STEPS,
  interval: number = 10000,
  active: boolean = true
) {
  const [currentNumber, setCurrentNumber] = useState(0)
  const [isManualInteraction, setIsManualInteraction] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const setupTimer = useCallback(() => {
    clearTimer()
    if (!activeRef.current) return

    timerRef.current = setTimeout(() => {
      if (!activeRef.current) return
      setCurrentNumber((prev) => (prev + 1) % totalSteps)
      setIsManualInteraction(false)
      setupTimer()
    }, interval)
  }, [interval, totalSteps, clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    setCurrentNumber(0)
    setIsManualInteraction(false)
  }, [clearTimer])

  const goToStep = useCallback((stepIndex: number) => {
    setIsManualInteraction(true)
    setCurrentNumber(stepIndex)
    setupTimer()
  }, [setupTimer])

  const increment = useCallback(() => {
    setIsManualInteraction(true)
    setCurrentNumber((prev) => (prev + 1) % totalSteps)
    setupTimer()
  }, [totalSteps, setupTimer])

  // Start/stop timer based on active flag
  useEffect(() => {
    if (active) {
      setupTimer()
    } else {
      clearTimer()
    }
    return clearTimer
  }, [active, setupTimer, clearTimer])

  return {
    currentNumber,
    increment,
    goToStep,
    reset,
    isManualInteraction,
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent
    const isSmall = window.matchMedia("(max-width: 768px)").matches
    const isMobile = Boolean(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.exec(
        userAgent
      )
    )

    const isDev = process.env.NODE_ENV !== "production"
    if (isDev) setIsMobile(isSmall || isMobile)

    setIsMobile(isSmall && isMobile)
  }, [])

  return isMobile
}

function IconCheck({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

const stepVariants: Variants = {
  inactive: {
    scale: 0.8,
    opacity: 0.5,
  },
  active: {
    scale: 1,
    opacity: 1,
  },
}

const StepImage = forwardRef<
  HTMLImageElement,
  StepImageProps & { [key: string]: any }
>(
  (
    { src, alt, className, style, width = 1200, height = 630, ...props },
    ref
  ) => {
    return (
      <Image
        ref={ref}
        alt={alt}
        className={className}
        src={src}
        width={width}
        height={height}
        style={{
          position: "absolute",
          userSelect: "none",
          maxWidth: "unset",
          ...style,
        }}
        {...props}
      />
    )
  }
)
StepImage.displayName = "StepImage"

const MotionStepImage = motion(StepImage)

const AnimatedStepImage = ({
  preset = "fadeInScale",
  delay = 0,
  onAnimationComplete,
  ...props
}: AnimatedStepImageProps) => {
  const presetConfig = ANIMATION_PRESETS[preset]
  return (
    <MotionStepImage
      {...props}
      {...presetConfig}
      transition={{
        ...presetConfig.transition,
        delay,
      }}
      onAnimationComplete={onAnimationComplete}
    />
  )
}

function FeatureCard({
  bgClass,
  children,
  step,
}: CardProps & {
  children: React.ReactNode
  step: number
}) {
  const [mounted, setMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useIsMobile()

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    if (isMobile) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentStep = steps[step]

  return (
    <motion.div
      className="animated-cards relative w-full rounded-[16px]"
      onMouseMove={handleMouseMove}
      style={
        {
          "--x": useMotionTemplate`${mouseX}px`,
          "--y": useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={clsx(
          "group relative w-full overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-b from-slate-900/90 to-slate-800/90 transition duration-300 backdrop-blur-sm",
          "md:hover:border-transparent",
          bgClass
        )}
      >
        <div className="m-6 min-h-[340px] w-full md:m-10 md:min-h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              className="flex w-full flex-col gap-3 md:w-4/6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              {/* Step number badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className="mb-2 inline-flex items-center gap-2"
              >
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-white"
                  style={{ backgroundColor: currentStep.bg }}
                >
                  {String(step + 1).padStart(2, '0')}
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
                  {currentStep.name}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h2
                className="text-xl font-bold tracking-tight text-white md:text-2xl lg:text-3xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                {currentStep.title}
              </motion.h2>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <p className="text-sm leading-5 text-slate-300 sm:text-base sm:leading-6">
                  <Balancer>{currentStep.description}</Balancer>
                </p>
              </motion.div>

              {/* Checklist items */}
              {currentStep.checks && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-4 flex flex-col gap-2"
                >
                  {currentStep.checks.map((check, idx) => (
                    <motion.li
                      key={check}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.05, duration: 0.3 }}
                      className="flex items-center gap-2 text-xs text-slate-400"
                    >
                      <span
                        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-cyan-500/20"
                      >
                        <IconCheck className="h-2.5 w-2.5 text-cyan-400" />
                      </span>
                      {check}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          </AnimatePresence>
          {mounted ? children : null}
        </div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <motion.div
            className="h-full"
            style={{
              backgroundColor: currentStep.color,
              width: `${((step + 1) / TOTAL_STEPS) * 100}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}

function Steps({
  steps,
  current,
  onChange,
}: {
  steps: readonly Step[]
  current: number
  onChange: (index: number) => void
}) {
  return (
    <nav aria-label="Progress" className="flex justify-center px-4">
      <ol
        className="flex w-full flex-wrap items-start justify-start gap-2 sm:justify-center md:w-10/12 md:divide-y-0"
        role="list"
      >
        {steps.map((step, stepIdx) => {
          const isCompleted = current > stepIdx
          const isCurrent = current === stepIdx
          const isFuture = !isCompleted && !isCurrent

          return (
            <motion.li
              key={`${step.name}-${stepIdx}`}
              initial="inactive"
              animate={isCurrent ? "active" : "inactive"}
              variants={stepVariants}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative z-50 rounded-full px-3 py-1 transition-all duration-300 ease-in-out md:flex",
                isCompleted ? "bg-cyan-500/20" : "bg-slate-700/30"
              )}
            >
              <div
                className={cn(
                  "group flex w-full cursor-pointer items-center focus:outline-none focus-visible:ring-2"
                )}
                onClick={() => onChange(stepIdx)}
              >
                <span className="flex items-center gap-2 text-sm font-medium">
                  <motion.span
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.2 : 1,
                    }}
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full duration-300",
                      isCompleted && "bg-cyan-400 text-white",
                      isCurrent && "bg-cyan-500/50",
                      isFuture && "bg-slate-600"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <IconCheck className="h-3 w-3 text-white" />
                      </motion.div>
                    ) : (
                      <span className="text-[10px] text-white">
                        {stepIdx + 1}
                      </span>
                    )}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "text-xs font-medium duration-300",
                      isCompleted && "text-cyan-400",
                      isCurrent && "text-cyan-300",
                      isFuture && "text-slate-500"
                    )}
                  >
                    {step.name}
                  </motion.span>
                </span>
              </div>
            </motion.li>
          )
        })}
      </ol>
    </nav>
  )
}

const defaultClasses = {
  step1img1:
    "pointer-events-none w-[50%] border border-slate-700/50 transition-all duration-500 rounded-2xl",
  step1img2:
    "pointer-events-none w-[60%] border border-slate-700/50 transition-all duration-500 overflow-hidden rounded-2xl",
  step2img1:
    "pointer-events-none w-[50%] border border-slate-700/50 transition-all duration-500 rounded-2xl overflow-hidden",
  step2img2:
    "pointer-events-none w-[40%] border border-slate-700/50 transition-all duration-500 rounded-2xl overflow-hidden",
  step3img:
    "pointer-events-none w-[90%] border border-slate-700/50 rounded-2xl transition-all duration-500 overflow-hidden",
  step4img:
    "pointer-events-none w-[90%] border border-slate-700/50 rounded-2xl transition-all duration-500 overflow-hidden",
} as const

export function FeatureCarousel({
  image,
  step1img1Class = defaultClasses.step1img1,
  step1img2Class = defaultClasses.step1img2,
  step2img1Class = defaultClasses.step2img1,
  step2img2Class = defaultClasses.step2img2,
  step3imgClass = defaultClasses.step3img,
  step4imgClass = defaultClasses.step4img,
  active = true,
  ...props
}: FeatureCarouselProps & { active?: boolean }) {
  const { currentNumber: step, increment, goToStep, reset } = useNumberCycler(TOTAL_STEPS, 10000, active)
  const [isAnimating, setIsAnimating] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const prevActiveRef = useRef(active)

  // When section comes back into view, restart from step 0
  useEffect(() => {
    if (active && !prevActiveRef.current) {
      reset()
      setIntroComplete(false)
    }
    prevActiveRef.current = active
  }, [active, reset])

  const handleIncrement = () => {
    if (isAnimating) return
    setIsAnimating(true)
    increment()
  }

  const handleStepChange = (stepIndex: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    goToStep(stepIndex)
    if (stepIndex === 0) {
      setIntroComplete(false)
    }
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const renderStepContent = () => {
    // Special case for step 0 (Capture) - always show intro sequence
    if (step === 0) {
      return (
        <motion.div
          key="intro"
          className="relative w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <IntroSequence key={String(active)} onComplete={() => setIntroComplete(true)} />
        </motion.div>
      )
    }

    const content = () => {
      switch (step) {
        case 1:
          return (
            <motion.div
              className="relative w-full h-full"
              onAnimationComplete={handleAnimationComplete}
            >
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step2img1Class, "rounded-2xl hidden md:block")}
                src={image.step2light1}
                preset="fadeInScale"
              />
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step2img2Class, "rounded-2xl hidden md:block")}
                src={image.step2light2}
                preset="fadeInScale"
                delay={0.1}
              />
              {/* Mobile: show images stacked */}
              <div className="md:hidden mt-4 flex flex-col gap-3">
                <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/50">
                  <Image alt={image.alt} src={image.step2light1} width={600} height={400} className="w-full h-auto" />
                </div>
                <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700/50">
                  <Image alt={image.alt} src={image.step2light2} width={600} height={400} className="w-full h-auto" />
                </div>
              </div>
            </motion.div>
          )
        case 2:
          return (
            <>
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step3imgClass, "rounded-2xl hidden md:block")}
                src={image.step3light}
                preset="fadeInScale"
                onAnimationComplete={handleAnimationComplete}
              />
              <div className="md:hidden mt-4 w-full overflow-hidden rounded-2xl border border-slate-700/50">
                <Image alt={image.alt} src={image.step3light} width={600} height={400} className="w-full h-auto" />
              </div>
            </>
          )
        case 3:
          return (
            <>
              <AnimatedStepImage
                alt={image.alt}
                className={clsx(step4imgClass, "rounded-2xl hidden md:block")}
                src={image.step4light}
                preset="fadeInScale"
                onAnimationComplete={handleAnimationComplete}
              />
              <div className="md:hidden mt-4 w-full overflow-hidden rounded-2xl border border-slate-700/50">
                <Image alt={image.alt} src={image.step4light} width={600} height={400} className="w-full h-auto" />
              </div>
            </>
          )
        default:
          return null
      }
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          {...ANIMATION_PRESETS.fadeInScale}
          className="w-full h-full md:absolute"
        >
          {content()}
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <FeatureCard {...props} step={step}>
      {renderStepContent()}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-[12rem] top-5 z-50 h-full w-full cursor-pointer md:left-0"
      >
        <Steps current={step} onChange={handleStepChange} steps={steps} />
      </motion.div>
      <motion.div
        className="absolute right-0 top-0 z-50 h-full w-full cursor-pointer md:left-0"
        onClick={handleIncrement}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />
    </FeatureCard>
  )
}

export default FeatureCarousel