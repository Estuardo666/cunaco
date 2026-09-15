import { cn } from "@/lib/utils";
import { CunaPanelScreen, type CunaScreenVariant } from "./CunaPanelScreen";

/** Design size of a screen — every phone renders at this size and is scaled. */
const SCREEN_WIDTH = 200;
const SCREEN_HEIGHT = 400;
/** Bezel width on each side (`border-[8px]` below). */
const BEZEL = 8;

/**
 * A real Cuna&Co. screen inside a device frame.
 *
 * The template shipped stock product screenshots in these slots. The app repo
 * ships no captures, so each screen is rebuilt from its Kotlin source (see
 * `CunaPanelScreen`) and framed here instead. The screen is always laid out at
 * 200 x 400 and scaled as a whole, so the app's type and spacing keep their
 * proportions at every size instead of reflowing into a narrow column.
 *
 * Sizing is responsive: `height` is the desktop device height, and the phone
 * steps down at the two breakpoints in `.fx-phone` (globals.css) so a pair of
 * phones still fits a 375px screen. The frame, its radius and the screen all
 * derive from one unitless scale, `--ph-s`.
 */
export function CunaPhone({
  variant,
  height,
  baseRatio = 0.85,
  mdRatio = 0.92,
  className,
}: {
  variant: CunaScreenVariant;
  /** Device height in px at >= 1280px; smaller viewports scale down from it. */
  height: number;
  /** Share of `height` used below 768px — drop it where two phones share a row. */
  baseRatio?: number;
  /** Share of `height` used between 768px and 1280px. */
  mdRatio?: number;
  className?: string;
}) {
  const scale = height / SCREEN_HEIGHT;

  return (
    <div
      className={cn(
        "fx-phone shrink-0 overflow-hidden border-[8px] border-cuna-teal-dark bg-cuna-teal-dark",
        "shadow-[0_18px_44px_rgba(18,64,59,0.22)]",
        className,
      )}
      style={{
        ["--ph-s-base" as string]: scale * baseRatio,
        ["--ph-s-md" as string]: scale * mdRatio,
        ["--ph-s-xl" as string]: scale,
        height: `calc(${SCREEN_HEIGHT}px * var(--ph-s) + ${BEZEL * 2}px)`,
        width: `calc(${SCREEN_WIDTH}px * var(--ph-s) + ${BEZEL * 2}px)`,
        borderRadius: `calc(30px * var(--ph-s) + ${BEZEL}px)`,
      }}
    >
      <div
        className="overflow-hidden rounded-[22px]"
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          transform: "scale(var(--ph-s))",
          transformOrigin: "top left",
        }}
      >
        <CunaPanelScreen variant={variant} />
      </div>
    </div>
  );
}
