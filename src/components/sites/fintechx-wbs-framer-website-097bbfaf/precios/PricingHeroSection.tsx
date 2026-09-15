import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { HeroShell } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/HeroShell";
import { FREEMIUM_COUNT, PREMIUM_PRICE } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";

/**
 * Pricing hero.
 *
 * The headline answers the question a visitor actually arrives with — "¿qué me
 * va a costar esto?" — and answers it with the free plan, because that is where
 * every account starts. The two chips put both numbers on the stage, so the
 * price is legible before anyone reaches the cards.
 *
 * The deepest tone on the site: the free plan's chips need a dark ground to
 * read as bright.
 */
export function PricingHeroSection() {
  return (
    <HeroShell
      id="precios-hero"
      eyebrow="Precios"
      title={`Las ${FREEMIUM_COUNT} funciones de la app son gratis`}
      lead="Registros, curvas OMS y vacunas, sin plazo y sin tarjeta. Premium suma los talleres."
      tone="profundo"
      mascot="mascota_relax.webp"
      chips={[
        { value: "Gratis", label: `${FREEMIUM_COUNT} funciones`, icon: "icono_app_gota.webp" },
        {
          value: PREMIUM_PRICE.amount,
          label: `Premium ${PREMIUM_PRICE.period}`,
          icon: "ic_premium.webp",
        },
      ]}
      actions={
        <>
          <FxButton
            href="/producto"
            tone="brand"
            size="lg"
            className="max-sm:w-full max-sm:[&>span]:w-full"
          >
            Descargar gratis
          </FxButton>
          <FxGhostButton href="#planes" className="max-sm:w-full">
            Comparar planes
          </FxGhostButton>
        </>
      }
    />
  );
}
