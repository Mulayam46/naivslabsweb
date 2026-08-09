import Image from "next/image";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════
   Integration logos — the ONE source of truth for third-party marks.

   Every mark points at a real vendor asset in /public/logo. Nothing
   here is drawn, approximated or substituted with a UI icon: a mark a
   buyer does not instantly recognise is worse than no mark at all.

   The site's own palette is monochrome ink and stone, and these are
   the single exception. They render in full brand colour, because
   recolouring someone else's logo to match our system is both a
   trademark problem and a recognition problem.

   Aspect ratios differ per vendor (Gmail is 4:3, Slack is 16:10,
   HubSpot is portrait), so <BrandIcon> constrains height and lets
   width follow. Never set both.
═══════════════════════════════════════════════════════════ */

export type MarkStatus = "supported" | "soon";

export type Mark = {
  id: string;
  label: string;
  status: MarkStatus;
  /** Real vendor asset under /public/logo. */
  src: string;
  /** Intrinsic size, so the browser reserves the right box and never reflows. */
  w: number;
  h: number;
};

export const MARKS: Mark[] = [
  // ── Supported today ──────────────────────────────────────
  { id: "gmail",           label: "Gmail",            status: "supported", src: "/logo/google-gmail-svgrepo-com.svg",              w: 256, h: 193 },
  { id: "googlecalendar",  label: "Google Calendar",  status: "supported", src: "/logo/google-calendar-svgrepo-com.svg",           w: 256, h: 256 },
  { id: "googlemeet",      label: "Google Meet",      status: "supported", src: "/logo/google-meet-svgrepo-com.svg",               w: 256, h: 211 },
  { id: "googledrive",     label: "Google Drive",     status: "supported", src: "/logo/google-drive-svgrepo-com.svg",              w: 256, h: 229 },
  { id: "googledocs",      label: "Google Docs",      status: "supported", src: "/logo/google-docs-svgrepo-com.svg",               w: 32,  h: 32  },
  { id: "slack",           label: "Slack",            status: "supported", src: "/logo/slack-svgrepo-com.svg",                     w: 512, h: 321 },

  // ── On the roadmap ───────────────────────────────────────
  { id: "notion",          label: "Notion",           status: "soon",      src: "/logo/notion-svgrepo-com.svg",                    w: 32,  h: 32  },
  { id: "hubspot",         label: "HubSpot",          status: "soon",      src: "/logo/hubspot-icon.svg",                          w: 489, h: 512 },
  { id: "jira",            label: "Jira",             status: "soon",      src: "/logo/jira-svgrepo-com.svg",                      w: 256, h: 256 },
  { id: "github",          label: "GitHub",           status: "soon",      src: "/logo/github.png",                                w: 640, h: 640 },
  { id: "zoom",            label: "Zoom",             status: "soon",      src: "/logo/zoom-svgrepo-com.svg",                      w: 32,  h: 32  },
  { id: "salesforce",      label: "Salesforce",       status: "soon",      src: "/logo/salesforce-svgrepo-com.svg",                w: 256, h: 180 },
  { id: "microsoft365",    label: "Microsoft 365",    status: "soon",      src: "/logo/microsoft-office-2013-logo-svgrepo-com.svg", w: 199, h: 199 },
];

export const SUPPORTED_MARKS = MARKS.filter((m) => m.status === "supported");
export const SOON_MARKS = MARKS.filter((m) => m.status === "soon");

export function getMark(name: string): Mark | undefined {
  return MARKS.find((m) => m.id === name || m.label === name);
}

/**
 * A vendor logo at a fixed optical height, aspect ratio preserved.
 *
 * `alt` defaults to the vendor name so the mark is announced; pass
 * `decorative` where the name is already in adjacent text, to avoid a
 * screen reader reading "Gmail Gmail".
 */
export function BrandIcon({
  name,
  size = 26,
  className,
  decorative = false,
}: {
  name: string;
  /** Rendered height in px. Width follows the intrinsic ratio. */
  size?: number;
  className?: string;
  decorative?: boolean;
}) {
  const mark = getMark(name);
  if (!mark) return null;

  /* Intrinsic ratio lets the browser reserve the right box (no CLS);
     the CSS var drives the rendered height so both agree. */
  const width = Math.round(size * (mark.w / mark.h));
  const alt = decorative ? "" : mark.label;
  const style = { "--logo-h": `${size}px` } as React.CSSProperties;
  const cls = cn("brand-icon", className);

  /* SVGs are served as-is: they are a few KB each, and routing them
     through the image optimiser would mean enabling dangerouslyAllowSVG,
     which we are not doing for a marketing page. The one raster asset
     goes through next/image, where resizing actually pays. */
  if (mark.src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={mark.src}
        alt={alt}
        width={width}
        height={size}
        loading="lazy"
        decoding="async"
        style={style}
        className={cls}
      />
    );
  }

  return (
    <Image
      src={mark.src}
      alt={alt}
      width={width}
      height={size}
      style={style}
      className={cls}
    />
  );
}
