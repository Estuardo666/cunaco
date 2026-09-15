# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/HeroSection.tsx`
- **Interaction model:** static (layered decorative images; no scroll/click/hover state on the section itself — buttons carry their own hover, and those live in shared components)
- **Section box at 1440px viewport:** 1425 × 1575, `background #fff`, `padding: 194px 0 0`, `display flex`, `position relative`

## Layer stack (z-index, back to front)

| z | `data-framer-name` | position | box | offset (top,left) | asset |
|---|---|---|---|---|---|
| 0 | `BG Item` → `BG Image` | absolute, inset 0 | 1425×1575 | 0,0 | `QonQfzdUmEwRaww2TW9LW9ODvR0.jpg` (natural 1440×1200), `object-fit: cover` |
| 1 | `Cloud 01` | absolute | 602×350 | −40, −130 | `Rorgfh4qpKNsZyFzGNQ9wt5C0i4.png` (natural 601×349) |
| 1 | `Cloud 02` | absolute | 519×240 | 50, 453 (plus `translateX(-259.706px)`) | `fLN6Wx8BsWTV2MkQDeC8mB2BQKA.png` (natural 519×239) |
| 1 | `Cloud 03` | absolute | 584×350 | 80, 900 | `lSZuKptayJeB4Xcw10qjE7IisQw.png` (natural 584×349) |
| 2 | `Container` (real content) | relative | 1260×1068 | 194, 82 | — |
| 2 | `Decoration Image` → `Wrap` | absolute, inset 0 | 1445×1575, wrap has `padding-bottom: 200px` and is bottom-aligned | image block 1445×565 at top 778 | `OH5Re0X1fnTabOLoEQYYNvYZWdQ.png` (natural 1460×571), `object-fit: contain` |
| 2 | `BG Bottom` | absolute | 1445×200, top 1376, left −10 | — | `linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 100%)` |

The clouds are soft blurred blobs behind the headline. `Decoration Image` is a wide graphic that sits *over* the background but *under* nothing else — it visually anchors the dashboard image.

## Content column

`Container`: `max-width: 1260px`, `padding: 0 30px`, `display: flex`, `gap: 50px`, centered, `z-index: 2`.
`Content`: 1200 wide, `display: flex`, `flex-direction: column`, `gap: 120px`, items centered.

### `Top` — 1200 × 333, flex column, `gap: 40px`, centered

#### `Title/Short Description` — flex column, `gap: 20px`, centered

**`Title`** — flex row, `gap: 30px`, `align-items: center`, height 100px:
1. `<h1>` `Finance` — `font-size: 100px`, `line-height: 100px`, `font-weight: 600`, `letter-spacing: -1.4px`, `color: #1d1d1d`, family `"Inter Display"`
2. Inline image block 124 × 124 — `MvCoibXjquEPyTLgOctzXJU.png` (natural 400×400), `object-fit: contain`
3. `<h1>` `Platform` — identical type styles

**Sub-paragraph** — `max-width: 600px`, `text-align: center`,
`font-size: 20px`, `line-height: 26px`, `font-weight: 500`, `color: #4d585f`:
`Optimize your investments with AI-driven analysis, real-time tracking, and intelligent recommendations.`

#### `Buttons` — flex row, `gap: 20px`, centered, height 59px
1. `<FxButton href="/pricing" tone="brand" size="lg">Get started now</FxButton>` (rendered 228×59)
2. `<FxGhostButton href="/request-demo">View demo</FxGhostButton>` (rendered 179×59)

#### `List` — flex row, `gap: 20px`, centered, height 22px
Three items, each `display: flex`, `gap: 6px`, `align-items: center`.
Label type for all three: `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`.

| icon asset | icon box | label |
|---|---|---|
| `DR5ESv57oR37TVFwEH7Mx1yI0.svg` | 19×18 | `4.9/5 Rating` |
| `TPz3R1Zrox75UYaGWia5OJWG0LY.svg` | 17×18 | `Bank-level security` |
| `yMT4mMoFpKnWs2yU5HHxgRIdrc.svg` | 12×18 | `Real-time AI insights` |

Between items sit two `Line` dividers: `width: 1px`, `height: 22px`, `background: #1d1d1d`.

### `Bottom` — 1060 × 614, `max-width: 1060px`, flex, centered

A single dashboard screenshot: rendered 678 × 393, `border-radius: 20px`, `object-fit: cover`,
asset `DyMdJq1T1QOvaqt7lS1v7R7bwI.jpg` (natural 1060×614).
Note the wrapper reserves 1060×614 while the image itself renders at 678×393 and is centred —
reproduce by giving the wrapper `w-[1060px] max-w-full` and the image `w-[678px] h-[393px]`.

## States & Behaviors
- Section itself: **N/A** — no scroll-triggered, click, or hover state.
- Button hover states live in `FxButton` / `FxGhostButton` and must not be re-implemented here.

## Assets (all under `fxAsset(...)`)
`QonQfzdUmEwRaww2TW9LW9ODvR0.jpg`, `Rorgfh4qpKNsZyFzGNQ9wt5C0i4.png`, `fLN6Wx8BsWTV2MkQDeC8mB2BQKA.png`,
`lSZuKptayJeB4Xcw10qjE7IisQw.png`, `OH5Re0X1fnTabOLoEQYYNvYZWdQ.png`, `MvCoibXjquEPyTLgOctzXJU.png`,
`DyMdJq1T1QOvaqt7lS1v7R7bwI.jpg`, `DR5ESv57oR37TVFwEH7Mx1yI0.svg`, `TPz3R1Zrox75UYaGWia5OJWG0LY.svg`,
`yMT4mMoFpKnWs2yU5HHxgRIdrc.svg`

## Text Content (verbatim)
```
Finance
Platform
Optimize your investments with AI-driven analysis, real-time tracking, and intelligent recommendations.
Get started now
View demo
4.9/5 Rating
Bank-level security
Real-time AI insights
```

## Responsive Behavior
- **Desktop (1440px):** as measured above.
- **Tablet (768px):** headline scales down (≈64px), the `Title` row wraps so the 124px icon sits inline at ≈80px, buttons stay side by side, `List` wraps to two rows and the 1px dividers are hidden.
- **Mobile (390px):** headline ≈40px/1em, `Title` stacks (`Finance` / icon / `Platform` on one wrapped line), sub-paragraph full width, buttons stack full-width, `List` becomes a 1-column stack with dividers hidden, `Bottom` image full width with `border-radius: 12px`.
- **Breakpoint:** primary layout change at ~810px (Framer's default tablet breakpoint on this template).
