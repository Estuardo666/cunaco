"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import type { CunaScreenVariant } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPanelScreen";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

interface Flow {
  readonly id: string;
  readonly stage: string;
  readonly title: string;
  readonly body: string;
  readonly screen: CunaScreenVariant;
  readonly mascot: string;
  readonly features: readonly string[];
  /** Card ground — the two flows are told apart by colour, not by a label alone. */
  readonly background: string;
  readonly tint: string;
}

/**
 * The app's two products, named the way the app itself splits them
 * (`waiting` / `born`). Every feature listed is on the Freemium list in
 * SITE_PLAN §5 — nothing premium is mixed in, so no line here is a promise
 * that turns out to cost money.
 */
const FLOWS: readonly Flow[] = [
  {
    id: "embarazo",
    stage: "Camino 1",
    title: "Estoy embarazada",
    body: "La app se pone en modo cuenta regresiva: mide, recuerda y prepara lo que viene antes del parto.",
    screen: "contracciones",
    mascot: "mascota_thinking.webp",
    features: [
      "Contador de contracciones",
      "Checklist preparto",
      "Recordatorios de citas médicas",
      "Checklist de viaje",
    ],
    background: "#e8f8f6",
    tint: "#ffffff",
  },
  {
    id: "bebe",
    stage: "Camino 2",
    title: "Mi bebé ya nació",
    body: "El día del bebé pasa a ser el centro: lo que come, lo que duerme, lo que crece y lo que le toca.",
    screen: "panel",
    mascot: "mascota_juntos.webp",
    features: [
      "Agenda de lactancia",
      "Reporte de siestas y datos del pañal",
      "Curvas de crecimiento OMS",
      "Control de vacunación",
    ],
    background: "#fff6de",
    tint: "#ffffff",
  },
];

export function FlowsSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="flujos"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col items-center gap-10 px-[30px] lg:gap-[60px]">
        {/* ---------- Header ---------- */}
        <div
          className={cn(
            "flex w-full max-w-[720px] flex-col items-center gap-[10px]",
            revealBase,
            revealState,
          )}
        >
          <div className="overflow-clip rounded-full bg-white px-5 py-[10px]">
            <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
              Los dos flujos
            </span>
          </div>

          <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
            Eliges tu etapa una vez, al abrir la app
          </h2>

          <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
            No es un menú con todo dentro. Es una app que se queda solo con lo que te
            sirve hoy.
          </p>
        </div>

        {/* ---------- The two cards ---------- */}
        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {FLOWS.map((flow, index) => (
            <article
              key={flow.id}
              className={cn(
                "relative flex flex-col gap-8 overflow-clip rounded-[24px] p-6 md:rounded-[30px] md:p-10",
                revealBase,
                revealState,
              )}
              style={{
                backgroundColor: flow.background,
                transitionDelay: `${index * 80}ms`,
              }}
            >
              <Image
                src={cunaAsset(flow.mascot)}
                alt=""
                aria-hidden
                width={360}
                height={360}
                className="pointer-events-none absolute -top-6 -right-6 w-[120px] opacity-30 md:w-[150px]"
              />

              <div className="relative flex flex-col gap-[10px]">
                <span className="text-[14px] leading-[18.2px] font-semibold text-cuna-teal-deep">
                  {flow.stage}
                </span>
                <h3 className="text-[24px] leading-[30px] font-semibold text-[#1d6259] md:text-[28px] md:leading-[34px]">
                  {flow.title}
                </h3>
                <p className="max-w-[420px] text-[16px] leading-[22px] font-medium text-[#5e6968]">
                  {flow.body}
                </p>
              </div>

              <div className="relative flex flex-col items-center gap-8 sm:flex-row sm:items-end">
                <CunaPhone
                  variant={flow.screen}
                  height={300}
                  baseRatio={0.78}
                  mdRatio={0.8}
                />

                <ul className="flex w-full flex-col gap-[10px]">
                  {flow.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-[14px] px-4 py-3 text-[15px] leading-[20px] font-semibold text-[#1d6259]"
                      style={{ backgroundColor: flow.tint }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
