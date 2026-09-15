"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset, fxAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { PREMIUM_PRICE } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type PlanTone = "light" | "dark";

interface FxPricingPlan {
  readonly name: string;
  readonly tagline: string;
  /** Amount shown while the switch is on Monthly. */
  readonly monthlyPrice: string;
  /** Amount shown while the switch is on Yearly. */
  readonly yearlyPrice: string;
  readonly badge?: string;
  readonly ctaLabel: string;
  readonly ctaHref: string;
  readonly features: readonly string[];
  readonly tone: PlanTone;
}

const PLANS: readonly FxPricingPlan[] = [
  {
    name: "Freemium",
    tagline: "Todo lo esencial, gratis para siempre",
    monthlyPrice: "Gratis",
    yearlyPrice: "Gratis",
    ctaLabel: "Descargar gratis",
    ctaHref: "/producto",
    features: [
      "Registro de contracciones y lactancia",
      "Curvas de crecimiento OMS",
      "Control de vacunación y citas médicas",
      "Checklists de preparto, recién nacido y viaje",
      "Registro de medicinas con alarma",
      "Preguntas al pediatra",
    ],
    tone: "light",
  },
  {
    name: "Premium",
    tagline: "Los talleres de la Dra. Sánchez, dentro de la app",
    monthlyPrice: PREMIUM_PRICE.amount,
    yearlyPrice: PREMIUM_PRICE.yearlyAmount,
    ctaLabel: "Activar Premium",
    ctaHref: "/precios",
    features: [
      "Preparación para el parto y la lactancia",
      "Banco de leche y destete respetuoso",
      "Cuidados del recién nacido",
      "Primeros auxilios para cuidadores",
      "Alimentación complementaria y alergias",
      "Estimulación y masaje infantil",
    ],
    tone: "dark",
  },
];

const FOOTNOTES: readonly string[] = [
  "Sin tarjeta de crédito",
  "Disponible en Android",
  "iOS próximamente",
];

/** Pro card fill — 132deg charcoal ramp. */
const PRO_CARD_GRADIENT = "linear-gradient(132deg, #2fa79a 0%, #1d6259 100%)";

/** `Popular` badge fill — 110deg blue ramp. */
const POPULAR_BADGE_GRADIENT = "linear-gradient(110deg, #2fa79a 0%, #6fdcd0 100%)";

/** Enterprise card fill — pale blue washing up into white. */
const ENTERPRISE_GRADIENT = "linear-gradient(#e8f8f6 0%, #fff 100%)";

/** Switch frame overlay — white fading to transparent over the 50px bar. */
const SWITCH_GRAD_OVERLAY =
  "linear-gradient(#fff 0%, rgba(255,255,255,0) 100%)";

/** Local keyframes for the price crossfade (Framer uses a NumberFlow counter). */
const PRICE_ANIMATION_CSS = `
@keyframes fx-price-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.fx-price-in { animation: fx-price-in 250ms ease-out both; }
@media (prefers-reduced-motion: reduce) {
  .fx-price-in { animation: none; }
}
`;

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [yearly, setYearly] = useState(false);

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
      id="pricing"
      className="flex w-full flex-col items-center pb-[100px] lg:pb-[200px]"
    >
      <style>{PRICE_ANIMATION_CSS}</style>

      <div className="w-full max-w-[860px] px-[30px]">
        <div className="flex w-full flex-col items-center gap-[50px]">
          {/* ---------------------------------------------------- */}
          {/* Header                                               */}
          {/* ---------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full flex-col items-center gap-[10px]",
              revealBase,
              revealState,
            )}
          >
            <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
              <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                Planes
              </span>
            </div>

            <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] lg:text-[48px] lg:leading-[57.6px]">
              Gratis para empezar, siempre
            </h2>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Plans block                                          */}
          {/* ---------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full flex-col gap-[30px] delay-100",
              revealBase,
              revealState,
            )}
          >
            {/*
              The switch is IN FLOW on the live site: this block is a column of
              [switch 50px][plans card 581px] with no gap, and the 30px gap sits
              between the plans card and the Enterprise card. Floating the switch
              above the card cost the section 30px of height.
            */}
            <div className="flex w-full flex-col items-center">
              <div className="relative flex h-[50px] w-[315px] max-w-full items-center justify-center gap-5 px-5 py-[10px]">
                {/* Decorative frame */}
                <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
                  <div className="absolute top-0 left-[-39px] h-[51px] w-10 rounded-br-[20px] bg-transparent" />
                  <div className="absolute top-0 left-[314.175px] h-[51px] w-10 rounded-bl-[20px] bg-transparent" />
                  <div className="absolute right-[-39px] bottom-0 left-[-39px] h-px bg-white" />
                  <div
                    className="absolute top-0 right-[-2px] left-[-2px] h-[50px]"
                    style={{ backgroundImage: SWITCH_GRAD_OVERLAY }}
                  />
                </div>

                {/* Controls */}
                <span className="relative z-10 text-[16px] leading-[20.8px] font-medium text-[#1d6259]">
                  Mensual
                </span>

                <button
                  type="button"
                  role="switch"
                  aria-checked={yearly}
                  aria-label="Periodo de facturación"
                  onClick={() => setYearly((current) => !current)}
                  className={cn(
                    "relative z-10 h-[30px] w-[60px] shrink-0 cursor-pointer rounded-[6px] p-[3px]",
                    "transition-colors duration-200 ease-linear motion-reduce:transition-none",
                    yearly ? "bg-[#2fa79a]" : "bg-[#f7f3ed]",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-[3px] left-0 block size-6 rounded-[4px] bg-white",
                      "transition-transform duration-200 ease-linear motion-reduce:transition-none",
                      yearly ? "translate-x-[33px]" : "translate-x-[3px]",
                    )}
                  />
                </button>

                <span className="relative z-10 flex items-center gap-[6px] text-[16px] leading-[20.8px] font-medium text-[#5e6968]">
                  Anual
                  <span
                    className="overflow-clip rounded-full px-[6px] py-[3px] text-[12px] leading-[15.6px] font-semibold text-white"
                    style={{ backgroundImage: POPULAR_BADGE_GRADIENT }}
                  >
                    20%off
                  </span>
                </span>
              </div>

              {/* -------- Plans card -------- */}
              <div className="relative flex w-full flex-col gap-5 rounded-[30px] p-[6px] pb-5">
              {/* Inner grid */}
              <div className="grid grid-cols-1 gap-3 rounded-[24px] bg-[#f7f3ed] p-[10px] md:grid-cols-2 md:gap-2 lg:gap-[10px]">
                {PLANS.map((plan) => (
                  <PlanCard key={plan.name} plan={plan} yearly={yearly} />
                ))}
              </div>

              {/* Footnote row */}
              <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-5">
                {FOOTNOTES.map((note, index) => (
                  <div key={note} className="flex items-center gap-5">
                    {index > 0 ? (
                      <span
                        aria-hidden
                        className="hidden size-1 rounded-full bg-[#5e6968] md:block"
                      />
                    ) : null}
                    <span className="text-[14px] leading-[18.2px] font-medium text-[#5e6968]">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </div>

            {/* -------- Enterprise card -------- */}
            <div
              className="relative overflow-clip rounded-[24px] p-6 lg:rounded-[30px] lg:p-[30px]"
              style={{ backgroundImage: ENTERPRISE_GRADIENT }}
            >
              <Image
                src={cunaAsset("mascota_relax.webp")}
                alt=""
                aria-hidden
                width={455}
                height={180}
                className="pointer-events-none absolute top-0 right-0 z-0 hidden md:block"
              />

              <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-[10px]">
                <div className="flex flex-col gap-[10px] lg:max-w-[406px]">
                  <h3 className="text-[20px] leading-[24px] font-semibold text-[#1d6259] lg:text-[24px] lg:leading-[28.8px]">
                    ¿Eres profesional de la salud?
                  </h3>
                  <p className="text-[16px] leading-[21px] font-medium text-[#5e6968] lg:text-[18px] lg:leading-[23.4px]">
                    Si acompañas a madres y bebés y quieres usar Cuna&Co. en tu consulta,
                    escríbenos y conversamos.
                  </p>
                </div>

                <FxGhostButton href="/contacto" tone="dark" className="w-full lg:w-auto">
                  Escríbenos
                </FxGhostButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Plan card                                                           */
/* ------------------------------------------------------------------ */

interface PlanCardProps {
  plan: FxPricingPlan;
  yearly: boolean;
}

function PlanCard({ plan, yearly }: PlanCardProps) {
  const isDark = plan.tone === "dark";
  const amount = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={cn(
        "flex flex-col gap-[30px] overflow-clip rounded-[20px] p-6 lg:p-[30px]",
        !isDark && "bg-[#f7f3ed]",
      )}
      style={isDark ? { backgroundImage: PRO_CARD_GRADIENT } : undefined}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-[10px]">
        <div className="flex flex-col gap-[6px]">
          <h3
            className={cn(
              "text-[24px] leading-[28.8px] font-semibold",
              isDark ? "text-white" : "text-[#1d6259]",
            )}
          >
            {plan.name}
          </h3>
          <p
            className={cn(
              "text-[18px] leading-[23.4px] font-medium",
              isDark ? "text-[#bfbfbf]" : "text-[#5e6968]",
            )}
          >
            {plan.tagline}
          </p>
        </div>

        {plan.badge ? (
          <span
            className="shrink-0 overflow-clip rounded-full px-[14px] py-[6px] text-[14px] leading-[18.2px] font-semibold text-white"
            style={{ backgroundImage: POPULAR_BADGE_GRADIENT }}
          >
            {plan.badge}
          </span>
        ) : null}
      </div>

      {/* Price row */}
      <div className="flex items-baseline gap-[6px]">
        <span
          key={amount}
          className={cn(
            "fx-price-in text-[32px] leading-[38px] font-semibold lg:text-[40px] lg:leading-[48px]",
            isDark ? "text-white" : "text-[#1d6259]",
          )}
        >
          {amount}
        </span>
        <span
          className={cn(
            "text-[16px] leading-[20.8px] font-medium",
            isDark ? "text-white" : "text-[#1d6259]",
          )}
        >
          /mes
        </span>
      </div>

      {/* CTA */}
      <FxGhostButton
        href={plan.ctaHref}
        tone={isDark ? "light" : "dark"}
        className="w-full"
      >
        {plan.ctaLabel}
      </FxGhostButton>

      {/* Feature list */}
      <ul className="flex flex-col gap-[10px]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex min-h-[22px] items-center gap-[6px]">
            {/* The live tick sits in a 7 x 22 box — that box, not the 7 x 10
                glyph, is what makes each row 22px tall. */}
            <span className="flex h-[22px] w-[7px] shrink-0 items-center justify-center">
              <Image
                src={fxAsset("5qbimdlaVq6A7LLm15aiqqrGNMQ.svg")}
                alt=""
                aria-hidden
                width={7}
                height={10}
                className="shrink-0"
              />
            </span>
            <span
              className={cn(
                "text-[16px] leading-[20.8px] font-medium",
                isDark ? "text-[#bfbfbf]" : "text-[#5e6968]",
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
