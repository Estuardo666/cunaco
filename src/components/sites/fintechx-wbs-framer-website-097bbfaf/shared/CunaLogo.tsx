import Image from "next/image";

import { cunaAsset } from "./assets";

/** Natural sizes of the two halves cropped out of the brand-kit lockup. */
const MARK = { width: 238, height: 419 };
const WORDMARK = { width: 910, height: 157 };

/**
 * Cuna&Co. horizontal lockup.
 *
 * The kit only ships the stacked lockup (mark over wordmark), which is far too
 * tall for a 52-58px navbar, so the two halves are cropped apart and re-laid
 * side by side here. Both stay as images: the wordmark is drawn in Helvetica
 * Rounded Bold, which is not web-licensed, so it cannot be re-set as live text
 * (SITE_PLAN §6 / open question 0).
 *
 * `height` is the lockup's cap height in px; widths are derived from it so the
 * aspect ratio never breaks.
 */
export function CunaLogo({
  className,
  height = 32,
}: {
  className?: string;
  height?: number;
}) {
  const wordmarkHeight = Math.round(height * 0.58);

  return (
    <span className={`flex items-center gap-[0.45em] ${className ?? ""}`}>
      <Image
        src={cunaAsset("logo_mark.webp")}
        alt=""
        width={Math.round((height * MARK.width) / MARK.height)}
        height={height}
        priority
      />
      <Image
        src={cunaAsset("logo_wordmark.webp")}
        alt="Cuna&Co."
        width={Math.round((wordmarkHeight * WORDMARK.width) / WORDMARK.height)}
        height={wordmarkHeight}
        priority
      />
    </span>
  );
}
