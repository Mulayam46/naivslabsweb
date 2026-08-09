"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Founder, FounderFace } from "@/lib/meetings";

/* Photos live at the root of public/, so the path IS the URL — there is
   no /public prefix. Initials remain as a fallback if a file is ever
   renamed, so the avatar degrades instead of showing a broken image. */

export function FounderAvatar({
  founder,
  size = 64,
  className,
}: {
  /* FounderFace, not Founder: an avatar never needs the title, and
     accepting the narrower shape keeps roles out of payloads that
     must not carry them. */
  founder: FounderFace;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cn(
        "relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full",
        className,
      )}
      style={{
        width: size,
        height: size,
        background: "var(--accent-wash)",
        border: "1px solid var(--border)",
      }}
    >
      {failed ? (
        <span
          aria-hidden
          className="font-display font-medium text-text-2"
          style={{ fontSize: Math.round(size * 0.34) }}
        >
          {founder.initials}
        </span>
      ) : (
        <Image
          src={founder.photo}
          alt={founder.name}
          width={size * 2}
          height={size * 2}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}

/** Overlapping avatars — "hosted by" rows and the calendar header. */
export function FounderStack({
  founders,
  size = 28,
}: {
  founders: FounderFace[];
  size?: number;
}) {
  return (
    <span className="flex items-center">
      {founders.map((f, i) => (
        <FounderAvatar
          key={f.id}
          founder={f}
          size={size}
          className={i > 0 ? "-ml-2.5 ring-2 ring-white" : undefined}
        />
      ))}
    </span>
  );
}

/**
 * Named founder row.
 *
 * `showRole` is opt-in and defaults to false on purpose: founder titles
 * belong only inside the booking dialog, and a shared component that
 * renders them by default is how they end up back on the homepage.
 */
export function FounderRow({
  founders,
  showRole = false,
}: {
  founders: Founder[];
  showRole?: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-x-12 gap-y-6">
      {founders.map((f) => (
        <li key={f.id} className="flex items-center gap-4">
          <FounderAvatar founder={f} size={64} />
          <span>
            <span className="block text-[15px] font-medium text-text">{f.name}</span>
            {showRole && (
              <span className="mt-0.5 block text-[13px] text-text-2">{f.role}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}
