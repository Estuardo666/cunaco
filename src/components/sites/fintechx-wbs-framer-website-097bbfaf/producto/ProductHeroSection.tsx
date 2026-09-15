import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { FxGhostButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxGhostButton";
import { HeroShell } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/HeroShell";

/**
 * The Play Store listing URL is not in any of the sources this site was built
 * from, so it is not invented here. While it is `null` the primary CTA points
 * at `/contacto`; drop the real URL in and the button starts sending people
 * straight to the store with no other change.
 */
const PLAY_STORE_URL: string | null = null;

/**
 * Product hero.
 *
 * The one true thing about this app is that it is not one app: it forks into a
 * pregnancy product and a newborn product at first launch (SITE_PLAN §6, the
 * `waiting` / `born` flows). That fork is the headline, and the three phones on
 * the stage are one screen from each side of it plus the panel they share —
 * which is why this hero keeps its own visual instead of a mascot.
 *
 * Availability rides on the stage chips rather than in a list under the copy:
 * the iOS build is not out, and putting both states where the eye already is
 * means nobody taps hoping for a download that does not exist.
 */
export function ProductHeroSection() {
  return (
    <HeroShell
      id="producto-hero"
      eyebrow="Producto"
      title="Una sola app. Dos caminos."
      lead="Eliges tu etapa —embarazo o bebé en casa— y la app se reordena entera alrededor de ella."
      tone="turquesa"
      wide
      chips={[
        { value: "Android", label: "Disponible hoy", icon: "icono_app_gota.webp" },
        { value: "iOS", label: "En desarrollo", icon: "icono_app_sueno.webp" },
      ]}
      visual={
        // The trio is inset from the bottom so the availability chips keep a
        // clear strip of stage to sit on — at 375px they otherwise land on a
        // phone screen and stop being readable.
        <div className="flex w-full items-end justify-center gap-2 pb-12 sm:gap-5 sm:pb-8">
          <CunaPhone
            variant="contracciones"
            height={300}
            baseRatio={0.40}
            mdRatio={0.62}
            className="-rotate-3"
          />
          <CunaPhone
            variant="panel"
            height={360}
            baseRatio={0.40}
            mdRatio={0.62}
            className="z-[1]"
          />
          <CunaPhone
            variant="crecimiento"
            height={300}
            baseRatio={0.40}
            mdRatio={0.62}
            className="rotate-3"
          />
        </div>
      }
      actions={
        <>
          <FxButton
            href={PLAY_STORE_URL ?? "/contacto"}
            tone="brand"
            size="lg"
            className="max-sm:w-full max-sm:[&>span]:w-full"
          >
            Descargar gratis
          </FxButton>
          <FxGhostButton href="#pantallas" className="max-sm:w-full">
            Ver la app por dentro
          </FxGhostButton>
        </>
      }
    />
  );
}
