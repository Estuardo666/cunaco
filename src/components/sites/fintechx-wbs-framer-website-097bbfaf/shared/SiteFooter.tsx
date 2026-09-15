import Image from "next/image";
import Link from "next/link";
import type { FooterColumn } from "@/types/fintechx";
import { CunaLogo } from "./CunaLogo";
import { FxButton } from "./FxButton";
import { FxGhostButton } from "./FxGhostButton";
import { cunaAsset, fxAsset } from "./assets";

const BG_IMAGE = cunaAsset("background_sun_light.webp");

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Navegación",
    links: [
      { label: "Funciones", href: "/funciones" },
      { label: "Cómo funciona", href: "/#how-it-works" },
      { label: "Para quién es", href: "/#use-cases" },
      { label: "Respaldo médico", href: "/#integrations" },
    ],
  },
  {
    title: "Páginas",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Producto", href: "/producto" },
      { label: "Blog", href: "/blog" },
      { label: "Precios", href: "/precios" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Contacto", href: "/contacto" },
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Privacidad de datos", href: "/privacidad" },
    ],
  },
];

interface SocialLink {
  label: string;
  href: string;
  icon: string;
  /** Pastel ground for the tile — one brand tone per network. */
  tint: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/drayasminpediatra",
    icon: fxAsset("o2TaY2EYkSR14NmiylM3v3i9wM.svg"),
    tint: "#aeebe4",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/drayasminpediatra",
    icon: fxAsset("yapJfaMs4UJGW8x5avLvLiT0juU.svg"),
    tint: "#d6f3e4",
  },
];

/**
 * The brand's 3D mascots close the page.
 *
 * They are the one asset no competitor has (SITE_PLAN §6, hallazgo 3), so the
 * footer ends with the whole cast lined up on a shared baseline rather than
 * with a rule and a copyright line. Heights are deliberately uneven — a row of
 * identically sized characters reads as a logo strip, not as a group.
 */
const MASCOTS = [
  { src: "mascota_thinking.webp", width: 853, height: 1280, displayHeight: 96 },
  { src: "mascota_juntos.webp", width: 868, height: 870, displayHeight: 132 },
  { src: "mascota_ok.webp", width: 791, height: 809, displayHeight: 110 },
  { src: "mascota_relax.webp", width: 683, height: 661, displayHeight: 86 },
  { src: "mascota_peso_bebe.webp", width: 774, height: 857, displayHeight: 118 },
] as const;

/**
 * Closing CTA band + site footer, rendered as one `<footer>` element.
 *
 * Live values (getComputedStyle @ 1440px):
 * - footer: padding 100px 0, flex column, align-items center, position relative
 * - background: cover image + linear-gradient(#fff 0%, #fff 0%, rgba(255,255,255,0.8) 100%)
 * - container: max-width 1260px, padding 0 30px; content 1200 wide, gap 100px
 * - CTA band: 600 wide, gap 40px; h2 48/57.6 w600 -1px #1d6259; p 20/26 w500 #5e6968
 * - footer card: 1200 x 573, padding 100px, #fff, radius 30px, gap 60px
 * - top: 1000 wide, space-between, gap 100px; left 340 gap 40px; right 560 grid
 *   repeat(3, 166.663px) gap 30px
 * - bottom: 1000 x 62, padding-top 30px, space-between, gap 100px; socials 338 wide gap 16px,
 *   tiles 32x32 #f7f3ed radius 10px holding 14x14 icons
 */
export function SiteFooter() {
  return (
    <footer className="relative flex flex-col items-center py-[60px] xl:py-[100px]">
      {/* background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
        <Image
          src={BG_IMAGE}
          alt=""
          width={1440}
          height={810}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
        {/*
          The clone washed the sun image out to near-white. Cuna&Co. closes on
          colour instead: the three brand grounds stacked top to bottom — aqua,
          crema, amarillo suave — so the footer reads as the warm end of the
          page rather than as another white band. Stops are held above 55%
          opacity of white so the body copy inside keeps its contrast.
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #e8f8f6 0%, #f7f3ed 45%, #ffeec2 100%)",
            opacity: 0.9,
          }}
        />
      </div>

      <div className="w-full max-w-[1260px] px-[30px]">
        <div className="relative flex flex-col items-center gap-[60px] xl:gap-[100px]">
          {/* ── CTA band ───────────────────────────────────────────── */}
          <div className="flex w-full max-w-[600px] flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-[10px]">
              <h2 className="text-center text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
                Acompañamiento 24/7, desde el primer día
              </h2>
              <p className="text-center text-[16px] leading-[22px] font-medium text-[#5e6968] md:text-[20px] md:leading-[26px]">
                Descarga Cuna&Co. y lleva el embarazo y los primeros años con registro diario,
                curvas de crecimiento OMS y recordatorios en un solo lugar.
              </p>
            </div>

            <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-5">
              <FxButton
                href="/precios"
                tone="brand"
                size="lg"
                className="max-sm:w-full max-sm:[&>span]:w-full"
              >
                Descargar gratis
              </FxButton>
              <FxGhostButton href="/producto" className="max-sm:w-full">
                Ver la app
              </FxGhostButton>
            </div>
          </div>

          {/* ── Footer card ────────────────────────────────────────── */}
          <div className="flex w-full flex-col gap-10 overflow-clip rounded-[24px] bg-white p-6 md:p-10 md:rounded-[30px] lg:p-[60px] xl:gap-[60px] xl:p-[100px]">
            {/* Top */}
            <div className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-[100px]">
              {/* Left column */}
              <div className="flex flex-col items-start gap-10 lg:w-[340px] lg:shrink-0">
                <div className="flex flex-col gap-5">
                  <Link href="/" className="block overflow-clip">
                    <CunaLogo height={40} />
                  </Link>
                  <p className="text-[18px] leading-[23.4px] font-medium text-[#5e6968]">
                    La app de acompañamiento para mamás, creada por la Dra. Yasmín Sánchez León, pediatra.
                  </p>
                </div>

                <FxGhostButton
                  href="mailto:hola@cunaco.app"
                  tone="dark"
                  className="max-sm:w-full"
                >
                  hola@cunaco.app
                </FxGhostButton>
              </div>

              {/* Right — link columns */}
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:w-[560px] lg:shrink-0 xl:grid-cols-[repeat(3,166.663px)] xl:gap-[30px]">
                {FOOTER_COLUMNS.map((column) => (
                  <div key={column.title} className="flex flex-col gap-5">
                    <h3 className="text-[20px] leading-[26px] font-medium text-[#1d6259]">
                      {column.title}
                    </h3>
                    <ul className="flex flex-col gap-4">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-[16px] leading-[20.8px] font-medium text-[#5e6968] transition-colors duration-200 hover:text-[#4fd3c4]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center gap-5 pt-[30px] md:flex-row md:justify-between md:gap-6 xl:gap-[100px]">

              <div className="flex items-center justify-center gap-4 md:justify-end">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    style={{ backgroundColor: social.tint }}
                    className="group flex size-9 items-center justify-center rounded-[12px] transition-transform duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                  >
                    <Image
                      src={social.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="size-[14px]"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Mascot line-up — the last thing on every page ───────── */}
          <div
            aria-hidden
            className="flex w-full items-end justify-center gap-2 [--fx-mascot:0.5] sm:gap-5 sm:[--fx-mascot:0.72] lg:gap-8 lg:[--fx-mascot:1]"
          >
            {MASCOTS.map((mascot, index) => (
              <Image
                key={mascot.src}
                src={cunaAsset(mascot.src)}
                alt=""
                width={mascot.width}
                height={mascot.height}
                className="fx-float w-auto shrink-0 drop-shadow-[0_14px_18px_rgba(29,98,89,0.14)]"
                style={
                  {
                    height: `calc(${mascot.displayHeight}px * var(--fx-mascot))`,
                    // Staggered so the group breathes out of step, the way a
                    // real line-up of characters would.
                    "--fx-float-delay": `${index * 280}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
