"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useId, useState } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";
import {
  FREEMIUM_COUNT,
  FREEMIUM_GROUPS,
  PREMIUM_PRICE,
  PREMIUM_PRODUCTS,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";

/** Free-card fill — the same 132deg ramp the home page gives its lead card. */
const FREE_GRADIENT = "linear-gradient(132deg, #2fa79a 0%, #1d6259 100%)";

/* ------------------------------------------------------------------ */
/* Marks                                                               */
/* ------------------------------------------------------------------ */

/**
 * The site's downloaded tick is a teal chevron that all but disappears on the
 * dark card, so both marks are drawn inline in `currentColor` instead.
 */
function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={cn("size-3", className)}>
      <path
        d="M1.5 6.2 4.4 9.1 10.5 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden className={cn("size-3", className)}>
      <path d="M3 6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison data                                                     */
/* ------------------------------------------------------------------ */

interface ComparisonItem {
  readonly name: string;
  readonly detail?: string;
}

interface ComparisonRow {
  readonly id: string;
  readonly label: string;
  readonly note: string;
  readonly free: boolean;
  readonly items: readonly ComparisonItem[];
}

/**
 * The comparison, one row per feature group.
 *
 * Premium is additive — the billing flow flips an account role, it does not
 * take anything away — so its column is `true` on every row by construction.
 * That is the whole point of showing a table: the two plans differ on exactly
 * one row, and a reader can verify that instead of being told it.
 *
 * Each row carries its own contents so the `+` can open them in place. Nothing
 * is duplicated into a separate catalogue block below.
 */
const COMPARISON: readonly ComparisonRow[] = [
  ...FREEMIUM_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    note: `${group.features.length} ${group.features.length === 1 ? "función" : "funciones"}`,
    free: true,
    items: group.features.map((feature) => ({
      name: feature.name,
      detail: feature.detail,
    })),
  })),
  {
    id: "talleres",
    label: "Talleres educativos",
    note: `${PREMIUM_PRODUCTS.length} talleres`,
    free: false,
    items: PREMIUM_PRODUCTS.map((product) => ({ name: product })),
  },
];

/** Risk reversal — each line is a reason downloading cannot cost you anything. */
const NO_RISK: readonly string[] = [
  "No caduca ni se bloquea",
  "Sin tarjeta de crédito",
  "Todo esto sigue gratis aunque nunca pases a Premium",
];

/** What paying actually buys, said in the card rather than in a footnote. */
const PREMIUM_POINTS: readonly string[] = [
  `Los ${FREEMIUM_COUNT} registros del plan gratuito, intactos`,
  `${PREMIUM_PRODUCTS.length} talleres escritos por la Dra. Sánchez`,
  "Se cancela desde Google Play cuando quieras",
];

/* ------------------------------------------------------------------ */
/* Comparison row                                                      */
/* ------------------------------------------------------------------ */

/** Column widths, shared by the header and every row so the marks stay aligned. */
const ROW_GRID = "grid grid-cols-[1fr_56px_56px] md:grid-cols-[1fr_120px_120px]";

function Mark({ included }: { included: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full",
        included ? "bg-cuna-teal/15 text-cuna-teal" : "bg-[#f4f1ec] text-[#b9c1c0]",
      )}
    >
      {included ? <Tick /> : <Dash />}
      <span className="sr-only">{included ? "Incluido" : "No incluido"}</span>
    </span>
  );
}

function ComparisonRowItem({ row }: { row: ComparisonRow }) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const panelId = `plan-panel-${row.id}-${reactId}`;

  const toggle = useCallback(() => setOpen((value) => !value), []);

  return (
    <li className="border-b border-[#f2ede5] last:border-b-0">
      {/*
        The whole row is the control, not just the disc: an 18px target is far
        too small to be the only way in, and there is nothing else in the row
        to click. The disc is an affordance, not the hit area.
      */}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          ROW_GRID,
          "w-full items-center gap-2 px-5 py-[14px] text-left transition-colors duration-200 ease-out hover:bg-[#fdfbf7] md:px-7",
        )}
      >
        <span className="min-w-0">
          <span className="block text-[15px] leading-[20px] font-semibold text-[#1d6259]">
            {row.label}
          </span>
          {/*
            The disc sits beside the count rather than in a column of its own:
            next to "5 funciones" it reads as "there is more of this", which is
            what it does. Parked at the far right of an 860px row it read as a
            fourth, unlabelled column.
          */}
          <span className="flex items-center gap-[6px] text-[13px] leading-[18px] font-medium text-[#8b9594]">
            {row.note}
            <span
              aria-hidden
              className={cn(
                "relative grid size-[18px] shrink-0 place-items-center rounded-full transition-[background-color,rotate] duration-300 ease-out motion-reduce:transition-none",
                open ? "rotate-90 bg-[#1d6259]" : "rotate-0 bg-[#f0ece4]",
              )}
            >
              {/*
                Plus → minus. The disc turns 90deg, so the bar that must survive
                is the VERTICAL one: a quarter turn lands it horizontal. Fading
                the other way around leaves an upright stroke, which does not
                read as "minus".
              */}
              <span
                className={cn(
                  "absolute h-[1.5px] w-[9px] rounded-full bg-[#1d6259] transition-opacity duration-300 ease-out motion-reduce:transition-none",
                  open ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute h-[9px] w-[1.5px] rounded-full transition-colors duration-300 ease-out motion-reduce:transition-none",
                  open ? "bg-white" : "bg-[#1d6259]",
                )}
              />
            </span>
          </span>
        </span>

        <span className="flex justify-center">
          <Mark included={row.free} />
        </span>
        <span className="flex justify-center">
          <Mark included />
        </span>
      </button>

      {/*
        `grid-template-rows` 0fr → 1fr rather than a measured height, matching
        `FaqAccordion`: rows of any length open in the same 300ms with nothing
        measured in JavaScript.
      */}
      <div
        id={panelId}
        role="region"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-[10px] px-5 pt-1 pb-5 md:px-7 md:pb-6">
            {row.items.map((item) => (
              <li key={item.name} className="flex items-start gap-[10px]">
                <span className="mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-cuna-teal/15 text-cuna-teal">
                  <Tick className="size-[10px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] leading-[20px] font-semibold text-[#1d6259]">
                    {item.name}
                  </span>
                  {item.detail ? (
                    <span className="block text-[13px] leading-[19px] font-medium text-[#5e6968]">
                      {item.detail}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

/**
 * The two plans.
 *
 * Two deliberate inversions of the cloned template:
 *
 * 1. **The free card is the dominant one.** Freemium is where every visitor
 *    starts and it is the plan most of them will stay on, so it gets the dark
 *    ground and the highest-contrast button. Premium is presented, not pushed.
 * 2. **The feature lists live inside the comparison, not beside it.** Two
 *    stacked lists ask the reader to hold one column in memory while reading
 *    the other. Here each row states the difference at a glance and opens on
 *    demand for the detail, so the cards stay short.
 *
 * Everything is capped at 860px rather than the 1260px container: a pricing
 * decision is a short read, and a 588px-wide column of body copy is not.
 */
export function PlansSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="planes"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col items-center gap-10 px-[30px] lg:gap-14">
        <h2
          className={cn(
            "w-full max-w-[640px] text-center text-[28px] leading-[34px] font-semibold tracking-[-0.5px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[44px] xl:leading-[52px]",
            revealBase,
            revealState,
          )}
        >
          Empieza gratis. Sube a Premium si quieres los talleres
        </h2>

        {/* ---------------- The two cards ---------------- */}
        <div className="grid w-full max-w-[860px] grid-cols-1 items-stretch gap-5 md:grid-cols-2">
          {/* -------- Freemium -------- */}
          <article
            className={cn(
              "relative flex flex-col gap-6 overflow-clip rounded-[24px] p-7 md:p-8",
              revealBase,
              revealState,
            )}
            style={{ background: FREE_GRADIENT }}
          >
            {/*
              The mascots are the brand's strongest asset (SITE_PLAN §6) and one
              earns its place here: a pricing card is where a visitor decides
              whether to trust the thing, and a face does more for that than a
              fourth bullet would.
            */}
            <Image
              src={cunaAsset("mascota_juntos.webp")}
              alt=""
              aria-hidden
              width={791}
              height={809}
              className="pointer-events-none absolute -right-8 -bottom-10 w-[150px] opacity-30 md:w-[170px]"
            />

            <header className="relative flex flex-col gap-[6px]">
              <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[12px] leading-[16px] font-semibold tracking-[0.5px] text-white uppercase">
                Empieza aquí
              </span>
              <p className="mt-2 text-[40px] leading-[44px] font-semibold text-white">
                Gratis
              </p>
              <p className="text-[15px] leading-[21px] font-medium text-[#aeebe4]">
                Las {FREEMIUM_COUNT} funciones de la app, sin plazo.
              </p>
            </header>

            <ul className="relative flex flex-col gap-[10px]">
              {NO_RISK.map((line) => (
                <li key={line} className="flex items-start gap-[10px]">
                  <span className="mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                    <Tick className="size-[10px]" />
                  </span>
                  <span className="text-[14px] leading-[20px] font-medium text-white">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto flex flex-col items-start gap-3 pt-2">
              {/*
                A white pill, not the brand gradient: the gradient is teal on a
                teal card, which reads as decoration rather than as the primary
                action on the page.
              */}
              <FxGhostButton href="/producto" className="w-full [&>span]:w-full">
                Descargar gratis
              </FxGhostButton>
              <Link
                href="/funciones"
                className="text-[13px] leading-[18px] font-semibold text-[#aeebe4] underline underline-offset-[3px] transition-colors duration-200 hover:text-white"
              >
                Ver las {FREEMIUM_COUNT} funciones
              </Link>
            </div>
          </article>

          {/* -------- Premium -------- */}
          <article
            className={cn(
              "relative flex flex-col gap-6 overflow-clip rounded-[24px] bg-white p-7 shadow-[0_0_0_2px_rgba(227,220,209,0.7)] delay-100 md:p-8",
              revealBase,
              revealState,
            )}
          >
            <Image
              src={cunaAsset("mascota_ok.webp")}
              alt=""
              aria-hidden
              width={791}
              height={809}
              className="pointer-events-none absolute -right-8 -bottom-10 w-[150px] opacity-20 md:w-[170px]"
            />

            <header className="relative flex flex-col gap-[6px]">
              <span className="w-fit rounded-full bg-[#f7f3ed] px-3 py-1 text-[12px] leading-[16px] font-semibold tracking-[0.5px] text-[#5e6968] uppercase">
                Premium
              </span>
              <p className="mt-2 flex items-baseline gap-2 text-[40px] leading-[44px] font-semibold text-[#1d6259]">
                {PREMIUM_PRICE.amount}
                <span className="text-[15px] leading-[21px] font-medium text-[#8b9594]">
                  {PREMIUM_PRICE.period}
                </span>
              </p>
              <p className="text-[15px] leading-[21px] font-medium text-[#5e6968]">
                Todo lo gratis, más los {PREMIUM_PRODUCTS.length} talleres.
              </p>
            </header>

            <ul className="relative flex flex-col gap-[10px]">
              {PREMIUM_POINTS.map((line) => (
                <li key={line} className="flex items-start gap-[10px]">
                  <span className="mt-[3px] flex size-[18px] shrink-0 items-center justify-center rounded-full bg-cuna-teal/15 text-cuna-teal">
                    <Tick className="size-[10px]" />
                  </span>
                  <span className="text-[14px] leading-[20px] font-medium text-[#5e6968]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>

            <div className="relative mt-auto flex flex-col items-start gap-3 pt-2">
              <FxGhostButton href="/producto" tone="dark" className="w-full [&>span]:w-full">
                Activar Premium
              </FxGhostButton>
              <p className="text-[13px] leading-[18px] font-medium text-[#5e6968]">
                Se activa dentro de la app, desde Google Play.
              </p>
            </div>
          </article>
        </div>

        {/* ---------------- Comparison ---------------- */}
        <div
          className={cn(
            "w-full max-w-[860px] overflow-clip rounded-[24px] bg-white shadow-[0_0_0_2px_rgba(227,220,209,0.7)]",
            revealBase,
            revealState,
          )}
        >
          <div
            className={cn(
              ROW_GRID,
              "items-center gap-2 border-b border-[#ece6dd] px-5 py-4 md:px-7",
            )}
          >
            <span className="text-[13px] leading-[18px] font-semibold text-[#5e6968]">
              Qué incluye
            </span>
            <span className="text-center text-[13px] leading-[18px] font-semibold text-[#1d6259]">
              Gratis
            </span>
            <span className="text-center text-[13px] leading-[18px] font-semibold text-[#1d6259]">
              Premium
            </span>
          </div>

          <ul className="flex flex-col">
            {COMPARISON.map((row) => (
              <ComparisonRowItem key={row.id} row={row} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
