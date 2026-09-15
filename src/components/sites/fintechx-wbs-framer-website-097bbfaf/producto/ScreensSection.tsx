"use client";

import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import type { CunaScreenVariant } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPanelScreen";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

interface ScreenBlock {
  readonly variant: CunaScreenVariant;
  /** The screen's real title inside the app — not a marketing rename. */
  readonly screenName: string;
  readonly title: string;
  readonly body: string;
  readonly notes: readonly string[];
}

const BLOCKS: readonly ScreenBlock[] = [
  {
    variant: "panel",
    screenName: "Panel",
    title: "El día del bebé cabe en una pantalla",
    body: "Lactancia, siestas, pañal y medicinas se registran desde el mismo panel. No hay que recordar en qué sección estaba cada cosa.",
    notes: ["Registro en dos toques", "Todo el día a la vista"],
  },
  {
    variant: "lactancia",
    screenName: "Lactancia",
    title: "Una agenda que no depende de tu memoria",
    body: "Cada toma queda con su hora, su duración y su tipo. Cuando el pediatra pregunta cada cuánto come, la respuesta ya está escrita.",
    notes: ["Historial por día", "Listo para la consulta"],
  },
  {
    variant: "crecimiento",
    screenName: "Reporte de Crecimiento",
    title: "Las curvas oficiales de la OMS, no una aproximación",
    body: "Talla para la edad, peso para la edad, perímetro cefálico para la edad y peso para la talla. Los cuatro estándares que usa tu pediatra.",
    notes: ["4 curvas OMS", "Hitos del desarrollo"],
  },
  {
    variant: "vacunas",
    screenName: "Agregar Vacunas",
    title: "El esquema de vacunas, con recordatorio",
    body: "Registras la dosis aplicada y la app avisa cuándo toca la siguiente. El carnet deja de ser el único lugar donde vive esa información.",
    notes: ["Aviso antes de cada dosis", "Historial que no se pierde"],
  },
];

/**
 * The app, screen by screen.
 *
 * Blocks alternate sides so the eye has somewhere to go between them, and each
 * one is anchored by the actual screen rather than by an icon — this section is
 * the closest a visitor gets to using the app before installing it.
 */
export function ScreensSection() {
  const { ref, entered, revealBase, revealState } = useSectionReveal<HTMLElement>(0.05);

  return (
    <section
      ref={ref}
      id="pantallas"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col items-center gap-12 px-[30px] lg:gap-[90px]">
        {/* ---------- Header ---------- */}
        <div
          className={cn(
            "flex w-full max-w-[720px] flex-col items-center gap-[10px]",
            revealBase,
            revealState,
          )}
        >
          <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
            <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
              Por dentro
            </span>
          </div>

          <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
            Cuatro pantallas que vas a abrir todos los días
          </h2>

          <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
            Son las de la app real, con sus nombres reales.
          </p>
        </div>

        {/* ---------- Alternating blocks ---------- */}
        {BLOCKS.map((block, index) => {
          const flipped = index % 2 === 1;

          return (
            <div
              key={block.variant}
              className={cn(
                "flex w-full flex-col items-center gap-8 lg:gap-[70px]",
                flipped ? "lg:flex-row-reverse" : "lg:flex-row",
                revealBase,
                revealState,
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {/* Screen */}
              <div
                className={cn(
                  "flex w-full items-center justify-center rounded-[24px] bg-[#e8f8f6] px-6 py-10 md:rounded-[30px] lg:w-[480px] lg:shrink-0 lg:py-[60px]",
                  // The phone drifts in from the side it lives on, so the
                  // alternation is felt and not just seen.
                  "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:translate-x-0",
                  entered
                    ? "translate-x-0"
                    : flipped
                      ? "translate-x-4"
                      : "-translate-x-4",
                )}
              >
                <CunaPhone variant={block.variant} height={380} baseRatio={0.82} />
              </div>

              {/* Copy */}
              <div className="flex w-full flex-col items-start gap-5 lg:flex-1">
                <span className="rounded-full bg-white px-4 py-2 text-[13px] leading-[17px] font-semibold tracking-[0.02em] text-cuna-teal-deep uppercase">
                  {block.screenName}
                </span>

                <h3 className="text-[24px] leading-[30px] font-semibold text-[#1d6259] md:text-[32px] md:leading-[38px]">
                  {block.title}
                </h3>

                <p className="max-w-[520px] text-[16px] leading-[24px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[27px]">
                  {block.body}
                </p>

                <ul className="flex flex-wrap gap-[10px]">
                  {block.notes.map((note) => (
                    <li
                      key={note}
                      className="rounded-full bg-[#f7f3ed] px-4 py-2 text-[14px] leading-[18.2px] font-semibold text-[#1d6259]"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
