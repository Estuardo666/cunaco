/**
 * The app's catalogue, as data.
 *
 * Shared by `/funciones` (which lists it) and `/precios` (which draws the line
 * through it), so a feature can never appear on one page and be missing from
 * the other.
 *
 * Every Freemium line below was verified against the Android source
 * (`com.ys.cunaco`) before it was written here — the screen or the ViewModel
 * that implements it is named in `evidence`. Two items that SITE_PLAN §5 lists
 * do **not** exist in the app and are deliberately absent:
 *
 * - "Control de uso de pantallas" — no screen-time code anywhere in the repo.
 * - "Consulta de medicamentos compatibles con lactancia" — no such feature.
 *
 * That leaves 15 items from §5 plus the emergency guide, which the app ships
 * (`ui/screens/emergency`) but §5 never listed: 16 in total. `FREEMIUM_COUNT`
 * is derived, not typed by hand, so the number on the page can never drift
 * from the list under it.
 *
 * Premium is backed by `ui/screens/billing`, which implements Google Play
 * Billing and flips the account to a `premium` role. The 13 products are the
 * catalogue that role unlocks.
 */

export interface PlanFeature {
  readonly name: string;
  readonly detail: string;
  /** Where this exists in the Android app — kept so future edits stay honest. */
  readonly evidence: string;
}

export interface FeatureGroup {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly features: readonly PlanFeature[];
}

/** The 16 verified free features, grouped the way the app itself groups them. */
export const FREEMIUM_GROUPS: readonly FeatureGroup[] = [
  {
    id: "registros",
    label: "Registros diarios",
    icon: "icono_app_gota.webp",
    features: [
      {
        name: "Registro de contracciones",
        detail: "Con reporte de la frecuencia y la duración de cada una.",
        evidence: "ContractionCounterScreen · ContractionReportScreen",
      },
      {
        name: "Agenda de lactancia",
        detail: "Cada toma con su hora, su duración y su tipo.",
        evidence: "LactationCounterScreen · LactationDiaryScreen",
      },
      {
        name: "Reporte de siestas",
        detail: "El sueño del día registrado y consultable por fecha.",
        evidence: "SleepingCounterScreen · SleepDiaryScreen",
      },
      {
        name: "Registro de datos del pañal",
        detail: "Consistencia y frecuencia, con las categorías que usa el pediatra.",
        evidence: "ui/screens/poop",
      },
      {
        name: "Alimentación complementaria",
        detail: "Qué come el bebé y desde cuándo, alimento por alimento.",
        evidence: "FoodRegistrationScreen",
      },
    ],
  },
  {
    id: "crecimiento",
    label: "Crecimiento y desarrollo",
    icon: "icono_app_perimetro.webp",
    features: [
      {
        name: "Curvas de crecimiento OMS",
        detail:
          "Talla/edad, peso/edad, perímetro cefálico/edad y peso/talla: los cuatro estándares oficiales.",
        evidence: "born/charts · born_grow_chart_details",
      },
      {
        name: "Hitos del desarrollo",
        detail: "Qué se espera a cada edad, marcado cuando tu bebé llega.",
        evidence: "GrowthMilestone · GrowthMilestonesViewModel",
      },
    ],
  },
  {
    id: "salud",
    label: "Salud",
    icon: "ic_vacunas.webp",
    features: [
      {
        name: "Control de vacunación",
        detail: "El esquema completo, con la dosis aplicada y la que sigue.",
        evidence: "VaccineScreen",
      },
      {
        name: "Preguntas al pediatra",
        detail: "Las dudas se anotan cuando aparecen, no cuando ya estás en consulta.",
        evidence: "ui/screens/pediatrician",
      },
      {
        name: "Recordatorios de citas médicas",
        detail: "Cada control pediátrico agendado, con aviso antes.",
        evidence: "PediatricVisitViewModel",
      },
      {
        name: "Registro de medicinas con alarma",
        detail: "La dosis queda anotada y la app avisa cuándo toca la siguiente.",
        evidence: "MedicineRegistrationScreen · MedicineNotificationWorker",
      },
    ],
  },
  {
    id: "emergencia",
    label: "Emergencia",
    icon: "icono_app_pediatra.webp",
    features: [
      {
        name: "Guía de señales de alarma",
        detail:
          "Dificultad para respirar, convulsiones, alteración de la conciencia: qué mirar y cuándo ir a urgencias, por edad.",
        evidence: "ui/screens/emergency",
      },
    ],
  },
  {
    id: "preparacion",
    label: "Preparación",
    icon: "viajes.webp",
    features: [
      {
        name: "Checklist preparto",
        detail: "Lo que hay que tener listo antes de que empiece el trabajo de parto.",
        evidence: "CheckListPreBirth",
      },
      {
        name: "Checklist recién nacido",
        detail: "Qué vigilar y qué es normal en las primeras semanas en casa.",
        evidence: "BornResources",
      },
      {
        name: "Checklist de viaje",
        detail: "Salir de casa con un bebé sin listas sueltas en las notas del celular.",
        evidence: "BornResourcesLeaveHome",
      },
    ],
  },
  {
    id: "bienestar",
    label: "Bienestar familiar",
    icon: "iconos_arbol.webp",
    features: [
      {
        name: "Huella de carbono",
        detail:
          "Pañales, toallitas, lavados y baños: el impacto real del cuidado diario, calculado.",
        evidence: "ui/screens/carbonfootprint",
      },
    ],
  },
];

/** Derived so the headline count can never contradict the list. */
export const FREEMIUM_COUNT = FREEMIUM_GROUPS.reduce(
  (total, group) => total + group.features.length,
  0,
);

/** The 13 paid products (SITE_PLAN §5) — structured content, not app features. */
export const PREMIUM_PRODUCTS: readonly string[] = [
  "Alimentación y cuidados en embarazo y lactancia",
  "Parto vaginal o cesárea — preparación",
  "Lactancia materna — preparación",
  "Banco de leche materna",
  "S.O.S. no puedo amamantar",
  "Destete respetuoso",
  "Cuidados del recién nacido",
  "Primeros auxilios para cuidadores",
  "Alimentación complementaria — inicio",
  "S.O.S. picky eater",
  "Alergias alimentarias",
  "Estimulación infantil",
  "Masaje infantil",
];

/**
 * Premium's price.
 *
 * TODO(pricing): PLACEHOLDER. No amount has been agreed yet — this exists so
 * the page can be written and reviewed in its launched form. Replace both
 * fields with the real Play Store amount before this page goes live, and check
 * that `period` still matches the billing cadence that ships.
 */
export const PREMIUM_PRICE = {
  amount: "$4,99",
  period: "al mes",
  /** Home's plan switch offers a yearly cadence; same placeholder caveat. */
  yearlyAmount: "$49,99",
  yearlyPeriod: "al año",
} as const;
