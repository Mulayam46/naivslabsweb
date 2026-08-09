/* ═══════════════════════════════════════════════════════════
   Shared site constants.

   These MUST live in a plain module, not in a "use client" file.
   When a Server Component imports a value from a client module, Next
   swaps that module for a client-reference proxy — plain constants
   read back as `undefined` on the server, with no build, type or lint
   error. That silently rendered the hero CTA as an empty <button>.

   Anything a Server Component reads at render time belongs here.
═══════════════════════════════════════════════════════════ */

/* The booking experience is a dialog, not a route, so there is no href.
   This is the single source for the button label — change it here and
   every trigger on the site follows. */
export const CTA = { label: "Book Demo" } as const;

export const CONTACT_EMAIL = "hello@navislabs.in";
