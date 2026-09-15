"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface RingArm {
  /** rotation of the arm bar, in degrees (the icons are counter-rotated by -angle) */
  readonly angle: number;
  readonly icon: string;
  /** natural intrinsic size of the SVG — rendered at 32 x 32, object-contain */
  readonly width: number;
  readonly height: number;
}

/**
 * The live DOM builds the 16-tile ring out of 8 "arm" bars.
 *
 * Each bar is 80 x 940, absolutely positioned at (470, 470) — the ring centre —
 * then pulled back by `translate(-40px, -470px)` so the bar is centred on that
 * point, and finally rotated. A tile sits at each end of the bar, which places
 * both tiles on a circle of radius 430. Eight bars, 22.5deg apart, therefore
 * yield 16 tiles one every 22.5deg.
 */
const RING_ARMS: readonly RingArm[] = [
  { angle: 0, icon: "icono_app_contraction.webp", width: 299, height: 360 },
  { angle: -22.5, icon: "icono_app_gota.webp", width: 360, height: 240 },
  { angle: -45, icon: "icono_app_panal.webp", width: 286, height: 360 },
  { angle: -67.5, icon: "icono_app_sueno.webp", width: 360, height: 341 },
  { angle: -90, icon: "ic_vacunas.webp", width: 322, height: 360 },
  { angle: -112.5, icon: "icono_app_pediatra.webp", width: 311, height: 360 },
  { angle: -135, icon: "icono_app_altura.webp", width: 310, height: 360 },
  { angle: -157.5, icon: "icono_app_perimetro.webp", width: 337, height: 360 },
];

/** Hub disc fill — 135deg charcoal ramp. */
const HUB_GRADIENT = "linear-gradient(135deg, #2fa79a 0%, #1d6259 100%)";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function IntegrationsSection() {
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
    <section ref={sectionRef} id="integrations" className="flex w-full flex-col items-center">
      <div className="w-full max-w-[1260px] px-[30px]">
        {/* ---------------------------------------------------------- */}
        {/* Content — the whole section is one big card                */}
        {/* ---------------------------------------------------------- */}
        <div
          className={cn(
            "relative flex w-full flex-col items-center gap-[50px] overflow-clip rounded-[24px] bg-[#f7f3ed]",
            "px-5 py-10 md:px-10 md:py-[60px] lg:rounded-[30px] lg:p-20 xl:p-[100px]",
            revealBase,
            revealState,
          )}
        >
          {/* ---------- Top block ---------- */}
          <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center gap-[30px]">
            <div className="flex w-full flex-col items-center gap-[10px]">
              <div className="overflow-clip rounded-full bg-white px-5 py-[10px]">
                <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                  Respaldo médico
                </span>
              </div>

              <h2 className="w-full text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
                Contenido basado en evidencia, no en foros
              </h2>

              <p className="w-full text-center text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
                Cada función nace de la práctica clínica de la Dra. Yasmín Sánchez León:
                pediatra, neonatóloga y puericultora en Loja, Ecuador.
              </p>
            </div>

            <FxButton
              href="/nosotros"
              tone="brand"
              size="lg"
              className="w-full sm:w-auto [&>span]:w-full sm:[&>span]:w-auto"
            >
              Conocer a la fundadora
            </FxButton>
          </div>

          {/* ---------- Centre — the icon ring ---------- */}
          <div className="relative z-10 flex h-[240px] w-full items-center justify-center overflow-clip md:h-[360px] lg:h-[430px] xl:h-[505px]">
            {/* 1000 x 505 ring wrapper, scaled down on smaller viewports */}
            <div
              aria-hidden
              className="absolute top-0 left-1/2 -ml-[500px] h-[505px] w-[1000px] origin-top scale-[0.45] overflow-clip p-[120px] md:scale-[0.7] lg:scale-[0.85] xl:scale-100"
            >
              {/* Avatar List — 940 x 940, centred inside the 1000px wrapper */}
              <div className="absolute top-0 left-[30px] h-[940px] w-[940px]">
                {RING_ARMS.map((arm) => (
                  <div
                    key={arm.angle}
                    className="absolute top-[470px] left-[470px] flex h-[940px] w-20 flex-col justify-between"
                    style={{ transform: `translate(-40px, -470px) rotate(${arm.angle}deg)` }}
                  >
                    {[0, 1].map((end) => (
                      <div
                        key={end}
                        className="flex size-20 items-center justify-center rounded-full bg-white"
                      >
                        <Image
                          src={cunaAsset(arm.icon)}
                          alt=""
                          width={arm.width}
                          height={arm.height}
                          className="size-10 object-contain"
                          style={{ transform: `rotate(${-arm.angle}deg)` }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* ---------- Hub block — centred on top of the ring ---------- */}
            <div className="relative z-20 flex w-full max-w-[520px] flex-col items-center gap-[30px] px-5">
            <div
              className="flex size-20 items-center justify-center overflow-clip rounded-full md:size-[100px] xl:size-[130px]"
              style={{ backgroundImage: HUB_GRADIENT }}
            >
              <Image
                src={cunaAsset("mascota_ok.webp")}
                alt=""
                width={352}
                height={360}
                className="h-10 w-10 object-contain md:h-[52px] md:w-[52px] xl:h-[68px] xl:w-[68px]"
              />
            </div>

            <h3 className="w-full text-center text-[20px] leading-[24px] font-semibold text-[#1d6259] md:text-[24px] md:leading-[29px] xl:text-[28px] xl:leading-[33.6px]">
                Pediatra · Neonatóloga · Puericultora · Máster en Gestión en Salud
              </h3>
            </div>
          </div>

          {/* ---------- Decoration ---------- */}
          <Image
            src={cunaAsset("background_sun_light.webp")}
            alt=""
            aria-hidden
            width={1220}
            height={321}
            className="pointer-events-none absolute bottom-0 left-1/2 w-[200%] max-w-none -translate-x-1/2 object-contain md:w-[1220px]"
          />
        </div>
      </div>
    </section>
  );
}
