import type { Metadata } from "next";
import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { FeatureGroupsSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/funciones/FeatureGroupsSection";
import { FeaturesHeroSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/funciones/FeaturesHeroSection";
import { GrowthCurvesSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/funciones/GrowthCurvesSection";
import { PremiumTeaserSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/funciones/PremiumTeaserSection";

/**
 * Primary keywords for this page are "control de crecimiento OMS bebé" and
 * "registro de vacunas app" (SITE_PLAN §7). Neither competes with `/producto`
 * ("app Cuna&Co."), `/precios` ("app maternidad gratis") or the home page.
 */
export const metadata: Metadata = {
  title: "Funciones — control de crecimiento OMS y registro de vacunas | Cuna&Co.",
  description:
    "Las 16 funciones de Cuna&Co., una por una: contracciones, lactancia, siestas y pañal; las 4 curvas de crecimiento OMS; vacunas, medicinas con alarma y preguntas al pediatra; checklists y guía de emergencia.",
  alternates: { canonical: "/funciones" },
  openGraph: {
    title: "Funciones — todo lo que la app registra por ti | Cuna&Co.",
    description:
      "Curvas OMS, vacunas, lactancia, siestas, pañal, medicinas con alarma y checklists. Las 16, gratis.",
    url: "/funciones",
    images: ["/brand/cunaco/mascota_juntos.webp"],
  },
};

/**
 * /funciones — the catalogue.
 *
 * The division of labour with `/producto` is deliberate (SITE_PLAN §3, and the
 * keyword split in §7): `/producto` tells the story — the two flows, the real
 * screens, how to start — and never lists the functions in full. This page
 * lists them in full and never re-tells the story. Each links to the other
 * exactly once.
 *
 * The list itself is `shared/catalog.ts`, which `/precios` also reads, so a
 * function cannot appear here and be missing from the comparison table.
 */
export default function FuncionesPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <FeaturesHeroSection />
        <FeatureGroupsSection />
        <GrowthCurvesSection />
        <PremiumTeaserSection />
      </main>

      <SiteFooter />
    </div>
  );
}
