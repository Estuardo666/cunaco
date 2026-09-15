"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FaqAccordion } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FaqAccordion";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/fintechx";
import { FREEMIUM_COUNT } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";

/**
 * The money questions, answered here rather than only on `/preguntas-frecuentes`.
 *
 * These five are the ones a visitor has *while looking at the plans*: what the
 * free tier really covers, what paying adds, and how to stop paying. The
 * general FAQ keeps its own broader set; the overlap is deliberate and small.
 */
const PRICING_FAQ: readonly FaqItem[] = [
  {
    question: "¿El plan gratuito caduca?",
    answer: `No. Las ${FREEMIUM_COUNT} funciones freemium son gratuitas de forma permanente: no hay periodo de prueba, ni un límite de registros, ni un bloqueo después de unas semanas.`,
  },
  {
    question: "¿Necesito una tarjeta para descargar la app?",
    answer:
      "No. Descargas Cuna&Co. desde Play Store y usas todo el plan freemium sin registrar ningún medio de pago. La tarjeta solo entra en juego si decides activar Premium.",
  },
  {
    question: "¿Qué me da Premium que no tenga gratis?",
    answer:
      "Los talleres: contenido educativo estructurado sobre parto, lactancia, alimentación complementaria, primeros auxilios y estimulación, escrito por la Dra. Sánchez. El registro y el seguimiento del día a día no cambian, porque ya están completos en el plan gratuito.",
  },
  {
    question: "¿Puedo cancelar Premium?",
    answer:
      "Sí, cuando quieras, desde tus suscripciones en Google Play. Al cancelar vuelves al plan gratuito y conservas todos tus registros: nada de lo que anotaste se pierde ni se bloquea.",
  },
  {
    question: "¿Puedo pagar Premium desde el sitio web?",
    answer:
      "No. La suscripción se activa dentro de la app, a través de Google Play. Este sitio es informativo y no procesa cobros.",
  },
];

export function PricingFaqSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      id="precios-faq"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col items-start gap-10 px-[30px] lg:flex-row lg:gap-[70px]">
        {/* ---------- Left — heading + escape hatch ---------- */}
        <div
          className={cn(
            "flex w-full flex-col items-start gap-5 lg:sticky lg:top-[120px] lg:w-[380px] lg:flex-none",
            revealBase,
            revealState,
          )}
        >
          <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
            <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
              Sobre el pago
            </span>
          </div>

          <h2 className="w-full text-[28px] leading-[34px] font-semibold tracking-[-0.5px] text-[#1d6259] md:text-[36px] md:leading-[43px]">
            Lo que preguntan antes de pagar
          </h2>

          <p className="w-full max-w-[340px] text-[15px] leading-[22px] font-medium text-[#5e6968] md:text-[16px] md:leading-[24px]">
            Si tu duda es sobre la app y no sobre el precio, la respuesta probablemente
            está en las preguntas frecuentes.
          </p>

          <FxGhostButton
            href="/preguntas-frecuentes"
            tone="dark"
            className="max-sm:w-full max-sm:[&>span]:w-full"
          >
            Ver todas las preguntas
          </FxGhostButton>

          <Image
            src={cunaAsset("mascota_thinking.webp")}
            alt=""
            aria-hidden
            width={791}
            height={809}
            className="pointer-events-none mt-2 hidden w-[180px] opacity-80 lg:block"
          />
        </div>

        {/* ---------- Right — accordion ---------- */}
        <div className={cn("w-full lg:flex-1", revealBase, revealState)}>
          <FaqAccordion items={PRICING_FAQ} idPrefix="precios-faq" defaultOpen={0} />
        </div>
      </div>
    </section>
  );
}
