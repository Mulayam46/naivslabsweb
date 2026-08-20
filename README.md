# NavisLabs — marketing site

The public site for **NavisLabs**, Enterprise Intelligence Infrastructure.
NavisLabs connects the systems an organization already runs and
continuously builds a live operational model its teams and AI agents use
to make better decisions.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind
CSS v4. Every route is statically prerendered by `next build` — note
that this is prerendering, not `output: "export"`, so `next.config.js`
headers and redirects are live.

## Routes

| Route            | Description                                       |
| ---------------- | ------------------------------------------------- |
| `/`              | Homepage — the full scroll story                  |
| `/platform`      | Product hub — operational model, traceability, integrations |
| `/solutions`     | One understanding, per-team decisions             |
| `/company`       | Who we are, why now, principles                   |
| `/security`      | Operating constraints and deployment posture      |
| `/vision`        | Long-form thesis                                  |
| `/how-it-works`  | Eight-layer architecture and rollout              |
| `/resources`     | Index of vision + architecture + security         |

The primary CTA everywhere is **Book Demo**, which opens a shared modal
mounted once in the root layout (`components/meeting/*`). Calendly owns
times, timezones, reminders, reschedules and confirmation.

## Design system

`app/globals.css` is the single source of truth for colour, type,
radius, shadow and motion.

- **Palette**: warm neutrals only. `--canvas` `#F7F6F3`, `--surface`
  `#FFFFFF`, `--text` `#14130F`, `--text-2` `#66625B`, `--accent`
  `#2E2A24` (deep graphite). The only saturated colour anywhere on the
  site belongs to third-party integration logos.
- **Type**: five sizes and only five — display, heading, section, body,
  caption. Geist Sans for display, Inter for body, Geist Mono for
  labels.
- **Motion**: opacity, blur, translateY and scale only. Below the fold,
  scroll reveals use `<Reveal>`. **Above the fold, use the CSS classes
  `anim-rise` + `d-1`…`d-6` — never a motion component.** A motion
  component renders its start state as inline `opacity:0` in the
  prerendered HTML, which parks the LCP element behind hydration and
  leaves it blank forever if the bundle never loads. CSS animations
  paint on the first frame; `prefers-reduced-motion` collapses both.

Do not add one-off colours or inline style objects. If you find
yourself writing one, the primitive is missing — add it to
`components/site/ui.tsx`.

## Structure

```
app/
  layout.tsx                root metadata, fonts, providers
  opengraph-image.tsx       OG image generated at build time
  page.tsx                  homepage
  not-found.tsx             branded 404 — also catches every unmatched URL
  error.tsx                 route-segment error boundary (client)
  global-error.tsx          root-layout fallback, inline-styled (client)
  fonts/                    vendored GeistMono variable woff2
  <route>/page.tsx          each interior page
  robots.ts / sitemap.ts / manifest.ts
lib/
  site.ts                   CTA label, contact email — plain module
  meetings.ts               meeting types + Calendly URL validation
  motion.ts                 useSafeReducedMotion (client)
  utils.ts                  cn()
components/
  analytics.tsx             PostHog, dynamically imported, no-ops without a key
  meeting/                  Book Demo dialog + Calendly embed
  site/
    ui.tsx                  primitives — SkipLink, Button, Card, Section, Dot
    reveal.tsx              Reveal / ScrollSettle (client)
    chrome.tsx              Footer + PageShell (SERVER), re-exports SystemBar
    system-bar.tsx          the interactive nav + mobile drawer (client)
    wordmark.tsx            brand lockup — shared, no "use client"
    home.tsx                homepage sections (server)
    dashboard.tsx           Morning Intelligence preview (server)
    hero-film.tsx           hero video + score control (client)
    pipeline.tsx            scroll-linked four-step pipeline (client)
    logos.tsx               third-party brand marks (server)
    jsonld.tsx              Organization + FAQ structured data (server)
public/
  logo/                     vendor SVGs used by <BrandIcon>
  .well-known/security.txt  RFC 9116 security contact
```

There is no `app/api`. The site is statically prerendered — the only
backend it touches is Calendly's embed.

> **Constants a Server Component reads must live in `lib/`, never in a
> `"use client"` file.** Next swaps client modules for a reference
> proxy, so a plain constant imported across that boundary reads back
> as `undefined` — with no build, type or lint error.

> **`chrome.tsx` has no `"use client"`, and it must stay that way.**
> The footer prints the current year. Rendered on the client, that is a
> hydration mismatch every New Year's Day — the prerendered HTML carries
> the build year while the browser computes the real one. Only
> `system-bar.tsx` needs the client boundary.

### Landmarks

`SystemBar` and `Footer` render **outside** `<main>`, and every page
starts with `<SkipLink />`. A `<header>`/`<footer>` nested inside `main`
gets no implicit `banner`/`contentinfo` role, which costs screen-reader
users landmark navigation. `<main>` always carries `id="content"` —
that is the skip link's target.

## Metadata

Every route declares its own `alternates.canonical`. Do **not** set
`alternates` on the root layout — metadata is inherited, so a canonical
there makes every page canonicalize to `/`.

The Open Graph image is generated at build time via
`app/opengraph-image.tsx` using `next/og`. Do not re-declare
`openGraph.images` in the metadata object.

## Media assets

Everything in `public/` is served as-is — it is not run through the
image optimiser and it is not content-hashed, so file size is shipped
size. `next.config.js` gives these a one-day cache with a week of
stale-while-revalidate.

### The hero clip

The master was a 17 MB, 1280×720, 30 fps H.264 file — a lot of
bandwidth for something rendered at 50% opacity, behind a radial mask,
with its contrast pulled down. It now ships as two encodes offered
best-first from `hero-film.tsx`, both 1280×720 at 24 fps:

| File                 | Codec       | Size    | Serves                          |
| -------------------- | ----------- | ------- | ------------------------------- |
| `public/future.webm` | VP9         | 3.03 MB | Chrome, Firefox, Edge, Safari 14.1+ |
| `public/future.mp4`  | H.264 High  | 3.70 MB | universal fallback              |

That is **17 MB → 3.03 MB (−82%)** for most visitors.

The single biggest win was `hqdn3d` denoising **before** the encoder.
The clip is dense pencil-sketch line-work, and the grain in the master
was eating most of the bitrate; removing it cut H.264 from 6.7 MB to
3.9 MB at the same CRF, with no visible loss at the opacity this
renders at.

> Both files must stay the same length (69.58 s / 1670 frames at
> 24 fps). Verify with `ffmpeg -i <file>` after any re-encode — a
> truncated source produces a shorter file and ffmpeg still exits 0.

```bash
# H.264 — universal fallback
ffmpeg -i <master>.mp4 -vf "fps=24,hqdn3d=4:3:6:4" \
  -c:v libx264 -crf 34 -preset slow -profile:v high -pix_fmt yuv420p \
  -movflags +faststart -an public/future.mp4

# VP9 — smaller at matching quality
ffmpeg -i <master>.mp4 -vf "fps=24,hqdn3d=4:3:6:4" \
  -c:v libvpx-vp9 -crf 48 -b:v 0 -row-mt 1 -cpu-used 1 \
  -auto-alt-ref 1 -lag-in-frames 25 -an public/future.webm
```

`-an` drops audio (the element is muted regardless) and `+faststart`
moves the moov atom to the front so playback can start before the file
finishes downloading.

**Always re-encode from the master, never from `public/future.mp4`** —
going again from an already-compressed file compounds the loss. The
17 MB master is the version committed in `e65cf97`:

```bash
git show e65cf97:public/future.mp4 > future-master.mp4   # 16,982,762 bytes
```

The pre-resize founder photos are in the same commit.

Note the CRF scales are not comparable between the two encoders: VP9
crf 48 is roughly x264 crf 34. Do not copy one number to the other.

If it needs to get smaller still, the next lever is resolution — adding
`scale=960:-2` to the filter chain drops roughly another third, and at
this opacity behind the mask the softening is hard to see. That is a
visual call, so it is left un-taken.

**`onError` belongs on the last `<source>`, never on `<video>`.** Media
errors do not bubble, so a handler on the video element never fires when
its sources fail — and a WebM failure is not a failure while the MP4
below it can still play.

### The poster

`public/future-poster.webp` is frame 0 of the clip, 20 KB. It is the
`<video poster>`, so the hero is never blank during the seconds the
3 MB clip buffers, and it is what a reader who stopped the film sees.
Frame 0 exactly, so the handover to live playback has nothing to jump
from. Regenerate it after any re-encode:

```bash
ffmpeg -i public/future.webm -frames:v 1 -vf scale=1280:-2 poster.png
# then: sharp(poster.png).webp({ quality: 70 }) -> public/future-poster.webp
```

### The film plays under prefers-reduced-motion, on purpose

The film used to be suppressed entirely under that media query, which
meant it rendered as *nothing* — a bare background. On Windows the OS
toggle behind `prefers-reduced-motion` is "Animation effects", which
people routinely switch off on laptops for battery and performance
rather than because motion makes them ill. Treating that blunt signal
as "show this person no hero" cost more readers than it helped, so the
film now plays for everyone.

What pays for that is the stop control, and it is not optional:

- `.hero-controls` is `position: fixed`, so the pause button follows
  the reader down the page. A control anchored inside the hero scrolls
  out of reach while the motion keeps running.
- A stop is remembered in `localStorage` across visits. A *play* choice
  is deliberately never persisted — persisting a restriction is
  helpful, persisting a permission is not.

This is what satisfies **WCAG 2.2.2 (Pause, Stop, Hide)**, which applies
to an auto-playing clip longer than five seconds regardless of any media
query — and which the earlier version did not satisfy for anyone whose
animations were switched on. Do not remove the pause control, and do not
re-anchor it inside the hero section.

> Verifying this is easy to get wrong, because you only see the
> reduced-motion path if your own machine has the setting on. The flag
> Chrome actually reads on Windows is `SPI_GETCLIENTAREAANIMATION` —
> *not* the `MinAnimate` registry value, which is a different setting
> and can disagree with it.

### Images

Founder photos were resized to a 640 px long edge (they were 1254 px
and 2268 px, for avatars that render at most 208 px) — 2.32 MB down to
273 KB. Keep new photos at that ceiling.

## Scripts

```bash
npm run dev     # local dev server on :3001
npm run build   # production build
npm run start   # serve the production build on :3001
npm run lint    # eslint
```

## Environment

See `.env.example`. Three Calendly URLs and two optional PostHog keys —
that is all. `NEXT_PUBLIC_*` values are read at **build** time, so
changing one needs a redeploy, not a restart.

**Never put secrets in `NEXT_PUBLIC_*` variables** — they are inlined
into the browser bundle and are effectively public.

## Analytics and privacy

PostHog is **off** unless `NEXT_PUBLIC_POSTHOG_KEY` is set, and the
library is behind `await import()` so it is not in any route's bundle
until then — a static import put ~79 KB gzipped on every page whether
or not analytics was enabled.

`capture_pageview: "history_change"` is required for the App Router,
where every in-site link is a client-side navigation and an init-time
pageview would otherwise record only the landing page.

### Why there is no cookie banner

The site runs PostHog in `cookieless_mode: "always"`. No cookies, no
localStorage, no sessionStorage — visitor identity is a
privacy-preserving hash computed on PostHog's servers rather than an
identifier written to the reader's device.

That is a deliberate posture, not an oversight. The ePrivacy consent
requirement is triggered by storing or accessing information on a
user's terminal equipment; store nothing and it never fires. Session
replay and surveys are explicitly disabled, `respect_dnt` is honoured,
and `mask_personal_data_properties` strips advertising identifiers
(`gclid`, `fbclid`, …) from captured URLs.

> **⚠️ Cookieless mode must also be enabled in the PostHog project
> settings** (Project settings → confirm cookieless is on). If it is
> not, PostHog **silently discards every event** — the site behaves
> normally and the dashboard just stays empty. This is the first thing
> to check if data never appears.

Trade-off worth knowing: without a device-stored ID, cross-session
identity is weaker than a cookie-based setup. Pageviews, clicks, scroll
depth and per-session behaviour are all intact; long-horizon
returning-visitor tracking is not the goal here.

If a cookie banner is ever wanted instead, `cookieless_mode` also takes
`'on_reject'` — cookies for people who accept, cookieless for everyone
else — which is the one-line change that makes a banner meaningful.

Calendly's own GDPR banner is **not** suppressed. Hiding a third
party's cookie notice removes the disclosure, not the cookies.

## Notes

- `next.config.js` sets a strict Content-Security-Policy, HSTS,
  `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy,
  Permissions-Policy, and disables `poweredByHeader`. It also 308s the
  retired `/request-access`, `/talk-to-founder` and `/book-demo` paths
  to `/`, where the CTA opens the booking dialog.
- `sitemap.ts` carries a hand-maintained `LAST_CONTENT_CHANGE`. Bump it
  when page copy actually changes — not on every deploy.
- We do not claim certifications we do not hold, customers we have not
  signed, or logos we have not earned. Keep it that way.
