"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavLink } from "@/types/fintechx";
import { cn } from "@/lib/utils";
import { CunaLogo } from "./CunaLogo";
import { FxButton } from "./FxButton";

/**
 * Every in-page target is written root-relative (`/#features`) rather than as a
 * bare hash, so the bar keeps working from `/nosotros` and any other route —
 * a bare `#features` would resolve against the current path and go nowhere.
 * "Para quién es" lives in the footer only: a fifth long label overflows the
 * 800px desktop pill.
 */
const NAV_LINKS: NavLink[] = [
  { label: "Producto", href: "/producto" },
  { label: "Funciones", href: "/funciones" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Precios", href: "/precios" },
];

/**
 * Fixed navbar.
 *
 * Desktop (getComputedStyle at 1440px):
 * - wrapper: position fixed, top 0, z-index 9, full width, padding 20px 0
 *   (the original also stacked an eight-layer progressive-blur strip behind the
 *   bar; it is dropped here — the bar is a solid white pill on its own)
 * - container: max-width 860px, padding 0 30px
 * - content bar: 800px wide, height 58.2px, background #fff, fully rounded,
 *   padding 10px, gap 20px, overflow hidden,
 *   box-shadow 0 0 0 4px rgba(221,229,237,0.7)
 * - logo: 130.125 x 32 (natural 122 x 30), object-fit contain
 * - nav links: 16px / 20.8px, weight 600, color #5e6968, padding 8px 16px,
 *   radius 100px, gap 4px between items; hover fills the pill
 * - CTA: small dark FxButton, "Descargar gratis" -> /contact
 *
 * Mobile (getComputedStyle at 375px):
 * - nav 375 x 84, padding 16px 0; container padding 0 16px
 * - content bar 343 x 52, padding 10px, fully rounded,
 *   box-shadow 0 0 0 2px rgba(221,229,237,0.7), space-between
 * - logo 114 x 28
 * - menu button 32 x 32, background #1d6259, radius 50%, two 20 x 2 white
 *   bars with radius 2px
 * - a full-screen overlay, background rgba(0,0,0,0.3) with backdrop-filter
 *   blur(10px), fades in behind the open menu
 *
 * The navbar does NOT change on scroll — it is fixed with a constant style.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed inset-x-0 top-0 z-[9] flex flex-col items-center gap-[10px] py-4 lg:py-5">
      {/* dim + blur behind the open mobile menu */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 -z-[1] bg-cuna-teal-dark/35 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ backdropFilter: "blur(10px)" }}
      />

      <div className="relative z-[2] flex w-full max-w-[860px] flex-col items-center gap-[10px] px-4 lg:px-[30px]">
        <div
          className="flex h-[52px] w-full items-center justify-between gap-5 overflow-hidden rounded-full bg-white p-[10px] shadow-[0_0_0_2px_rgba(221,229,237,0.7)] lg:h-[58.2px] lg:justify-start lg:shadow-[0_0_0_4px_rgba(221,229,237,0.7)]"
        >
          <div className="flex items-center lg:flex-[0.4_0_0px] lg:flex-col lg:items-start">
            <Link href="/" aria-label="Cuna&Co. — inicio" className="relative block">
              <CunaLogo className="lg:hidden" height={26} />
              <CunaLogo className="hidden lg:flex" height={32} />
            </Link>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === pathname ? "page" : undefined}
                className={cn(
                  "flex items-center justify-center rounded-full px-4 py-2 text-[16px] leading-[20.8px] font-semibold whitespace-nowrap transition-colors duration-200 hover:bg-[#f7f3ed] hover:text-[#1d6259]",
                  link.href === pathname
                    ? "bg-[#e8f8f6] text-[#1d6259]"
                    : "text-[#5e6968]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-end gap-[10px] lg:flex lg:flex-[0.4_0_0px]">
            <FxButton href="/contacto" tone="dark" size="sm">
              Descargar gratis
            </FxButton>
          </div>

          {/* mobile menu toggle — 32px dark disc with two white bars */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="fx-mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1d6259] lg:hidden"
          >
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-sm bg-white transition-transform duration-300 ease-out",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-0.5 w-5 rounded-sm bg-white transition-transform duration-300 ease-out",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>

        {/* mobile menu panel */}
        <div
          id="fx-mobile-menu"
          className={cn(
            "w-full origin-top overflow-hidden rounded-[26px] bg-white shadow-[0_0_0_2px_rgba(221,229,237,0.7)] transition-all duration-300 ease-out lg:hidden",
            open
              ? "max-h-[420px] p-[10px] opacity-100"
              : "pointer-events-none max-h-0 p-0 opacity-0",
          )}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={link.href === pathname ? "page" : undefined}
                className={cn(
                  "rounded-lg px-4 py-3 text-[16px] leading-[20.8px] font-semibold transition-colors duration-200 hover:bg-[#f7f3ed] hover:text-[#1d6259]",
                  link.href === pathname
                    ? "bg-[#e8f8f6] text-[#1d6259]"
                    : "text-[#5e6968]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-2 flex">
            <FxButton
              href="/contacto"
              tone="dark"
              size="sm"
              className="w-full [&>span]:w-full"
            >
              Descargar gratis
            </FxButton>
          </div>
        </div>
      </div>
    </div>
  );
}
