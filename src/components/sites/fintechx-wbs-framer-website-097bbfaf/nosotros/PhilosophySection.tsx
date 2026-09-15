"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

interface Principle {
  readonly title: string;
  readonly body: string;
  readonly icon: string;
}

const PRINCIPLES: readonly Principle[] = [
  {
    title: "Crianza respetuosa",
    body: "Acompañar el ritmo de cada bebé y de cada mamá. La app registra y sugiere; nunca regaña ni compara con un ideal.",
    icon: "mascota_juntos.webp",
  },
  {
    title: "Evidencia antes que opinión",
    body: "Las curvas de crecimiento son las oficiales de la OMS y el contenido lo escribe una pediatra en ejercicio, no un algoritmo.",
    icon: "icono_app_perimetro.webp",
  },
  {
    title: "Acompañar, no reemplazar",
    body: "Cuna&Co. resuelve las dudas del día a día y te prepara para la consulta. El control pediátrico sigue siendo con tu pediatra.",
    icon: "icono_app_pediatra.webp",
  },
];

export function PhilosophySection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="filosofia"
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
              Cómo pensamos
            </span>
          </div>

          <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
            Tres cosas que no negociamos
          </h2>

          <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
            Son las reglas con las que se decide qué entra en la app y qué no.
          </p>
        </div>

        {/* ---------- Cards ---------- */}
        <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className={cn(
                "flex flex-col gap-5 rounded-[24px] bg-white p-6 md:rounded-[30px] md:p-[30px]",
                revealBase,
                revealState,
              )}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-[#f7f3ed]">
                <Image
                  src={cunaAsset(principle.icon)}
                  alt=""
                  width={72}
                  height={72}
                  className="size-8 object-contain"
                />
              </span>

              <div className="flex flex-col gap-2">
                <h3 className="text-[20px] leading-[26px] font-semibold text-[#1d6259]">
                  {principle.title}
                </h3>
                <p className="text-[16px] leading-[22px] font-medium text-[#5e6968]">
                  {principle.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
