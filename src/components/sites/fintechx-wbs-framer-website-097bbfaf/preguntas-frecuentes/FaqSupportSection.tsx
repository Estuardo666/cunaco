"use client";

import Image from "next/image";
import Link from "next/link";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/** Overlapping avatar stack — same three mascots the home FAQ card uses. */
const AVATARS: readonly string[] = [
  "mascota_ok.webp",
  "mascota_relax.webp",
  "mascota_thinking.webp",
];

/** Pages that answer the questions this list cannot fit. */
const RELATED = [
  {
    href: "/producto",
    title: "La app por dentro",
    description: "Las pantallas reales y los dos caminos: embarazo y bebé nacido.",
  },
  {
    href: "/nosotros",
    title: "Quién está detrás",
    description: "La Dra. Yasmín Sánchez León y las credenciales que sostienen la app.",
  },
  {
    href: "/privacidad",
    title: "Privacidad de datos",
    description: "Qué se guarda, cómo se protege y quién puede verlo.",
  },
] as const;

/**
 * Closing block: the escape hatch for anything the list did not cover, plus
 * three links to the pages that answer a question in full rather than in a
 * paragraph. Both halves point out of the page on purpose — a visitor still
 * reading at the bottom of an FAQ has a question we failed to answer.
 */
export function FaqSupportSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="faq-soporte"
      className="flex w-full flex-col items-center pb-[60px] lg:pb-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col gap-10 px-[30px] lg:gap-[60px]">
        {/* ---------- Contact card ---------- */}
        <div
          className={cn(
            "relative flex w-full flex-col gap-8 overflow-clip rounded-[24px] bg-[#f7f3ed] p-6 md:rounded-[30px] md:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-[60px]",
            revealBase,
            revealState,
          )}
        >
          <Image
            src={cunaAsset("background_sun_light.webp")}
            alt=""
            aria-hidden
            width={1440}
            height={810}
            className="pointer-events-none absolute inset-0 size-full object-cover opacity-40"
          />

          <div className="relative flex flex-col gap-5">
            {/* Avatar stack — 30px slots so the 40px discs overlap by 10px. */}
            <div className="flex h-10 items-center">
              <div className="flex w-[100px] shrink-0 pr-[10px]">
                {AVATARS.map((file) => (
                  <div key={file} className="w-[30px] shrink-0">
                    <Image
                      src={cunaAsset(file)}
                      alt=""
                      width={150}
                      height={150}
                      className="size-10 max-w-none overflow-hidden rounded-full bg-white object-cover"
                    />
                  </div>
                ))}
              </div>

              <span
                aria-hidden
                className="text-[18px] leading-[23.4px] font-semibold text-[#1d6259]"
              >
                +
              </span>

              <span className="ml-[10px] flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1d6259] text-[14px] leading-[18.2px] font-semibold text-white">
                Tú
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[22px] leading-[28px] font-semibold text-[#1d6259] lg:text-[28px] lg:leading-[34px]">
                ¿Tu duda no está en la lista?
              </p>
              <p className="max-w-[420px] text-[16px] leading-[22px] font-medium text-[#5e6968]">
                Escríbenos y te acompañamos. Ninguna pregunta sobre tu bebé es
                demasiado pequeña.
              </p>
            </div>
          </div>

          <div className="relative flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
            <FxButton
              href="/contacto"
              tone="dark"
              size="lg"
              className="max-sm:w-full max-sm:[&>span]:w-full"
            >
              Contactar
            </FxButton>
            <FxGhostButton href="/#pricing" className="max-sm:w-full">
              Ver los planes
            </FxGhostButton>
          </div>
        </div>

        {/* ---------- Related pages ---------- */}
        <div
          className={cn(
            "grid w-full grid-cols-1 gap-5 delay-100 md:grid-cols-3",
            revealBase,
            revealState,
          )}
        >
          {RELATED.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col gap-2 rounded-[24px] bg-white p-6 shadow-[0_0_0_2px_rgba(227,220,209,0.7)] transition-[transform,box-shadow] duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:shadow-[0_0_0_2px_rgba(79,211,196,0.9)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="text-[18px] leading-[23.4px] font-semibold text-[#1d6259]">
                {item.title}
              </span>
              <span className="text-[15px] leading-[21px] font-medium text-[#5e6968]">
                {item.description}
              </span>
              <span
                aria-hidden
                className="mt-2 text-[14px] leading-[18.2px] font-semibold text-cuna-teal-deep transition-transform duration-[300ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1 motion-reduce:transition-none"
              >
                Ver más →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
