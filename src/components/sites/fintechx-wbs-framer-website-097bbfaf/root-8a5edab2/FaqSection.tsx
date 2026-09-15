"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FaqAccordion } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FaqAccordion";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/fintechx";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FAQS: readonly FaqItem[] = [
  {
    question: "¿Cuna&Co. reemplaza al pediatra?",
    answer:
      "No. Cuna&Co. es una herramienta de acompañamiento y registro: te ayuda a organizar la información y a llegar mejor preparada a la consulta, pero nunca sustituye la valoración de tu pediatra.",
  },
  {
    question: "¿Qué pasa con los datos de mi bebé?",
    answer:
      "Los registros de salud se guardan cifrados y solo tú los ves. No se venden ni se comparten con terceros.",
  },
  {
    question: "¿En qué dispositivos está disponible?",
    answer:
      "Cuna&Co. está disponible en Android a través de Play Store. La versión para iOS está en desarrollo.",
  },
  {
    question: "¿Cuál es la diferencia entre Freemium y Premium?",
    answer:
      "El plan Freemium incluye las 16 funciones de registro y seguimiento, gratis y sin plazo. Premium añade los 13 talleres de contenido educativo, y se activa desde Google Play.",
  },
  {
    question: "¿Quién está detrás de Cuna&Co.?",
    answer:
      "La Dra. Yasmín Sánchez León, pediatra, neonatóloga y puericultora en Loja, Ecuador. La idea nació de su propia experiencia como madre y como médica.",
  },
];

/** Overlapping avatar stack — natural 150 x 150, rendered 40 x 40. */
const AVATARS: readonly string[] = [
  "mascota_ok.webp",
  "mascota_relax.webp",
  "mascota_thinking.webp",
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function FaqSection() {
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
    <section
      ref={sectionRef}
      id="faqs"
      className="flex w-full flex-col items-center pb-[60px] lg:pb-[100px]"
    >
      {/* Container */}
      <div className="w-full max-w-[1260px] px-[30px]">
        {/*
          Content. Mobile / tablet order: header, accordion, aside card.
          Desktop: 424px + 70px gap + 706px, with the aside 80px under the header.
        */}
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-[424px_706px] lg:gap-x-[70px] lg:gap-y-0">
          {/* ---------------------------------------------------------- */}
          {/* Left column — header                                       */}
          {/* ---------------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full flex-col gap-[10px] lg:col-start-1 lg:row-start-1",
              revealBase,
              revealState,
            )}
          >
            <h2 className="w-full text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
              Preguntas frecuentes
            </h2>
            <p className="w-full text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[23.4px]">
              Respuestas rápidas sobre la app, la privacidad de los datos y los planes.
            </p>
            <Link
              href="/preguntas-frecuentes"
              className="mt-2 inline-flex w-fit items-center text-[16px] leading-[20.8px] font-semibold text-cuna-teal-deep underline-offset-4 transition-colors duration-200 hover:text-[#1d6259] hover:underline"
            >
              Ver todas las preguntas →
            </Link>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Aside card                                                 */}
          {/* ---------------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full flex-col gap-5 overflow-clip rounded-[24px] bg-[#f7f3ed] p-6 lg:col-start-1 lg:row-start-2 lg:mt-20 lg:rounded-[30px] lg:p-10",
              revealBase,
              revealState,
            )}
          >
            {/* Top row */}
            <div className="flex h-10 items-center">
              {/* Avatar stack — each avatar occupies 30px so they overlap by 10px */}
              <div className="flex w-[100px] shrink-0 pr-[10px]">
                {AVATARS.map((file) => (
                  <div key={file} className="w-[30px] shrink-0">
                    <Image
                      src={cunaAsset(file)}
                      alt=""
                      width={150}
                      height={150}
                      className="size-10 max-w-none overflow-hidden rounded-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <span
                aria-hidden
                className="text-[18px] leading-[23.4px] font-semibold text-[#1d6259]"
              >
                +
              </span>

              <span className="ml-[10px] flex size-10 shrink-0 items-center justify-center rounded-full bg-[#1d6259] text-[14px] leading-[18.2px] font-semibold text-white">
                Tú
              </span>
            </div>

            {/* Bottom block */}
            <div className="flex flex-col gap-4">
              {/* Title and description sit in their own 4px-gap block on the live
                  site (54px together), with the 16px gap only before the CTA. */}
              <div className="flex flex-col gap-1">
                <p className="text-[20px] leading-[24px] font-semibold text-[#1d6259] lg:text-[24px] lg:leading-[28.8px]">
                  ¿Te queda alguna duda?
                </p>
                <p className="text-[16px] leading-[20.8px] font-medium text-[#5e6968]">
                  Escríbenos y te acompañamos.
                </p>
              </div>
              <FxButton
                href="/contacto"
                tone="dark"
                size="lg"
                className="w-full lg:w-auto [&>span]:w-full lg:[&>span]:w-auto"
              >
                Contactar
              </FxButton>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* Right column — accordion                                   */}
          {/* ---------------------------------------------------------- */}
          <div
            className={cn(
              "w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-[706px]",
              revealBase,
              revealState,
            )}
          >
            <FaqAccordion items={FAQS} idPrefix="faq" defaultOpen={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
