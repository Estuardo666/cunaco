import type { Metadata } from "next";
import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { PlansSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/precios/PlansSection";
import { PricingFaqSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/precios/PricingFaqSection";
import { PricingHeroSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/precios/PricingHeroSection";

/**
 * Primary keyword for this page is "app maternidad gratis" (SITE_PLAN §7) — it
 * does not compete with `/funciones` ("control de crecimiento OMS bebé") or
 * with the home page's own.
 */
export const metadata: Metadata = {
  title: "Precios — la app es gratis | Cuna&Co.",
  description:
    "Las 16 funciones de Cuna&Co. son gratuitas de forma permanente: registros diarios, curvas de crecimiento OMS, vacunas y medicinas con alarma. Premium añade los 13 talleres de la Dra. Sánchez.",
  alternates: { canonical: "/precios" },
  openGraph: {
    title: "Precios — la app es gratis | Cuna&Co.",
    description:
      "Todo el registro y el seguimiento, gratis y sin tarjeta. Premium añade los talleres de la Dra. Sánchez.",
    url: "/precios",
    images: ["/brand/cunaco/mascota_juntos.webp"],
  },
};

/**
 * /precios — SITE_PLAN §3 asks for two columns. The plan file predates both
 * the Android audit and the decision to write this page in its launched form,
 * so the Freemium column is the 16 verified
 * features rather than §5's 17: screen-time control and the lactation-safe
 * medicine lookup are not in the app, and the emergency guide is. See
 * `precios/pricing-data.ts` for the per-feature evidence.
 */
export default function PreciosPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <PricingHeroSection />
        <PlansSection />
        <PricingFaqSection />
      </main>

      <SiteFooter />
    </div>
  );
}
