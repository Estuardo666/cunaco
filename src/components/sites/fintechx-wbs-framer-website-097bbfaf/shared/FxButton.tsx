import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fxAsset } from "./assets";

const ARROW_ICON = fxAsset("RXZaWpPO8xqy7UXViVlRYw1NH14.svg");

export type FxButtonTone = "dark" | "brand";
export type FxButtonSize = "sm" | "lg";

interface FxButtonProps {
  href: string;
  children: string;
  tone?: FxButtonTone;
  size?: FxButtonSize;
  className?: string;
}

/**
 * Primary pill button.
 *
 * Live values (getComputedStyle), verified across four `lg` instances:
 *
 * - **lg** is two nested pills. The outer `<a>` is 228 x 59 with `padding: 6px`,
 *   `background: rgba(255,255,255,0.1)` and `border-radius: 100px` — a translucent
 *   halo. The gradient pill inside it is only **47.4px tall** with
 *   `padding: 12px 54px 12px 30px`. Losing that halo is the single most visible
 *   way to get this button wrong.
 * - **sm** has no halo: its gradient pill measures the same 124 x 38.2 as the `<a>`,
 *   with `padding: 10px 40px 10px 24px`.
 * - dark tone   background: linear-gradient(110deg, #2fa79a 0%, #1d6259 100%)
 * - brand tone  background: linear-gradient(110deg, #4fd3c4 0%, #2fa79a 100%)
 * - label: 18px/23.4px w600 (lg) · 14px/18.2px w600 (sm), white
 * - icon: white circle, 31.4px (lg) / 22.2px (sm), inset 8px from the gradient
 *   pill's right edge — vertically centred exactly (47.4 - 31.4 = 16, 8 per side).
 *   A second identical circle sits at left:-32px rotated -45deg; on hover the
 *   visible one exits to the upper right and the hidden one flies in from the
 *   lower left.
 */
export function FxButton({
  href,
  children,
  tone = "dark",
  size = "lg",
  className,
}: FxButtonProps) {
  const isLg = size === "lg";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex shrink-0 items-center justify-center rounded-full",
        // lg sits inside a 6px translucent halo; sm has none.
        isLg && "bg-white/10 p-1.5",
        // Press feedback: the pill settles 1.5px down and 2.5% smaller. Both
        // directions are eased (easeOutQuint in, easeOutCubic back) and run long
        // enough to read as a cushion rather than a jump.
        "transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "active:translate-y-[1.5px] active:scale-[0.975] active:duration-[260ms] active:ease-[cubic-bezier(0.33,1,0.68,1)]",
        "motion-reduce:transition-none motion-reduce:active:translate-y-0 motion-reduce:active:scale-100",
        // The halo warms to the brand yellow as the pill does.
        isLg && "hover:bg-cuna-yellow/25",
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
        {/*
          Hover crossfades the pill from turquoise to the brand yellow. A second
          gradient layer is used rather than swapping `background-image`, which
          CSS cannot transition.
        */}
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
          {children}
        </span>

        {/*
          One white circle sits at right: 8px. The live site parks a second,
          identical circle at left: -32px rotated -45deg (clipped away by the
          pill's overflow) and swaps the two on hover, so the arrow appears to
          fly out to the upper right while a fresh one flies in from the lower
          left. Clipping the swap inside the circle reproduces that exactly
          without needing to know the pill's width.
        */}
        <span
          aria-hidden
          className={cn(
            "absolute top-2 right-2 z-[1] grid place-items-center overflow-hidden rounded-full bg-white",
            isLg ? "size-[31.4px]" : "size-[22.2px]",
          )}
        >
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
        </span>
      </span>
    </Link>
  );
}
