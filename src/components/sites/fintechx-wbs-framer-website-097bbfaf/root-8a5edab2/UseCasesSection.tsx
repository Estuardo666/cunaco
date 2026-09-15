"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import type { CunaScreenVariant } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPanelScreen";
import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/**
 * One ticker card. The set alternates a framed app screen with a glass content
 * card, in the DOM order below (1 screen, 2 content, 3 screen, …).
 */
type TickerCard =
  | { readonly kind: "screen"; readonly screen: CunaScreenVariant }
  | {
      readonly kind: "content";
      /** Card ground — a brand gradient, since cards carry no photography. */
      readonly ground: string;
      readonly title: string;
      readonly description: string;
      readonly metric: string;
      readonly metricLabel: string;
    };

/**
 * Card grounds. The template used stock photography here; the cards carry flat
 * brand gradients instead, so the app screens are the only image in the row.
 */
const GROUND_AQUA = "linear-gradient(150deg, #aeebe4 0%, #e8f8f6 100%)";
const GROUND_YELLOW = "linear-gradient(150deg, #ffe599 0%, #fff6de 100%)";
const GROUND_SKY = "linear-gradient(150deg, #e8f8f6 0%, #fdfbf7 100%)";
const GROUND_CREAM = "linear-gradient(150deg, #f7f3ed 0%, #fff6de 100%)";
const SCREEN_GROUND = "linear-gradient(160deg, #aeebe4 0%, #e8f8f6 60%, #fdfbf7 100%)";

/** All eight cards — four real app screens, four gradient content cards. */
const TICKER_CARDS: readonly TickerCard[] = [
  { kind: "screen", screen: "contracciones" },
  {
    kind: "content",
    ground: GROUND_AQUA,
    title: "Embarazadas primerizas",
    description:
      "Registro de contracciones, checklist preparto y recordatorios de controles prenatales.",
    metric: "9 meses",
    metricLabel: "De acompañamiento antes del parto",
  },
  { kind: "screen", screen: "lactancia" },
  {
    kind: "content",
    ground: GROUND_YELLOW,
    title: "Mamás de recién nacido",
    description:
      "Agenda de lactancia, siestas, pañal y checklist de recién nacido en una sola app.",
    metric: "24/7",
    metricLabel: "Registro de lactancia, siestas y pañal",
  },
  { kind: "screen", screen: "crecimiento" },
  {
    kind: "content",
    ground: GROUND_SKY,
    title: "Mamás con más de un hijo",
    description:
      "Curvas OMS, vacunas y citas de cada hijo, sin perder el hilo de ninguno.",
    metric: "4 curvas",
    metricLabel: "Estándar OMS para cada hijo",
  },
  { kind: "screen", screen: "panal" },
  {
    kind: "content",
    ground: GROUND_CREAM,
    title: "Papás y cuidadores",
    description:
      "Alarmas de medicinas, hitos del desarrollo y primeros auxilios siempre a mano.",
    metric: "16",
    metricLabel: "Funciones gratuitas para toda la familia",
  },
];

/** Trust pills under the ticker. */
const TRUST_PILLS: readonly string[] = [
  "Creada por una pediatra",
  "Gratis para empezar",
  "Curvas OMS oficiales",
  "Datos privados",
];

/**
 * Card footprint. The `fx-marquee` keyframe travels 0 → -50%, so each card
 * carries its own right margin instead of the track using a flex `gap` —
 * that keeps the half-way point exactly one eight-card set wide.
 */
const CARD_BOX =
  "mr-[10px] h-[340px] w-[280px] shrink-0 md:h-[380px] md:w-[320px] xl:h-[420px] xl:w-[380px]";

const CARD_RADIUS = "rounded-[24px] xl:rounded-[30px]";

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function TickerCardItem({ card }: { card: TickerCard }) {
  if (card.kind === "screen") {
    return (
      <li
        className={cn(
          CARD_BOX,
          CARD_RADIUS,
          "flex items-center justify-center overflow-clip bg-cuna-cream",
        )}
        aria-hidden
        style={{ backgroundImage: SCREEN_GROUND }}
      >
        <CunaPhone variant={card.screen} height={320} />
      </li>
    );
  }

  return (
    <li
      className={cn(CARD_BOX, CARD_RADIUS, "relative overflow-hidden p-[10px]")}
      style={{ backgroundImage: card.ground }}
    >
      <div
        className="relative flex size-full flex-col justify-between overflow-clip rounded-[16px] bg-white/55 p-[20px] md:p-[24px] xl:rounded-[20px] xl:p-[30px]"
      >
        <div className="flex w-full max-w-[300px] flex-col gap-[6px] pb-[30px]">
          <h3 className="text-[22px] leading-[27px] font-semibold text-[#1d6259] md:text-[24px] md:leading-[29px] xl:text-[28px] xl:leading-[33.6px]">
            {card.title}
          </h3>
          <p className="text-[15px] leading-[20px] font-medium text-[#5e6968] md:text-[16px] md:leading-[21px] xl:text-[18px] xl:leading-[23.4px]">
            {card.description}
          </p>
        </div>

        <div className="flex w-full max-w-[300px] flex-col gap-[6px]">
          <h4 className="text-[20px] leading-[24px] font-semibold text-[#1d6259] xl:text-[24px] xl:leading-[28.8px]">
            {card.metric}
          </h4>
          <p className="text-[14px] leading-[18px] font-medium text-[#1d6259] xl:text-[16px] xl:leading-[20.8px]">
            {card.metricLabel}
          </p>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function UseCasesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  // Entrance animation — fires once when the section enters the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support — reveal on the next frame rather than synchronously.
      const frame = window.requestAnimationFrame(() => setEntered(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealBase =
    "transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";
  const revealState = entered
    ? "translate-y-0 opacity-100"
    : "translate-y-[20px] opacity-0";

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="flex w-full flex-col items-center py-[100px] xl:py-[200px]"
    >
      <div className="flex w-full max-w-full flex-col items-center gap-[50px]">
        {/* ---------------------------------------------------- */}
        {/* Top block                                            */}
        {/* ---------------------------------------------------- */}
        <div
          className={cn(
            "flex w-full max-w-[860px] flex-col items-center gap-[10px] px-[30px]",
            revealBase,
            revealState,
          )}
        >
          <div className="overflow-clip rounded-[100px] bg-cuna-aqua px-[20px] py-[10px]">
            <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
              Para quién es
            </span>
          </div>

          <h2 className="w-full max-w-[800px] text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
            Pensada para cada etapa de la maternidad
          </h2>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Ticker                                                */}
        {/* ---------------------------------------------------- */}
        <div className="w-full overflow-clip">
          <ul
            className="fx-marquee-track flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ ["--fx-marquee-duration" as string]: "60s" }}
          >
            {TICKER_CARDS.map((card, index) => (
              <TickerCardItem key={`a-${index}`} card={card} />
            ))}
            {TICKER_CARDS.map((card, index) => (
              <TickerCardItem key={`b-${index}`} card={card} />
            ))}
          </ul>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Bottom block                                          */}
        {/* ---------------------------------------------------- */}
        <div
          className={cn(
            "flex w-full max-w-[860px] flex-col items-center gap-[30px] px-[30px] delay-100",
            revealBase,
            revealState,
          )}
        >
          {/* Trust pills */}
          <div className="flex w-full max-w-[800px] flex-wrap justify-center gap-[8px] xl:gap-[10px]">
            {TRUST_PILLS.map((pill) => (
              <div
                key={pill}
                className="overflow-clip rounded-[100px] bg-cuna-aqua px-[14px] pt-[4px] pb-[6px]"
              >
                <span className="text-[14px] leading-[18.2px] font-medium text-[#5e6968]">
                  {pill}
                </span>
              </div>
            ))}
          </div>

          {/* Founder quote */}
          <div className="flex w-full max-w-[500px] flex-col items-center gap-[16px]">
            <p className="w-full text-center text-[16px] leading-[21px] font-medium text-[#1d6259] xl:text-[18px] xl:leading-[23.4px]">
              &quot;El tiempo brindado en un consultorio resulta muy corto con respecto a la
              cantidad de dudas y sentimiento de zozobra e incertidumbre que abraza a los
              padres en estos primeros años de vida.&quot;
            </p>

            <div className="flex items-center gap-[6px]">
              <Image
                src={cunaAsset("logo_mark.webp")}
                alt=""
                width={50}
                height={57}
                className="size-[30px] shrink-0 overflow-clip rounded-full object-cover"
              />
              <p className="text-[14px] leading-[18.2px] font-medium text-[#5e6968]">
                Dra. Yasmín Sánchez León · Fundadora y pediatra
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
