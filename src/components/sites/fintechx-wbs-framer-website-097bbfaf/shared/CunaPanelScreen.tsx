import Image from "next/image";

import { cunaAsset } from "./assets";
import { LiveTimer } from "./LiveTimer";

/**
 * Seven real Cuna&Co. Android screens, rebuilt for the web.
 *
 * Structure, card order, image heights and copy all come from the app repo
 * (`ui/screens/born/BornDashboard.kt`, `born/VaccineScreen.kt`, `born/BabyMenu.kt`,
 * `born/GrowthDetailScreen.kt`, `born/charts/HeightLengthChartCard.kt`,
 * `poop/PoopMainScreen.kt`, `counters/ContractionCounterScreen.kt`,
 * `counters/LactationCounterScreen.kt` plus
 * `res/values-es/strings.xml`). The repo ships no screenshots, so the screens
 * are reproduced rather than captured.
 */

export type CunaScreenVariant =
  | "panel"
  | "vacunas"
  | "contracciones"
  | "lactancia"
  | "bebe"
  | "crecimiento"
  | "panal";

interface PanelCard {
  readonly title: string;
  readonly description?: string;
  readonly icon: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  /** Image box height in px, matching the app's 80dp / 120dp cards. */
  readonly imageHeight: number;
}

const HEAD_CIRCUMFERENCE: PanelCard = {
  title: "Perímetro cefálico",
  description: "Seguimiento del crecimiento del perímetro cefálico",
  icon: "icono_app_perimetro.webp",
  iconWidth: 398,
  iconHeight: 425,
  imageHeight: 44,
};

const GROWTH_ROW: readonly PanelCard[] = [
  {
    title: "Peso",
    description: "Seguimiento del peso del bebé",
    icon: "mascota_peso_bebe.webp",
    iconWidth: 774,
    iconHeight: 857,
    imageHeight: 66,
  },
  {
    title: "Altura",
    description: "Seguimiento de la altura del bebé",
    icon: "icono_app_altura.webp",
    iconWidth: 719,
    iconHeight: 836,
    imageHeight: 66,
  },
];

const PEDIATRICIAN: readonly PanelCard[] = [
  {
    title: "Preguntas al pediatra",
    icon: "icono_app_pediatra.webp",
    iconWidth: 470,
    iconHeight: 544,
    imageHeight: 66,
  },
  {
    title: "Visitas al pediatra",
    icon: "icono_app_visita_pediatra.webp",
    iconWidth: 732,
    iconHeight: 610,
    imageHeight: 66,
  },
];

function Card({ card }: { card: PanelCard }) {
  return (
    <div className="flex flex-col rounded-[14px] bg-cuna-teal p-3 shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
      <p className="mb-2 text-[13px] leading-[16px] font-semibold text-white">
        {card.title}
      </p>
      <div
        className="flex w-full items-center justify-center"
        style={{ height: card.imageHeight }}
      >
        <Image
          src={cunaAsset(card.icon)}
          alt=""
          width={card.iconWidth}
          height={card.iconHeight}
          className="h-full w-auto object-contain"
        />
      </div>
      {card.description ? (
        <p className="mt-2 text-[11px] leading-[14px] font-medium text-white/90">
          {card.description}
        </p>
      ) : null}
    </div>
  );
}

const TITLES: Record<CunaScreenVariant, string> = {
  panel: "Panel",
  vacunas: "Agregar Vacunas",
  contracciones: "Contador de Contracciones",
  lactancia: "Lactancia",
  bebe: "Bebé",
  crecimiento: "Reporte de Crecimiento",
  panal: "Registro de popos",
};

/** Teal top app bar with the drawer handle, shared by every screen. */
function TopBar({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 bg-cuna-teal px-4 pt-4 pb-3">
      <span aria-hidden className="flex flex-col gap-[3px]">
        <span className="block h-[2px] w-[18px] rounded bg-white" />
        <span className="block h-[2px] w-[18px] rounded bg-white" />
        <span className="block h-[2px] w-[18px] rounded bg-white" />
      </span>
      <p className="font-[family-name:var(--fx-font-display)] text-[15px] leading-[19px] font-semibold text-white">
        {title}
      </p>
    </div>
  );
}

function PanelBody() {
  return (
    <>
      {/* Baby selector */}
      <div className="mx-4 -mt-2 flex items-center gap-3 rounded-[14px] bg-cuna-teal px-3 py-[10px] shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
        <Image
          src={cunaAsset("mascota_ok.webp")}
          alt=""
          width={791}
          height={809}
          className="h-9 w-9 shrink-0 object-contain"
        />
        <span className="flex flex-col">
          <span className="text-[14px] leading-[17px] font-semibold text-white">
            Emilia
          </span>
          <span className="text-[11px] leading-[14px] font-medium text-white/90">
            7 meses
          </span>
        </span>
      </div>

      <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
        <Card card={HEAD_CIRCUMFERENCE} />
        <div className="grid grid-cols-2 gap-3">
          {GROWTH_ROW.map((card) => (
            <Card key={card.title} card={card} />
          ))}
        </div>
        {PEDIATRICIAN.map((card) => (
          <Card key={card.title} card={card} />
        ))}
      </div>
    </>
  );
}

const VACCINE_ROWS: readonly { name: string; date: string }[] = [
  { name: "BCG", date: "12/01/2025" },
  { name: "Hepatitis B", date: "12/01/2025" },
  { name: "Rotavirus", date: "14/03/2025" },
  { name: "Pentavalente", date: "14/03/2025" },
  { name: "Neumococo", date: "18/05/2025" },
];

function VaccinesBody() {
  return (
    <div className="flex flex-col gap-3 px-4 pt-3 pb-4">
      <p className="text-[14px] leading-[18px] font-semibold text-cuna-teal-deep">
        Registro de Vacunas
      </p>

      <div className="flex flex-col items-center rounded-[14px] bg-cuna-teal p-2 shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
        <Image
          src={cunaAsset("ic_vacunas.webp")}
          alt=""
          width={5033}
          height={5633}
          className="h-[64px] w-auto object-contain"
        />
      </div>

      <p className="text-[12px] leading-[15px] font-medium text-fx-ink">
        Fecha de vacuna
      </p>
      <span className="rounded-full bg-cuna-yellow px-3 py-[7px] text-center text-[11px] leading-[14px] font-semibold text-fx-ink">
        Seleccionar Fecha
      </span>

      <p className="text-[13px] leading-[16px] font-bold text-fx-ink">
        Lista de vacunas
      </p>

      <ul className="flex flex-col gap-2">
        {VACCINE_ROWS.map((row) => (
          <li
            key={row.name}
            className="flex flex-col gap-[2px] rounded-[10px] bg-white px-3 py-2 shadow-[0_2px_6px_rgba(18,64,59,0.08)]"
          >
            <span className="text-[11px] leading-[14px] text-fx-body">
              <span className="font-bold text-fx-ink">Vacuna: </span>
              {row.name}
            </span>
            <span className="text-[11px] leading-[14px] text-fx-body">
              <span className="font-bold text-fx-ink">Fecha Vacuna: </span>
              {row.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContractionsBody() {
  return (
    <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
      <div className="flex flex-col items-center gap-2 rounded-[14px] bg-cuna-teal p-4 shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
        <Image
          src={cunaAsset("icono_app_contraction.webp")}
          alt=""
          width={1458}
          height={1756}
          className="h-[104px] w-auto object-contain"
        />
        <LiveTimer
          from={42}
          className="font-[family-name:var(--fx-font-display)] text-[26px] leading-[30px] font-semibold tracking-[-0.5px] text-white tabular-nums"
        />
        <span className="text-[11px] leading-[14px] font-medium text-white/90">
          Corriendo...
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <span className="rounded-full bg-cuna-yellow px-3 py-2 text-center text-[12px] leading-[15px] font-semibold text-fx-ink">
          Iniciar
        </span>
        <span className="rounded-full bg-white px-3 py-2 text-center text-[12px] leading-[15px] font-semibold text-fx-ink shadow-[0_2px_6px_rgba(18,64,59,0.08)]">
          Detener
        </span>
      </div>

      <span className="mx-auto rounded-full bg-cuna-yellow px-4 py-2 text-center text-[12px] leading-[15px] font-semibold text-fx-ink">
        Ver Reportes
      </span>
    </div>
  );
}

/**
 * `counters/LactationCounterScreen.kt` — gota illustration, the
 * "Tipo de Lactancia" dropdown (Leche materna / Leche de fórmula), the timer
 * with its Corriendo/Detenido label, Iniciar + Detener and "Ver Reportes".
 */
function LactationBody() {
  return (
    <div className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-4">
      <div className="flex flex-col items-center rounded-[14px] bg-cuna-teal p-3 shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
        <Image
          src={cunaAsset("icono_app_gota.webp")}
          alt=""
          width={512}
          height={512}
          className="h-[96px] w-auto object-contain"
        />
      </div>

      <div className="flex items-center justify-between rounded-[10px] border border-cuna-teal-deep/40 bg-white px-3 py-2">
        <span className="flex flex-col">
          <span className="text-[9px] leading-[11px] font-medium text-fx-body">
            Tipo de Lactancia
          </span>
          <span className="text-[12px] leading-[15px] font-semibold text-fx-ink">
            Leche materna
          </span>
        </span>
        <span aria-hidden className="text-[10px] text-cuna-teal-deep">
          ▾
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 py-1">
        <LiveTimer
          from={757}
          className="font-[family-name:var(--fx-font-display)] text-[30px] leading-[34px] font-semibold tracking-[-0.5px] text-cuna-teal-deep tabular-nums"
        />
        <span className="text-[11px] leading-[14px] font-medium text-fx-body">
          Corriendo...
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <span className="rounded-full bg-cuna-yellow px-3 py-2 text-center text-[12px] leading-[15px] font-semibold text-fx-ink">
          Iniciar
        </span>
        <span className="rounded-full bg-cuna-aqua px-3 py-2 text-center text-[12px] leading-[15px] font-semibold text-fx-ink">
          Detener
        </span>
      </div>

      <span className="mx-auto rounded-full bg-cuna-yellow px-4 py-2 text-center text-[12px] leading-[15px] font-semibold text-fx-ink">
        Ver Reportes
      </span>
    </div>
  );
}

interface MenuCard {
  readonly title: string;
  readonly subtitle: string;
  readonly icon: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

/** `born/BabyMenu.kt` + `res/values-es/strings.xml` (baby_menu_*). */
const BABY_MENU: readonly MenuCard[] = [
  {
    title: "Vacunas",
    subtitle: "Controla las vacunas del bebé",
    icon: "ic_vacunas.webp",
    iconWidth: 5033,
    iconHeight: 5633,
  },
  {
    title: "Crecimiento",
    subtitle: "Verifica el crecimiento del bebé",
    icon: "icono_app_altura.webp",
    iconWidth: 719,
    iconHeight: 836,
  },
  {
    title: "Registro de alimentos",
    subtitle: "Ten al día los alimentos que consume tu bebé",
    icon: "icono_app_gota.webp",
    iconWidth: 512,
    iconHeight: 512,
  },
  {
    title: "Registro de medicinas",
    subtitle: "Ten al día las medicinas que consume tu bebé",
    icon: "icono_app_pediatra.webp",
    iconWidth: 470,
    iconHeight: 544,
  },
];

/** `TrackingOptionCard` — 120dp teal card, 20dp radius, icon on the right. */
function TrackingOptionCard({ card }: { card: MenuCard }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-[16px] bg-cuna-teal px-3 py-3 shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
      <span className="flex flex-col">
        <span className="text-[13px] leading-[16px] font-semibold text-white">
          {card.title}
        </span>
        <span className="mt-[2px] text-[10px] leading-[13px] font-medium text-white/90">
          {card.subtitle}
        </span>
      </span>
      <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-white/20">
        <Image
          src={cunaAsset(card.icon)}
          alt=""
          width={card.iconWidth}
          height={card.iconHeight}
          className="h-6 w-6 object-contain"
        />
      </span>
    </div>
  );
}

function BabyMenuBody() {
  return (
    <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
      {BABY_MENU.map((card) => (
        <TrackingOptionCard key={card.title} card={card} />
      ))}
    </div>
  );
}

/**
 * `born/GrowthDetailScreen.kt` + `born/charts/HeightLengthChartCard.kt` — the
 * "Peso/altura" card draws a 12 x 10 grid with a weight and a height path over
 * it; the report below lists one record per month.
 */
const GROWTH_RECORDS: readonly { month: string; weight: string; height: string }[] = [
  { month: "Mes: 5", weight: "6.9 kg", height: "64 cm" },
  { month: "Mes: 6", weight: "7.4 kg", height: "66 cm" },
  { month: "Mes: 7", weight: "7.8 kg", height: "68 cm" },
];

function GrowthBody() {
  return (
    <div className="flex flex-col gap-3 px-4 pt-4 pb-4">
      <div className="flex flex-col gap-2 rounded-[14px] bg-white p-3 shadow-[0_2px_6px_rgba(18,64,59,0.08)]">
        <p className="text-center text-[12px] leading-[15px] font-semibold text-fx-body">
          Peso/altura
        </p>

        <svg
          viewBox="0 0 120 90"
          role="img"
          aria-label="Curvas de peso y talla sobre la cuadrícula OMS"
          className="h-[92px] w-full"
        >
          <g stroke="#e3dcd1" strokeWidth="0.6">
            {[0, 9, 18, 27, 36, 45, 54, 63, 72, 81, 90].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="120" y2={y} />
            ))}
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="90" />
            ))}
          </g>
          <path
            d="M0 78 L20 70 L40 60 L60 50 L80 41 L100 33 L120 27"
            fill="none"
            stroke="#2fa79a"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <path
            d="M0 84 L20 79 L40 72 L60 66 L80 58 L100 52 L120 46"
            fill="none"
            stroke="#ffbd35"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>

        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-[5px] text-[9px] leading-[12px] font-medium text-fx-body">
            <span className="block size-[7px] rounded-full bg-cuna-teal-deep" />
            Talla
          </span>
          <span className="flex items-center gap-[5px] text-[9px] leading-[12px] font-medium text-fx-body">
            <span className="block size-[7px] rounded-full bg-cuna-yellow" />
            Peso
          </span>
        </div>
      </div>

      <p className="text-[12px] leading-[15px] font-semibold text-fx-ink">
        Índice de masa corporal para la edad
      </p>

      <ul className="flex flex-col gap-2">
        {GROWTH_RECORDS.map((record) => (
          <li
            key={record.month}
            className="flex items-center justify-between rounded-[10px] bg-white px-3 py-[9px] shadow-[0_2px_6px_rgba(18,64,59,0.08)]"
          >
            <span className="text-[11px] leading-[14px] font-semibold text-fx-ink">
              {record.month}
            </span>
            <span className="text-[11px] leading-[14px] font-medium text-fx-body">
              {record.weight} · {record.height}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** `poop/PoopMainScreen.kt` — pañal illustration, prompt, two option cards. */
function PoopBody() {
  return (
    <div className="flex flex-1 flex-col gap-3 px-4 pt-4 pb-4">
      <div className="flex flex-col items-center gap-1 rounded-[14px] bg-cuna-teal p-3 shadow-[0_4px_12px_rgba(18,64,59,0.12)]">
        <Image
          src={cunaAsset("icono_app_panal.webp")}
          alt=""
          width={478}
          height={602}
          className="h-[80px] w-auto object-contain"
        />
        <span className="text-[13px] leading-[16px] font-semibold text-white">
          ¿Qué acción necesitas?
        </span>
        <span className="text-[10px] leading-[13px] font-medium text-white/90">
          Selecciona una opción para comenzar
        </span>
      </div>

      <TrackingOptionCard
        card={{
          title: "Registrar popos",
          subtitle: "Registrar detalles de las popos",
          icon: "icono_app_poop.webp",
          iconWidth: 512,
          iconHeight: 512,
        }}
      />
      <TrackingOptionCard
        card={{
          title: "Reportes",
          subtitle: "Información detallada de popos",
          icon: "iconos_popo_pastosa.webp",
          iconWidth: 512,
          iconHeight: 512,
        }}
      />
    </div>
  );
}

export function CunaPanelScreen({
  variant = "panel",
  className,
}: {
  variant?: CunaScreenVariant;
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full flex-col overflow-hidden bg-cuna-cream ${className ?? ""}`}
    >
      <TopBar title={TITLES[variant]} />
      {variant === "panel" ? <PanelBody /> : null}
      {variant === "vacunas" ? <VaccinesBody /> : null}
      {variant === "contracciones" ? <ContractionsBody /> : null}
      {variant === "lactancia" ? <LactationBody /> : null}
      {variant === "bebe" ? <BabyMenuBody /> : null}
      {variant === "crecimiento" ? <GrowthBody /> : null}
      {variant === "panal" ? <PoopBody /> : null}
    </div>
  );
}
