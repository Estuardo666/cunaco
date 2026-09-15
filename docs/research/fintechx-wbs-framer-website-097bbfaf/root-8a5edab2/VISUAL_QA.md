# FintechX — Visual QA

Clone served from `http://localhost:3002`, original from `https://fintechx-wbs.framer.website/`,
both measured at a **1440 × 900** viewport with the same measurement script.

## Section geometry (document offset / height, px)

| Section | Original | Clone | Δ top | Δ height |
|---|---|---|---|---|
| Hero | 0 / 1575 | 0 / 1575 | 0 | 0 |
| Client | 1575 / 118 | 1575 / 118 | 0 | 0 |
| Comparison | 1693 / 1525 | 1693 / 1525 | 0 | 0 |
| Features | 3218 / 1211 | 3218 / 1213 | 0 | +2 |
| Overview | 4429 / 1654 | 4431 / 1656 | +2 | +2 |
| Step | 6083 / 687 | 6088 / 687 | +5 | 0 |
| Security | 6770 / 458 | 6774 / 458 | +4 | 0 |
| Use Cases | 7228 / 1177 | 7232 / 1182 | +4 | +5 |
| Integrations | 8405 / 1065 | 8414 / 1079 | +9 | +14 |
| Stats | 9469 / 1180 | 9493 / 1180 | +24 | 0 |
| Testimonial | 10649 / 907 | 10673 / 907 | +24 | 0 |
| Pricing | 11556 / 1220 | 11580 / 1209 | +24 | −11 |
| FAQs | 12777 / 621 | 12789 / 621 | +12 | 0 |
| Footer | 13398 / 1092 | 13410 / 1091 | +12 | −1 |
| **Document** | **14490** | **14502** | — | **+12 (0.08%)** |

## Typography

Every section heading matches exactly — `48px / 57.6px`, `font-weight: 600`,
`letter-spacing: -1px`, `color: rgb(29, 29, 29)` — and each heading's rendered width is identical to
the original (640 / 575 / 800 / 502 / 502 / 800 / 520 / 700 / 719 / 800 / 424).
The hero `h1` is `100px / 100px`, weight 600, `letter-spacing: -1.4px`, `color: rgb(29, 29, 29)`.

## Component boxes

| Component | Expected | Clone |
|---|---|---|
| Hero clouds | 602×350, 519×240, 584×350 | identical |
| Hero headline icon | 124×124 | 124×124 |
| Hero dashboard | 678×393 | 678×393 |
| Features cards | 380×393, 380×393, 790×374, 380×528, 380×239 | identical |
| Use Cases cards | 380×420 | 380×420 |
| Stats cards | 5 × 280×280 at (230,150) (220,820) (610,820) (750,510) (640,120) | identical (constant container offset) |
| Testimonial cards | 400×300 | 400×300 (×2 for the seamless loop) |
| Pricing inner grid | 788×517, cards 379×497 | 788×510, cards 379×490 (−7px) |
| Pricing switch | 60×30 | 60×30 |
| Footer card | 1200×573 | 1200×573 |
| Footer socials | 4 × 32×32 | 4 × 32×32 |
| Mobile nav bar | 343×52 | 343×52 |
| Mobile menu button | 32×32 | 32×32 |

## Behaviors re-tested on the clone

| Behavior | Result |
|---|---|
| Comparison scroll flip | "Before" at scrollY 1750, "After" at 2200, and it reverses when scrolling back — matches the original's 1820–1880 threshold |
| Step auto-advance | transitions at ~816 / 8940 / 16682 ms → **8000 ms** interval, looping 01 → 02 → 03 → 01 |
| Pricing switch | `$19` / `$39` → `$16` / `$32`, `aria-checked` flips |
| FAQ accordion | row 1 open on load; opening rows 3 and 5 leaves row 1 open (independent toggles) |
| Marquees | 4 running CSS animations — Client 40s, Features tags 20s, Use Cases 60s, Testimonials 50s |
| Word cycler | BUY / hold / SELL cycling in the dark Features card |
| Mobile menu | toggles to a 257px panel with all 4 links plus the CTA; Escape and overlay click close it |
| Horizontal overflow | none — `document.scrollWidth === 375` at mobile |

## Fixes applied during QA

1. **Hero was 535px short** — the live section has an explicit `height: 1575px` at desktop and its
   bottom block reserves `1060 × 614` while the screenshot renders at `678 × 393`. Both restored.
2. **Integrations was 257px too tall** — the hub icon and "100+ integrations" heading are a
   flex-centred child *inside* the 1000×505 ring box (z-index 2 over the ring's z-index 0), not a
   sibling below it. Re-nested.
3. **Hero and Features were not full-bleed** — they sized to their content inside the centred `main`.
   Added `w-full`.
4. **Nav links wrapped** ("Use / Cases") — added `whitespace-nowrap`.
5. **Primary button arrow rendered inside the label** — the incoming arrow was positioned from the
   right edge instead of being parked outside the pill. Reworked as a clipped swap inside the fixed
   right-hand circle, which reproduces the diagonal fly-in/out without depending on the pill width.
6. **No mobile navigation** — the live site swaps to a 343×52 bar with a 32px dark hamburger disc and
   a dimmed, blurred overlay. Built.
7. **Comparison entrance could stay invisible under `prefers-reduced-motion`** — the un-entered state
   pinned `opacity-0` while the transition was disabled. Now reveals immediately.

## Known gaps

- **Lenis smooth scrolling.** The original drives scrolling with Lenis; the clone uses native
  `scroll-behavior: smooth` plus `scroll-margin-top: 100px` on anchor targets. The feel differs
  slightly. Adding the `lenis` package would close this.
- **Pricing card height is 7px short** (490 vs 497 on a 497px card, 1.4%).
- **Mobile menu panel styling is inferred.** The closed-state mobile bar was measured exactly, but the
  page stopped responding before the open panel could be measured, so the panel's padding and item
  metrics follow the site's existing design language rather than measured values.
- Framer platform chrome — the fixed "Get it for FREE" marquee badge and the "Made in Framer"
  attribution — is deliberately excluded.


---

# Round 2 — corrections from a full-size side-by-side

The first pass was verified at a 900px-tall viewport in a scaled preview pane. Looking at the site at
its real size surfaced four more defects, all confirmed numerically against the original.

## 8. The primary button was missing its halo — and was 12px too short

The `lg` button is **two nested pills**, verified across four instances:

```
<a>  228 x 59 · padding: 6px · background: rgba(255,255,255,0.1) · radius 100px   <- the halo
  └ Content  215.63 x 47.4 · padding: 12px 54px 12px 30px · gradient · inset shadows
```

I had put the padding directly on the gradient pill, which produced a **47.4px** button with no ring
instead of a 47.4px pill floating inside a 59.4px translucent ring. `sm` (navbar) buttons genuinely
have no halo — there the gradient pill measures the same 124 x 38.2 as the `<a>`.

The arrow itself was never wrong: circle 31.4px, glyph 12 x 8.3, ratio 0.382 — identical in both.

## 9. Body text used the wrong optical size

The site's default family is Inter **Display**. Loading Inter with `opsz` on `auto` resolves to *text*
metrics at body sizes, which are wider: the Integrations sub-heading wrapped onto a third line
(520 x 70 instead of 520 x 47). Pinning `font-variation-settings: "opsz" 32` on `body` reproduces the
original's line breaking exactly — and left every heading measurement untouched.

This one was invisible in the section-height check because it cancelled against other errors.

## 10. The hero decoration sat 32px too low

The live `Wrap` is **1445 x 1543.5** — 31.5px shorter than the 1575px section — top-aligned, with the
image pushed to its bottom by a 200px padding: image top = 1543.5 − 200 − 565 = **778px**. My
`inset-0` wrapper gave 1575 − 200 − 565 = 810px. Those 32px are the difference between the hills
sitting inside the fold and slipping below it. The wrapper is also 1445 wide, bleeding 10px past each
edge of the 1425px section.

## 11. Three spacing defects found while re-checking section heights

- **Pricing billing switch** was `position: absolute` above the card, contributing 0 height. On the
  live site it is in flow: `[switch 50][plans card 581]` with no gap, and the 30px gap sits between
  the plans card and the Enterprise card. Cost: 30px.
- **Pricing feature rows** were 20.8px tall; the live tick sits in a 7 x 22 box, and that box — not
  the 7 x 10 glyph — sets the 22px row height. Cost: 7px per card.
- **FAQ aside card** stacked title, description and CTA at a uniform 16px gap. The live title and
  description share their own 4px-gap block (54px together), with 16px only before the CTA. Cost: 12px.

## Section geometry after round 2

| Section | Original | Clone | Δ height |
|---|---|---|---|
| Hero | 1575 | 1575 | 0 |
| Client | 118 | 118 | 0 |
| Comparison | 1525 | 1525 | 0 |
| Features | 1211 | 1213 | +2 |
| Overview | 1654 | 1657 | +3 |
| Step | 687 | 687 | 0 |
| Security | 458 | 458 | 0 |
| Use Cases | 1177 | 1182 | +5 |
| Integrations | 1065 | 1067 | +2 |
| Stats | 1180 | 1180 | 0 |
| Testimonial | 907 | 907 | 0 |
| Pricing | 1220 | 1223 | +3 |
| FAQs | 621 | 621 | 0 |
| Footer | 1092 | 1092 | 0 |
| **Document** | **14490** | **14505** | **+15 (0.10%)** |

Every section is now within 5px, and the pricing plan card, plans block, and Enterprise card all
match to the pixel (379 x 497, 800 x 581, 800 x 146).
