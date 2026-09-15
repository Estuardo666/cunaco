"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/**
 * Each row is a real claim → real feature pair. The left side is a credential
 * that can be verified; the right side is a function that actually ships in the
 * app (SITE_PLAN §5). Nothing here is a capability we hope to add later — that
 * is the whole point of the section.
 */
interface Bridge {
  readonly credential: string;
  readonly feature: string;
  readonly detail: string;
  readonly icon: string;
  /**
   * The credential card's ground, and the tint of the feature card's icon.
   *
   * One colour per credential rather than five white cards: the section's claim
   * is that these are five *different* qualifications backing five *different*
   * functions, and five identical cards say the opposite.
   */
  readonly tone: { readonly card: string; readonly text: string; readonly dot: string };
}

/** Brand grounds, one per row. */
const TONES = {
  teal: { card: "bg-cuna-teal-deep", text: "text-white", dot: "bg-cuna-aqua" },
  aqua: { card: "bg-cuna-aqua", text: "text-[#12403b]", dot: "bg-white" },
  amber: { card: "bg-cuna-yellow", text: "text-[#5c3d00]", dot: "bg-white" },
  sand: { card: "bg-cuna-yellow-soft", text: "text-[#7a5200]", dot: "bg-white" },
  mint: { card: "bg-[#e8f8f6]", text: "text-[#1d6259]", dot: "bg-cuna-teal" },
} as const;

const BRIDGES: readonly Bridge[] = [
  {
    credential: "Pediatra en ejercicio",
    feature: "Preguntas al pediatra",
    detail: "Deja la duda escrita cuando aparece, a las tres de la mañana si hace falta.",
    icon: "icono_app_pediatra.webp",
    tone: TONES.teal,
  },
  {
    credential: "Neonatóloga",
    feature: "Checklist de recién nacido",
    detail: "Qué llevar, qué vigilar y qué es normal en las primeras semanas.",
    icon: "mascota_peso_bebe.webp",
    tone: TONES.aqua,
  },
  {
    credential: "Puericultora",
    feature: "Curvas de crecimiento OMS",
    detail: "Talla/edad, peso/edad, perímetro cefálico/edad y peso/talla, más los hitos del desarrollo.",
    icon: "icono_app_perimetro.webp",
    tone: TONES.amber,
  },
  {
    credential: "Máster en Gestión en Salud",
    feature: "Control de vacunación",
    detail: "El esquema completo con recordatorios de cada dosis y de las citas médicas.",
    icon: "ic_vacunas.webp",
    tone: TONES.sand,
  },
  {
    credential: "Consulta propia en Loja",
    feature: "Medicinas con alarma",
    detail: "Cada dosis queda registrada y la app avisa cuándo toca la siguiente.",
    icon: "lactancia_gota.webp",
    tone: TONES.mint,
  },
];

export function CredentialBridgeSection() {
  const { ref, entered, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="respaldo"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col items-center gap-10 px-[30px] lg:gap-[60px]">
        {/* ---------- Header ---------- */}
        <div
          className={cn(
            "flex w-full max-w-[760px] flex-col items-center gap-[10px]",
            revealBase,
            revealState,
          )}
        >
          <div className="overflow-clip rounded-full bg-white px-5 py-[10px]">
            <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
              Por qué confiar
            </span>
          </div>

          <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
            Cada credencial sostiene una función concreta
          </h2>

          <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
            A la izquierda, la formación de la Dra. Sánchez. A la derecha, lo que puedes
            abrir hoy mismo en la app gracias a ella.
          </p>
        </div>

        {/* ---------- Bridge rows ---------- */}
        <ul className="flex w-full max-w-[1000px] flex-col gap-4 lg:gap-5">
          {BRIDGES.map((bridge, index) => (
            <li
              key={bridge.credential}
              className={cn(
                "flex flex-col items-stretch gap-0 lg:flex-row lg:items-center",
                revealBase,
                revealState,
              )}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              {/* Credential */}
              <div
                className={cn(
                  "flex items-center gap-3 rounded-[20px] px-6 py-5 lg:w-[320px] lg:shrink-0",
                  bridge.tone.card,
                )}
              >
                <span
                  aria-hidden
                  className={cn("size-2 shrink-0 rounded-full", bridge.tone.dot)}
                />
                <span
                  className={cn(
                    "text-[16px] leading-[22px] font-semibold lg:text-[17px]",
                    bridge.tone.text,
                  )}
                >
                  {bridge.credential}
                </span>
              </div>

              {/*
                The connector is the one place this page spends motion: it draws
                from the credential toward the feature as the row reveals, which
                is the section's whole argument rendered as movement. Horizontal
                on desktop, vertical on mobile, and skipped entirely under
                reduced motion.
              */}
              <span
                aria-hidden
                className="relative flex shrink-0 items-center justify-center self-center lg:w-[56px]"
              >
                <span
                  className={cn(
                    "block bg-cuna-teal/40 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    "h-5 w-[2px] origin-top lg:h-[2px] lg:w-full lg:origin-left",
                    "motion-reduce:scale-100 motion-reduce:transition-none",
                    entered ? "scale-100" : "scale-0",
                  )}
                  style={{ transitionDelay: `${index * 70 + 180}ms` }}
                />
              </span>

              {/* Feature */}
              <div className="flex flex-1 items-start gap-4 rounded-[20px] bg-white px-6 py-5">
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-full",
                    bridge.tone.card,
                  )}
                >
                  <Image
                    src={cunaAsset(bridge.icon)}
                    alt=""
                    width={48}
                    height={48}
                    className="size-5 object-contain"
                  />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[16px] leading-[22px] font-semibold text-[#1d6259] lg:text-[17px]">
                    {bridge.feature}
                  </span>
                  <span className="text-[15px] leading-[21px] font-medium text-[#5e6968]">
                    {bridge.detail}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* ---------- Legal clarity ---------- */}
        <p
          className={cn(
            "w-full max-w-[760px] text-center text-[15px] leading-[22px] font-medium text-[#878787]",
            revealBase,
            revealState,
          )}
        >
          Cuna&amp;Co. acompaña y organiza la información de tu embarazo y de tu bebé.
          No reemplaza el control pediátrico ni una consulta médica.
        </p>
      </div>
    </section>
  );
}
