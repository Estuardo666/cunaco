"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { fxAsset } from "./assets";
import type { FxButtonSize, FxButtonTone } from "./FxButton";

const ARROW_ICON = fxAsset("RXZaWpPO8xqy7UXViVlRYw1NH14.svg");

interface FxSubmitButtonProps {
  children: string;
  /** Label shown while the action is in flight. */
  pendingLabel?: string;
  pending?: boolean;
  disabled?: boolean;
  tone?: FxButtonTone;
  size?: FxButtonSize;
  className?: string;
}

/**
 * `FxButton` as a real `<button type="submit">`.
 *
 * The pill is visually identical — same halo, gradient, yellow hover crossfade
 * and cushioned press — because a form's primary action should not look like a
 * different control from the site's links. Two things are added that a link
 * does not need: a pending state (the arrow disc becomes a spinner and the
 * label swaps) and a disabled state.
 */
export function FxSubmitButton({
  children,
  pendingLabel,
  pending = false,
  disabled = false,
  tone = "dark",
  size = "lg",
  className,
}: FxSubmitButtonProps) {
  const isLg = size === "lg";
  const inert = pending || disabled;

  return (
    <button
      type="submit"
      disabled={inert}
      aria-busy={pending || undefined}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center rounded-full",
        isLg && "bg-white/10 p-1.5",
        "transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "active:translate-y-[1.5px] active:scale-[0.975] active:duration-[260ms] active:ease-[cubic-bezier(0.33,1,0.68,1)]",
        "motion-reduce:transition-none motion-reduce:active:translate-y-0 motion-reduce:active:scale-100",
        isLg && "hover:bg-cuna-yellow/25",
        "disabled:pointer-events-none disabled:opacity-60",
        className,
      )}
    >
      <span
        className={cn(
          "relative flex items-center justify-center overflow-clip rounded-full",
          isLg ? "py-3 pr-[54px] pl-[30px]" : "py-[10px] pr-10 pl-6",
        )}
        style={{
          backgroundImage:
            tone === "brand"
              ? "linear-gradient(110deg, #4fd3c4 0%, #2fa79a 100%)"
              : "linear-gradient(110deg, #2fa79a 0%, #1d6259 100%)",
          boxShadow:
            tone === "brand"
              ? `inset 4px 4px 8px 0 rgba(255,255,255,0.3), inset -4px -4px 8px 0 rgba(255,255,255,0.3), 0 ${isLg ? "8px" : "4px"} 16px 0 rgba(47,167,154,0.45)`
              : `inset 4px 4px 8px 0 rgba(255,255,255,0.3), inset -4px -4px 8px 0 rgba(255,255,255,0.3), 0 ${isLg ? "8px" : "4px"} 16px 0 rgba(29,62,58,0.35)`,
        }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:opacity-100 motion-reduce:transition-none"
          style={{
            backgroundImage: "linear-gradient(110deg, #ffd05c 0%, #ffbd35 100%)",
          }}
        />

        <span
          className={cn(
            "relative font-semibold text-white transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-fx-ink motion-reduce:transition-none",
            isLg ? "text-[18px] leading-[23.4px]" : "text-[14px] leading-[18.2px]",
          )}
        >
          {pending ? (pendingLabel ?? children) : children}
        </span>

        <span
          aria-hidden
          className={cn(
            "absolute top-2 right-2 z-[1] grid place-items-center overflow-hidden rounded-full bg-white",
            isLg ? "size-[31.4px]" : "size-[22.2px]",
          )}
        >
          {pending ? (
            /* The spinner replaces the arrow rather than sitting beside it, so
               the pill never changes width while the action is in flight. */
            <span className="col-start-1 row-start-1 size-3 animate-spin rounded-full border-2 border-cuna-teal border-t-transparent motion-reduce:animate-none" />
          ) : (
            <>
              <Image
                src={ARROW_ICON}
                alt=""
                width={13}
                height={9}
                className="col-start-1 row-start-1 w-3 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-[200%] group-hover:-translate-y-[200%] motion-reduce:transition-none"
              />
              <Image
                src={ARROW_ICON}
                alt=""
                width={13}
                height={9}
                className="col-start-1 row-start-1 w-3 -translate-x-[200%] translate-y-[200%] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:translate-x-0 motion-reduce:translate-y-0 motion-reduce:opacity-0 motion-reduce:transition-none"
              />
            </>
          )}
        </span>
      </span>
    </button>
  );
}
