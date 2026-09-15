import type { Metadata } from "next";
import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { StatsSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/StatsSection";
import { AboutHeroSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/nosotros/AboutHeroSection";
import { CredentialBridgeSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/nosotros/CredentialBridgeSection";
import { FoundingQuoteSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/nosotros/FoundingQuoteSection";
import { PhilosophySection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/nosotros/PhilosophySection";

/**
 * Primary keyword for this page is "Dra. Yasmín Sánchez pediatra Loja"
 * (SITE_PLAN §7) — it borrows the authority her name already carries and does
 * not compete with the home page's own keyword.
 */
export const metadata: Metadata = {
  title: "Nosotros — Dra. Yasmín Sánchez León, pediatra en Loja | Cuna&Co.",
  description:
    "Cuna&Co. la fundó la Dra. Yasmín Sánchez León, pediatra y neonatóloga en Loja, Ecuador. Conoce su formación, su filosofía y qué función de la app respalda cada credencial.",
  alternates: { canonical: "/nosotros" },
  openGraph: {
    title: "Nosotros — Dra. Yasmín Sánchez León, pediatra | Cuna&Co.",
    description:
      "La app nació en un consultorio, no en una oficina. Conoce a la pediatra detrás de Cuna&Co.",
    url: "/nosotros",
    type: "profile",
    images: ["/brand/cunaco/mascota_juntos.webp"],
  },
};

/**
 * /nosotros — the page order follows SITE_PLAN §3: founding quote, founder
 * profile, philosophy, the credential → feature bridge, then the shared
 * numbers band.
 */
export default function NosotrosPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <AboutHeroSection />
        <FoundingQuoteSection />
        <PhilosophySection />
        <CredentialBridgeSection />
        <StatsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
