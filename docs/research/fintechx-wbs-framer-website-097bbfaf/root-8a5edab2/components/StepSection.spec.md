# StepSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/StepSection.tsx`
- **Interaction model:** **time-driven** — the three steps auto-advance on a fixed 8-second timer
  (measured transitions at 681ms → 8679ms → 16669ms → 24680ms, i.e. exactly 8000ms apart) and loop
  `Step 01 → Step 02 → Step 03 → Step 01`.
  The pills are **NOT clickable**: `.click()` on a pill does not change the active step. Do not add
  click handlers, `role="tab"`, or `<button>` elements.

## Section
`<section id="how-it-works">`, 1425 × 687, `padding: 0 0 200px`, `display: flex`, `flex-direction: column`,
`align-items: center`.
`Container`: `max-width: 1260px`, `padding: 0 30px`. `Content`: 1200 wide, `display: flex`, `gap: 70px`,
`align-items: flex-start`.

## Left column — 502 wide, `padding-top: 59px`, flex column, `gap: 70px`

Header, flex column, `align-items: flex-start`, `gap: 10px`:
- Eyebrow pill 120 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `How it works` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 502 wide: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Start investing in minutes`
- `<p>` 502 wide: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
  `Connect your accounts, let AI analyze your data, and get clear insights to invest with confidence.`

Stats row — `display: grid`, `grid-template-columns: repeat(2, 236.113px)`, `gap: 30px`, each cell
flex column with `gap: 6px`:
| value (`<h3>` `32px / 38.4px`, `font-weight: 600`, `color: #1d1d1d`) | label (`<p>` `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`) |
|---|---|
| `100%` | `Secure, encrypted data protection` |
| `2 Minutes` | `Set up to connect and begin instantly` |

## Right column — 628 × 487, flex column

### Pill bar — 305 × 58, `position: relative`, `padding: 10px`, `display: flex`, `gap: 10px`, centered on the card's top edge
Three pills, each `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`,
label `14px / 18.2px`, `font-weight: 500`. Rendered widths: 86 / 89 / 89.

- **Inactive pill:** label `color: #4d585f`, no fill.
- **Active pill:** label `color: #fff`, and an extra absolutely-positioned progress layer at `z-index: 1`
  covering the pill: a wrapper with `overflow: hidden` containing a bar with `background: rgb(16, 15, 18)`,
  `position: absolute`, `left: 0`, `height: 100%`, whose width animates from `0` to the pill's full width
  linearly over the 8000ms dwell, then resets. The label must render **above** this fill.
  Practically: render the fill as an absolutely-positioned `<span>` with
  `transform: scaleX(var(--p)); transform-origin: left` animated by a CSS animation of 8s linear, keyed
  off the active step so it restarts on every change. Give it `motion-reduce:animate-none` and, under
  reduced motion, leave the fill at full width so the active pill still reads as active.

### Decorative frame around the pill bar
- `Bottom Line`: `position: absolute`, `top: 58.2px`, `left: -39px`, `right: -39px`, `height: 1px`, `background: #fff`
- `Left Line`: `position: absolute`, `top: 0`, `left: -39px`, `width: 40px`, `height: 59px`,
  `border-radius: 0 0 20px 0`, transparent fill (it is a corner mask over the card edge)
- `Right Line`: same but `left: 303.812px`, `border-radius: 0 0 0 20px`
- `Grad Overlay`: `position: absolute`, `top: 0`, `left: -2px`, `right: -2px`, `height: 70px`,
  `background: linear-gradient(#fff 0%, rgba(255,255,255,0) 100%)`

### Step card — 628 × 428
`padding: 6px`, `border-radius: 30px`, `overflow: clip`.
Inner `Content` 616 × 416: `padding: 40px`, `background: #edf1f4`, `border-radius: 24px`, `overflow: clip`,
flex column, `gap: 40px`.
Inside, a 536-wide column with `gap: 40px`:
1. Screenshot block 536 × 238 (`object-fit: contain`)
2. `Title/Description`, flex column, `gap: 6px`:
   - `<h3>` `24px / 28.8px`, `font-weight: 600`, `color: #1d1d1d`
   - `<p>` `18px / 23.4px`, `font-weight: 500`, `color: #4d585f`

## The three states (verbatim)

| pill | image asset | title | description |
|---|---|---|---|
| `Step 01` | `ykcQXfkRR4KTqMLXTbg0T9PB8zk.png` (natural 535×238) | `Connect your accounts` | `Securely link your bank, trading, and investment accounts.` |
| `Step 02` | `BRYQbNFP21XSdbOpg2tEs4MO0aY.png` | `Analyze your data` | `AI processes your data to generate clear insights.` |
| `Step 03` | `nDs3OgbLpR77rcn1GvmpOSivzdI.png` | `Get smart insights` | `Receive real-time recommendations to optimize your portfolio.` |

Crossfade the card content between steps (`opacity` 300ms ease). Render all three stacked in one CSS grid
cell (`grid-area: 1 / 1`) so the card height never jumps, and mark the two inactive ones `aria-hidden`.

## States & Behaviors
- Auto-advance: `setInterval` of exactly **8000ms**, cleared on unmount.
- Under `prefers-reduced-motion`, stop the auto-advance and simply show `Step 01`.
- No hover, no click, no scroll-driven behaviour anywhere in this section.
- Entrance: the whole content fades from `opacity: 0` / `translateY(20px)` over 600ms ease-out when the
  section enters the viewport (once).

## Assets
`ykcQXfkRR4KTqMLXTbg0T9PB8zk.png`, `BRYQbNFP21XSdbOpg2tEs4MO0aY.png`, `nDs3OgbLpR77rcn1GvmpOSivzdI.png`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Laptop (1024–1279px):** the two columns become `flex: 1` each, `gap: 40px`; card and images scale fluidly.
- **Tablet (768px):** the two columns stack — left column first, then the step card, `gap: 50px`;
  heading 36px / 43px; left column `padding-top: 0`; stats grid keeps 2 columns.
- **Mobile (390px):** section `padding-bottom: 100px`; heading 28px / 34px; sub 16px / 22px;
  stats grid becomes 1 column with `gap: 20px` and values 24px / 29px; pill bar shrinks to
  `padding: 8px`, `gap: 6px`, pill `padding: 8px 14px`, label 12px; step card `padding: 4px`,
  inner `padding: 20px`, inner radius 18px, card `gap: 20px`; step title 20px / 24px, description 16px / 21px.
