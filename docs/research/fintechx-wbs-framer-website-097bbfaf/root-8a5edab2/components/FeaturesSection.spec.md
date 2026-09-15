# FeaturesSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/FeaturesSection.tsx`
- **Interaction model:** mostly **static**, with two continuous animations inside cards (a horizontal tag marquee in card L01 and a vertical word cycler in card R01). No click or scroll-driven state.

## Section
`<section id="features">`, 1425 × 1211, `padding: 200px 0 0`, `display: flex`, `flex-direction: column`, `align-items: center`.
`Container`: `max-width: 1260px`, `padding: 0 30px`. `Content`: 1200 wide, flex column, `gap: 50px`.

## Top row — 1200 × 163, `display: flex`, `gap: 50px`, `align-items: flex-start`

**Left** (575 wide, flex column, `gap: 10px`):
- Eyebrow pill, 125 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `Core features` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 575 wide: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Everything you need to invest confidently`

**Right** (575 wide, flex column, `align-items: flex-start`, `gap: 20px`):
- `<p>`: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
  `Professional tools designed for active traders and long-term investors managing diverse portfolios.`
- `<FxButton href="/feature" tone="dark" size="lg">View all features</FxButton>` (rendered 232 × 59)

## Bottom — bento grid, 1200 × 797

Outer grid: `display: grid`, `grid-template-columns: 380px 380px 380px`, `gap: 30px`.
- Left cluster spans the first two columns (790 wide) and is itself
  `display: grid`, `grid-template-columns: 380px 380px`, `gap: 30px`.
- Right cluster is the third column (380 wide), `display: flex`, `flex-direction: column`, `gap: 30px`.

Every card: `border-radius: 20px`, `overflow: clip`, `position: relative`.
Every card title: `24px / 28.8px`, `font-weight: 600` (color `#1d1d1d` on light cards, `#fff` on the dark card).

### L01 — `Advanced risk analysis` — 380 × 393
`padding: 40px`, `background: #edf1f4`, `display: flex`, `flex-direction: column`, `gap: 30px`.
1. Title `Advanced risk analysis`
2. Illustration: `wXWMCe97v6E9fhERLabXGgt0Go.png` (natural 150×195) rendered 150 × 196, `object-fit: contain`,
   in an absolutely-positioned block centred in the card body
3. A horizontal **tag marquee** at the bottom (track 547 wide, height 28, `gap: 20px`, `display: flex`):
   the three tags repeat continuously. Tag text `14px / 18.2px`, `font-weight: 500`, `color: #4d585f`.
   Tags: `Real-time risk scoring`, `Portfolio volatility tracking`, `Predictive risk alerts`.
   Repeat the set 3× in the DOM (the live site renders 3 copies), animate `translateX(0) → translateX(-33.333%)`
   over 20s linear infinite, mask the edges with
   `linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)`,
   and add `motion-reduce:animate-none`.

### L02 — `Market insights` — 380 × 393
`padding: 40px`, `background: #edf1f4`, flex column, `gap: 30px`.
1. Title `Market insights`
2. Foreground graphic `G7W3uXGEWJ2M7xixcWnVJPdzxEc.svg` (natural 303×246) rendered 300 × 244, `object-fit: contain`, absolutely positioned
3. `BG Item`: `position: absolute`, `inset: 0`, `overflow: clip` — background photo
   `IZgCL46gW5tJW2TUtUKnT2MFgMs.jpg` (natural 379×379) rendered 380 × 393 `object-fit: cover`,
   under an `Overlay` with `background: linear-gradient(#fff 0%, #fff 0%, rgba(255,255,255,0) 100%)`.
   `BG Item` sits behind the title and graphic.

### L03 — `Portfolio tracking` — 790 × 374 (spans both left columns)
`padding: 40px 40px 0`, `background: #edf1f4`, flex column.
1. `Top` block 500 wide, `padding-bottom: 40px`, `gap: 4px`:
   title `Portfolio tracking`, then `<p>` `16px / 20.8px`, `font-weight: 500`, `color: #4d585f` —
   `See your entire financial picture in one place with performance attribution and gain/loss analysis.`
2. `Bottom` block 710 × 220, `padding-top: 30px`, `display: flex`, `gap: 50px`, holding two graphics:
   `LLeScfWulZWyA0jZhMBwmQgQHA.svg` (natural 252×235) rendered 269 × 254 and
   `LP5Ny6NdFTClX39IhTGUIolDygE.svg` (natural 304×280) rendered 351 × 333, both `object-fit: contain`,
   bottom-aligned so they bleed past the card's bottom edge (the card has no bottom padding and clips).
3. `BG Item`: `position: absolute`, `inset: 0` — photo `subirXJz7lXrSNejZPxoXXA90Ik.jpg` (natural 790×395)
   rendered 790 × 374 `object-fit: cover`, under the same white top-to-transparent `Overlay` gradient. Behind everything.

### R01 — `AI-powered insights` — 380 × 528 — **dark card**
`padding: 40px`, `background: #000`, flex column, `justify-content: space-between`.
1. Title `AI-powered insights`, `color: #fff`
2. A **vertical word cycler** filling 300 × 378: giant words at `font-size: 86px`,
   `line-height: 61.92px`, `font-weight: 700`, `color: #fff`, uppercase-as-written.
   The live DOM exposes the words `BUY` and `hold` (a third, `SELL`, cycles in);
   render the sequence `BUY`, `hold`, `SELL` in a column that translates up one word-height every
   ~2s with a 400ms ease transition, looping. Clip the column (`overflow: hidden`) so exactly one word
   plus a sliver of the next is visible, and add `motion-reduce:animate-none`.
3. `<p>` `16px / 20.8px`, `font-weight: 500`, `color: #bababa` — `Real-time market data and predictive analysis.`

### R02 — `Smart alerts` — 380 × 239
`padding: 40px`, `background: #edf1f4`, flex column, `gap: 30px`.
1. Title `Smart alerts`
2. Three stacked alert-row graphics inside a 300 × 100 block, each absolutely positioned and offset so
   they fan downward with decreasing width (a receding stack):
   `e7N84L0vlZQpYYqGdndB2EPeKk.svg` rendered 280 × 70 (front, natural 280×70),
   `qRR37bNghXttLizbZI0gYViJtDE.svg` rendered 241 × 60 (middle, natural 280×70),
   `KeTabRzcIFVfk1ymsNMeghVPnM.svg` rendered 202 × 50 (back, natural 280×70).
   All `object-fit: contain`, horizontally centred, back-most highest.
3. A small badge image `dIhxLbN1GBZu7TFHjssn0JUI4kY.png` (natural 175×148) rendered 60 × 51,
   `position: absolute`, `overflow: clip`, in the card's lower-right area.

## States & Behaviors
- Marquee in L01: continuous, 20s linear infinite.
- Word cycler in R01: continuous, one step ≈2s.
- No hover, click, or scroll-triggered state anywhere in this section.
- Card entrance: the whole `Bottom` grid fades/slides in (`opacity 0 → 1`, `translateY(20px) → 0`, 600ms ease-out)
  once, when it enters the viewport.

## Assets
`wXWMCe97v6E9fhERLabXGgt0Go.png`, `G7W3uXGEWJ2M7xixcWnVJPdzxEc.svg`, `IZgCL46gW5tJW2TUtUKnT2MFgMs.jpg`,
`LLeScfWulZWyA0jZhMBwmQgQHA.svg`, `LP5Ny6NdFTClX39IhTGUIolDygE.svg`, `subirXJz7lXrSNejZPxoXXA90Ik.jpg`,
`e7N84L0vlZQpYYqGdndB2EPeKk.svg`, `qRR37bNghXttLizbZI0gYViJtDE.svg`, `KeTabRzcIFVfk1ymsNMeghVPnM.svg`,
`dIhxLbN1GBZu7TFHjssn0JUI4kY.png`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Laptop (1024–1279px):** the grid becomes fluid — `grid-template-columns: repeat(3, minmax(0, 1fr))`,
  card heights stay proportional, illustrations shrink with `max-width: 100%`.
- **Tablet (768px):** top row stacks (heading block above the paragraph + button, `gap: 30px`);
  bento becomes `grid-template-columns: repeat(2, minmax(0, 1fr))` with L03 spanning both columns and
  R01/R02 flowing as normal cells; heading 36px / 43px.
- **Mobile (390px):** section `padding-top: 100px`; everything becomes a single column with `gap: 20px`;
  heading 28px / 34px; card `padding: 24px`; card titles 20px / 24px; R01 word cycler 56px / 44px;
  L03 keeps `padding-bottom: 0` and its two graphics stack with `gap: 20px`.
