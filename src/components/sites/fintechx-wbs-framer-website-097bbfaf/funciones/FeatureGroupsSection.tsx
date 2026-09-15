"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import {
  FREEMIUM_GROUPS,
  type FeatureGroup,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/**
 * How each category is introduced.
 *
 * One line per group, written to say why the group exists rather than to
 * restate its name. These are the only sentences on this page that are not
 * taken from the catalogue, so they carry the argument: a mother does not
 * think in "features", she thinks in "the day", "is he growing", "the next
 * appointment".
 */
const GROUP_INTROS: Record<string, string> = {
  registros: "El día del bebé, anotado mientras pasa y no de memoria a la noche.",
  crecimiento: "Si va bien o no, medido contra los estándares oficiales de la OMS.",
  salud: "Vacunas, medicinas y consultas, para llegar al pediatra con todo escrito.",
  emergencia: "Qué mirar cuando algo no está bien, y cuándo ir a urgencias.",
  preparacion: "Lo que hay que tener listo, sin listas sueltas en las notas del celular.",
  bienestar: "El impacto del cuidado diario, calculado en vez de intuido.",
};

/**
 * One category = one block.
 *
 * The sticky header on the left and the card grid on the right reuse the
 * geometry of `/preguntas-frecuentes`, so the two long index pages of the site
 * read as the same component rather than as two designs. The header holds its
 * place under the fixed navbar while its own cards scroll past it.
 */
function GroupBlock({ group, index }: { group: FeatureGroup; index: number }) {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      id={group.id}
      // scroll-margin clears the fixed navbar when a hero chip jumps here.
      className="grid w-full scroll-mt-[110px] grid-cols-1 items-start gap-8 lg:grid-cols-[380px_1fr] lg:gap-x-[70px] lg:scroll-mt-[130px]"
    >
      {/* ---------- Header ---------- */}
      <div
        className={cn(
          "flex flex-col gap-[10px] lg:sticky lg:top-[130px]",
          revealBase,
          revealState,
        )}
      >
        <div className="flex size-14 items-center justify-center overflow-clip rounded-[18px] bg-white lg:size-16 lg:rounded-[20px]">
          <Image
            src={cunaAsset(group.icon)}
            alt=""
            aria-hidden
            width={160}
            height={160}
            className="size-9 object-contain lg:size-10"
          />
        </div>

        <h2 className="mt-2 font-cuna-display text-[26px] leading-[32px] font-semibold tracking-[-0.5px] text-[#1d6259] md:text-[32px] md:leading-[38px]">
          {group.label}
        </h2>

        <p className="max-w-[320px] text-[15px] leading-[22px] font-medium text-[#5e6968] md:text-[16px] md:leading-[24px]">
          {GROUP_INTROS[group.id]}
        </p>

        <p className="mt-1 text-[13px] leading-[18px] font-semibold tracking-[0.4px] text-cuna-teal-deep uppercase">
          {group.features.length}{" "}
          {group.features.length === 1 ? "función" : "funciones"} · gratis
        </p>
      </div>

      {/* ---------- Cards ---------- */}
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {group.features.map((feature, cardIndex) => (
          <li
            key={feature.name}
            className={cn(
              "flex flex-col gap-2 rounded-[20px] bg-white p-6 shadow-[0_0_0_2px_rgba(227,220,209,0.7)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-[3px] hover:shadow-[0_18px_36px_-20px_rgba(29,98,89,0.45)] motion-reduce:transition-none motion-reduce:hover:translate-y-0",
              revealBase,
              revealState,
            )}
            // Cards arrive in reading order, 60ms apart, continuing the wave
            // the hero starts rather than all landing at once.
            style={{ transitionDelay: `${(index % 2) * 40 + cardIndex * 60}ms` }}
          >
            <h3 className="font-cuna-display text-[17px] leading-[23px] font-semibold text-[#1d6259]">
              {feature.name}
            </h3>
            <p className="text-[14px] leading-[21px] font-medium text-[#5e6968]">
              {feature.detail}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The catalogue.
 *
 * Grouped, not a flat list (SITE_PLAN §3): sixteen cards in one column would
 * be a spreadsheet. The groups are the app's own — `Registros`, `Desarrollo`,
 * `Bebé` and the side menu's `Emergencia` — so what a visitor reads here is the
 * shape they will find after installing.
 */
export function FeatureGroupsSection() {
  return (
    <section
      id="catalogo"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col gap-16 px-[30px] lg:gap-24">
        {FREEMIUM_GROUPS.map((group, index) => (
          <GroupBlock key={group.id} group={group} index={index} />
        ))}
      </div>
    </section>
  );
}
