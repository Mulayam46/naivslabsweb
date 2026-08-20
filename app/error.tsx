"use client";

import { useEffect } from "react";

/* Route-segment error boundary. Must be a Client Component.

   `retry` (stable since Next 16.3) re-renders the boundary's children;
   `reset` only clears state without re-fetching, which is the wrong
   tool here.

   Deliberately does NOT render SystemBar or Footer. This boundary
   catches failures inside the page, and pulling the whole chrome into
   the fallback risks re-throwing from the same code path that just
   broke. A plain document with a working link out is the thing that
   has to keep working.

   `error.message` from a Server Component is redacted in production —
   only `digest` is meaningful, which is why that is what gets shown. */

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error("[NavisLabs] Unhandled route error:", error);
  }, [error]);

  return (
    <main id="content" className="flex min-h-[100dvh] items-center justify-center">
      <div className="container max-w-[560px] py-24 text-center">
        <p className="t-label text-accent">Error</p>

        <h1 className="t-heading mt-6 text-text">Something went wrong.</h1>

        <p className="t-body mt-6 text-text-2">
          This page failed to render. Trying again usually resolves it — if it
          doesn&rsquo;t, the site itself is still fine from the home page.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <button type="button" onClick={() => retry()} className="btn btn-primary">
            Try again
          </button>
          {/* A plain anchor, not next/link. The client router is part of
              what may have just failed, and <Link> would try to recover
              through the same code path; a real navigation reloads the
              document and is the one escape hatch guaranteed to work. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className="btn btn-secondary">
            Back to home
          </a>
        </div>

        {error.digest ? (
          <p className="t-caption t-mono mt-10 text-text-2">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </main>
  );
}
