"use client";

import { buttonVariants, type ButtonProps } from "@/components/site/ui";
import { cn } from "@/lib/utils";
import { CTA } from "@/lib/site";
import type { DialogView } from "./meeting-dialog";
import { useMeeting } from "./meeting-provider";

/* Opens the shared dialog. Uses the same cva variants as <Button>, so a
   trigger and a link button are visually identical — the difference is
   only that this one never navigates.

   `view` picks where the dialog lands: meetings by default, or the
   founder note for the homepage founder CTA. */

type TriggerProps = Omit<ButtonProps, "href" | "external" | "children"> & {
  view?: DialogView;
  children?: React.ReactNode;
};

export function MeetingTrigger({
  variant,
  size,
  view = "meetings",
  className,
  children = CTA.label,
  ...rest
}: TriggerProps) {
  const { open } = useMeeting();

  return (
    <button
      type="button"
      onClick={() => open(view)}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      {children}
    </button>
  );
}
