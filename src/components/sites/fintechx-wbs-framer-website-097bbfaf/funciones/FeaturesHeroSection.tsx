import { AnchorPill } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/AnchorPill";
import { HeroShell } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/HeroShell";
import { FREEMIUM_COUNT, FREEMIUM_GROUPS } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/catalog";

/**
 * Features hero.
 *
 * `/producto` answers "¿qué es esto y cómo se usa?" with a story; this page
 * answers "¿qué exactamente puedo hacer?" with a catalogue. So the hero's
 * action is the category index — six anchors that make a long page navigable
 * before the first scroll, and that keep working with JavaScript off.
 *
 * The chips carry the two numbers that matter: how many functions there are,
 * and how many WHO growth curves the app actually plots. The second one is the
 * page's primary keyword (SITE_PLAN §7) and it is worth stating as a fact
 * rather than as a claim.
 */
export function FeaturesHeroSection() {
  return (
    <HeroShell
      id="funciones-hero"
      eyebrow="Funciones"
      title="Todo lo que la app registra por ti"
      lead={`${FREEMIUM_COUNT} funciones, agrupadas como las agrupa la app. Ninguna cuesta nada.`}
      tone="duo"
      mascot="mascota_peso_bebe.webp"
      chips={[
        {
          value: `${FREEMIUM_COUNT} funciones`,
          label: "Todas gratis",
          icon: "icono_app_gota.webp",
        },
        { value: "4 curvas", label: "Estándar OMS", icon: "icono_app_perimetro.webp" },
      ]}
      actions={
        <nav
          aria-label="Categorías de funciones"
          className="flex w-full flex-wrap justify-center gap-[10px] sm:w-auto lg:justify-start"
        >
          {FREEMIUM_GROUPS.map((group, index) => (
            <AnchorPill
              key={group.id}
              href={`#${group.id}`}
              label={group.label}
              icon={group.icon}
              index={index}
            />
          ))}
        </nav>
      }
    />
  );
}
