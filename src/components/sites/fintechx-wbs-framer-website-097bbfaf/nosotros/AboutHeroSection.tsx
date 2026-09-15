import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { HeroShell } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/HeroShell";

/**
 * About hero.
 *
 * The founding quote used to sit here, squeezed into the right column at 17px.
 * It is the most important text on the page and SITE_PLAN §3 requires it
 * verbatim, so it moved to a band of its own (`FoundingQuoteSection`) directly
 * below — where it gets the room to be read instead of skimmed.
 *
 * Amber is the warm half of the brand palette and this is the one page about a
 * person rather than about software.
 */
export function AboutHeroSection() {
  return (
    <HeroShell
      id="about-hero"
      eyebrow="Nosotros"
      title="Nació en un consultorio, no en una oficina"
      lead="Cada función responde a una duda que la Dra. Yasmín Sánchez ya había escuchado en consulta."
      tone="ambar"
      mascot="mascota_thinking.webp"
      chips={[
        { value: "Pediatra", label: "En ejercicio", icon: "icono_app_pediatra.webp" },
        { value: "Loja", label: "Ecuador", icon: "iconos_arbol.webp" },
      ]}
      actions={
        <>
          <FxButton
            href="#fundadora"
            tone="dark"
            size="lg"
            className="max-sm:w-full max-sm:[&>span]:w-full"
          >
            Conocer a la fundadora
          </FxButton>
          <FxGhostButton href="/funciones" className="max-sm:w-full">
            Ver las funciones
          </FxGhostButton>
        </>
      }
    />
  );
}
