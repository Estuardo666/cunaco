import Link from "next/link";
import { cn } from "@/lib/utils";

export type FxGhostButtonTone = "light" | "dark";

interface FxGhostButtonProps {
  href: string;
  children: string;
  /** `light` = white pill with dark label (hero). `dark` = #1d6259 pill with white label (overview). */
  tone?: FxGhostButtonTone;
  className?: string;
}

/**
 * Secondary pill button.
 *
 * Live values (getComputedStyle, verified with a real pointer hover):
 * - rest:  background #fff, label color #1d6259
 * - hover: background #1d6259, label color #fff
 * - radius 100px, padding 18px 44px, height 59px, overflow clip
 * - label 18px / 23.4px, weight 600
 *
 * The live DOM renders the label twice ("Default Title" / "Hover Title") as a
 * Framer variant artifact; only the first copy is ever visible, and neither one
 * moves on hover, so a single label is the faithful equivalent.
 */
export function FxGhostButton({
  href,
  children,
  tone = "light",
  className,
}: FxGhostButtonProps) {
  const isDark = tone === "dark";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-[59px] shrink-0 items-center justify-center gap-[14px]",
        "overflow-clip rounded-full px-11",
        // Hover fills with the brand turquoise (the original filled with near
        // black, which is not a Cuna&Co. colour). The press uses exactly the
        // same cushioned curve and timing as FxButton, so the two pills feel
        // like one control; the colour is given its own shorter duration so the
        // hover fill does not lag behind the pointer.
        "transition-[transform,background-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        "[transition-duration:420ms,200ms,200ms]",
        "hover:bg-cuna-teal hover:shadow-[0_8px_16px_0_rgba(47,167,154,0.35)]",
        "active:translate-y-[1.5px] active:scale-[0.975] active:[transition-duration:260ms,200ms,200ms] active:ease-[cubic-bezier(0.33,1,0.68,1)]",
        "motion-reduce:transition-none motion-reduce:active:translate-y-0 motion-reduce:active:scale-100",
        isDark ? "bg-[#1d6259]" : "bg-white",
        className,
      )}
    >
      <span
        className={cn(
          "text-[18px] leading-[23.4px] font-semibold transition-colors duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-white motion-reduce:transition-none",
          isDark ? "text-white" : "text-[#1d6259]",
        )}
      >
        {children}
      </span>
    </Link>
  );
}
