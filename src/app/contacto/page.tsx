import type { Metadata } from "next";
import { Navbar } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/Navbar";
import { SiteFooter } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter";
import { ContactSection } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/contacto/ContactSection";

export const metadata: Metadata = {
  title: "Contacto | Cuna&Co.",
  description:
    "Escríbenos por dudas sobre la app Cuna&Co., sugerencias de funciones o propuestas de alianza. Formulario, correo y redes de la Dra. Yasmín Sánchez León.",
  alternates: { canonical: "/contacto" },
  openGraph: {
    title: "Contacto | Cuna&Co.",
    description:
      "Dudas sobre la app, sugerencias o alianzas. Te respondemos al correo que dejes.",
    url: "/contacto",
    images: ["/brand/cunaco/mascota_juntos.webp"],
  },
};

/**
 * /contacto — deliberately one screen of content (SITE_PLAN §3): the form, the
 * channels that are live today, and the emergency disclaimer. The closing CTA
 * band lives in `SiteFooter`, so the page does not repeat one of its own.
 */
export default function ContactoPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Navbar />

      <main className="relative flex w-full flex-col items-center">
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
