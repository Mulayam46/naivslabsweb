"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Hydration-safe wrapper around motion's useReducedMotion.
 *
 * The underlying hook returns null on the server and resolves to a
 * boolean on the client, so branching on it during the first client
 * render flips the DOM shape (or motion's initial styles) and breaks
 * hydration. This variant returns false until after mount, then the
 * real value — matching the server on the first render and letting
 * the reduce branch take over on the next.
 */
export function useSafeReducedMotion(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  /* Intentional: flip a boolean once after mount so the first client
     render matches the server, then re-render with the real value.
     There is no external system to subscribe to here. */
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : false;
}
