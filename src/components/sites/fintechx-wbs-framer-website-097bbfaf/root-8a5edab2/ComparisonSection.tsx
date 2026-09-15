"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset, fxAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { cn } from "@/lib/utils";

interface ComparisonStat {
  value: string;
  label: string;
}

interface ComparisonVariant {
  title: string;
  bullets: readonly string[];
  icon: string;
  iconWidth: number;
  iconHeight: number;
  stats: readonly ComparisonStat[];
  badge: string;
  /** Natural size of the mascot file — the two differ, so they are declared. */
  badgeWidth: number;
  badgeHeight: number;
  /**
   * Share of the file's height the drawn mascot actually covers, and the
   * transparent margin below it, both measured off the alpha channel. The two
   * mascots are exported on very different canvases, so without these the same
   * CSS height renders two very different characters.
   */
  badgeFill: number;
  badgeBottomGap: number;
}

/** State A — "before", the default state until the card reaches the trigger zone. */
const BEFORE: ComparisonVariant = {
  title: "Los primeros años, sin acompañamiento",
  bullets: [
    "La consulta dura minutos y las dudas duran meses",
    "Información contradictoria en redes, foros y grupos",
    "Vacunas, citas y controles anotados en papeles sueltos",
    "Zozobra e incertidumbre en la etapa más exigente",
  ],
  icon: "59eNALHIwT6GZ6JhLrrkTHE0f7Y.svg",
  iconWidth: 10,
  iconHeight: 10,
  stats: [
    { value: "Minutos", label: "De consulta al año" },
    { value: "0", label: "Registros en un solo lugar" },
  ],
  badge: "mascota_thinking.webp",
  badgeWidth: 853,
  badgeHeight: 1280,
  badgeFill: 0.561,
  badgeBottomGap: 0.247,
};

/** State B — "after". */
const AFTER: ComparisonVariant = {
  title: "Con Cuna&Co. todo en un solo lugar",
  bullets: [
    "Contenido basado en evidencia, escrito por una pediatra",
    "Curvas de crecimiento OMS que muestran si tu bebé va bien",
    "Vacunas, citas y medicinas con alarma, sin papeles",
    "Checklists de preparto, recién nacido y viaje siempre a mano",
  ],
  icon: "cU6Yacp6C42TCWSRq8qtycxvNeY.svg",
  iconWidth: 13,
  iconHeight: 10,
  stats: [
    { value: "16", label: "Funciones gratuitas" },
    { value: "24/7", label: "Acompañamiento" },
  ],
  badge: "mascota_ok.webp",
  badgeWidth: 791,
  badgeHeight: 809,
  badgeFill: 0.947,
  badgeBottomGap: 0.015,
};




/**
 * The two labels are not controls, but the active side is called out: it grows
 * and darkens on a spring curve as the card flips, so the eye follows the state.
 */
const LABEL_BASE =
  "inline-block origin-right text-[13px] font-medium whitespace-nowrap transition-[scale,color,font-weight] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none lg:text-[16px]";
const LABEL_ON = "scale-[1.22] font-semibold text-[#1d6259]";
const LABEL_OFF = "scale-100 text-[#5e6968]";

const TOP_OVERLAY_GRADIENT =
  "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)";
/* Was a photo under a near-black wash on the original. Cuna&Co. has no black,
   and no photography inside cards — the "after" card is brand colour only. */
const AFTER_GRADIENT =
  "linear-gradient(145deg, #4fd3c4 0%, #2fa79a 40%, #1d6259 100%)";

/* The "before" card stays quiet, but warm rather than grey. */
const BEFORE_GRADIENT =
  "linear-gradient(145deg, #fff6de 0%, #f7f3ed 60%, #efe7db 100%)";

/** Bullet list + stat grid for one of the two stacked card variants. */
function VariantPanel({
  variant,
  tone,
  active,
}: {
  variant: ComparisonVariant;
  tone: "before" | "after";
  active: boolean;
}) {
  const isAfter = tone === "after";

  return (
    <div
      aria-hidden={!active}
      className={cn(
        "relative flex w-full flex-col gap-6 overflow-hidden rounded-[24px] px-5 pt-[70px] pb-5",
        "transition-[opacity,background-color] duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none",
        "lg:h-[459px] lg:flex-row lg:gap-[30px] lg:px-[30px] lg:pt-[90px] lg:pb-[30px]",
        active ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{
        gridArea: "1 / 1",
        backgroundImage: isAfter ? AFTER_GRADIENT : BEFORE_GRADIENT,
      }}
    >
      {/* Title / Description */}
      <div className="relative z-[1] flex w-full flex-col gap-5 lg:w-[374px]">
        <h3
          className={cn(
            "m-0 text-[22px] leading-[27px] font-semibold lg:text-[32px] lg:leading-[38.4px]",
            isAfter ? "text-white" : "text-[#1d6259]",
          )}
        >
          {variant.title}
        </h3>
        <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
          {variant.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5">
              <Image
                src={fxAsset(variant.icon)}
                alt=""
                width={variant.iconWidth}
                height={variant.iconHeight}
                className="mt-[5px] shrink-0"
                style={{
                  width: `${variant.iconWidth}px`,
                  height: `${variant.iconHeight}px`,
                }}
              />
              <span
                className={cn(
                  "text-[15px] leading-5 font-medium lg:text-[18px] lg:leading-[23.4px]",
                  isAfter ? "text-white/85" : "text-[#5e6968]",
                )}
              >
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom — stat boxes */}
      <div className="relative z-[1] grid w-full grid-cols-1 gap-3 md:grid-cols-2 md:gap-[30px] lg:w-[224px] lg:grid-cols-1">
        {variant.stats.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "flex w-full flex-col gap-1.5 rounded-[20px] p-5 lg:h-[100px] lg:w-[224px]",
              isAfter ? "bg-white/15" : "bg-white/70",
            )}
            style={isAfter ? { backdropFilter: "blur(5px)" } : undefined}
          >
            <span
              className={cn(
                "text-[28px] leading-[33.6px] font-semibold",
                isAfter ? "text-white" : "text-[#1d6259]",
              )}
            >
              {stat.value}
            </span>
            <span
              className={cn(
                "text-[16px] leading-[20.8px] font-medium",
                isAfter ? "text-white/80" : "text-[#5e6968]",
              )}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Scroll-driven "before / after FintechX" comparison card.
 *
 * The two labels are plain text, not controls: the card flips purely as a
 * function of scroll position (card top <= 30% of the viewport height) and
 * flips back when scrolling up.
 */
export function ComparisonSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isAfter, setIsAfter] = useState(false);
  const [entered, setEntered] = useState(false);

  // Scroll-driven state flip — reversible, rAF-throttled.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      setIsAfter(card.getBoundingClientRect().top <= window.innerHeight * 0.3);
    };

    const schedule = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Entrance animation — fires once when the heading enters the viewport.
  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

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
      { threshold: 0.2 },
    );

    observer.observe(heading);

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealBase =
    "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none motion-reduce:translate-y-0";
  const revealState = entered
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-5 motion-reduce:translate-y-0 motion-reduce:opacity-100";

  const badgeVariant = isAfter ? AFTER : BEFORE;

  return (
    <section
      id="products"
      className="flex w-full flex-col items-center gap-20 pt-[100px] lg:gap-[150px] lg:pt-[200px]"
    >
      <div className="relative flex w-full max-w-[760px] flex-col items-center gap-[50px] px-[30px] md:sticky md:top-20">
        {/* Heading */}
        <div
          ref={headingRef}
          className={cn("flex w-full justify-center", revealBase, revealState)}
        >
          <h2 className="m-0 max-w-[640px] text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] lg:text-[48px] lg:leading-[57.6px]">
            La crianza es más tranquila con información clara
          </h2>
        </div>

        {/* Card block */}
        <div
          ref={cardRef}
          className={cn(
            "relative w-full max-w-[700px] pt-[89px] delay-100",
            revealBase,
            revealState,
          )}
        >
          {/* Label bar */}
          <div className="pointer-events-none absolute top-0 left-1/2 z-20 flex h-[90px] w-full max-w-[600px] -translate-x-1/2 items-end gap-5">
            <div
              className="absolute top-0 left-1/2 h-[45px] w-[300px] -translate-x-1/2"
              style={{ background: TOP_OVERLAY_GRADIENT }}
            />
            <div className="absolute top-[89px] right-[50px] left-[50px] h-px bg-white" />

            <p className="relative m-0 flex flex-1 items-end justify-end rounded-br-[20px] pr-5 pb-5 text-right lg:leading-[20.8px]">
              <span className={cn(LABEL_BASE, !isAfter ? LABEL_ON : LABEL_OFF)}>
                Sin Cuna&amp;Co.
              </span>
            </p>

            <div className="relative h-[90px] w-20 shrink-0 [--badge-h:76px] md:w-[100px] md:[--badge-h:96px] lg:w-[130px] lg:[--badge-h:124px]">
              {/* `--badge-h` is the height the drawn mascot should occupy; the
                  file is scaled up by its fill ratio and pushed down by its own
                  transparent bottom margin, so both mascots land the same size
                  on the same baseline. */}
              <Image
                key={badgeVariant.badge}
                src={cunaAsset(badgeVariant.badge)}
                alt=""
                width={badgeVariant.badgeWidth}
                height={badgeVariant.badgeHeight}
                style={{
                  height: `calc(var(--badge-h) / ${badgeVariant.badgeFill})`,
                  transform: `translateX(-50%) translateY(calc(var(--badge-h) / ${badgeVariant.badgeFill} * ${badgeVariant.badgeBottomGap}))`,
                }}
                className="absolute -bottom-[8px] left-1/2 w-auto max-w-none object-contain object-bottom md:-bottom-[24px] lg:-bottom-[46px]"
              />
            </div>

            <p className="relative m-0 flex flex-1 items-end rounded-bl-[20px] pl-5 pb-5 lg:leading-[20.8px]">
              <span
                className={cn(LABEL_BASE, "origin-left", isAfter ? LABEL_ON : LABEL_OFF)}
              >
                Con Cuna&amp;Co.
              </span>
            </p>
          </div>

          {/* Card */}
          <div className="w-full rounded-[30px] p-[6px]">
            <div className="grid w-full">
              <VariantPanel variant={BEFORE} tone="before" active={!isAfter} />
              <VariantPanel variant={AFTER} tone="after" active={isAfter} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll spacer — gives the sticky container its scroll distance. */}
      <div aria-hidden className="h-0 w-full md:h-[450px]" />
    </section>
  );
}
