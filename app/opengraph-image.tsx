import { ImageResponse } from "next/og";

/* Replaces the deleted /public/og.png. Rendered at build time by the
   file convention, so every page inherits the same social preview
   without shipping a raster asset. Uses only system fonts to keep
   generation offline-safe. */

export const alt = "NavisLabs — Enterprise Intelligence Infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* next/og follows Satori's rule: every element with more than one
   child needs an explicit `display: "flex" | "contents" | "none"`.
   Keep every parent below explicitly `display: flex`. */

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "88px",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #FFFFFF 0%, #F7F6F3 55%, #EFEBE4 100%)",
          color: "#14130F",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#66625B",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#3D6350",
              display: "flex",
            }}
          />
          <div style={{ display: "flex" }}>NavisLabs</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 84,
              lineHeight: 1.04,
              letterSpacing: -3,
              fontWeight: 600,
              maxWidth: 980,
            }}
          >
            <div style={{ display: "flex" }}>The shared understanding</div>
            <div style={{ display: "flex", color: "#66625B" }}>
              for your organization.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.4,
              color: "#66625B",
              maxWidth: 900,
            }}
          >
            Enterprise Intelligence Infrastructure — a live operational model
            built from the systems your teams already use.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#66625B",
          }}
        >
          <div style={{ display: "flex" }}>navislabs.in</div>
          <div style={{ display: "flex" }}>
            Gmail · Calendar · Meet · Drive · Docs · Slack
          </div>
        </div>
      </div>
    ),
    size,
  );
}
