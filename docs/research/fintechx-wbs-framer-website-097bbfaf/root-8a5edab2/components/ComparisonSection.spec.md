# ComparisonSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/ComparisonSection.tsx`
- **Interaction model:** **scroll-driven** (verified: the labels are NOT clickable — no pointer cursor, `.click()` on them does nothing; the card does not auto-cycle over 10s at a fixed scroll position; it flips purely as a function of scroll position, and flips back when scrolling up)

## Section layout
- `<section id="products">`, 1425 × 1525, `padding: 200px 0 0`, `display: flex`, `flex-direction: column`, `align-items: center`, `gap: 150px`
- Child 1 — `Container`: **`position: sticky; top: 80px`**, `max-width: 760px`, `padding: 0 30px`, `display: flex`, `flex-direction: column`, `align-items: center`, `gap: 50px`
- Child 2 — scroll spacer: a plain `div`, 1425 × 450, no content. It exists purely to give the sticky container scroll distance.

### Entrance animation
Both the heading block and the card block start at `opacity: 0; transform: translateY(20px)` and animate to
`opacity: 1; transform: none` when they enter the viewport (Framer Motion appear-on-scroll).
Implement with an IntersectionObserver (threshold ≈ 0.2, once) toggling a class, transition
`opacity 600ms ease-out, transform 600ms ease-out`, with the card block delayed ~100ms after the heading.

## Content column — 700 wide, flex column, `align-items: center`, `gap: 50px`

### Heading
`padding: 0 30px`, inner width 640, `<h2>`: `font-size: 48px`, `line-height: 57.6px`, `font-weight: 600`,
`letter-spacing: -1px`, `color: #1d1d1d`, centered. Text: `Smarter decisions start with clear data`

### Card block — 700 × 560, `position: relative`, `padding-top: 89px`

**Label bar** (`position: absolute`, top 0, width 600, height 90, `display: flex`, `align-items: flex-end`, `gap: 20px`, horizontally centered):
- `BG Overlay Top`: `position: absolute`, 300 × 45, `background: linear-gradient(#fff 0%, rgba(255,255,255,0) 100%)`
- `White Line`: `position: absolute`, `top: 89px`, `left: 50px`, `width: 500px`, `height: 1px`, `background: #fff`
- Left label cell: 215 × 90, `padding: 0 20px 20px 0`, `border-radius: 0 0 20px 0`, text `Before FintechX`,
  `16px / 20.8px`, `font-weight: 500`, `color: #1d1d1d`, right-aligned to its cell
- Center cell: 130 × 90, `position: relative`; holds an image 130 × 160 that overflows downward
  (`position: absolute`, bottom-anchored, `z-index` above the card).
  **Before state asset:** `BepIwACX380EUEqBMK5sdcQgh3k.png` (natural 390×480).
  **After state asset:** `KVlQJuvBpDGKGjMPCFXDMbkUo.png`. Crossfade between them with the card.
- Right label cell: 215 × 90, `padding: 0 0 20px 20px`, `border-radius: 0 0 0 20px`, text `After FintechX`, same type

**Card** — 700 × 471, `padding: 6px`, `border-radius: 30px`, containing an inner panel
688 × 459, `padding: 90px 30px 30px`, `border-radius: 24px`, `display: flex`, `gap: 30px`, `position: relative`.

Inside the inner panel, in DOM order:
1. `Title/Description` — 374 wide, flex column, `gap: 20px`
   - Card title, `font-size: 32px`, `line-height: 38.4px`, `font-weight: 600`
   - Bullet `List` — flex column, `gap: 10px`; each row `display: flex`, `align-items: flex-start`, `gap: 10px`
     with a small icon and a `18px / 23.4px`, `font-weight: 500` label
2. `Bottom` — 224 wide, `display: grid`, `gap: 30px`; two stat boxes, each 224 × 100,
   `padding: 20px`, `border-radius: 20px`, flex column, `gap: 6px`.
   Stat value: `28px / 33.6px`, `font-weight: 600`. Stat label: `16px / 20.8px`, `font-weight: 500`.
3. `BG Item` (**After state only**) — `position: absolute`, `inset: 0`, `border-radius: 24px`, `overflow: hidden`,
   containing the background image `Osh2UHQcarC8mZnL6oh6gwYnbA.jpg` (natural 1440×810), `object-fit: cover`,
   under an `Overlay` div with
   `background: linear-gradient(#000 0%, #000 60%, rgba(0,0,0,0.8) 100%)`.
   It must sit **behind** the text (`z-index: 0` on `BG Item`, `z-index: 1` on the two content blocks).

## The two states (exact measured values)

### State A — "before" (default, card not yet scrolled into the trigger zone)
- Inner panel `background: #edf1f4`, no background image, no overlay
- Card title `Challenges of managing investments today`, `color: #1d1d1d`
- Bullet icon: `59eNALHIwT6GZ6JhLrrkTHE0f7Y.svg` (natural 10×10), rendered 10 × 10
- Bullet color `#4d585f`:
  1. `Financial data is spread across platforms and is hard to understand`
  2. `Lack of clear direction for buy, hold, or sell decisions`
  3. `Tracking investments manually takes time and effort`
  4. `Decisions based on incomplete or outdated information`
- Stat boxes `background: rgba(255, 13, 13, 0.05)`, **no** `backdrop-filter`;
  values `68%` / `55%` in `color: #1d1d1d`; labels `Financial data confusion` / `Poor data understanding` in `color: #4d585f`
- Center badge `BepIwACX380EUEqBMK5sdcQgh3k.png`

### State B — "after"
- Inner panel `background: #000` plus the `BG Item` image + gradient overlay
- Card title `Smarter way to manage your investments`, `color: #fff`
- Bullet icon: `cU6Yacp6C42TCWSRq8qtycxvNeY.svg` (natural 13×10), rendered 13 × 10
- Bullet color `#bababa`:
  1. `Get clear recommendations based on real-time data`
  2. `Understand risks before making investment decisions`
  3. `Monitor your portfolio in real time no manual effort required`
  4. `Make consistent and informed investment choices`
- Stat boxes `background: rgba(16, 185, 129, 0.1)`, `backdrop-filter: blur(5px)`;
  values `3X Faster` / `24/7` in `color: #fff`; labels `Smart decisions` / `Real-time tracking` in `color: rgba(221, 229, 237, 0.7)`
- Center badge `KVlQJuvBpDGKGjMPCFXDMbkUo.png`

## Trigger (measured)
At a 900px-tall viewport the flip happens between `scrollY` 1820 (still "before") and 1880 ("after"),
with the section starting at document offset 1693. At the flip point the card's bounding-box top sits at
roughly **0.3 × viewport height** from the top of the viewport.

Implement as: a `requestAnimationFrame`-throttled scroll listener (or an IntersectionObserver with
`rootMargin: "-30% 0px 0px 0px"`) that sets `after = card.getBoundingClientRect().top <= window.innerHeight * 0.3`.
It must be **reversible** — scrolling back up returns to state A.

## Transition
Crossfade both card variants: `transition: opacity 400ms ease, background-color 400ms ease`.
Render both variants stacked in the same grid cell (`grid-area: 1 / 1`) and toggle opacity, so the card
height never jumps.

## Assets
`BepIwACX380EUEqBMK5sdcQgh3k.png`, `KVlQJuvBpDGKGjMPCFXDMbkUo.png`,
`59eNALHIwT6GZ6JhLrrkTHE0f7Y.svg`, `cU6Yacp6C42TCWSRq8qtycxvNeY.svg`,
`Osh2UHQcarC8mZnL6oh6gwYnbA.jpg`

## Responsive Behavior
- **Desktop (≥1024px):** exact values above.
- **Tablet (768px):** heading 36px / 43px; card width 100%; inner panel switches to a flex **column**
  with `gap: 24px`, stat grid becomes 2 columns; label cells 140px wide; center badge 100 × 123.
- **Mobile (390px):** heading 28px / 34px; section `padding-top: 100px`, `gap: 80px`; sticky disabled
  (`position: relative`) and the 450px spacer collapses to 0 — on mobile the card should simply show
  state A then state B as it scrolls past, still using the same trigger; inner panel `padding: 70px 20px 20px`;
  card title 22px / 27px; bullets 15px / 20px; stat boxes stack in 1 column with `gap: 12px`;
  center badge 80 × 98; label text 13px.
