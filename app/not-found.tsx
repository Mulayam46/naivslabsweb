import Link from "next/link";
import { SystemBar, Footer } from "@/components/site/chrome";
import { Button, Container, SkipLink } from "@/components/site/ui";
import { MeetingTrigger } from "@/components/meeting/meeting-trigger";

/* The root not-found also handles every unmatched URL for the whole
   app, so this is the page a mistyped link or a dead inbound link
   lands on. It gets the real nav and footer: a 404 with no way back
   is how a visitor leaves entirely.

   No `metadata` export — Next injects `noindex` automatically for
   responses that carry a 404 status, and the root layout's title
   template already applies. */

/* Only routes that actually exist. Adding an aspirational link here
   is how a 404 turns into a second 404. */
const ELSEWHERE: [string, string, string][] = [
  ["Platform", "/platform", "The operational model, traceability and integrations."],
  ["Security", "/security", "Scopes, approval, audit trail and data ownership."],
  ["Resources", "/resources", "The thesis, the architecture and the security overview."],
  ["Company", "/company", "Who we are, why now, and what guides us."],
];

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <div aria-hidden className="page-canvas" />
      <div aria-hidden className="page-noise" />

      <SystemBar />

      <main id="content">
        <section className="pb-16 pt-[calc(var(--nav-h)+clamp(48px,7vw,96px))] md:pb-24">
          <Container>
            <p className="t-label anim-rise text-accent">404</p>
            <h1 className="t-heading anim-rise d-1 mt-6 max-w-[900px] text-text">
              That page isn&rsquo;t here.
              <br />
              <span className="text-text-2">Everything else still is.</span>
            </h1>
            <p className="t-body anim-rise d-2 mt-7 max-w-[560px] text-text-2">
              The link may be out of date, or the address may have a typo. Here is
              where the rest of the site lives.
            </p>

            <div className="anim-rise d-4 mt-9 flex flex-wrap items-center gap-3">
              <MeetingTrigger />
              <Button href="/" variant="secondary">
                Back to home
              </Button>
            </div>
          </Container>
        </section>

        <section className="band-sm band-line">
          <Container>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ELSEWHERE.map(([label, href, body]) => (
                <li key={href}>
                  <Link href={href} className="card group block h-full p-6">
                    <span className="t-strong block text-text">{label}</span>
                    <span className="t-caption mt-2 block leading-relaxed text-text-2">
                      {body}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
