import type { FaqItem } from "@/types/fintechx";

export interface FaqCategory {
  readonly id: string;
  /** Chip + section heading label. */
  readonly label: string;
  readonly title: string;
  readonly description: string;
  /** Brand illustration from the app kit, used as the section marker. */
  readonly icon: string;
  readonly items: readonly FaqItem[];
}

/**
 * Content source: SITE_PLAN §3 (/preguntas-frecuentes), §5 (the real Freemium
 * and Premium lists) and §4 (the founder's verified credentials). Nothing here
 * describes a capability the app does not already ship — an FAQ that promises
 * a feature is the fastest way to lose the trust this page exists to build.
 *
 * The file is plain data with no "use client" so `page.tsx` can render the
 * FAQPage JSON-LD from the same source the accordion reads.
 */
export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    id: "uso-medico",
    label: "Uso médico",
    title: "Cuna&Co. y tu pediatra",
    description:
      "Lo más importante primero: qué hace la app y, sobre todo, qué no hace.",
    icon: "icono_app_pediatra.webp",
    items: [
      {
        question: "¿Cuna&Co. reemplaza al pediatra?",
        answer:
          "No, y no está pensada para eso. Cuna&Co. es una herramienta de acompañamiento y registro: organiza la información de tu bebé para que llegues mejor preparada a la consulta. Ninguna pantalla de la app emite un diagnóstico ni sustituye la valoración de tu pediatra.",
      },
      {
        question: "¿La información de la app está revisada por un médico?",
        answer:
          "Sí. Cuna&Co. la fundó la Dra. Yasmín Sánchez León, pediatra, puericultora y con formación en neurología pediátrica, con consulta propia en Loja, Ecuador. El contenido educativo sale de su práctica clínica y las curvas de crecimiento son las oficiales de la OMS.",
      },
      {
        question: "Si veo algo raro en un registro, ¿la app me avisa?",
        answer:
          "La app te muestra dónde cae cada medición dentro de las curvas OMS y te recuerda las citas y vacunas pendientes, pero no interpreta el dato por ti. Si algo te preocupa, la conducta correcta es siempre consultar con tu pediatra.",
      },
      {
        question: "¿Puedo usarla desde el embarazo?",
        answer:
          "Sí. Al abrir la app eliges tu etapa: embarazo o bebé nacido. En embarazo tienes registro de contracciones, checklist preparto y recordatorios de citas; cuando nace tu bebé el perfil pasa al segundo camino sin perder nada de lo registrado.",
      },
    ],
  },
  {
    id: "privacidad",
    label: "Privacidad",
    title: "Los datos de tu bebé",
    description:
      "Son registros de salud de un menor. Merecen una respuesta clara, no letra pequeña.",
    icon: "mascota_thinking.webp",
    items: [
      {
        question: "¿Quién puede ver los registros de mi bebé?",
        answer:
          "Solo tú, desde tu cuenta. Los registros de salud no son públicos, no se muestran a otras usuarias y no aparecen en ningún perfil compartido.",
      },
      {
        question: "¿Venden o comparten mis datos con terceros?",
        answer:
          "No. Los datos de salud no se venden ni se ceden a anunciantes ni a terceros con fines comerciales. Puedes leer el detalle completo en la página de privacidad de datos.",
      },
      {
        question: "¿Qué información me pide la app?",
        answer:
          "La mínima para que las funciones sirvan: tu etapa (embarazo o bebé nacido), los datos del bebé —fecha de nacimiento, peso, talla, perímetro cefálico— y lo que tú decidas registrar: lactancia, pañal, siestas, vacunas, medicinas y citas.",
      },
      {
        question: "¿Puedo eliminar mi cuenta y todo lo registrado?",
        answer:
          "Sí. Puedes pedir la eliminación de tu cuenta y de los registros asociados escribiéndonos desde la página de contacto.",
      },
    ],
  },
  {
    id: "plataformas",
    label: "Plataformas",
    title: "Dónde funciona la app",
    description:
      "Disponibilidad real, sin prometer fechas que todavía no podemos sostener.",
    icon: "icono_app_altura.webp",
    items: [
      {
        question: "¿En qué dispositivos está disponible?",
        answer:
          "Cuna&Co. está disponible en Android, a través de Play Store. La versión para iOS está en desarrollo y todavía no se puede descargar.",
      },
      {
        question: "¿Cuándo llega la versión para iPhone?",
        answer:
          "Está en desarrollo y aún no tenemos una fecha pública. Preferimos no dar un mes que después no se cumpla: escríbenos desde la página de contacto y te avisamos apenas salga.",
      },
      {
        question: "¿Funciona sin internet?",
        answer:
          "Los registros del día a día —lactancia, pañal, siestas, contracciones— se llevan desde el teléfono. Para sincronizar tu cuenta y recibir el contenido nuevo necesitas conexión.",
      },
      {
        question: "¿Hay una versión web?",
        answer:
          "Por ahora no. Este sitio es informativo; toda la funcionalidad de registro y seguimiento vive en la app móvil.",
      },
    ],
  },
  {
    id: "planes",
    label: "Planes",
    title: "Freemium y Premium",
    description: "Qué entra gratis, qué llegará con Premium y qué no cambia.",
    icon: "ic_premium.webp",
    items: [
      {
        question: "¿Cuál es la diferencia entre Freemium y Premium?",
        answer:
          "Freemium incluye las 16 funciones de registro y seguimiento —contracciones, lactancia, pañal, siestas, curvas OMS, vacunas, hitos, checklists, medicinas con alarma y guía de emergencia—, gratis. Premium añade 13 talleres de contenido educativo estructurado, como preparación al parto, lactancia, alimentación complementaria y primeros auxilios.",
      },
      {
        question: "¿El plan gratuito tiene límite de tiempo?",
        answer:
          "No. Las funciones freemium son gratuitas de forma permanente, sin periodo de prueba ni bloqueo posterior.",
      },
      {
        question: "¿Cuánto costará Premium?",
        answer:
          "El precio y las dos formas de pago —mensual o anual— están en la página de precios. La suscripción se activa dentro de la app, a través de Google Play, y se cancela desde ahí cuando quieras.",
      },
      {
        question: "¿Necesito tarjeta para descargar la app?",
        answer:
          "No. Descargas Cuna&Co. desde Play Store y usas todo el plan freemium sin registrar ningún medio de pago.",
      },
    ],
  },
  {
    id: "cuenta",
    label: "Cuenta y soporte",
    title: "Tu cuenta, tus hijos y nosotros",
    description: "Lo práctico: varios bebés, cambio de teléfono y cómo escribirnos.",
    icon: "mascota_juntos.webp",
    items: [
      {
        question: "¿Puedo registrar a más de un hijo?",
        answer:
          "Sí. Cada bebé tiene su propio perfil con sus registros, sus curvas y su esquema de vacunas, y cambias entre ellos desde el panel.",
      },
      {
        question: "Si cambio de teléfono, ¿pierdo el historial?",
        answer:
          "No, siempre que entres con la misma cuenta. Los registros están asociados a tu cuenta, no al dispositivo.",
      },
      {
        question: "¿Puede usarla el papá o quien cuida al bebé?",
        answer:
          "Sí. La app está escrita pensando en la mamá, pero cualquier persona que cuide al bebé puede llevar los registros desde su cuenta.",
      },
      {
        question: "Tengo una duda que no está aquí, ¿cómo los contacto?",
        answer:
          "Escríbenos desde la página de contacto con tu nombre, tu correo y tu mensaje. Contestamos con la misma calma con la que atendemos en consulta.",
      },
    ],
  },
];

/** Every question flattened — used for the FAQPage JSON-LD in `page.tsx`. */
export const ALL_FAQ_ITEMS: readonly FaqItem[] = FAQ_CATEGORIES.flatMap(
  (category) => category.items,
);
