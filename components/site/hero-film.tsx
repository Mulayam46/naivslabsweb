"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

/* Ambient hero film. Muted, looping, decorative — no sound, no controls.

   Masked away from the centre so the headline stays clean and revealed
   around the edges. The clip is high-contrast black and white and
   carries no text of its own, so it needs no blur to sit behind copy. */

export const FILM_SRC = "/future.mp4";

const HERO_MASK = [
  "radial-gradient(ellipse 56% 50% at 50% 44%, transparent 14%, rgba(0,0,0,0.55) 58%, #000 100%)",
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 78%, transparent 100%)",
].join(", ");

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/** The clip is 16 MB. Don't spend that on decoration over a slow link. */
function networkAllowsHeavyMedia(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  return !["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "");
}

export function HeroFilm() {
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const holder = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  /* Fetch only once the hero is on screen and the connection allows it.
     setState fires in the observer callback, never in the effect body. */
  useEffect(() => {
    if (reduce || !holder.current) return;
    const el = holder.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && networkAllowsHeavyMedia()) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  /* Autoplay policy can still reject a muted video (a background tab at
     mount, or a Low Power Mode iPhone). Nothing is audible and nothing
     depends on it, so ask once and let it go quietly. */
  useEffect(() => {
    if (!load || !film.current) return;
    const v = film.current;
    const attempt = v.play();
    if (attempt) attempt.catch(() => {});
  }, [load]);

  /* The film is suppressed under reduced motion, but the score is not
     motion — so the control renders either way and is never orphaned. */
  if (reduce || failed) return <HeroAudio />;

  return (
    <>
      <div ref={holder} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {load && (
        <video
          ref={film}
          src={FILM_SRC}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          style={{
            opacity: 0.5,
            filter: "contrast(0.92) brightness(1.06)",
            transform: "scale(1.04)",
            maskImage: HERO_MASK,
            WebkitMaskImage: HERO_MASK,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
          autoPlay
          muted
          loop
          playsInline
          /* NOT "none". This element only mounts once the observer and the
             connection check have already agreed to load the clip, so
             telling the browser not to fetch it here just cancels that
             decision — Chrome honours the hint and never issues the
             request, which is why the hero rendered empty. The deferral
             lives in the mount condition, not in this attribute. */
          preload="auto"
        />
      )}
      </div>
      <HeroAudio />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero score.

   One <audio> element, one control. Autoplay is attempted honestly:
   we call play() and handle the rejection. Chrome blocks audible
   autoplay until the user has interacted with the origin, and that is
   correct behaviour — there is no unmute-a-muted-element trick here,
   so a blocked page simply stays silent and the control shows the
   muted icon until the reader clicks it.

   An explicit mute is remembered in localStorage. Choosing to turn
   sound ON is not persisted: nobody should land on a later visit with
   audio starting because they once clicked play.
═══════════════════════════════════════════════════════════ */

const AUDIO_SRC = "/paper-kite-drift.mp3";
const MUTE_KEY = "navis_audio_muted";

function HeroAudio() {
  const track = useRef<HTMLAudioElement>(null);
  /* Starts silent so the server and the first client render agree; the
     effect below decides whether to attempt playback. */
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const el = track.current;
    if (!el) return;

    let muted = false;
    try {
      muted = window.localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      /* Storage can throw in private mode or with cookies blocked. */
    }

    if (muted) {
      setReady(true);
      return;
    }

    el.volume = 0.35;
    el.play().then(
      () => {
        if (!cancelled) {
          setPlaying(true);
          setReady(true);
        }
      },
      () => {
        /* Blocked by autoplay policy. Expected, not an error. */
        if (!cancelled) setReady(true);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback(() => {
    const el = track.current;
    if (!el) return;

    if (playing) {
      el.pause();
      setPlaying(false);
      try {
        window.localStorage.setItem(MUTE_KEY, "1");
      } catch {}
      return;
    }

    el.volume = 0.35;
    el.play().then(
      () => {
        setPlaying(true);
        try {
          window.localStorage.removeItem(MUTE_KEY);
        } catch {}
      },
      () => setPlaying(false),
    );
  }, [playing]);

  return (
    <>
      <audio ref={track} src={AUDIO_SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        /* Icon only, so the label carries the whole meaning. It names
           the action, not the state — that is what a screen reader
           user needs from a button. aria-pressed carries the state. */
        aria-label={playing ? "Mute background sound" : "Turn on background sound"}
        title={playing ? "Mute background sound" : "Turn on background sound"}
        /* Hidden until the autoplay question is settled, so the icon
           never flips in front of the reader on load. */
        className={`hero-audio ${ready ? "is-ready" : ""}`}
      >
        {playing ? (
          <Volume2 strokeWidth={1.75} aria-hidden className="icon-ui" />
        ) : (
          <VolumeX strokeWidth={1.75} aria-hidden className="icon-ui" />
        )}
      </button>
    </>
  );
}
