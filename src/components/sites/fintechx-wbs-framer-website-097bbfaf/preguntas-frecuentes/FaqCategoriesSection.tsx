"use client";

import Image from "next/image";
import { cunaAsset } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FaqAccordion } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FaqAccordion";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";
import { FAQ_CATEGORIES, type FaqCategory } from "./faq-data";

/**
 * One category = one sticky-header block.
 *
 * The two-column split (424px header + 706px accordion) is the exact geometry
 * of the home page's `FaqSection`, reused rather than re-invented so the full
 * page reads as the same component grown taller. The header sticks under the
 * fixed navbar while its own rows scroll, which is what keeps a long page of
 * accordions from losing its place.
 */
function CategoryBlock({ category, first }: { category: FaqCategory; first: boolean }) {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      id={category.id}
      // scroll-margin clears the fixed navbar when a hero chip jumps here.
      className="grid w-full scroll-mt-[110px] grid-cols-1 items-start gap-8 lg:grid-cols-[424px_706px] lg:gap-x-[70px] lg:scroll-mt-[130px]"
    >
      {/* ---------- Header ---------- */}
      <div
        className={cn(
          "flex w-full flex-col gap-[10px] lg:sticky lg:top-[130px]",
          revealBase,
          revealState,
        )}
      >
        <div className="flex size-14 items-center justify-center overflow-clip rounded-[18px] bg-white lg:size-16 lg:rounded-[20px]">
          <Image
            src={cunaAsset(category.icon)}
            alt=""
            aria-hidden
            width={160}
            height={160}
            className="size-9 object-contain lg:size-10"
          />
        </div>

        <h2 className="w-full text-[24px] leading-[30px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[32px] md:leading-[38px] xl:text-[36px] xl:leading-[43px]">
          {category.title}
        </h2>

        <p className="w-full max-w-[360px] text-[16px] leading-[22px] font-medium text-[#5e6968]">
          {category.description}
        </p>
      </div>

      {/* ---------- Accordion ---------- */}
      <div className={cn("w-full lg:w-[706px]", revealBase, revealState)}>
        {/* Only the first block opens a row on load: an FAQ page that arrives
            with five rows already expanded is a wall of text, not an index. */}
        <FaqAccordion
          items={category.items}
          idPrefix={category.id}
          defaultOpen={first ? 0 : -1}
        />
      </div>
    </div>
  );
}

export function FaqCategoriesSection() {
  return (
    <section
      id="faq-categorias"
      className="flex w-full flex-col items-center py-[60px] lg:py-[100px]"
    >
      <div className="flex w-full max-w-[1260px] flex-col gap-[60px] px-[30px] lg:gap-[100px]">
        {FAQ_CATEGORIES.map((category, index) => (
          <CategoryBlock
            key={category.id}
            category={category}
            first={index === 0}
          />
        ))}
      </div>
    </section>
  );
}
