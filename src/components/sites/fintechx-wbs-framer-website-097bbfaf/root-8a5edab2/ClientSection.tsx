import Image from "next/image";
import type { ClientLogo } from "@/types/fintechx";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";

const CLIENT_LOGOS: ClientLogo[] = [
  { src: "icono_app_contraction.webp", alt: "", width: 299, height: 360 },
  { src: "icono_app_gota.webp", alt: "", width: 360, height: 240 },
  { src: "icono_app_sueno.webp", alt: "", width: 360, height: 341 },
  { src: "icono_app_panal.webp", alt: "", width: 286, height: 360 },
  { src: "ic_vacunas.webp", alt: "", width: 322, height: 360 },
  { src: "icono_app_perimetro.webp", alt: "", width: 337, height: 360 },
  { src: "icono_app_altura.webp", alt: "", width: 310, height: 360 },
  { src: "mascota_peso_bebe.webp", alt: "", width: 340, height: 360 },
  { src: "icono_app_pediatra.webp", alt: "", width: 311, height: 360 },
  { src: "icono_app_visita_pediatra.webp", alt: "", width: 360, height: 300 },
  { src: "iconos_arbol.webp", alt: "", width: 330, height: 360 },
];

const MARQUEE_MASK =
  "linear-gradient(to right, transparent, #1d6259 10%, #1d6259 90%, transparent)";

function LogoRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul
      aria-hidden={ariaHidden}
      className="m-0 flex list-none items-center gap-10 p-0 lg:gap-[60px]"
    >
      {CLIENT_LOGOS.map((logo) => (
        <li key={logo.src} className="flex shrink-0 items-center">
          <Image
            src={cunaAsset(logo.src)}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="h-[30px] w-auto object-contain lg:h-9"
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Client logo marquee.
 *
 * Live values (getComputedStyle @ 1440px):
 * - section: full width, height 118px, padding 0, transparent background,
 *   flex column, centered, gap 20px, overflow hidden
 * - label: 14px / 18.2px, weight 500, color #1d6259
 * - track: flex, align-items center, gap 60px, width max-content,
 *   translateX(0) -> translateX(-50%) over a linear infinite loop
 * - logos: height 20px, width auto, object-fit contain
 *
 * Mobile (390px): auto height with 32px vertical padding, 13px label,
 * 40px marquee gap, 18px logo height.
 *
 * No hover / click / scroll behavior — the marquee runs continuously.
 */
export function ClientSection() {
  return (
    <section
      id="marquee"
      className="flex w-full flex-col items-center justify-center gap-5 overflow-hidden py-8 lg:h-[118px] lg:py-0"
    >
      <p className="m-0 text-center text-[13px] font-medium leading-[18.2px] text-[#1d6259] lg:text-[14px]">
        Los íconos de la app, hechos a mano para Cuna&amp;Co.
      </p>
      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: MARQUEE_MASK,
          WebkitMaskImage: MARQUEE_MASK,
        }}
      >
        <div
          className="fx-marquee-track flex w-max items-center gap-10 motion-reduce:animate-none lg:gap-[60px]"
          style={{ "--fx-marquee-duration": "40s" } as React.CSSProperties}
        >
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
