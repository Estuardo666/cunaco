"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cunaAsset, fxAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { cn } from "@/lib/utils";
import type { TestimonialItem } from "@/types/fintechx";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface TrustStat {
  readonly icon: string;
  /** natural + rendered icon size (identical on the live site) */
  readonly width: number;
  readonly height: number;
  readonly label: string;
}

const TRUST_STATS: readonly TrustStat[] = [
  {
    icon: "mascota_ok.webp",
    width: 19,
    height: 18,
    label: "Creada por una pediatra",
  },
  {
    icon: "ic_premium.webp",
    width: 20,
    height: 18,
    label: "16 funciones gratis",
  },
  {
    icon: "mascota_juntos.webp",
    width: 24,
    height: 18,
    label: "Comunidad de mamás",
  },
];

const TESTIMONIALS: readonly TestimonialItem[] = [
  {
    quote:
      "Por fin entiendo si mi bebé está creciendo bien. Las curvas OMS me sacaron una angustia enorme.",
    name: "María José C.",
    role: "Mamá primeriza, Loja",
    avatar: "mascota_ok.webp",
  },
  {
    quote:
      "Con dos hijos ya no se me pasa ninguna vacuna ni control. Todo está en la app.",
    name: "Andrea V.",
    role: "Mamá de dos, Cuenca",
    avatar: "mascota_relax.webp",
  },
  {
    quote:
      "El registro de lactancia y siestas me ayudó a entender el ritmo de mi bebé las primeras semanas.",
    name: "Daniela R.",
    role: "Mamá de recién nacido, Quito",
    avatar: "mascota_thinking.webp",
  },
  {
    quote:
      "Llegué al control con el reporte listo. Mi pediatra pudo ver todo el mes de un vistazo.",
    name: "Paola M.",
    role: "Mamá, Ambato",
    avatar: "mascota_peso_bebe.webp",
  },
  {
    quote:
      "Los checklists de preparto y de viaje me salvaron. Nada de listas sueltas en el celular.",
    name: "Gabriela S.",
    role: "Embarazada, Loja",
    avatar: "mascota_juntos.webp",
  },
];

/** The first avatar is the only one with a non-150×150 natural size. */
const AVATAR_NATURAL: Record<string, { width: number; height: number }> = {
  "7Z2d6WeDiCpoz0B6ookMTPOFAU.jpg": { width: 50, height: 57 },
};

/** Top wash: transparent at the bottom edge, solid white at the top. */
const BG_TOP_GRADIENT =
  "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)";

/** Bottom wash: transparent at the top edge, solid white at the bottom. */
const BG_BOTTOM_GRADIENT =
  "linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)";

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function TestimonialCard({
  item,
  duplicate,
}: {
  item: TestimonialItem;
  duplicate?: boolean;
}) {
  const natural = AVATAR_NATURAL[item.avatar] ?? { width: 150, height: 150 };

  return (
    <li
      aria-hidden={duplicate}
      className={cn(
        "mr-[20px] flex h-[260px] w-[300px] shrink-0 flex-col justify-between",
        "overflow-hidden rounded-[24px] bg-white p-[24px]",
        "md:mr-[40px] md:h-[280px] md:w-[340px] md:rounded-[30px] md:p-[32px]",
        "xl:mr-[50px] xl:h-[300px] xl:w-[400px] xl:p-[40px]",
      )}
    >
      {/* ---------- Top ---------- */}
      <div className="flex flex-col gap-[16px] pb-[24px] md:pb-[32px] xl:pb-[40px]">
        <Image
          src={fxAsset("Ks3rxCrb5LDuCsoN57uNgnYXtc.svg")}
          alt=""
          aria-hidden
          width={182}
          height={30}
          className="h-[18px] w-[109px] object-contain"
        />
        <p className="w-full text-[16px] leading-[21px] font-medium text-[#1d6259] xl:text-[18px] xl:leading-[23.4px]">
          {item.quote}
        </p>
      </div>

      {/* ---------- Bottom ---------- */}
      <div className="flex items-center gap-[16px]">
        <Image
          src={cunaAsset(item.avatar)}
          alt=""
          aria-hidden
          width={natural.width}
          height={natural.height}
          className="size-[44px] shrink-0 overflow-clip rounded-full object-cover xl:size-[50px]"
        />
        <div className="flex flex-col justify-center gap-[2px]">
          <p className="text-[18px] leading-[23px] font-medium text-[#1d6259] xl:text-[20px] xl:leading-[26px]">
            {item.name}
          </p>
          <p className="text-[14px] leading-[18.2px] font-medium text-[#5e6968]">
            {item.role}
          </p>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function TestimonialSection() {
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
    "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";
  const revealState = entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative flex w-full flex-col items-center overflow-clip py-[100px] xl:py-[200px]"
    >
      {/* ---------------------------------------------------------- */}
      {/* Background layer                                           */}
      {/* ---------------------------------------------------------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
        <Image
          src={cunaAsset("background_sun_light.webp")}
          alt=""
          width={1440}
          height={810}
          className="h-full w-full object-cover"
        />
        <div
          className="absolute top-0 right-[-10px] left-[-10px] h-[200px]"
          style={{ backgroundImage: BG_TOP_GRADIENT }}
        />
        <div
          className="absolute right-[-10px] bottom-0 left-[-10px] h-[200px]"
          style={{ backgroundImage: BG_BOTTOM_GRADIENT }}
        />
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Container                                                  */}
      {/* ---------------------------------------------------------- */}
      <div className="relative z-10 flex w-full max-w-[1260px] flex-col gap-[50px] px-[30px]">
        {/* ---------- Top row ---------- */}
        <div
          className={cn(
            "flex w-full flex-col items-start gap-[24px]",
            "xl:flex-row xl:items-start xl:justify-between xl:gap-[50px]",
            revealBase,
            revealState,
          )}
        >
          {/* Left */}
          <div className="flex w-full flex-col gap-[20px] xl:w-[719px]">
            <h2 className="text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
              Lo que dicen las mamás
            </h2>

            <ul className="flex w-full flex-col items-start gap-[10px] md:flex-row md:items-center md:gap-[20px]">
              {TRUST_STATS.map((stat, index) => (
                <li
                  key={stat.label}
                  className="flex items-center gap-[10px] md:gap-[20px]"
                >
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="hidden h-[22px] w-px shrink-0 overflow-clip bg-[#1d6259] md:block"
                    />
                  ) : null}
                  <span className="flex items-center gap-[6px]">
                    <Image
                      src={cunaAsset(stat.icon)}
                      alt=""
                      aria-hidden
                      width={stat.width}
                      height={stat.height}
                      className="shrink-0"
                    />
                    <span className="text-[16px] leading-[20.8px] font-medium text-[#5e6968]">
                      {stat.label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="flex w-full items-center xl:w-[431px] xl:justify-end">
            <FxButton
              href="/precios"
              tone="dark"
              size="lg"
              className="w-full sm:w-auto [&>span]:w-full sm:[&>span]:w-auto"
            >
              Descargar gratis
            </FxButton>
          </div>
        </div>

        {/* ---------- Ticker ---------- */}
        <div className="w-full overflow-clip">
          <ul
            className="fx-marquee-track flex w-max hover:[animation-play-state:paused] motion-reduce:animate-none"
            style={{ ["--fx-marquee-duration" as string]: "50s" }}
          >
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={`a-${item.name}`} item={item} />
            ))}
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={`b-${item.name}`} item={item} duplicate />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
