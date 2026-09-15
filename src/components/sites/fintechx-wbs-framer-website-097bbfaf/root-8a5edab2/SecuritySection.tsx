"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { fxAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { CunaPhone } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/CunaPhone";
import { FxButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxButton";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/**
 * Every line here is checked against what the Android app actually does
 * (Firebase Auth + Firestore): TLS in transit and encryption at rest are real,
 * end-to-end encryption is not — the app ships no crypto of its own, so the
 * claim was removed rather than softened into something still unverifiable.
 */
const CHECKLIST: readonly string[] = [
  "Cifrados en tránsito y en reposo",
  "Cada registro vive en tu cuenta, no en el teléfono",
  "Solo tú ves los registros de tu bebé",
  "Sin venta de datos a terceros",
];

/** Checklist tick — natural 9 × 14, rendered 6 × 10. */
const CHECK_ICON = "OXmFlFjSz1lrJp3vaL02MNthg.svg";

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  // Entrance animation — fires once when the section enters the viewport.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      // No observer support: reveal on the next tick rather than synchronously.
      const timer = window.setTimeout(() => setEntered(true), 0);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEntered(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const revealBase =
    "transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:translate-y-0 motion-reduce:transition-none";
  const revealState = entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5";

  return (
    <section
      ref={sectionRef}
      id="security"
      className="flex w-full flex-col items-center p-0"
    >
      {/* ---------- Container ---------- */}
      <div className="w-full max-w-[1260px] px-[30px]">
        {/* ---------- Content ---------- */}
        <div className="flex w-full flex-col items-center gap-10 lg:flex-row xl:gap-[70px]">
          {/* ---------------------------------------------------- */}
          {/* Left — image panel                                   */}
          {/* ---------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full items-center justify-center gap-10 overflow-clip rounded-[20px] bg-[#f7f3ed] p-5 md:rounded-[30px] md:px-10 md:py-[30px] lg:flex-1 xl:h-[458px] xl:w-[628px] xl:flex-none xl:px-[60px] xl:py-[30px]",
              revealBase,
              revealState,
            )}
          >
            <div className="flex w-full items-center justify-center gap-5 overflow-clip xl:h-[398px] xl:w-[508px]">
              <CunaPhone variant="panel" height={340} />
              <CunaPhone variant="vacunas" height={290} className="hidden sm:block" />
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Right — copy + checklist                             */}
          {/* ---------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full flex-col items-start gap-10 delay-100 lg:flex-1 xl:w-[502px] xl:flex-none",
              revealBase,
              revealState,
            )}
          >
            {/* ---------- Top block ---------- */}
            <div className="flex w-full flex-col items-start gap-[10px]">
              <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
                <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                  Privacidad y datos
                </span>
              </div>

              <h2 className="w-full text-[28px] leading-[34px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[36px] md:leading-[43px] xl:text-[48px] xl:leading-[57.6px]">
                Los datos de tu bebé están protegidos
              </h2>

              <FxButton
                href="/precios"
                tone="dark"
                size="lg"
                className="w-full sm:w-auto [&>span]:w-full sm:[&>span]:w-auto"
              >
                Leer la política de privacidad
              </FxButton>
            </div>

            {/* ---------- Bottom block — checklist ---------- */}
            <ul className="grid w-full grid-cols-1 gap-[10px] md:grid-cols-2 md:gap-3 xl:grid-cols-1 xl:gap-[10px]">
              {CHECKLIST.map((item) => (
                <li key={item} className="flex w-full items-center gap-[6px]">
                  <Image
                    src={fxAsset(CHECK_ICON)}
                    alt=""
                    width={9}
                    height={14}
                    className="h-[10px] w-[6px] shrink-0"
                  />
                  <span className="text-[15px] leading-[20px] font-medium text-[#5e6968] md:text-[16px] md:leading-[20.8px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
