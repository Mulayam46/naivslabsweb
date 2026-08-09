const isDev = process.env.NODE_ENV !== "production";

/* Content-Security-Policy.

   The third parties this site actually talks to, and nothing else:
     assets.calendly.com  the booking widget script
     calendly.com         the booking iframe + its XHR
     *.posthog.com        analytics, only when NEXT_PUBLIC_POSTHOG_KEY is set

   Honest caveat on 'unsafe-inline' for scripts: Next injects inline
   bootstrap/flight scripts, and the only way to drop this is a per-request
   nonce, which requires middleware and would force every route out of
   static prerendering. Every route here is static, so the trade is worth
   it — but this is the one directive that is weaker than ideal, and it
   should be revisited if the site ever gains a dynamic route.

   Fonts are self-hosted by next/font at build time, so font-src stays
   'self' with no Google Fonts origin. Dev additionally needs 'unsafe-eval'
   and a websocket for React Refresh. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ""}https://assets.calendly.com https://*.posthog.com`,
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: blob: https://*.calendly.com",
  "font-src 'self' data:",
  `connect-src 'self' https://calendly.com https://*.posthog.com${isDev ? " ws: wss:" : ""}`,
  "frame-src https://calendly.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  /* Modern clickjacking control; X-Frame-Options below covers old browsers. */
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /* Redirects removed with the old booking route: /request-access,
     /talk-to-founder and /book-demo all pointed at /lets-talk, which
     no longer exists — a 308 to a 404 is worse than nothing. Restore
     them pointing at the new booking route once it ships. */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          /* Superseded by frame-ancestors, kept for pre-CSP3 browsers. */
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          /* Severs window.opener for cross-origin popups, so the booking
             fallback link cannot be used to reach back into this page. */
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
