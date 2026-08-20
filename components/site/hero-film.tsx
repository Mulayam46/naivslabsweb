"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   Ambient hero film + score.

   Masked away from the centre so the headline stays clean and revealed
   around the edges. The clip is high-contrast black and white and
   carries no text of its own, so it needs no blur to sit behind copy.

   ── On prefers-reduced-motion ──────────────────────────────
   The film used to be suppressed entirely under that media query. It
   is not any more: it plays for everyone. That was a deliberate call.
   On Windows the OS toggle behind `prefers-reduced-motion` is
   "Animation effects", which people routinely switch off on laptops
   for battery and performance rather than because motion makes them
   ill — so the signal is blunt enough that honouring it by blanking
   the hero cost more readers than it helped.

   The obligation that replaces it is a real one: a visible, always
   reachable STOP. `.hero-controls` is `position: fixed`, so the pause
   button follows the reader down the page, and a stop is remembered
   across visits. That is what satisfies WCAG 2.2.2 (Pause, Stop,
   Hide) — which applies to this clip regardless of any media query,
   and which the previous version did not satisfy at all.
═══════════════════════════════════════════════════════════ */

/* Two encodes of the same clip, offered best-first. VP9/WebM is smaller
   at matching quality and covers Chrome, Firefox, Edge and Safari 14.1+;
   H.264/MP4 is the universal fallback. Both are denoised and capped at
   24fps — the source was a 17 MB 30fps master, which is a lot of
   bandwidth for something rendered at 50% opacity behind a mask.
   See the README for the exact ffmpeg invocations. */
const FILM_WEBM = "/future.webm";
const FILM_MP4 = "/future.mp4";

/* Frame 0 of the clip, 20 KB. The hero is never blank during the
   seconds the 3 MB clip buffers, and a reader who stopped the film sees
   the composition rather than an empty background. Frame 0 exactly, so
   the handover to live playback has nothing to jump from. */
const FILM_POSTER = "/future-poster.webp";

/** Only a STOP is remembered. A "play" choice is never persisted. */
const FILM_STOPPED_KEY = "navis_film_stopped";

const HERO_MASK = [
  "radial-gradient(ellipse 56% 50% at 50% 44%, transparent 14%, rgba(0,0,0,0.55) 58%, #000 100%)",
  "linear-gradient(to bottom, transparent 0%, #000 14%, #000 78%, transparent 100%)",
].join(", ");

const FILM_LOOK: React.CSSProperties = {
  opacity: 0.5,
  filter: "contrast(0.92) brightness(1.06)",
  transform: "scale(1.04)",
  maskImage: HERO_MASK,
  WebkitMaskImage: HERO_MASK,
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as React.CSSProperties;

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/* Connection tiers that genuinely cannot afford a decorative download.
   A blocklist rather than `=== "4g"`: the spec may add faster tiers,
   and a new tier should not be treated as slow by default. */
const SLOW_TIERS = ["slow-2g", "2g", "3g"];

/**
 * Whether it is reasonable to spend a visitor's bandwidth on decoration.
 *
 * Deliberately permissive. The clip is ~3 MB now, not the 17 MB it once
 * was, so the bar is "don't punish someone who told us they're
 * constrained" rather than "prove the link is fast".
 *
 * Notably absent: `connection.downlink`. It reports recently observed
 * throughput, not link capacity, so a page that has barely transferred
 * anything yet reads low no matter how fast the connection is — it
 * measured 1.55 Mbps against a server on localhost. Gating on it
 * silently hid the hero on perfectly fast connections.
 *
 * Anything unknown fails OPEN: Safari and Firefox do not implement
 * `navigator.connection` at all, and refusing every non-Chromium
 * browser would mean most desktop visitors never see the hero.
 */
function networkAllowsHeavyMedia(): boolean {
  if (typeof navigator === "undefined") return false;

  const nav = navigator as Navigator & {
    connection?: NetworkInfo;
    deviceMemory?: number;
  };

  /* Reported in GiB, rounded down to a power of two, Chromium only. */
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2) return false;

  const conn = nav.connection;
  if (!conn) return true; /* API unavailable — not evidence of a slow link. */
  if (conn.saveData) return false; /* Explicit user intent. Always honour it. */
  if (conn.effectiveType && SLOW_TIERS.includes(conn.effectiveType)) return false;

  return true;
}

/** Runs `fn` when the browser is idle, with a timeout fallback. */
function onIdle(fn: () => void): () => void {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    cancelIdleCallback?: (id: number) => void;
  };
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout: 2500 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(fn, 1200);
  return () => window.clearTimeout(id);
}

export function HeroFilm() {
  const [load, setLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  /* Starts true so the server and the first client render agree; a
     remembered stop is applied on the next render, well before the clip
     has finished buffering. */
  const [playing, setPlaying] = useState(true);
  const holder = useRef<HTMLDivElement>(null);
  const film = useRef<HTMLVideoElement>(null);

  /* Honour a stop from a previous visit. */
  useEffect(() => {
    let stopped = false;
    try {
      stopped = window.localStorage.getItem(FILM_STOPPED_KEY) === "1";
    } catch {
      /* Storage can throw in private mode or with cookies blocked. */
    }
    /* Intentional: one post-mount flip so the first client render
       matches the server. There is no external system to subscribe to. */
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stopped) setPlaying(false);
  }, []);

  /* Fetch only once the hero is on screen, the connection allows it, and
     the main thread has gone idle — so a decorative clip never competes
     with hydration or the LCP paint. setState fires in the observer and
     idle callbacks, never in the effect body. */
  useEffect(() => {
    if (!holder.current) return;
    const el = holder.current;
    let cancelIdle: (() => void) | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || !networkAllowsHeavyMedia()) return;
        io.disconnect();
        cancelIdle = onIdle(() => setLoad(true));
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelIdle?.();
    };
  }, []);

  /* Single owner of playback. Autoplay policy can still reject a muted
     video (a background tab at mount, or a Low Power Mode iPhone).
     Nothing is audible and nothing depends on it, so ask and let a
     refusal go quietly. */
  useEffect(() => {
    const v = film.current;
    if (!load || !v) return;
    if (!playing) {
      v.pause();
      return;
    }
    const attempt = v.play();
    if (attempt) attempt.catch(() => {});
  }, [load, playing]);

  const toggleFilm = useCallback(() => {
    const next = !playing;
    setPlaying(next);
    try {
      if (next) window.localStorage.removeItem(FILM_STOPPED_KEY);
      else window.localStorage.setItem(FILM_STOPPED_KEY, "1");
    } catch {}
  }, [playing]);

  return (
    <>
      <div ref={holder} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {load && !failed && (
          <video
            ref={film}
            className="h-full w-full object-cover"
            style={FILM_LOOK}
            poster={FILM_POSTER}
            muted
            loop
            playsInline
            disableRemotePlayback
            /* NOT "none". This element only mounts once the observer, the
               connection check and the idle callback have already agreed
               to load the clip, so telling the browser not to fetch it
               here just cancels that decision — Chrome honours the hint
               and never issues the request, which is why the hero once
               rendered empty. The deferral lives in the mount condition,
               not in this attribute.

               No `autoPlay` either: the effect above owns play/pause, and
               the attribute would race it into starting a film the reader
               stopped on a previous visit. */
            preload="auto"
          >
            <source src={FILM_WEBM} type="video/webm" />
            {/* onError lives on the LAST source, not on <video>. Media
                errors do not bubble, so a handler on the <video> element
                never fires when its <source> children fail — and a failure
                on the WebM source is not a failure at all while the MP4
                below it can still play. Only this one running out of
                options means there is nothing left to show. */}
            <source src={FILM_MP4} type="video/mp4" onError={() => setFailed(true)} />
          </video>
        )}
      </div>

      <HeroControls
        filmAvailable={load && !failed}
        filmPlaying={playing}
        onToggleFilm={toggleFilm}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════
   Hero controls — stop the film, or turn the score on.

   The score starts SILENT, always. There is no autoplay attempt:
   Chrome's Media Engagement Index means a returning visitor is exactly
   the person for whom audible autoplay would have succeeded, so "the
   browser will block it anyway" was never true for the audience that
   matters. Sound on a B2B page is an opt-in.

   Note the asymmetry in what gets remembered. A stopped film persists;
   sound being ON never does. Persisting a restriction is helpful;
   persisting a permission is how a page starts talking at someone who
   never asked twice.
═══════════════════════════════════════════════════════════ */

const AUDIO_SRC = "/paper-kite-drift.mp3";
const VOLUME = 0.35;

function HeroControls({
  filmAvailable,
  filmPlaying,
  onToggleFilm,
}: {
  filmAvailable: boolean;
  filmPlaying: boolean;
  onToggleFilm: () => void;
}) {
  const track = useRef<HTMLAudioElement>(null);
  const [sound, setSound] = useState(false);

  const toggleSound = useCallback(() => {
    const el = track.current;
    if (!el) return;

    if (sound) {
      el.pause();
      setSound(false);
      return;
    }

    el.volume = VOLUME;
    el.play().then(
      () => setSound(true),
      /* Only reachable if the element cannot decode or the media is
         missing — this call is inside a click handler, so autoplay
         policy does not apply. */
      () => setSound(false),
    );
  }, [sound]);

  return (
    <div className="hero-controls">
      {/* Rendered only once there is a film to stop. A pause button for
          a clip the connection gate declined to fetch controls nothing. */}
      {filmAvailable && (
        <button
          type="button"
          onClick={onToggleFilm}
          /* No `aria-pressed`. The label already changes to name the next
             action, and W3C APG is explicit that a toggle should not do
             both — "Play background film, pressed" tells a screen reader
             user the film IS playing while the label says it is not.
             Native media controls work the same way: changing label,
             no pressed state. */
          aria-label={filmPlaying ? "Pause background film" : "Play background film"}
          title={filmPlaying ? "Pause background film" : "Play background film"}
          className="hero-ctl"
        >
          {filmPlaying ? (
            <Pause strokeWidth={1.75} aria-hidden className="icon-ui" />
          ) : (
            <Play strokeWidth={1.75} aria-hidden className="icon-ui" />
          )}
        </button>
      )}

      {/* preload="none" is honest here: nothing fetches the track until
          the reader actually asks for it in `toggleSound`. */}
      <audio ref={track} src={AUDIO_SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggleSound}
        /* Same reasoning as the film control above — changing label, no
           aria-pressed. */
        aria-label={sound ? "Mute background sound" : "Turn on background sound"}
        title={sound ? "Mute background sound" : "Turn on background sound"}
        className="hero-ctl"
      >
        {sound ? (
          <Volume2 strokeWidth={1.75} aria-hidden className="icon-ui" />
        ) : (
          <VolumeX strokeWidth={1.75} aria-hidden className="icon-ui" />
        )}
      </button>
    </div>
  );
}
