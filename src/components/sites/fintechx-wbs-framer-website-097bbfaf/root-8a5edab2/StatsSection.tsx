"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type StatVariant = "light" | "dark" | "brand";

interface StatCard {
  readonly label: string;
  readonly value: string;
  readonly description: string;
  readonly variant: StatVariant;
  /** Resolved desktop scatter coordinates inside the 1200 x 1080 canvas. */
  readonly top: number;
  readonly left: number;
  readonly icon: string;
  /** Natural icon size; always rendered inside a 20 x 20 box. */
  readonly iconWidth: number;
  readonly iconHeight: number;
}

const STATS: readonly StatCard[] = [
  {
    label: "Funciones gratuitas",
    value: "16",
    description: "Disponibles sin pagar, desde el primer día.",
    variant: "light",
    top: 230,
    left: 150,
    icon: "icono_app_gota.webp",
    iconWidth: 20,
    iconHeight: 19,
  },
  {
    label: "Talleres premium",
    value: "13",
    description: "Contenido educativo, de la lactancia a los primeros auxilios.",
    variant: "dark",
    top: 220,
    left: 820,
    icon: "ic_premium.webp",
    iconWidth: 18,
    iconHeight: 20,
  },
  {
    label: "Curvas OMS",
    value: "4",
    description: "Talla, peso, perímetro cefálico y peso para la talla.",
    variant: "light",
    top: 610,
    left: 820,
    icon: "icono_app_perimetro.webp",
    iconWidth: 17,
    iconHeight: 20,
  },
  {
    label: "Acompañamiento",
    value: "24/7",
    description: "Agenda, recordatorios y contenido útil a cualquier hora.",
    variant: "brand",
    top: 750,
    left: 510,
    icon: "icono_app_visita_pediatra.webp",
    iconWidth: 21,
    iconHeight: 20,
  },
  {
    label: "Caminos",
    value: "2",
    description: "La app se bifurca en embarazo y bebé nacido, y se adapta a tu etapa.",
    variant: "dark",
    top: 640,
    left: 120,
    icon: "iconos_arbol.webp",
    iconWidth: 16,
    iconHeight: 20,
  },
];

interface VariantStyle {
  readonly background: string;
  readonly label: string;
  readonly value: string;
  readonly description: string;
}

const VARIANTS: Record<StatVariant, VariantStyle> = {
  light: {
    background: "linear-gradient(135deg, #f7f3ed 0%, #f7f3ed 100%)",
    label: "text-[#1d6259]",
    value: "text-[#1d6259]",
    description: "text-[#5e6968]",
  },
  dark: {
    background: "linear-gradient(135deg, #2fa79a 0%, #1d6259 100%)",
    label: "text-white",
    value: "text-white",
    description: "text-[#bfbfbf]",
  },
  brand: {
    background: "linear-gradient(90deg, #2fa79a 0%, #4fd3c4 100%)",
    label: "text-white",
    value: "text-white",
    description: "text-[#f7f3ed]",
  },
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function StatsSection() {
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
      id="stats"
      className="flex w-full flex-col items-center pt-[60px] lg:pt-[100px]"
    >
      {/* Container */}
      <div className="flex w-full max-w-[1260px] flex-col items-center px-[30px]">
        {/* Content canvas */}
        <div className="relative flex w-full flex-col items-center gap-10 lg:h-[918px] lg:gap-0 xl:h-[1080px]">
          {/* ---------- Header ---------- */}
          <div
            className={cn(
              "flex w-full max-w-[700px] flex-col items-center gap-[10px] lg:z-[1]",
              revealBase,
              revealState,
            )}
          >
            <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
              <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                Cuna&Co. en cifras
              </span>
            </div>

            <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
              Respaldo médico real, no consejos genéricos
            </h2>

            <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
              Funciones creadas desde la consulta pediátrica, con estándares OMS y
              acompañamiento continuo.
            </p>
          </div>

          {/* ---------- Card field ---------- */}
          <div
            className={cn(
              "grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5",
              // Desktop: the absolute 1200 x 1080 scatter, scaled down on laptops.
              "lg:absolute lg:top-0 lg:left-1/2 lg:z-0 lg:block lg:h-[1080px] lg:w-[1200px]",
              "lg:origin-top lg:[transform:translateX(-50%)_scale(0.85)]",
              "xl:[transform:translateX(-50%)]",
            )}
          >
            {STATS.map((card, index) => {
              const variant = VARIANTS[card.variant];

              return (
                <div
                  key={card.label}
                  className={cn(
                    "flex w-full min-h-[200px] flex-col items-start justify-between overflow-hidden rounded-[24px] p-6",
                    "sm:min-h-[240px] sm:rounded-[30px] sm:p-[30px]",
                    "lg:absolute lg:h-[280px] lg:w-[280px] lg:min-h-0",
                    revealBase,
                    revealState,
                  )}
                  style={{
                    backgroundImage: variant.background,
                    top: card.top,
                    left: card.left,
                    transitionDelay: `${index * 60}ms`,
                  }}
                >
                  {/* Top */}
                  <div className="flex w-full items-start gap-[10px] pb-[30px]">
                    <span
                      className={cn(
                        "flex-1 text-[16px] leading-[20.8px] font-medium",
                        variant.label,
                      )}
                    >
                      {card.label}
                    </span>

                    <div className="flex items-center justify-end gap-[10px]">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full">
                        <Image
                          src={cunaAsset(card.icon)}
                          alt=""
                          width={card.iconWidth}
                          height={card.iconHeight}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex w-full flex-col gap-[6px]">
                    <h3
                      className={cn(
                        "text-[32px] leading-[38px] font-semibold lg:text-[40px] lg:leading-[48px]",
                        variant.value,
                      )}
                    >
                      {card.value}
                    </h3>
                    <p
                      className={cn(
                        "text-[16px] leading-[20.8px] font-medium",
                        variant.description,
                      )}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
