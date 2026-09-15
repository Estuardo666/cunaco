"use client";

import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/**
 * The four standards, named the way the WHO names them.
 *
 * Each one is a separate chart in the app (`born_grow_chart_details`,
 * `born_head_circumference_chart_details`, `born_height_weight_chart_details`,
 * `born_weight_chart_details`) — this is not one curve with four views, and
 * saying "curvas OMS" without listing them would let a reader assume less than
 * the app actually does.
 */
const CURVES: readonly { readonly name: string; readonly reads: string }[] = [
  { name: "Talla para la edad", reads: "Si está creciendo al ritmo de su edad." },
  { name: "Peso para la edad", reads: "Si el peso acompaña ese crecimiento." },
  {
    name: "Perímetro cefálico para la edad",
    reads: "La medida que el pediatra toma en cada control del primer año.",
  },
  { name: "Peso para la talla", reads: "La proporción entre las dos, no cada una por su lado." },
];

/**
 * The growth block.
 *
 * "Control de crecimiento OMS bebé" is this page's primary keyword
 * (SITE_PLAN §7), and it is also the function that resolves the loudest worry
 * a mother arrives with — whether the baby is growing well. Both reasons point
 * the same way: it gets a block of its own instead of a card in a grid.
 */
export function GrowthCurvesSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="curvas-oms"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center xl:gap-[70px]">
          {/* ---------- Copy + the four curves ---------- */}
          <div
            className={cn(
              "flex w-full flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left",
              revealBase,
              revealState,
            )}
          >
            <span className="rounded-full bg-white px-5 py-[10px] text-[13px] leading-[17px] font-semibold tracking-[0.6px] text-[#1d6259] uppercase">
              Crecimiento
            </span>

            <h2 className="mt-4 max-w-[520px] font-cuna-display text-[28px] leading-[34px] font-semibold tracking-[-0.5px] text-balance text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[42px] xl:leading-[50px]">
              Las curvas oficiales de la OMS, no una aproximación
            </h2>

            <p className="mt-4 max-w-[440px] text-[16px] leading-[24px] font-medium text-pretty text-[#5e6968] xl:text-[17px] xl:leading-[26px]">
              Los cuatro estándares que usa tu pediatra, trazados con cada medida que
              registras.
            </p>

            <ul className="mt-8 grid w-full grid-cols-1 gap-3 text-left sm:grid-cols-2">
              {CURVES.map((curve, index) => (
                <li
                  key={curve.name}
                  className="flex flex-col gap-1 rounded-[18px] bg-white p-5 shadow-[0_0_0_2px_rgba(227,220,209,0.7)]"
                >
                  {/*
                    The index is real information here: the app draws these four
                    charts and no others, so counting them is the claim.
                  */}
                  <span className="font-cuna-display text-[13px] leading-[17px] font-semibold text-cuna-teal-deep">
                    0{index + 1}
                  </span>
                  <span className="font-cuna-display text-[16px] leading-[21px] font-semibold text-[#1d6259]">
                    {curve.name}
                  </span>
                  <span className="text-[13px] leading-[19px] font-medium text-[#5e6968]">
                    {curve.reads}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------- The screen itself ---------- */}
          <div
            className={cn(
              "flex w-full shrink-0 justify-center delay-100 lg:w-[420px]",
              revealBase,
              revealState,
            )}
          >
            <CunaPhone variant="crecimiento" height={420} baseRatio={0.62} mdRatio={0.86} />
          </div>
        </div>
      </div>
    </section>
  );
}
