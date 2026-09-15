"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  cunaAsset,
  fxAsset,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import {
  CunaPanelScreen,
  type CunaScreenVariant,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPanelScreen";
import {
  lerp,
  useScrollSpring,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/motion";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { cn } from "@/lib/utils";

interface TrustItem {
  /** Original Framer asset filename. */
  icon: string;
  /** Natural intrinsic size of the SVG. */
  naturalWidth: number;
  naturalHeight: number;
  /** Tailwind classes controlling the rendered icon box. */
  sizeClassName: string;
  label: string;
}

const TRUST_ITEMS: readonly TrustItem[] = [
  {
    icon: "DR5ESv57oR37TVFwEH7Mx1yI0.svg",
    naturalWidth: 19,
    naturalHeight: 18,
    sizeClassName: "h-[18px] w-[19px]",
    label: "Creada por una pediatra",
  },
  {
    icon: "TPz3R1Zrox75UYaGWia5OJWG0LY.svg",
    naturalWidth: 17,
    naturalHeight: 18,
    sizeClassName: "h-[18px] w-[17px]",
    label: "Tus datos, privados",
  },
  {
    icon: "yMT4mMoFpKnWs2yU5HHxgRIdrc.svg",
    naturalWidth: 13,
    naturalHeight: 20,
    sizeClassName: "h-[18px] w-[12px]",
    label: "Curvas OMS oficiales",
  },
];

/**
 * Hero section.
 *
 * Desktop (1440px) measured values:
 * - section 1425 x 1575, background #fff, padding-top 194px, overflow hidden
 * - three decorative cloud PNGs on z-1, content on z-2
 * - a full-bleed decoration PNG pinned 200px above the bottom edge
 * - a 200px white gradient fade covering the bottom edge
 */
/**
 * Scroll-linked parallax, measured on the live site at a 1440px viewport by
 * settling the page at scrollY 0 and at scrollY 900 and reading the resulting
 * matrices (the original springs these values, so mid-flight reads drift):
 *
 * | element                    | scrollY 0                     | scrollY 900                        |
 * |----------------------------|-------------------------------|------------------------------------|
 * | dashboard block 1060x614   | scale(0.64) translateY(-190)  | scale(1) translateY(0)             |
 * | decoration wrapper         | opacity 1                     | opacity 0                          |
 * | decoration image 1445x565  | scale(1) translateY(0)        | scale(1.93652) translateY(1311.13) |
 *
 * The dashboard's 678 x 393 rendered size at rest is simply 1060 x 614 at 0.64 —
 * it is one element that grows into place, not a smaller image.
 */
/**
 * The hero is one 100vh panel now, so the parallax runs over a single viewport
 * instead of the 900px the Framer original used: everything the section has to
 * say is on screen at rest, and scrolling only carries it away.
 */
const PARALLAX_DISTANCE = 700;

const PHONE_FROM = { scale: 1, y: 0 };
const PHONE_TO = { scale: 1.06, y: -70 };
const DECORATION_TO = { scale: 1.35, y: 280 };

/**
 * One phone in the hero cluster. The side units are 82% of the centre one,
 * rotated a few degrees and slid underneath it with a negative margin, so the
 * three read as a single stack rather than three separate mockups.
 */
function Phone({
  variant,
  side,
}: {
  variant: CunaScreenVariant;
  side?: "left" | "right";
}) {
  const isSide = side !== undefined;

  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden bg-cuna-teal-dark",
        "rounded-[36px] border-[10px] border-cuna-teal-dark",
        isSide
          ? [
              // Behind the centre phone, scaled down and tilted outwards.
              "z-0 hidden lg:block",
              "h-[clamp(250px,34vh,344px)] w-[clamp(140px,17vh,176px)]",
              "shadow-[0_16px_40px_rgba(18,64,59,0.20)]",
              side === "left"
                ? "-mr-[46px] origin-bottom-right -rotate-[7deg]"
                : "-ml-[46px] origin-bottom-left rotate-[7deg]",
            ]
          : [
              "z-[1]",
              "h-[560px] w-[280px]",
              "lg:h-[clamp(300px,42vh,420px)] lg:w-[clamp(170px,21vh,215px)]",
              "shadow-[0_24px_60px_rgba(18,64,59,0.28)]",
            ],
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-[26px]">
        <CunaPanelScreen variant={variant} />
      </div>
    </div>
  );
}

export function HeroSection() {
  const progress = useScrollSpring({ distance: PARALLAX_DISTANCE });
  const [parallaxOn, setParallaxOn] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setParallaxOn(query.matches);
    const id = window.setTimeout(sync, 0);
    query.addEventListener("change", sync);
    return () => {
      window.clearTimeout(id);
      query.removeEventListener("change", sync);
    };
  }, []);

  const dashboardStyle = parallaxOn
    ? {
        transform: `translateY(${lerp(PHONE_FROM.y, PHONE_TO.y, progress)}px) scale(${lerp(
          PHONE_FROM.scale,
          PHONE_TO.scale,
          progress,
        )})`,
        transformOrigin: "center top",
        willChange: "transform",
      }
    : undefined;

  const decorationStyle = parallaxOn
    ? { opacity: 1 - progress * 0.85, willChange: "opacity" }
    : undefined;

  const decorationImageStyle = parallaxOn
    ? {
        transform: `translateY(${lerp(0, DECORATION_TO.y, progress)}px) scale(${lerp(
          1,
          DECORATION_TO.scale,
          progress,
        )})`,
        transformOrigin: "center",
        willChange: "transform",
      }
    : undefined;

  return (
    <section
      id="hero"
      className={cn(
        "relative flex w-full flex-col items-center overflow-hidden bg-cuna-cream-2",
        "pt-[120px] pb-16",
        // Desktop: exactly one viewport tall, with whatever falls past the fold
        // clipped instead of stretching the section to 1575px.
        "lg:h-[100svh] lg:min-h-[720px] lg:justify-start lg:pt-[150px] lg:pb-0",
      )}
    >
      {/* 1 — background: the app's `background1_sun` pattern, rotated 90deg
          (the source drawable is portrait; the hero band is landscape). It is
          tiled rather than stretched so the suns keep their scale from mobile
          up to ultrawide, with a cream wash over it to keep the copy legible. */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 [background-size:380px_auto] md:[background-size:560px_auto] lg:[background-size:760px_auto]"
        style={{
          backgroundImage: `url(${cunaAsset("background1_sun_rot90.webp")})`,
          backgroundRepeat: "repeat",
          backgroundPosition: "top center",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-cuna-cream/55"
      />

      {/* The Framer clouds (layers 2-4) are dropped: the sun pattern is the
          background now, and white clouds over it just muddied it. */}

      {/* 5 — content */}
      <div className="relative z-[2] flex w-full max-w-[1260px] flex-col items-center gap-[50px] px-[30px]">
        <div className="flex w-full flex-col items-center gap-[44px] md:gap-14 lg:gap-[clamp(24px,3.2vh,44px)]">
          {/* TOP BLOCK */}
          <div className="flex flex-col items-center gap-10">
            {/* A — title + sub */}
            <div className="flex flex-col items-center gap-5">
              <h1
                className={cn(
                  "flex flex-wrap items-center justify-center gap-3 text-center font-semibold text-[#1d6259]",
                  "text-[40px] leading-[44px] tracking-[-0.5px]",
                  "md:text-[64px] md:leading-[66px]",
                  "lg:flex-nowrap lg:gap-[30px] lg:text-[clamp(56px,7.2vh,100px)] lg:leading-[1] lg:tracking-[-1.4px]",
                )}
              >
                <span>Crianza</span>
                <Image
                  src={cunaAsset("icono_app_panal.webp")}
                  alt=""
                  width={478}
                  height={602}
                  priority
                  className="h-14 w-14 shrink-0 object-contain md:h-20 md:w-20 lg:h-[clamp(70px,9vh,124px)] lg:w-[clamp(70px,9vh,124px)]"
                />
                <span>acompañada</span>
              </h1>

              <p className="max-w-[600px] text-center text-[16px] leading-[22px] font-medium text-[#5e6968] lg:text-[20px] lg:leading-[26px]">
                Registro diario, curvas de crecimiento OMS, vacunas y recordatorios.
                Creada por la Dra. Yasmín Sánchez León, pediatra en ejercicio.
              </p>
            </div>

            {/* B — buttons */}
            <div className="flex w-full flex-col items-stretch justify-center gap-3 md:w-auto md:flex-row md:items-center md:gap-5">
              <FxButton href="/precios" tone="brand" size="lg">
                Descargar gratis
              </FxButton>
              <FxGhostButton href="/producto">Ver la app</FxGhostButton>
            </div>

            {/* C — trust list */}
            <ul className="flex flex-col items-center justify-center gap-3 md:h-[22px] md:flex-row md:gap-5">
              {TRUST_ITEMS.map((item, index) => (
                <li key={item.label} className="contents">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="hidden h-[22px] w-px bg-[#1d6259] md:block"
                    />
                  ) : null}
                  <span className="flex items-center gap-[6px]">
                    <Image
                      src={fxAsset(item.icon)}
                      alt=""
                      aria-hidden
                      width={item.naturalWidth}
                      height={item.naturalHeight}
                      className={cn("shrink-0 object-contain", item.sizeClassName)}
                    />
                    <span className="text-[16px] leading-[20.8px] font-medium text-[#5e6968]">
                      {item.label}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* BOTTOM BLOCK — three real app screens. The centre phone is the
              "Panel" dashboard; the two flanking ones are smaller, pushed back
              and tucked behind it so the cluster reads as one object. The
              section clips whatever falls past the fold, which is what gives
              the hero its depth. */}
          <div className="flex w-full max-w-[1060px] items-start justify-center">
            <div
              style={dashboardStyle}
              className="flex w-full items-end justify-center"
            >
              <Phone variant="contracciones" side="left" />
              <Phone variant="panel" />
              <Phone variant="vacunas" side="right" />
            </div>
          </div>
        </div>
      </div>

      {/* 6 — decoration: the two mascots sit in the panel's bottom corners,
          fully visible at rest. Scrolling drifts them down and out. */}
      <div
        style={decorationStyle}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden lg:block"
      >
        <div
          style={decorationImageStyle}
          className="flex w-full items-end justify-between px-[clamp(0px,7vw,150px)]"
        >
          <Image
            src={cunaAsset("mascota_juntos.webp")}
            alt=""
            aria-hidden
            width={868}
            height={870}
            className="h-[clamp(260px,44vh,440px)] w-auto object-contain"
          />
          <Image
            src={cunaAsset("icono_app_visita_pediatra.webp")}
            alt=""
            aria-hidden
            width={732}
            height={610}
            className="h-[clamp(230px,39vh,390px)] w-auto object-contain"
          />
        </div>
      </div>

      {/* 7 — bottom fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10px] bottom-0 left-[-10px] z-[2] h-[120px]"
        style={{
          background:
            "linear-gradient(rgba(253,251,247,0) 0%, rgba(253,251,247,0.65) 45%, #fdfbf7 100%)",
        }}
      />
    </section>
  );
}
