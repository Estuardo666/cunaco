# FintechX — Behavior Bible

Everything below was observed on the live site at a 1440 × 900 viewport, by scrolling, clicking, and
hovering with browser automation and re-reading `getComputedStyle()` between states.

## Global

| Behavior | Finding |
|---|---|
| Smooth scroll | **Lenis** is active (`<html class="lenis">`). Native scrolling feels different; the clone uses native scrolling, which is the one deliberate deviation. |
| Animation engine | Framer Motion (`motion.*.mjs` preloaded). Entrance reveals are `opacity: 0 → 1` with `translateY(20px) → 0`. |
| Navbar | `position: fixed`, `top: 0`, `z-index: 9`. **Does not change on scroll** — background, shadow, radius, and width are identical at scroll 0 and at scroll 1200. |
| Progressive blur | A separate fixed 100px-tall strip behind the navbar made of **8 stacked layers** with `backdrop-filter` blur of 0.078125 / 0.15625 / 0.3125 / 0.625 / 1.25 / 2.5 / 5 / 10 px. |
| Scroll snap | None. |
| Section entrance | Most sections start at `opacity: 0` / `translateY(20px)` and reveal once on entering the viewport. |

## Per-section interaction model

| Section | Model | Evidence |
|---|---|---|
| **Hero** | **scroll-driven parallax** | Diffing every node in the section across scroll positions found three animated elements: the dashboard block (`scale(0.64) translateY(-190px)` → `scale(1) translateY(0)`), the decoration wrapper (`opacity 1 → 0`), and the decoration image (`scale(1) translateY(0)` → `scale(1.93652) translateY(1311.13px)`). The clouds are static. Full detail in `MOTION.md`. |
| Client | continuous marquee | logo track scrolls horizontally, loops |
| **Comparison** | **scroll-driven** | Sticky container (`top: 80px`) plus a 450px spacer. Labels are NOT clickable — no pointer cursor, and `.click()` on them does nothing. No auto-cycle over a 10s observation at a fixed scroll position. The card flips Before → After between `scrollY` 1820 and 1880 (section starts at document offset 1693), i.e. when the card's top crosses ≈30% of the viewport height. Reversible. |
| Features | static + 2 loops | L01 has a horizontal tag marquee; R01 has a vertical word cycler (BUY / hold / SELL). |
| Overview | static | — |
| **Step** | **time-driven** | Auto-advances every **8000 ms** exactly (transitions logged at 681 / 8679 / 16669 / 24680 ms). Loops 01 → 02 → 03 → 01. Pills are NOT clickable — `.click()` does not change the step. The active pill fills with `rgb(16,15,18)` left-to-right over the dwell. |
| Security | static | — |
| Use Cases | continuous marquee | Horizontal ticker of 8 cards; **pauses on hover** (transform froze while the pointer was over it). |
| Integrations | static | Icon ring does **not** rotate — the `Avatar List` transform is byte-identical after 3 s. |
| Stats | static | Card offsets sampled at 5 scroll positions are identical → **no parallax**, despite the cards being absolutely positioned with `translate()` offsets. |
| Testimonial | continuous marquee | Horizontal ticker of 5 quote cards, pauses on hover. |
| **Pricing** | **click-driven** | A single Monthly/Yearly switch. A real pointer click flips the track from `#edf1f4` to `#406ae4` and the prices from `$19`/`$39` to `$16`/`$32` (read from the counter's `aria-label`). |
| **FAQs** | **click-driven accordion, multi-open** | Real pointer clicks confirmed rows toggle independently — after opening rows 2 and 3, row 1 stayed open. Row 1 is open on load. |
| Footer / CTA | static | links only |

## Hover states verified with a real pointer

| Element | Rest | Hover |
|---|---|---|
| Secondary pill button (`View demo`) | `background: #fff`, label `#1d1d1d` | `background: #000`, label `#fff`. No transform — the duplicated "Hover Title" node in the DOM never moves and is a Framer variant artifact. |
| Primary pill button | dark or brand gradient, white arrow circle inset 8px from the right | a second arrow circle is parked at `left: -32px` rotated −45°, i.e. the icons swap diagonally on hover |
| Nav links | `color: #4d585f` | pill fill appears |

## Responsive sweep

Measured at 1440 (desktop reference). Tablet (768) and mobile (390) behavior is specified per component
in `components/*.spec.md`; the shared pattern is:
- multi-column rows stack to single column at ~810px (Framer's default tablet breakpoint for this template)
- the 48px section headings step down to 36px at tablet and 28px at mobile
- absolutely-positioned scatter layouts (Stats) and the fixed-radius ring (Integrations) are scaled or
  reflowed rather than kept at their desktop coordinates

## Known deviation

The clone uses native smooth scrolling instead of Lenis. Everything else — timings, thresholds, easings,
and state machines — matches the measurements above.
