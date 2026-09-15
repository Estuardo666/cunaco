import { AnchorPill } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/AnchorPill";
import { HeroShell } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/HeroShell";
import { FAQ_CATEGORIES } from "./faq-data";

/**
 * FAQ hero.
 *
 * The page's job is to get one specific worry answered fast, so the category
 * chips are the hero's action: they are anchor links to the five blocks below,
 * which makes the page navigable before the visitor has scrolled once and keeps
 * working with JavaScript disabled.
 *
 * The reassurance that used to fill a card here — the app does not replace a
 * paediatrician — is now the stage chip. It is the first thing read on the
 * page, which is where a claim that matters legally belongs, and the first
 * question in the first category says it again in full.
 */
export function FaqHeroSection() {
  return (
    <HeroShell
      id="faq-hero"
      eyebrow="Preguntas frecuentes"
      title="Las dudas que ya escuchamos en consulta"
      lead="La app, la privacidad de los datos de tu bebé y los planes. Si tu duda no está, escríbenos."
      tone="aqua"
      mascot="mascota_ok.webp"
      chips={[
        { value: "No reemplaza", label: "A tu pediatra", icon: "icono_app_pediatra.webp" },
        { value: "Acompaña", label: "Y registra", icon: "mascota_ok.webp" },
      ]}
      actions={
        <nav
          aria-label="Categorías de preguntas"
          className="flex w-full flex-wrap justify-center gap-[10px] sm:w-auto lg:justify-start"
        >
          {FAQ_CATEGORIES.map((category, index) => (
            <AnchorPill
              key={category.id}
              href={`#${category.id}`}
              label={category.label}
              icon={category.icon}
              index={index}
            />
          ))}
        </nav>
      }
    />
  );
}
