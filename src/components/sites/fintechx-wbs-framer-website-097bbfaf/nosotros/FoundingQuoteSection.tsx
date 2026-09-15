"use client";

import Image from "next/image";
import {
  cunaAsset,
  fxAsset,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/**
 * The founding quote, verbatim.
 *
 * SITE_PLAN §3 requires this text exactly as the Dra. Sánchez wrote it — no
 * paraphrase, no trimming for fit. That is why it gets a band rather than a
 * column: at 443 characters it needs a measure it can breathe in, and it is the
 * single piece of writing on the site that explains why the app exists at all.
 */
const FOUNDING_QUOTE =
  "Desde la experiencia de madre y gracias a la formación obtenida como médica pediatra, pude constatar que el tiempo brindado en un consultorio resulta muy corto con respecto a la cantidad de dudas y sentimiento de zozobra e incertidumbre que abraza a los padres en estos primeros años de vida, es por eso que nace la idea de acompañamiento 24/7 con agenda, recordatorios y talleres con información útil y práctica dentro de una sola aplicación.";

/**
 * Her portrait is still pending (SITE_PLAN open question 4). Until she confirms
 * which image to use, the frame holds a mascot rather than a scraped photo —
 * point this at the real file and the frame takes it as is, no other change.
 */
const FOUNDER_PHOTO: string | null = null;

/**
 * Sub-specialities, from the verified founder data in SITE_PLAN §4.
 *
 * Each gets its own ground so the four read as four things rather than as one
 * grey run of text — and so "Pediatra", her main title, keeps its own weight
 * above them instead of competing.
 */
const CREDENTIALS: readonly { readonly label: string; readonly className: string }[] = [
  { label: "Neurología pediátrica", className: "bg-cuna-aqua text-[#12403b]" },
  { label: "Puericultora", className: "bg-cuna-yellow-soft text-[#7a5200]" },
  { label: "Máster en VIH y Gerencia de Salud", className: "bg-[#e8f8f6] text-[#1d6259]" },
];

interface SocialLink {
  readonly label: string;
  readonly handle: string;
  readonly href: string;
  readonly icon: string;
}

const SOCIALS: readonly SocialLink[] = [
  {
    label: "Instagram",
    handle: "@drayasminpediatra",
    href: "https://www.instagram.com/drayasminpediatra",
    icon: fxAsset("o2TaY2EYkSR14NmiylM3v3i9wM.svg"),
  },
  {
    label: "Facebook",
    handle: "@drayasminpediatra",
    href: "https://www.facebook.com/drayasminpediatra",
    icon: fxAsset("yapJfaMs4UJGW8x5avLvLiT0juU.svg"),
  },
];

/**
 * The founder, in one block.
 *
 * The quote and the identity used to be two sections, which meant her name was
 * announced twice and her credentials sat a screen away from the words that
 * earn them. Here the sequence is the argument: what she saw in consultation,
 * then who she is, then what backs it up, then where to find her.
 */
export function FoundingQuoteSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="fundadora"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <figure
          className={cn(
            "relative mx-auto flex w-full max-w-[880px] flex-col items-center gap-6 overflow-clip rounded-[32px] bg-white px-6 py-10 text-center shadow-[0_0_0_2px_rgba(227,220,209,0.7)] md:px-14 md:py-14",
            revealBase,
            revealState,
          )}
        >
          {/* The mascot anchors the card at low opacity — present, not competing. */}
          <Image
            src={cunaAsset("mascota_juntos.webp")}
            alt=""
            aria-hidden
            width={791}
            height={809}
            className="pointer-events-none absolute -right-8 -bottom-10 w-[150px] opacity-15 md:w-[200px]"
          />

          <span
            aria-hidden
            className="block font-cuna-display text-[72px] leading-[0.5] text-cuna-yellow"
          >
            &ldquo;
          </span>

          <blockquote className="relative text-[17px] leading-[28px] font-medium text-pretty text-[#1d6259] md:text-[21px] md:leading-[34px]">
            {FOUNDING_QUOTE}
          </blockquote>

          <figcaption className="relative flex w-full flex-col items-center gap-4 border-t border-[#e3dcd1] pt-8">
            {/* ---------- Portrait ---------- */}
            <div
              className="flex size-[104px] items-center justify-center overflow-clip rounded-full p-[3px] md:size-[120px]"
              style={{
                backgroundImage: "linear-gradient(135deg, #4fd3c4 0%, #ffbd35 100%)",
              }}
            >
              <div className="relative flex size-full items-center justify-center overflow-clip rounded-full bg-[#f7f3ed]">
                {FOUNDER_PHOTO ? (
                  <Image
                    src={FOUNDER_PHOTO}
                    alt="Dra. Yasmín Sánchez León"
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={cunaAsset("mascota_ok.webp")}
                    alt=""
                    aria-hidden
                    width={360}
                    height={360}
                    className="w-[62%]"
                  />
                )}
              </div>
            </div>

            {/* ---------- Name and role ---------- */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-cuna-display text-[20px] leading-[26px] font-semibold text-[#1d6259] md:text-[24px] md:leading-[30px]">
                Dra. Yasmín Sánchez León
              </span>
              <span className="text-[15px] leading-[20px] font-semibold text-cuna-teal-deep">
                Pediatra · Fundadora de Cuna&amp;Co.
              </span>
            </div>

            <p className="max-w-[520px] text-[15px] leading-[22px] font-medium text-pretty text-[#5e6968] md:text-[16px] md:leading-[24px]">
              Atiende en consulta propia y en el Hospital Clínica San Agustín, en Loja.
              Cuna&amp;Co. es su respuesta a las preguntas que no caben en los quince
              minutos de una cita.
            </p>

            {/* ---------- Sub-specialities ---------- */}
            <ul className="flex flex-wrap justify-center gap-2">
              {CREDENTIALS.map((credential) => (
                <li
                  key={credential.label}
                  className={cn(
                    "rounded-full px-4 py-[7px] text-[13px] leading-[17px] font-semibold",
                    credential.className,
                  )}
                >
                  {credential.label}
                </li>
              ))}
            </ul>

            {/* ---------- Where to find her ---------- */}
            <div className="mt-1 flex flex-wrap justify-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-[10px] rounded-full bg-[#f7f3ed] py-[6px] pr-4 pl-[6px] transition-colors duration-200 ease-out hover:bg-cuna-aqua"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-white">
                    <Image
                      src={social.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="size-[13px]"
                    />
                  </span>
                  <span className="text-[14px] leading-[19px] font-semibold text-[#1d6259]">
                    {social.handle}
                  </span>
                  <span className="sr-only">en {social.label}</span>
                </a>
              ))}
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
