"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/types/fintechx";

interface FaqAccordionProps {
  items: readonly FaqItem[];
  /** Namespaced so several accordions on one page keep unique ids. */
  idPrefix: string;
  /** Index open on mount. `-1` (default) starts fully collapsed. */
  defaultOpen?: number;
  className?: string;
}

/**
 * The site's accordion, lifted verbatim from `root-8a5edab2/FaqSection` so the
 * home-page summary and the full `/preguntas-frecuentes` page share one row
 * treatment: cream ground while open, transparent while closed, and a plus →
 * minus disc that rotates 90deg as the vertical bar fades.
 *
 * The answer panel animates `grid-template-rows` 0fr → 1fr rather than a
 * measured height, so rows of any length open at the same 300ms without JS
 * measuring anything.
 */
export function FaqAccordion({
  items,
  idPrefix,
  defaultOpen = -1,
  className,
}: FaqAccordionProps) {
  const [openRows, setOpenRows] = useState<readonly boolean[]>(() =>
    items.map((_, index) => index === defaultOpen),
  );

  const toggleRow = useCallback((index: number) => {
    setOpenRows((rows) => rows.map((open, i) => (i === index ? !open : open)));
  }, []);

  return (
    <div className={cn("flex w-full flex-col gap-5", className)}>
      {items.map((item, index) => {
        const isOpen = openRows[index] ?? false;
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "w-full overflow-hidden rounded-[20px] transition-colors duration-300 ease-out motion-reduce:transition-none",
              isOpen ? "bg-white" : "bg-transparent hover:bg-white/60",
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleRow(index)}
              className="flex w-full cursor-pointer items-center justify-between gap-[10px] overflow-hidden p-4 text-left lg:p-5"
            >
              <span className="text-[17px] leading-[22px] font-medium text-[#1d6259] lg:text-[20px] lg:leading-[26px]">
                {item.question}
              </span>

              <span
                aria-hidden
                className={cn(
                  "relative flex size-[26px] shrink-0 items-center justify-center overflow-clip rounded-full transition-[rotate,background-color] duration-300 ease-out motion-reduce:transition-none lg:size-[30px]",
                  isOpen ? "rotate-90 bg-[#1d6259]" : "rotate-0 bg-white",
                )}
              >
                <span
                  className={cn(
                    "absolute h-[2px] w-[14px] rounded-[100px] transition-opacity duration-300 ease-out motion-reduce:transition-none lg:w-4",
                    isOpen ? "opacity-0" : "bg-[#1d6259] opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-[14px] w-[2px] rounded-[100px] transition-[background-color,opacity] duration-300 ease-out motion-reduce:transition-none lg:h-4",
                    isOpen ? "bg-white" : "bg-[#1d6259]",
                  )}
                />
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pt-0 pr-[44px] pb-4 pl-4 text-[15px] leading-[20px] font-medium text-[#5e6968] lg:pr-[60px] lg:pb-5 lg:pl-5 lg:text-[16px] lg:leading-[20.8px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
