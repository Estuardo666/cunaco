import type { Metadata } from "next";
import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { FlowsSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/producto/FlowsSection";
import { GetStartedSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/producto/GetStartedSection";
import { ProductHeroSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/producto/ProductHeroSection";
import { ScreensSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/producto/ScreensSection";

export const metadata: Metadata = {
  title: "Producto — la app Cuna&Co. por dentro | Cuna&Co.",
  description:
    "Cuna&Co. se bifurca en dos caminos: embarazo y bebé nacido. Mira las pantallas reales de la app —panel, lactancia, curvas OMS y vacunas— y cómo empezar en tres pasos. Disponible en Android.",
  alternates: { canonical: "/producto" },
  openGraph: {
    title: "Producto — la app Cuna&Co. por dentro",
    description:
      "Dos caminos, un embarazo y un bebé. Las pantallas reales de la app, y cómo empezar.",
    url: "/producto",
    images: ["/brand/cunaco/mascota_juntos.webp"],
  },
};

/**
 * /producto — SITE_PLAN §3: the two flows explained with a screen from each,
 * the real captures, availability stated honestly, and "cómo empezar" in three
 * steps.
 */
export default function ProductoPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <ProductHeroSection />
        <FlowsSection />
        <ScreensSection />
        <GetStartedSection />
      </main>

      <SiteFooter />
    </div>
  );
}
