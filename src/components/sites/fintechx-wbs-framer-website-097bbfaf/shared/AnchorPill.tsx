import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { cn } from "@/lib/utils";

/**
 * Pill palette.
 *
 * A hero index of six or seven anchors in one colour reads as a block of text
 * with borders. Cycling the brand's four grounds makes each one findable —
 * a reader coming back to the page looks for "the yellow one", not for the
 * fourth item. The cycle is by position, so the colours stay stable between
 * visits as long as the list order does.
 */
const PILL_TONES = [
  { bg: "bg-cuna-aqua", text: "text-[#12403b]" },
  { bg: "bg-cuna-yellow-soft", text: "text-[#7a5200]" },
  { bg: "bg-[#cdf1eb]", text: "text-[#1d6259]" },
  { bg: "bg-[#ffeab8]", text: "text-[#7a5200]" },
] as const;

interface AnchorPillProps {
  readonly href: string;
  readonly label: string;
  /** Filename in `public/brand/cunaco`. */
  readonly icon: string;
  /** Position in the list — picks the colour. */
  readonly index: number;
}

/**
 * A small, coloured jump link.
 *
 * Used for the category indexes in the `/funciones` and `/preguntas-frecuentes`
 * heroes. They are anchors, not filters, so the page stays navigable with
 * JavaScript off and every pill has a real destination on the same page.
 */
export function AnchorPill({ href, label, icon, index }: AnchorPillProps) {
  const tone = PILL_TONES[index % PILL_TONES.length];

  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-[6px] rounded-full py-[6px] pr-4 pl-3 text-[13px] leading-[17px] font-semibold transition-[transform,filter] duration-200 ease-out hover:brightness-[0.97] active:translate-y-[1px] motion-reduce:transition-none",
        tone.bg,
        tone.text,
      )}
    >
      {/*
        No disc behind the icon: several of these assets are near-white (the
        droplet, the tree), and a white circle made them disappear. On the
        pill's own tinted ground every one of them has an edge.
      */}
      <Image
        src={cunaAsset(icon)}
        alt=""
        aria-hidden
        width={80}
        height={80}
        className="size-[19px] shrink-0 object-contain"
      />
      {label}
    </a>
  );
}
