import Image from "next/image";

/* ═══════════════════════════════════════════════════════════
   The brand lockup — mark plus wordmark.

   Deliberately a SHARED module: no "use client" directive, so it can
   be rendered by the server-side Footer/PageShell and by the client
   SystemBar without either of them importing across the other's
   boundary. Put it in either file and one of the two ends up pulling
   a whole module graph it does not need.
═══════════════════════════════════════════════════════════ */

/* navis-logo.png is a dark-ground raster with no alpha, so on this light
   canvas it lands as a square black tile. Rounding it turns that into
   the intended app-icon mark instead of something that reads as broken.

   The wrapper is NOT removable by "just exporting a transparent SVG".
   The mark's strokes are WHITE with cobalt arcs — it is drawn for a dark
   ground. Drop the black out and the white strokes vanish against
   --canvas. A light-ground lockup needs a genuinely inverted (ink)
   artwork, not the same file with alpha.

   The tile art is optically sized: the glyph spans ~78% of the canvas.
   It used to span ~54%, which left the mark about 15px wide inside a
   28px nav lockup and turned the arcs into a smudge. If the artwork is
   ever regenerated, keep that ratio — it is what makes the mark legible
   at 16px (favicon) and 26px (footer). */
export function Wordmark({
  size = 28,
  priority = false,
}: {
  size?: number;
  /* Only the header instance is in the first viewport. The footer copy
     is thousands of pixels down the page, so preloading it there would
     compete with the LCP paint for no benefit. */
  priority?: boolean;
}) {
  return (
    <span className="flex flex-shrink-0 items-center gap-2.5">
      <span
        className="flex flex-shrink-0 overflow-hidden"
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(size * 0.26),
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}
      >
        <Image
          src="/navis-logo.png"
          alt=""
          width={size}
          height={size}
          className="object-contain"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
      </span>
      <span
        className="font-display t-body font-semibold tracking-[0.02em] text-text"
        style={{ letterSpacing: "0.01em" }}
      >
        NavisLabs
      </span>
    </span>
  );
}
