import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Tones                                                               */
/* ------------------------------------------------------------------ */

export type HeroTone = "turquesa" | "ambar" | "aqua" | "profundo" | "duo";

interface ChipStyle {
  readonly bg: string;
  readonly value: string;
  readonly label: string;
}

interface ToneStyle {
  /** Blob fills, back to front. */
  readonly blobs: readonly string[];
  readonly eyebrowBg: string;
  readonly eyebrowText: string;
  /** One palette per chip — they are the page's colour, not a white pill. */
  readonly chips: readonly [ChipStyle, ChipStyle];
}

/**
 * One tone per internal page.
 *
 * They are siblings, not clones: every hero is built from the same brand tokens
 * (`--cuna-*`) but lands on a different pair, so a visitor moving between pages
 * can tell them apart before reading a word. Nothing here is a new colour — the
 * palette is the one in the brand manual.
 *
 * There is no panel any more. The mascot stands on the page itself and the only
 * colour behind it is a field of blurred blobs, so nothing on these heroes is a
 * rectangle of gradient.
 */
const TONES: Record<HeroTone, ToneStyle> = {
  // /producto — the app itself, in the brand's primary turquoise.
  turquesa: {
    blobs: ["#4fd3c4", "#ffe599", "#aeebe4"],
    eyebrowBg: "bg-cuna-aqua",
    eyebrowText: "text-[#12403b]",
    chips: [
      { bg: "bg-cuna-teal-deep", value: "text-white", label: "text-cuna-aqua" },
      { bg: "bg-cuna-yellow", value: "text-[#5c3d00]", label: "text-[#8a6200]" },
    ],
  },
  // /nosotros — the founder's page gets the warm half of the palette.
  ambar: {
    blobs: ["#ffbd35", "#aeebe4", "#ffe599"],
    eyebrowBg: "bg-cuna-yellow-soft",
    eyebrowText: "text-[#7a5200]",
    chips: [
      { bg: "bg-cuna-yellow", value: "text-[#5c3d00]", label: "text-[#8a6200]" },
      { bg: "bg-cuna-teal-deep", value: "text-white", label: "text-cuna-aqua" },
    ],
  },
  // /preguntas-frecuentes — the calmest tone, for the page people arrive at worried.
  aqua: {
    blobs: ["#aeebe4", "#ffe599", "#4fd3c4"],
    eyebrowBg: "bg-cuna-aqua",
    eyebrowText: "text-[#12403b]",
    chips: [
      { bg: "bg-cuna-teal-deep", value: "text-white", label: "text-cuna-aqua" },
      { bg: "bg-cuna-aqua", value: "text-[#12403b]", label: "text-cuna-teal-deep" },
    ],
  },
  // /funciones — the catalogue is where both halves of the app meet, so its
  // blobs run the full brand ramp and its chips take one colour each.
  duo: {
    blobs: ["#4fd3c4", "#ffbd35", "#aeebe4"],
    eyebrowBg: "bg-cuna-aqua",
    eyebrowText: "text-[#12403b]",
    chips: [
      { bg: "bg-cuna-teal-deep", value: "text-white", label: "text-cuna-aqua" },
      { bg: "bg-cuna-yellow", value: "text-[#5c3d00]", label: "text-[#8a6200]" },
    ],
  },
  // /precios — free first, so the free chip is the loud one.
  profundo: {
    blobs: ["#4fd3c4", "#aeebe4", "#ffbd35"],
    eyebrowBg: "bg-cuna-aqua",
    eyebrowText: "text-[#12403b]",
    chips: [
      { bg: "bg-cuna-teal-deep", value: "text-white", label: "text-cuna-aqua" },
      { bg: "bg-white", value: "text-[#1d6259]", label: "text-cuna-teal-deep" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface HeroChip {
  /** The fact. Short — a number, a platform, a place. */
  readonly value: string;
  /** What the fact is. */
  readonly label: string;
  /** Optional icon filename from `public/brand/cunaco`. */
  readonly icon?: string;
}

interface HeroShellProps {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  /** Two lines at most. If it needs three, it belongs in the page, not the hero. */
  readonly lead: string;
  readonly tone: HeroTone;
  /** Filename in `public/brand/cunaco`. Ignored when `visual` is given. */
  readonly mascot?: string;
  /**
   * Replaces the mascot. `/producto` uses it for the three phone mockups — the
   * fork between the pregnancy and newborn flows is the truest thing about that
   * page, and a mascot would say less than the screens do.
   */
  readonly visual?: ReactNode;
  /** Widens the figure column for visuals that need the room (the phone trio). */
  readonly wide?: boolean;
  /** One or two verified facts, pinned around the figure. */
  readonly chips: readonly HeroChip[];
  /** Buttons or anchor links, under the lead. */
  readonly actions?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Blob field                                                          */
/* ------------------------------------------------------------------ */

/**
 * Hand-placed so the mascot always lands in the gap between them, and sized
 * large enough that at `blur-3xl` they read as light rather than as shapes.
 */
const BLOB_LAYOUT = [
  { className: "top-0 -left-4 size-[240px]", duration: "13s", delay: "0ms" },
  { className: "-right-6 bottom-4 size-[200px]", duration: "11s", delay: "1200ms" },
  { className: "top-1/4 right-1/4 size-[150px]", duration: "15s", delay: "600ms" },
] as const;

/* ------------------------------------------------------------------ */
/* Shell                                                               */
/* ------------------------------------------------------------------ */

/**
 * The shared hero for every internal page.
 *
 * The four pages used to run four copies of the same block: an eyebrow, a
 * headline, a long grey paragraph and a flat cream card. It read as a document,
 * not as a product built around a cast of characters.
 *
 * Now the mascot stands on the page with a field of drifting light behind it
 * and one or two chips carrying a fact that page can actually back up. Mobile
 * centres everything and only splits into two columns at `lg`.
 */
export function HeroShell({
  id,
  eyebrow,
  title,
  lead,
  tone,
  mascot,
  visual,
  wide = false,
  chips,
  actions,
}: HeroShellProps) {
  const t = TONES[tone];

  return (
    <section
      id={id}
      className="flex w-full flex-col items-center pt-[124px] pb-[60px] lg:pt-[180px] lg:pb-[100px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center xl:gap-[70px]">
          {/* ---------- Text ---------- */}
          <div className="flex w-full flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
            <span
              className={cn(
                "fx-rise inline-block rounded-full px-4 py-[6px] text-[12px] leading-[16px] font-semibold tracking-[0.6px] uppercase",
                t.eyebrowBg,
                t.eyebrowText,
              )}
            >
              {eyebrow}
            </span>

            <h1
              className="fx-rise mt-4 w-full font-cuna-display text-[34px] leading-[40px] font-semibold tracking-[-1px] text-balance text-[#1d6259] md:text-[46px] md:leading-[54px] xl:text-[58px] xl:leading-[66px]"
              style={{ "--fx-rise-delay": "70ms" } as CSSProperties}
            >
              {title}
            </h1>

            <p
              className="fx-rise mt-4 max-w-[440px] text-[16px] leading-[24px] font-medium text-pretty text-[#5e6968] xl:text-[18px] xl:leading-[27px]"
              style={{ "--fx-rise-delay": "140ms" } as CSSProperties}
            >
              {lead}
            </p>

            {actions ? (
              <div
                className="fx-rise mt-7 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4"
                style={{ "--fx-rise-delay": "210ms" } as CSSProperties}
              >
                {actions}
              </div>
            ) : null}
          </div>

          {/* ---------- Figure ---------- */}
          <div
            className={cn(
              "fx-rise relative flex w-full shrink-0 items-end justify-center",
              wide
                ? "max-w-[560px] lg:h-[430px] lg:w-[520px] xl:h-[460px] xl:w-[560px]"
                : "max-w-[420px] lg:h-[400px] lg:w-[440px] xl:h-[430px] xl:w-[480px]",
            )}
            style={{ "--fx-rise-delay": "280ms" } as CSSProperties}
          >
            {/* Ambient light. No panel, no edges — just colour behind the figure. */}
            {BLOB_LAYOUT.map((blob, index) => (
              <span
                key={blob.className}
                aria-hidden
                className={cn(
                  "fx-drift pointer-events-none absolute rounded-full opacity-55 blur-3xl",
                  blob.className,
                )}
                style={
                  {
                    backgroundColor: t.blobs[index % t.blobs.length],
                    "--fx-drift-duration": blob.duration,
                    "--fx-drift-delay": blob.delay,
                  } as CSSProperties
                }
              />
            ))}

            {visual ? (
              <div className="relative flex w-full items-end justify-center">{visual}</div>
            ) : mascot ? (
              <Image
                src={cunaAsset(mascot)}
                alt=""
                aria-hidden
                width={791}
                height={809}
                priority
                className="fx-float relative w-[78%] drop-shadow-[0_22px_32px_rgba(18,64,59,0.22)] sm:w-[66%] lg:w-[80%]"
              />
            ) : null}

            {/*
              The chips are the signature of these heroes: each carries a fact
              the page can back up — a platform, a price, a limit — and each
              takes one of the tone's own colours rather than a neutral white
              pill, so the fact is what you see first.
            */}
            {chips.slice(0, 2).map((chip, index) => {
              const style = t.chips[index] ?? t.chips[0];

              return (
                <span
                  key={chip.value}
                  className={cn(
                    "absolute z-10 flex max-w-[52%] items-center gap-[10px] rounded-2xl px-[14px] py-[9px] shadow-[0_12px_26px_-12px_rgba(18,64,59,0.55)]",
                    style.bg,
                    index === 0 ? "top-2 left-0" : "right-0 bottom-6",
                  )}
                >
                  {chip.icon ? (
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/25">
                      <Image
                        src={cunaAsset(chip.icon)}
                        alt=""
                        aria-hidden
                        width={80}
                        height={80}
                        className="size-5 object-contain"
                      />
                    </span>
                  ) : null}

                  <span className="flex min-w-0 flex-col text-left">
                    <span
                      className={cn(
                        "font-cuna-display text-[16px] leading-[20px] font-semibold",
                        style.value,
                      )}
                    >
                      {chip.value}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] leading-[14px] font-semibold tracking-[0.5px] uppercase",
                        style.label,
                      )}
                    >
                      {chip.label}
                    </span>
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
