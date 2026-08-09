import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   NavisLabs primitives.

   Every button, card, section and label on the site comes from
   here. Hover and focus live in globals.css, so nothing in this
   file needs client JS — these stay Server Components.
═══════════════════════════════════════════════════════════ */

/* ── Layout ──────────────────────────────────────────────── */

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("container", className)}>{children}</div>;
}

type Ground = "none" | "canvas" | "surface" | "alt" | "dark";
type Pad = "sm" | "md" | "lg";

/**
 * `pad` is deliberately per-section. Uniform padding down a whole page
 * is the single biggest reason a layout reads flat — rhythm is what
 * makes it feel composed.
 */
export function Section({
  id,
  ground = "none",
  pad = "sm",
  line = false,
  className,
  children,
}: {
  id?: string;
  ground?: Ground;
  pad?: Pad;
  line?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const grounds: Record<Ground, string> = {
    /* Default: paint nothing. The page canvas shows through, so the
       scroll reads as one surface instead of stacked pages. */
    none: "",
    canvas: "on-canvas",
    surface: "on-surface",
    alt: "on-alt",
    dark: "on-dark",
  };
  const pads: Record<Pad, string> = {
    sm: "band-sm",
    md: "band-md",
    lg: "band-lg",
  };
  return (
    <section
      id={id}
      className={cn(grounds[ground], pads[pad], line && "band-line", className)}
    >
      {children}
    </section>
  );
}

/* ── Section header ──────────────────────────────────────── */

export function Eyebrow({
  children,
  tone = "accent",
  className,
}: {
  children: React.ReactNode;
  tone?: "accent" | "muted" | "onDark";
  className?: string;
}) {
  const tones = {
    accent: "text-accent",
    muted: "text-text-2",
    onDark: "text-on-dark-2",
  };
  return <p className={cn("t-label", tones[tone], className)}>{children}</p>;
}

/**
 * One question per section — the eyebrow states the question,
 * the title answers it.
 */
export function SectionHead({
  eyebrow,
  title,
  lede,
  onDark = false,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  onDark?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-[720px] text-center" : "max-w-[760px]",
        className,
      )}
    >
      <Eyebrow tone={onDark ? "onDark" : "accent"}>{eyebrow}</Eyebrow>
      <h2 className={cn("t-heading mt-5", onDark ? "text-on-dark" : "text-text")}>{title}</h2>
      {lede ? (
        <p className={cn("t-body mt-6", onDark && "text-on-dark-2")}>{lede}</p>
      ) : null}
    </div>
  );
}

/* ── Button ──────────────────────────────────────────────── */

/* cva gives the variant API shadcn uses, driven by our own tokens
   rather than a second parallel theme. */
export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      primary: "btn-primary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      invert: "btn-invert",
      invertGhost: "btn-invert-ghost",
    },
    size: {
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant,
  size,
  external = false,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    // mailto:, tel: and off-site links bypass the router.
    const isPlainAnchor = external || /^(https?:|mailto:|tel:)/.test(href);
    if (isPlainAnchor) {
      return (
        <a
          href={href}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/* ── Surfaces ────────────────────────────────────────────── */

export function Card({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "li" | "article";
}) {
  return <Tag className={cn("card", className)}>{children}</Tag>;
}

export function Chip({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("chip", className)}>{children}</span>;
}

/* ── Status ──────────────────────────────────────────────── */

export type Signal = "risk" | "watch" | "steady" | "accent";

const signalDot: Record<Signal, string> = {
  risk: "bg-risk",
  watch: "bg-watch",
  steady: "bg-steady",
  accent: "bg-accent", // the bright brand blue — decoration, not text
};

export function Dot({ signal = "accent", className }: { signal?: Signal; className?: string }) {
  return <span aria-hidden className={cn("dot", signalDot[signal], className)} />;
}
