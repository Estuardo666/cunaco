"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import {
  FREEMIUM_COUNT,
  PREMIUM_PRICE,
  PREMIUM_PRODUCTS,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/** Free-card fill — the same 132deg ramp the rest of the site gives its lead cards. */
const CARD_GRADIENT = "linear-gradient(132deg, #2fa79a 0%, #1d6259 100%)";

/**
 * Where the free plan ends.
 *
 * This page lists what the app does; the honest close is the line it does not
 * cross. Naming a few of the workshops and sending people to `/precios` for
 * the price keeps the two pages from competing for the same query — the
 * catalogue lives here, the money argument lives there.
 */
export function PremiumTeaserSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="premium"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <div
          className={cn(
            "relative mx-auto flex w-full max-w-[900px] flex-col items-center gap-6 overflow-clip rounded-[32px] px-6 py-12 text-center md:px-14",
            revealBase,
            revealState,
          )}
          style={{ background: CARD_GRADIENT }}
        >
          <Image
            src={cunaAsset("mascota_relax.webp")}
            alt=""
            aria-hidden
            width={791}
            height={809}
            className="pointer-events-none absolute -right-8 -bottom-10 w-[150px] opacity-25 md:w-[190px]"
          />

          <span className="relative rounded-full bg-white/20 px-4 py-[7px] text-[12px] leading-[16px] font-semibold tracking-[0.5px] text-white uppercase">
            Premium
          </span>

          <h2 className="relative max-w-[600px] font-cuna-display text-[28px] leading-[34px] font-semibold tracking-[-0.5px] text-balance text-white md:text-[36px] md:leading-[43px]">
            Las {FREEMIUM_COUNT} funciones son el piso, no la muestra
          </h2>

          <p className="relative max-w-[520px] text-[16px] leading-[24px] font-medium text-pretty text-[#d6f3e4]">
            Todo lo de esta página es gratis y se queda gratis. Premium añade{" "}
            {PREMIUM_PRODUCTS.length} talleres de la Dra. Sánchez —parto, lactancia,
            alimentación complementaria, primeros auxilios— por {PREMIUM_PRICE.amount}{" "}
            {PREMIUM_PRICE.period}.
          </p>

          <div className="relative mt-2 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <FxButton
              href="/producto"
              tone="brand"
              size="lg"
              className="max-sm:w-full max-sm:[&>span]:w-full"
            >
              Descargar gratis
            </FxButton>
            <FxGhostButton href="/precios" className="max-sm:w-full">
              Ver los planes
            </FxGhostButton>
          </div>
        </div>
      </div>
    </section>
  );
}
