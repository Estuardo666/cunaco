"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset, fxAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface BenefitCard {
  readonly icon: string;
  /** natural + rendered icon size (identical on the live site) */
  readonly iconWidth: number;
  readonly iconHeight: number;
  /** first line, ending in a colon — same weight and colour as the body */
  readonly lead: string;
  readonly body: string;
}

const BENEFITS: readonly BenefitCard[] = [
  {
    icon: "9TgPFzikB5iacM06fvtpGu10.svg",
    iconWidth: 21,
    iconHeight: 20,
    lead: "Todo tu bebé en un solo lugar:",
    body: "Registros, crecimiento, vacunas y citas reunidos en una sola vista clara.",
  },
  {
    icon: "pRdU9KB8r1iwhd7rBdjtgbzG2k.svg",
    iconWidth: 12,
    iconHeight: 20,
    lead: "Dos flujos, una sola app:",
    body: "Elige embarazo o bebé nacido y la app se adapta a tu etapa.",
  },
  {
    icon: "G0m9o7lLo6sZqM2mtPuo6EgtA.svg",
    iconWidth: 21,
    iconHeight: 20,
    lead: "Pensada para el día a día:",
    body: "Interfaz simple para registrar en segundos, incluso con el bebé en brazos.",
  },
];

/** Ground the device cluster sits on — aqua falling into cream, no photo. */
const STAGE_GRADIENT = "linear-gradient(160deg, #aeebe4 0%, #e8f8f6 55%, #fdfbf7 100%)";

/** Icon tile fill — 135deg charcoal ramp. */
const ICON_TILE_GRADIENT = "linear-gradient(135deg, #2fa79a 0%, #1d6259 100%)";

/** Top wash: transparent at the bottom edge, solid white at the top. */
const BG_TOP_GRADIENT =
  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)";

/** Bottom wash: transparent at the top edge, solid white at the bottom. */
const BG_BOTTOM_GRADIENT =
  "linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  // Entrance animation — fires once when the section enters the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support: reveal on the next tick rather than synchronously.
      const timer = window.setTimeout(() => setEntered(true), 0);
      return () => window.clearTimeout(timer);
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
    "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:transition-none";
  const revealState = entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="relative flex w-full flex-col items-center py-[100px] lg:py-[200px]"
    >
      {/* ---------------------------------------------------------- */}
      {/* Background layer                                           */}
      {/* ---------------------------------------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
        <Image
          src={cunaAsset("background_baby_happiness.webp")}
          alt=""
          width={1440}
          height={1350}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute top-[-1px] right-[-10px] left-[-10px] h-[200px]"
          style={{ backgroundImage: BG_TOP_GRADIENT }}
        />
        <div
          className="absolute right-[-10px] bottom-[-1px] left-[-10px] h-[200px]"
          style={{ backgroundImage: BG_BOTTOM_GRADIENT }}
        />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Container                                                  */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-10 flex w-full max-w-[1260px] flex-col items-center gap-[50px] px-[30px]">
        {/* ---------- Top block ---------- */}
        <div
          className={cn(
            "flex w-full max-w-[800px] flex-col items-center gap-10",
            revealBase,
            revealState,
          )}
        >
          <div className="flex flex-col items-center gap-[10px]">
            <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
              <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                La app por dentro
              </span>
            </div>

            <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
              Mira Cuna&Co. en acción
            </h2>

            <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
              Un panel que reúne el registro diario, el crecimiento y la salud de tu bebé
              en una sola pantalla.
            </p>
          </div>

          <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
            <FxButton
              href="/funciones"
              tone="brand"
              size="lg"
              className="w-full sm:w-auto [&>span]:w-full sm:[&>span]:w-auto"
            >
              Explorar funciones
            </FxButton>
            <FxGhostButton href="/producto" tone="dark" className="w-full sm:w-auto">
              Ver pantallas
            </FxGhostButton>
          </div>
        </div>

        {/* ---------- Bottom block ---------- */}
        <div
          className={cn(
            "flex w-full flex-col gap-[30px] delay-100",
            revealBase,
            revealState,
          )}
        >
          {/* Dashboard frame */}
          <div className="rounded-[20px] bg-white p-1 xl:p-[6px]">
            {/* The template shipped a stock dashboard screenshot here. The app
                repo ships no captures, so the slot holds the real screens
                rebuilt from its Kotlin source instead. */}
            <div
              className="relative flex items-end justify-center gap-4 overflow-clip rounded-[10px] px-4 pt-8 sm:gap-6 sm:px-8 xl:rounded-[14px]"
              style={{ backgroundImage: STAGE_GRADIENT }}
            >
              <CunaPhone
                variant="lactancia"
                height={320}
                className="hidden sm:block"
              />
              <CunaPhone variant="panel" height={380} />
              <CunaPhone variant="bebe" height={320} className="hidden sm:block" />
            </div>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2 xl:grid-cols-3">
            {BENEFITS.map((card, index) => (
              <div
                key={card.lead}
                className={cn(
                  "flex items-start gap-3 overflow-clip rounded-[20px] bg-white p-5 xl:gap-5 xl:p-[30px]",
                  index === 2 && "md:col-span-2 xl:col-span-1",
                )}
              >
                <div
                  className="flex size-10 shrink-0 items-center justify-center overflow-clip rounded-[10px]"
                  style={{ backgroundImage: ICON_TILE_GRADIENT }}
                >
                  <Image
                    src={fxAsset(card.icon)}
                    alt=""
                    width={card.iconWidth}
                    height={card.iconHeight}
                  />
                </div>

                <p className="flex-1 text-[16px] leading-[21px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
                  {card.lead}
                  <br />
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
