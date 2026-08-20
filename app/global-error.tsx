"use client";

import { useEffect } from "react";

/* Last line of defence: this replaces the root layout when the layout
   itself throws, so it must render its own <html> and <body>.

   Everything below is inline style on purpose. global-error renders its
   own document and does not pick up the app's global stylesheet, and
   the failure it exists to catch is precisely the one where the normal
   asset graph cannot be trusted. Hard-coded values from the design
   tokens keep it on-brand without depending on anything loading.

   Metadata exports are not supported in a Client Component boundary,
   so the title is set with React's <title> element. */

const CANVAS = "#F7F6F3";
const INK = "#14130F";
const MUTED = "#66625B";
const SYSTEM_FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[NavisLabs] Root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: CANVAS,
          color: INK,
          fontFamily: SYSTEM_FONT,
          lineHeight: 1.6,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <title>Something went wrong · NavisLabs</title>

        <main
          style={{
            maxWidth: 520,
            padding: "96px 24px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            NavisLabs
          </p>

          <h1
            style={{
              margin: "24px 0 0",
              fontSize: 34,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Something went wrong.
          </h1>

          <p style={{ margin: "24px 0 0", fontSize: 17, color: MUTED }}>
            The page could not be loaded. Try again, or head back to the home page.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
              marginTop: 36,
            }}
          >
            <button
              type="button"
              onClick={() => retry()}
              style={{
                height: 46,
                padding: "0 22px",
                border: "1px solid transparent",
                borderRadius: 14,
                background: INK,
                color: "#FFFFFF",
                font: "inherit",
                fontSize: 15,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* A plain anchor — the root layout itself failed, so the
                router cannot be trusted to navigate. A full document
                load is the only reliable way out. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: 46,
                padding: "0 22px",
                border: "1px solid rgba(28, 25, 20, 0.18)",
                borderRadius: 14,
                background: "#FFFFFF",
                color: INK,
                fontSize: 15,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>

          {error.digest ? (
            <p
              style={{
                margin: "40px 0 0",
                fontSize: 13,
                color: MUTED,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
