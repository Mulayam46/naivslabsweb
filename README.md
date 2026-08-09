# Navis — marketing site

Marketing site for **Navis**, enterprise intelligence infrastructure by NavisLabs.
Navis connects the systems an organization already runs and continuously builds a
live operational model its teams and AI agents use to make better decisions.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Routes

| Route           | Description                                  |
| --------------- | -------------------------------------------- |
| `/`             | Homepage — the full scroll story             |
| `/lets-talk`    | Hero, three conversations, scheduling modal  |
| `/security`     | Operating constraints and deployment posture |
| `/how-it-works` | The eight-layer architecture and rollout     |
| `/company`      | Thesis, principles, where we are             |
| `/vision`       | Long-form thesis                             |

`/request-access`, `/talk-to-founder` and `/book-demo` all permanently
redirect to `/lets-talk`.

## "Let's Talk"

The whole page is a hero, three conversation cards, and a modal:

```
/lets-talk → pick a conversation → Calendly opens in a modal → done
```

There is no stepper, no founder picker, no session state, no confirmation
screen and no booking form. **We do not build scheduling.** Calendly owns
times, timezones, reminders, reschedules, cancellations, calendar sync and
the confirmed state — duplicating any of it would just be more to maintain.

Conversations live in `lib/scheduling.ts`. Each names its own founder and
its own Calendly event URL, set via `NEXT_PUBLIC_CALENDLY_*` (see
`.env.example`). **If a URL is unset, that card's modal says the calendar
isn't connected and offers email** — the page still works.

The investor conversation is intentionally not on the site. Investors don't
arrive through the homepage; send them the Calendly link directly.

`/lets-talk` is the one dark room on an otherwise light site — see
`.scope-dark` in `globals.css`. That contrast is deliberate: calm and
trustworthy to read, focused and private to talk.

> Keep the hero and cards out of any Suspense boundary. A client-only hook
> (`useSearchParams`) there makes the build emit only the fallback, and the
> headline and cards vanish from the server HTML. Verify after changes:
> `grep -c 'Explore Navis' .next/server/app/lets-talk.html` → should be 1.

## Homepage scroll story

Each section answers exactly one question, in this order:

Hero → Trust → Problem → Enterprise Systems → Solutions → How Navis Understands →
Morning Intelligence → Integrations → Security → How It Works → Let's Talk

## Design system

`app/globals.css` is the single source of truth for colour, type, radius, shadow
and motion. **Do not add one-off colours or inline style objects** — if you find
yourself writing one, the primitive is missing. Add it to
`components/site/ui.tsx` instead.

### Palette

| Token            | Value     | Use                                          |
| ---------------- | --------- | -------------------------------------------- |
| `--canvas`       | `#F8F8F6` | Page background                              |
| `--surface`      | `#FFFFFF` | Cards, panels                                |
| `--surface-sunk` | `#F3F3F0` | Wells, alternating bands                     |
| `--ink-ground`   | `#111111` | The one dark band (closing CTA)              |
| `--text`         | `#111111` | Primary text                                 |
| `--text-2`       | `#666666` | Secondary text                               |
| `--text-3`       | `#6E6E6E` | Labels and captions                          |
| `--border`       | `#E8E8E8` | Default border                               |
| `--cta`          | `#18181B` | Primary button (`--cta-hover` `#000000`)     |
| `--accent`       | `#5B8CFF` | Brand mark — dots, rules, dark band **only** |
| `--accent-text`  | `#2E5BD6` | Accent **text** on light grounds             |

Two accent steps exist because `#5B8CFF` is only 2.97:1 on canvas and cannot
carry small text. Tailwind's `text-accent` maps to the safe step
(`--accent-text`) so the accessible value is the default; `bg-accent-mark` is the
bright brand blue for decoration. **Every text token passes WCAG AA (≥4.59:1) on
every ground.**

### Radius

Navbar `24px` · Cards `20px` · Panels `16px` (default) · Buttons and inputs `14px`

### Motion

Animate **opacity, blur, translateY and scale — nothing else.** All scroll
reveals go through `<Reveal>`; above-the-fold entrances use `<Enter>`. Both
render plain elements under `prefers-reduced-motion`.

### Type

Geist Sans (display) · Inter (body) · Geist Mono (labels and data).

## Structure

```
app/                     routes, metadata
lib/
  site.ts                shared constants (CTA, contact) — plain module
  scheduling.ts          the three conversations + Calendly URLs
  utils.ts               cn()
components/
  analytics.tsx          PostHog, no-ops without a key (client)
  site/
    ui.tsx               primitives — Button, Card, Section, Chip, Dot (server)
    reveal.tsx           Reveal / Enter motion primitives (client)
    chrome.tsx           SystemBar, Footer, PageShell (client)
    home.tsx             homepage sections (server)
    dashboard.tsx        Morning Intelligence product preview (server)
    talk.tsx             Let's Talk hero + cards (client)
    talk-shell.tsx       dark room shell (server)
    conversation-modal.tsx  modal + Calendly embed (client)
```

There is **no `app/api`**. The site is 100% statically prerendered with no
server routes — the only backend it touches is Calendly's embed. Only the
nav, the talk cards, the modal and the motion primitives cross the client
boundary; homepage sections and the product preview are Server Components.

> **Constants a Server Component reads must live in `lib/`, never in a
> `"use client"` file.** Next swaps client modules for a reference proxy,
> so a plain constant imported across that boundary reads back as
> `undefined` — with no build, type or lint error. This silently rendered
> the hero CTA as an empty `<button>` once already.

## Metadata

Every route declares its own `alternates.canonical`. Do **not** set `alternates`
on the root layout — metadata is inherited, so a canonical there makes every page
canonicalize to `/`.

## Scripts

```bash
npm run dev     # local dev server on :3001
npm run build   # production build
npm run start   # serve the production build on :3001
npm run lint    # eslint
```

## Environment

See `.env.example`. Three Calendly URLs and two optional PostHog keys —
that's all. `NEXT_PUBLIC_*` values are read at **build** time, so changing
one needs a redeploy, not a restart.

## Notes

- `next.config.js` sets security headers (HSTS, `X-Frame-Options: DENY`,
  `nosniff`, Referrer-Policy, Permissions-Policy) and disables `poweredByHeader`.
- `/request-access`, `/talk-to-founder` and `/book-demo` are kept as permanent
  redirects for inbound links from before the rename. Don't drop them.
- We do not claim certifications we do not hold. Keep it that way.
