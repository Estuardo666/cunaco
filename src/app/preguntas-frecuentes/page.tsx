import type { Metadata } from "next";
import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { FaqCategoriesSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/preguntas-frecuentes/FaqCategoriesSection";
import { FaqHeroSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/preguntas-frecuentes/FaqHeroSection";
import { FaqSupportSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/preguntas-frecuentes/FaqSupportSection";
import { ALL_FAQ_ITEMS } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/preguntas-frecuentes/faq-data";

/**
 * Primary keyword: "app para mamás preguntas frecuentes / Cuna&Co." — the page
 * targets the doubt-shaped long tail ("¿reemplaza al pediatra?", "¿está en
 * iPhone?") and does not compete with the home or /producto keywords
 * (SITE_PLAN §7).
 */
export const metadata: Metadata = {
  title: "Preguntas frecuentes | Cuna&Co.",
  description:
    "Respuestas sobre Cuna&Co.: si reemplaza al pediatra, qué pasa con los datos de tu bebé, en qué dispositivos está disponible y qué incluye el plan gratuito frente a Premium.",
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: {
    title: "Preguntas frecuentes | Cuna&Co.",
    description:
      "Uso médico, privacidad de los datos del bebé, plataformas y planes. Las dudas que ya escuchamos en consulta.",
    url: "/preguntas-frecuentes",
    images: ["/brand/cunaco/mascota_ok.webp"],
  },
};

/**
 * FAQPage structured data (SITE_PLAN §7), generated from the same array the
 * accordion renders so the markup can never drift from the visible answers.
 */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ALL_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/**
 * /preguntas-frecuentes — hero with anchor chips, five category blocks, and a
 * contact escape hatch.
 */
export default function PreguntasFrecuentesPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <script
        type="application/ld+json"
        // Content is a local constant, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <FaqHeroSection />
        <FaqCategoriesSection />
        <FaqSupportSection />
      </main>

      <SiteFooter />
    </div>
  );
}
