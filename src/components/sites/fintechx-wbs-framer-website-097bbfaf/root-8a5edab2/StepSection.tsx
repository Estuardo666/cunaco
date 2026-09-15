"use client";

import { useEffect, useRef, useState } from "react";
import type { CunaScreenVariant } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPanelScreen";
import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface Step {
  /** Pill label, e.g. `Step 01`. */
  readonly pill: string;
  /** Real app screen shown for this step, rebuilt from the Android source. */
  readonly screen: CunaScreenVariant;
  readonly title: string;
  readonly description: string;
}

const STEPS: readonly Step[] = [
  {
    pill: "Paso 01",
    screen: "bebe",
    title: "Descarga la app",
    description: "Disponible en Android. iOS próximamente.",
  },
  {
    pill: "Paso 02",
    screen: "contracciones",
    title: "Elige tu etapa",
    description: "Embarazo o bebé nacido: la app se adapta a ti.",
  },
  {
    pill: "Paso 03",
    screen: "crecimiento",
    title: "Registra y acompáñate",
    description: "Crecimiento, vacunas y recordatorios siempre contigo.",
  },
];

interface Stat {
  readonly value: string;
  readonly label: string;
}

const STATS: readonly Stat[] = [
  { value: "16", label: "Funciones gratuitas desde el primer día" },
  { value: "2 minutos", label: "Para crear tu cuenta y empezar a registrar" },
];

/** Dwell time per step, measured on the live site. */
const STEP_DURATION_MS = 8000;

/** Top wash over the decorative pill-bar frame. */
const GRAD_OVERLAY = "linear-gradient(#fff 0%, rgba(255,255,255,0) 100%)";

/* ------------------------------------------------------------------ */
/* Active-pill progress fill                                           */
/* ------------------------------------------------------------------ */

/**
 * Absolutely-positioned dark bar that sweeps across the active pill over the
 * 8s dwell. Mounted with a `key` equal to the active index so every step
 * change remounts it and replays the 0 → 1 `scaleX` transition. Under reduced
 * motion it renders at full width with no transition.
 */
function ProgressFill({ filled }: { filled: boolean }) {
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (filled) return;
    // Deferred to the next frame so the transition has a 0 → 1 start value.
    const frame = window.requestAnimationFrame(() => setRun(true));
    return () => window.cancelAnimationFrame(frame);
  }, [filled]);

  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-0 left-0 z-[1] h-full w-full origin-left bg-cuna-teal-deep",
        "transition-transform ease-linear",
        "motion-reduce:scale-x-100 motion-reduce:transition-none",
        filled || run ? "scale-x-100" : "scale-x-0",
      )}
      style={{ transitionDuration: `${STEP_DURATION_MS}ms` }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function StepSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(0);

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

  // Time-driven auto-advance, paused entirely under reduced motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    let interval: number | undefined;

    const stop = () => {
      if (interval !== undefined) {
        window.clearInterval(interval);
        interval = undefined;
      }
    };

    const apply = (prefersReduced: boolean) => {
      setReduced(prefersReduced);
      stop();
      if (prefersReduced) {
        setActive(0);
        return;
      }
      interval = window.setInterval(() => {
        setActive((current) => (current + 1) % STEPS.length);
      }, STEP_DURATION_MS);
    };

    // Deferred so no state setter runs synchronously in the effect body.
    const timer = window.setTimeout(() => apply(query.matches), 0);

    const onChange = (event: MediaQueryListEvent) => apply(event.matches);
    query.addEventListener("change", onChange);

    return () => {
      window.clearTimeout(timer);
      stop();
      query.removeEventListener("change", onChange);
    };
  }, []);

  const revealBase =
    "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:transition-none";
  const revealState = entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="flex w-full flex-col items-center pb-[100px] xl:pb-[200px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <div
          className={cn(
            "flex w-full flex-col items-start gap-[50px] lg:flex-row lg:gap-10 xl:gap-[70px]",
            revealBase,
            revealState,
          )}
        >
          {/* ---------------------------------------------------- */}
          {/* Left column                                          */}
          {/* ---------------------------------------------------- */}
          <div className="flex w-full flex-col gap-10 lg:flex-1 lg:pt-[59px] xl:w-[502px] xl:flex-none xl:gap-[70px]">
            <div className="flex flex-col items-start gap-[10px]">
              <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
                <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                  Cómo funciona
                </span>
              </div>

              <h2 className="w-full text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
                Empieza en dos minutos
              </h2>

              <p className="w-full text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
                Descarga la app, elige tu etapa y empieza a registrar. Sin configuraciones
                complicadas.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-[30px]">
              {STATS.map((stat) => (
                <div key={stat.value} className="flex flex-col gap-[6px]">
                  <h3 className="text-[24px] leading-[29px] font-semibold text-[#1d6259] sm:text-[32px] sm:leading-[38.4px]">
                    {stat.value}
                  </h3>
                  <p className="text-[16px] leading-[20.8px] font-medium text-[#5e6968]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Right column                                         */}
          {/* ---------------------------------------------------- */}
          <div className="flex w-full flex-col lg:flex-1 xl:w-[628px] xl:flex-none">
            {/* ---------- Pill bar ---------- */}
            <div className="relative z-10 flex self-center p-2 xl:p-[10px]">
              {/* Decorative frame */}
              <div
                aria-hidden
                className="pointer-events-none absolute top-[58.2px] right-[-39px] left-[-39px] hidden h-px bg-white xl:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-[-39px] hidden h-[59px] w-10 rounded-br-[20px] xl:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-[303.812px] hidden h-[59px] w-10 rounded-bl-[20px] xl:block"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-[-2px] left-[-2px] h-[70px]"
                style={{ backgroundImage: GRAD_OVERLAY }}
              />

              <div className="relative z-10 flex gap-[6px] xl:gap-[10px]">
                {STEPS.map((step, index) => {
                  const isActive = index === active;
                  return (
                    <div
                      key={step.pill}
                      className="relative overflow-clip rounded-full bg-[#f7f3ed] px-[14px] py-2 xl:px-5 xl:py-[10px]"
                    >
                      {isActive ? <ProgressFill key={active} filled={reduced} /> : null}

                      <span
                        className={cn(
                          "relative z-[2] block text-[12px] leading-[18.2px] font-medium xl:text-[14px]",
                          isActive ? "text-white" : "text-[#5e6968]",
                        )}
                      >
                        {step.pill}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ---------- Step card ---------- */}
            <div className="grid w-full overflow-clip rounded-[30px] p-1 xl:p-[6px]">
              {STEPS.map((step, index) => {
                const isActive = index === active;
                return (
                  <div
                    key={step.pill}
                    aria-hidden={!isActive}
                    style={{ gridArea: "1 / 1" }}
                    className={cn(
                      "flex flex-col gap-5 overflow-clip rounded-[18px] bg-[#f7f3ed] p-5 transition-opacity duration-300 ease-in-out",
                      "motion-reduce:transition-none xl:gap-10 xl:rounded-[24px] xl:p-10",
                      isActive ? "opacity-100" : "pointer-events-none opacity-0",
                    )}
                  >
                    <div className="flex w-full flex-col gap-5 xl:gap-10">
                      <div className="flex w-full items-start justify-center">
                        <CunaPhone variant={step.screen} height={320} />
                      </div>

                      <div className="flex flex-col gap-[6px]">
                        <h3 className="text-[20px] leading-[24px] font-semibold text-[#1d6259] xl:text-[24px] xl:leading-[28.8px]">
                          {step.title}
                        </h3>
                        <p className="text-[16px] leading-[21px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
