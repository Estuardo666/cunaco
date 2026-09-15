"use client";

import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

interface Step {
  readonly title: string;
  readonly body: string;
}

/**
 * Numbered because this genuinely is a sequence — you cannot pick a stage
 * before installing, or log a first entry before picking a stage. Numbers on
 * a set of parallel features would be decoration; here the order is the point.
 */
const STEPS: readonly Step[] = [
  {
    title: "Descarga la app",
    body: "Gratis en Android. La versión de iOS está en desarrollo.",
  },
  {
    title: "Elige tu etapa",
    body: "Embarazo o bebé nacido. La app se reordena alrededor de lo que elijas.",
  },
  {
    title: "Registra el primer dato",
    body: "Una contracción, una toma o una vacuna. Desde ahí ya tienes historial.",
  },
];

export function GetStartedSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="empezar"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col items-center gap-10 px-[30px] lg:gap-[60px]">
        {/* ---------- Header ---------- */}
        <div
          className={cn(
            "flex w-full max-w-[700px] flex-col items-center gap-[10px]",
            revealBase,
            revealState,
          )}
        >
          <div className="overflow-clip rounded-full bg-white px-5 py-[10px]">
            <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
              Cómo empezar
            </span>
          </div>

          <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
            Tres pasos y ya estás dentro
          </h2>
        </div>

        {/* ---------- Steps ---------- */}
        <ol className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "flex flex-col gap-4 rounded-[24px] bg-white p-6 md:rounded-[30px] md:p-8",
                revealBase,
                revealState,
              )}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full text-[18px] leading-none font-semibold text-white"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #4fd3c4 0%, #2fa79a 100%)",
                }}
              >
                {index + 1}
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] leading-[26px] font-semibold text-[#1d6259]">
                  {step.title}
                </h3>
                <p className="text-[16px] leading-[22px] font-medium text-[#5e6968]">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className={cn(revealBase, revealState)}>
          <FxButton href="/contacto" tone="dark" size="lg">
            Descargar gratis
          </FxButton>
        </div>
      </div>
    </section>
  );
}
