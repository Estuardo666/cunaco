# OverviewSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/OverviewSection.tsx`
- **Interaction model:** **static** — no scroll-driven, click, or timed state. Only a viewport entrance fade/slide.

## Section
`<section id="overview">`, 1425 × 1654, `padding: 200px 0`, `display: flex`, `flex-direction: column`,
`align-items: center`, `position: relative`.

### Background layer (`BG Item`) — `position: absolute`, `inset: 0`, `overflow: clip`, behind everything
- `BG Image`: `sGvx8VOXGYVGBocxGp5Wy6GfeA.jpg` (natural 1440×1350) rendered to fill 1425 × 1654, `object-fit: cover`
- `BG Top`: `position: absolute`, `top: -1px`, `left: -10px`, `right: -10px`, `height: 200px`,
  `background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)`
- `BG Bottom`: `position: absolute`, `bottom: -1px`, `left: -10px`, `right: -10px`, `height: 200px`,
  `background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)`
- All background elements `pointer-events-none`, `aria-hidden`.

### Container (`z-index` above the background)
`max-width: 1260px`, `padding: 0 30px`. Content: 1200 wide, flex column, `align-items: center`, `gap: 50px`.

## Top block — 800 wide (`max-width: 800px`), flex column, centered, `gap: 40px`

Inner header, flex column, centered, `gap: 10px`:
- Eyebrow pill 152 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `Platform overview` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 800 wide, centered: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `See your financial intelligence in action`
- `<p>` 800 wide, centered: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
  `Explore a real-time dashboard that brings your portfolio, insights, and risk analysis together in one clear view.`

Buttons row — `display: flex`, `gap: 20px`, `justify-content: center`, height 59:
- `<FxButton href="/feature" tone="brand" size="lg">Explore features</FxButton>` (rendered 230 × 59)
- `<FxGhostButton href="/request-demo" tone="dark">Try the live demo</FxGhostButton>` (rendered 227 × 59)
  — on this section the secondary button renders with `background: #1d1d1d` and a white label at rest,
  which is exactly what the shared component's `tone="dark"` produces.

## Bottom block — 1200 × 885, flex column, `gap: 30px`

### Dashboard frame — 1200 × 701
`padding: 6px`, `background: #fff`, `border-radius: 20px`.
Inner image block 1188 × 689, `border-radius: 14px`, `overflow: clip`:
`AywdWt5A04h9qxUf1D6vjhKo.jpg` (natural 1187×689), `object-fit: contain`, `border-radius: 14px`.

### Three benefit cards — `display: grid`, `grid-template-columns: 380px 380px 380px`, `gap: 30px`
Each card 380 × 154: `padding: 30px`, `background: #fff`, `border-radius: 20px`, `overflow: clip`,
`display: flex`, `align-items: flex-start`, `gap: 20px`.
- Icon tile 40 × 40: `border-radius: 10px`, `overflow: clip`, `display: flex`, `align-items: center`,
  `justify-content: center`, `background: linear-gradient(135deg, #323232 0%, #000 100%)`, containing the icon image.
- Content 260 wide: a single `<p>` at `18px / 23.4px`, `font-weight: 500`, `color: #4d585f`,
  with a hard line break after the colon. Render as `{lead}<br />{body}` — the live site applies **no**
  different weight or colour to the lead line, so do not bold it.

| # | icon asset | icon rendered | lead | body |
|---|---|---|---|---|
| 1 | `9TgPFzikB5iacM06fvtpGu10.svg` (natural 21×20) | 21 × 20 | `All your work in one place:` | `Bring all your tasks, projects, and updates together in one clear, unified view.` |
| 2 | `pRdU9KB8r1iwhd7rBdjtgbzG2k.svg` (natural 12×20) | 12 × 20 | `Make progress faster:` | `Access key insights instantly and act without delays or unnecessary steps.` |
| 3 | `G0m9o7lLo6sZqM2mtPuo6EgtA.svg` (natural 21×20) | 21 × 20 | `Built for better focus:` | `A clean interface that helps you stay focused and keep everything simple.` |

## States & Behaviors
- Entrance only: header block and bottom block fade from `opacity: 0` / `translateY(20px)` to their resting
  state over 600ms ease-out when they enter the viewport (once), bottom block delayed ~100ms.
- No hover state on the cards. Button hover lives in the shared button components.

## Assets
`sGvx8VOXGYVGBocxGp5Wy6GfeA.jpg`, `AywdWt5A04h9qxUf1D6vjhKo.jpg`,
`9TgPFzikB5iacM06fvtpGu10.svg`, `pRdU9KB8r1iwhd7rBdjtgbzG2k.svg`, `G0m9o7lLo6sZqM2mtPuo6EgtA.svg`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Laptop (1024–1279px):** benefit grid `repeat(3, minmax(0,1fr))`; dashboard frame full width.
- **Tablet (768px):** heading 36px / 43px; benefit grid `repeat(2, minmax(0,1fr))` with the third card
  spanning both columns; buttons stay side by side.
- **Mobile (390px):** section `padding: 100px 0`; heading 28px / 34px; sub-paragraph 16px / 22px;
  buttons stack full-width with `gap: 12px`; dashboard frame `padding: 4px`, inner radius 10px;
  benefit cards single column, `padding: 20px`, `gap: 12px`, card text 16px / 21px.
