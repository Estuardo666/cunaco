"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** R01 vertical word cycler. */
const CYCLER_WORDS: readonly string[] = ["Lactancia", "Sueño", "Crecimiento"];

interface AlertLayer {
  readonly src: string;
  /** rendered size (natural is 280×70 for all three) */
  readonly width: number;
  readonly height: number;
  /** vertical offset inside the 300×100 block */
  readonly top: number;
}

/** R02 receding stack — back-most first so the front row paints last. */
const ALERT_LAYERS: readonly AlertLayer[] = [
  { src: "icono_app_sueno.webp", width: 160, height: 46, top: 0 },
  { src: "ic_vacunas.webp", width: 185, height: 52, top: 16 },
  { src: "icono_app_pediatra.webp", width: 212, height: 58, top: 32 },
];

/** Copy for those three rows — real app reminders, not market alerts. */
const ALERT_LABELS: readonly string[] = [
  "Siesta registrada",
  "Pentavalente en 3 días",
  "Control pediátrico mañana",
];

/** How long each reminder holds the front of the R02 stack. */
const ALERT_INTERVAL_MS = 2600;

const CARD_BASE = "relative overflow-clip rounded-[20px]";

/**
 * Card grounds. The template filled these with stock photography behind a white
 * wash; the cards carry flat brand colour instead, so the app screens inside
 * them are the only image on the card.
 */
const CARD_CREAM = "bg-cuna-cream";
const CARD_AQUA = "bg-cuna-aqua";
const CARD_YELLOW = "bg-cuna-yellow-soft";
const CARD_SKY = "bg-[#e8f8f6]";

/** Ramp for the one dark card — brand turquoise falling into the deep teal. */
const DARK_CARD_GRADIENT =
  "linear-gradient(150deg, #2fa79a 0%, #1d6259 55%, #12403b 100%)";
const CARD_PADDING = "p-[24px] xl:p-[40px]";
/** Cards whose device runs off the bottom edge keep their padding except below. */
const CARD_CROP = "pb-0! xl:pb-0!";
/**
 * Device well for those cards: the phone is taller than the well, so the card's
 * `overflow-clip` cuts it at the bottom edge — the same crop the L03 pair uses.
 */
const PHONE_CROP = "relative flex-1 min-h-[170px] md:min-h-[200px]";
/** The device itself is taken out of flow so the well keeps the card's height. */
const PHONE_CROP_DEVICE = "absolute top-0 left-1/2 -translate-x-1/2";
const CARD_TITLE =
  "text-[20px] leading-[24px] font-semibold xl:text-[24px] xl:leading-[28.8px]";
const CARD_SUB =
  "text-[15px] leading-[20px] font-medium xl:text-[16px] xl:leading-[20.8px]";
/** L01's title has to hold one line at 380px, so it runs a step smaller. */
const CARD_TITLE_TIGHT =
  "text-[19px] leading-[24px] font-semibold whitespace-nowrap xl:text-[21px] xl:leading-[28.8px]";

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

/**
 * R01 vertical word cycler — steps up one word-height every 2s with a 400ms
 * ease transition. A duplicate of the first word is appended so the wrap-around
 * is a forward step; the transition is disabled for the single frame that snaps
 * the track back to the top.
 */
function WordCycler() {
  const [step, setStep] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((current) => current + 1);
    }, 2000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (step < CYCLER_WORDS.length) return;
    const timer = window.setTimeout(() => {
      setAnimated(false);
      setStep(0);
    }, 400);
    return () => window.clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (animated) return;
    const frame = window.requestAnimationFrame(() => setAnimated(true));
    return () => window.cancelAnimationFrame(frame);
  }, [animated]);

  const words = [...CYCLER_WORDS, CYCLER_WORDS[0]];

  return (
    <div
      className="w-full overflow-hidden [--fx-word-h:44px] xl:[--fx-word-h:60px]"
      style={{ height: "var(--fx-word-h)" }}
    >
      <div
        className={cn(
          "flex flex-col ease-out motion-reduce:animate-none motion-reduce:transition-none",
          animated ? "transition-transform duration-[400ms]" : "transition-none",
        )}
        style={{ transform: `translateY(calc(${step} * var(--fx-word-h) * -1))` }}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            aria-hidden={index === words.length - 1}
            className="block shrink-0 text-[32px] font-bold whitespace-nowrap text-white xl:text-[44px]"
            style={{ height: "var(--fx-word-h)", lineHeight: "var(--fx-word-h)" }}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * R02 rotating reminder stack.
 *
 * Every reminder takes each depth in turn: it enters at the back, steps forward
 * twice, then drops out from the front. Depth 0 is the front row, so the layer
 * geometry is read back-to-front out of `ALERT_LAYERS`.
 */
function AlertStack() {
  const [front, setFront] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFront((current) => (current + 1) % ALERT_LABELS.length);
    }, ALERT_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[92px] w-full max-w-[212px]">
      {ALERT_LABELS.map((label, index) => {
        const depth = (index - front + ALERT_LABELS.length) % ALERT_LABELS.length;
        const layer = ALERT_LAYERS[ALERT_LAYERS.length - 1 - depth];
        const isFront = depth === 0;
        return (
          <div
            key={label}
            style={{
              top: layer.top,
              width: layer.width,
              height: layer.height,
              opacity: 1 - depth * 0.25,
              zIndex: ALERT_LABELS.length - depth,
            }}
            className={cn(
              "absolute left-1/2 flex max-w-full -translate-x-1/2 items-center gap-2",
              "overflow-hidden rounded-[12px] bg-white px-3 shadow-[0_2px_8px_rgba(18,64,59,0.10)]",
              "transition-[top,width,height,opacity] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              "motion-reduce:transition-none",
            )}
          >
            <Image
              src={cunaAsset(ALERT_LAYERS[index].src)}
              alt=""
              width={280}
              height={70}
              className="size-5 shrink-0 object-contain"
            />
            <span
              className={cn(
                "truncate text-[12px] leading-[16px] font-medium",
                isFront ? "text-[#1d6259]" : "text-[#5e6968]",
              )}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function FeaturesSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const node = gridRef.current;
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
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      className="flex w-full flex-col items-center pt-[100px] pb-0 xl:pt-[200px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <div className="flex flex-col gap-[30px] xl:gap-[50px]">
          {/* ---------------------------------------------------- */}
          {/* Top row                                              */}
          {/* ---------------------------------------------------- */}
          <div className="flex flex-col gap-[30px] lg:flex-row lg:items-start lg:gap-[50px]">
            <div className="flex flex-col gap-[10px] lg:w-[575px] lg:shrink-0">
              <div className="w-fit overflow-clip rounded-[100px] bg-cuna-aqua px-[20px] py-[10px]">
                <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                  Funciones principales
                </span>
              </div>
              <h2 className="text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
                Todo lo que necesitas en los primeros años
              </h2>
            </div>

            <div className="flex flex-col items-start gap-[20px] lg:w-[575px] lg:shrink-0">
              <p className="text-[18px] leading-[23.4px] font-medium text-[#5e6968]">
                16 funciones gratuitas nacidas de la consulta pediátrica real:
                registro diario, crecimiento, salud y preparación.
              </p>
              <FxButton href="/funciones" tone="dark" size="lg">
                Ver todas las funciones
              </FxButton>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Bento grid                                            */}
          {/* ---------------------------------------------------- */}
          <div
            ref={gridRef}
            className={cn(
              "grid grid-cols-1 gap-[20px] transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              "md:grid-cols-2 md:gap-[30px] lg:grid-cols-3 xl:grid-cols-[380px_380px_380px]",
              "motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none",
              entered ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0",
            )}
          >
            {/* Left cluster — spans the first two columns */}
            <div className="grid grid-cols-1 gap-[20px] md:col-span-2 md:grid-cols-2 md:gap-[30px] xl:grid-cols-[380px_380px]">
              {/* L01 — Crecimiento con curvas OMS */}
              <div
                className={cn(
                  CARD_BASE,
                  CARD_AQUA,
                  CARD_PADDING,
                  CARD_CROP,
                  "flex flex-col gap-[24px] lg:min-h-[447px]",
                )}
              >
                <div className="flex flex-col gap-[6px]">
                  <h3 className={cn(CARD_TITLE_TIGHT, "text-[#1d6259]")}>
                    Crecimiento con curvas OMS
                  </h3>
                  <p className={cn(CARD_SUB, "text-[#3f6f68]")}>
                    Talla, peso y perímetro cefálico graficados sobre los
                    percentiles oficiales de la OMS.
                  </p>
                </div>

                <div className={PHONE_CROP}>
                  <CunaPhone
                    variant="crecimiento"
                    height={330}
                    className={PHONE_CROP_DEVICE}
                  />
                </div>
              </div>

              {/* L02 — Control de vacunación */}
              <div
                className={cn(
                  CARD_BASE,
                  CARD_YELLOW,
                  CARD_PADDING,
                  CARD_CROP,
                  "flex flex-col gap-[24px] lg:min-h-[447px]",
                )}
              >
                <div className="relative flex flex-col gap-[6px]">
                  <h3 className={cn(CARD_TITLE, "text-[#1d6259]")}>
                    Control de vacunación
                  </h3>
                  <p className={cn(CARD_SUB, "text-[#5e6968]")}>
                    Esquema nacional al día, con las dosis aplicadas y la
                    siguiente cita siempre a la vista.
                  </p>
                </div>

                <div className={PHONE_CROP}>
                  <CunaPhone
                    variant="vacunas"
                    height={330}
                    className={PHONE_CROP_DEVICE}
                  />
                </div>
              </div>

              {/* L03 — Registro diario del bebé */}
              <div
                className={cn(
                  CARD_BASE,
                  CARD_SKY,
                  "flex flex-col p-[24px] pb-0 md:col-span-2 xl:px-[40px] xl:pt-[40px] lg:h-[374px]",
                )}
              >
                <div className="relative mx-auto flex max-w-[500px] flex-col items-center gap-[4px] pb-[24px] text-center xl:pb-[40px]">
                  <h3 className={cn(CARD_TITLE, "text-[#1d6259]")}>
                    Registro diario del bebé
                  </h3>
                  <p className="text-[16px] leading-[20.8px] font-medium text-[#5e6968]">
                    Contracciones, lactancia, siestas y pañal en una sola línea de
                    tiempo que puedes mostrar en la consulta.
                  </p>
                </div>

                <div className="relative mx-auto flex max-w-[710px] items-start justify-center gap-5 pt-[30px] md:h-[220px] md:gap-[50px]">
                  {/* Two devices share this row, so they shrink harder on
                      phones than the default. */}
                  <CunaPhone
                    variant="contracciones"
                    height={300}
                    baseRatio={0.58}
                    mdRatio={0.8}
                  />
                  <CunaPhone
                    variant="lactancia"
                    height={300}
                    baseRatio={0.58}
                    mdRatio={0.8}
                  />
                </div>
              </div>
            </div>

            {/* Right cluster — third column */}
            <div className="grid grid-cols-1 gap-[20px] md:col-span-2 md:grid-cols-2 md:gap-[30px] lg:col-span-1 lg:grid-cols-1">
              {/* R01 — Acompañamiento 24/7 (dark) */}
              <div
                className={cn(
                  CARD_BASE,
                  CARD_PADDING,
                  "flex flex-col justify-between gap-[30px] lg:min-h-[528px]",
                )}
                style={{ backgroundImage: DARK_CARD_GRADIENT }}
              >
                <div className="relative flex flex-col gap-[6px]">
                  <h3 className={cn(CARD_TITLE, "text-white")}>
                    Acompañamiento 24/7
                  </h3>
                  <p className={cn(CARD_SUB, "text-white/75")}>
                    Tu bebé no descansa por horario y nosotros tampoco.
                  </p>
                </div>

                <div className="flex w-full max-w-[300px] flex-1 items-center">
                  <WordCycler />
                </div>

                <p className="relative text-[16px] leading-[20.8px] font-medium text-white/80">
                  Talleres y respuestas de una pediatra en ejercicio.
                </p>
              </div>

              {/* R02 — Alarmas y recordatorios */}
              <div
                className={cn(
                  CARD_BASE,
                  CARD_CREAM,
                  CARD_PADDING,
                  "flex flex-col gap-[24px] lg:min-h-[239px]",
                )}
              >
                <div className="flex flex-col gap-[6px]">
                  <h3 className={cn(CARD_TITLE, "text-[#1d6259]")}>
                    Alarmas y recordatorios
                  </h3>
                  <p className={cn(CARD_SUB, "max-w-[240px] text-[#5e6968]")}>
                    Avisos de tomas, siestas, vacunas y controles antes de que se
                    te pasen.
                  </p>
                </div>

                <AlertStack />

                <Image
                  src={cunaAsset("mascota_relax.webp")}
                  alt=""
                  width={175}
                  height={148}
                  className="pointer-events-none absolute right-[16px] bottom-[16px] z-10 h-[68px] w-[80px] object-contain xl:right-[24px] xl:bottom-[24px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
