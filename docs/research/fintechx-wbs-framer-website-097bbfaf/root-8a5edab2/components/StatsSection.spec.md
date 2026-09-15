# StatsSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/StatsSection.tsx`
- **Interaction model:** **static**. The card offsets are constant across scroll positions (sampled at five
  scroll offsets — identical transforms), so there is **no parallax**. Entrance reveal only.

## Section
`<section>`, 1425 × 1180, `padding: 100px 0 0`, `display: flex`, `flex-direction: column`, `align-items: center`.
`Container`: `max-width: 1260px`, `padding: 0 30px`.
`Content`: 1200 × 1080, `position: relative`, `display: flex`, `flex-direction: column`, `align-items: center`.

## Header — 700 wide (`max-width: 700px`), flex column, centered, `gap: 10px`, `z-index: 1`
- Eyebrow pill 127 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `Platform stats` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 700 wide, centered: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Powering smarter investment decisions`
- `<p>` 700 wide, centered: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
  `Real-time insights, advanced analytics, and secure infrastructure working together.`

## Card field — `position: absolute`, `inset: 0` (1200 × 1080), behind the header (`z-index: 0`)

Five cards, each **280 × 280**, `position: absolute`, placed at these **final** coordinates
(the live site splits each into a CSS offset plus a constant `translate`; these are the resolved values —
use them directly as `top` / `left`):

| # | top | left | variant | icon asset (natural, rendered 20 × 20) | label | value | description |
|---|---|---|---|---|---|---|---|
| 1 | 230 | 150 | light | `q5j0wSdwMKoffsX85Ad5pRD16WY.svg` (20×19) | `Active investors` | `10,000+` | `Users managing portfolios with AI insights.` |
| 2 | 220 | 820 | dark | `HVHGQkyxoQVs16N8JfQt5jzI.svg` (18×20) | `Assets tracked` | `$250M+` | `In investments monitored across the platform.` |
| 3 | 610 | 820 | light | `cM86wDyqMYapxowGxtKW64TcFC4.svg` (17×20) | `Platform uptime` | `99.9%` | `Reliable access to your financial intelligence.` |
| 4 | 750 | 510 | brand | `QHWxFsQnPvlSmhvomNozoRBtSjk.svg` (21×20) | `Markets covered` | `120+` | `Global financial markets are analyzed in real time.` |
| 5 | 640 | 120 | dark | `wiruZRRAYkGg8lZDZWNz9Puunw.svg` (16×20) | `AI insights generated` | `1M+` | `Data-driven signals delivered every month.` |

### Card shell (all variants)
`width: 280px`, `height: 280px`, `padding: 30px`, `border-radius: 30px`, `overflow: hidden`,
`display: flex`, `flex-direction: column`, `align-items: flex-start`, `justify-content: space-between`.

| variant | background | label colour | value colour | description colour |
|---|---|---|---|---|
| light | `linear-gradient(135deg, #edf1f4 0%, #edf1f4 100%)` | `#1d1d1d` | `#1d1d1d` | `#4d585f` |
| dark | `linear-gradient(135deg, #323232 0%, #000 100%)` | `#fff` | `#fff` | `#bababa` |
| brand | `linear-gradient(90deg, #406ae4 0%, #3b82f6 100%)` | `#fff` | `#fff` | `#edf1f4` |

### Card `Top` — 220 × 72, `display: flex`, `align-items: flex-start`, `gap: 10px`, `padding-bottom: 30px`
- Left: the label, `16px / 20.8px`, `font-weight: 500` (wraps to two lines — box 105 × 42)
- Right: a 40 × 40 circle (`border-radius: 50%`, **transparent background**, `display: flex`,
  `align-items: center`, `justify-content: center`) holding the 20 × 20 icon. The right group is
  `display: flex`, `align-items: center`, `justify-content: flex-end`, `gap: 10px`.

### Card `Bottom` — 220 × 96, flex column, `gap: 6px`
- `<h3>` value: `40px / 48px`, `font-weight: 600`
- `<p>` description: `16px / 20.8px`, `font-weight: 500`

## States & Behaviors
- No hover, click, scroll-driven, or timed behaviour.
- Entrance: the header and the card field fade from `opacity: 0` / `translateY(20px)` over 600ms ease-out
  once, on entering the viewport. Follow the pattern in `OverviewSection.tsx` in the same folder, including
  `motion-reduce:translate-y-0 motion-reduce:transition-none`. Optionally stagger the five cards by 60ms each.

## Assets
`q5j0wSdwMKoffsX85Ad5pRD16WY.svg`, `HVHGQkyxoQVs16N8JfQt5jzI.svg`, `cM86wDyqMYapxowGxtKW64TcFC4.svg`,
`QHWxFsQnPvlSmhvomNozoRBtSjk.svg`, `wiruZRRAYkGg8lZDZWNz9Puunw.svg`

## Responsive Behavior
The absolutely-positioned scatter only works at the full 1200px canvas.
- **Desktop (≥1280px):** the absolute layout above, `Content` height 1080px.
- **Laptop (1024–1279px):** keep the absolute canvas but wrap it in a container with
  `transform: scale(0.85); transform-origin: top center` and reduce the reserved height to 918px.
- **Tablet (≤1023px) and mobile:** abandon the scatter. `Content` becomes `height: auto` with
  `gap: 40px`; the card field becomes `position: static` and a `display: grid` of
  `repeat(2, minmax(0, 1fr))` with `gap: 20px`, cards `width: 100%`, `height: auto`,
  `min-height: 240px`, `aspect-ratio: 1 / 1` dropped.
- **Mobile (390px):** section `padding-top: 60px`; heading 28px / 34px; sub 16px / 22px;
  card grid becomes a single column with `gap: 16px`; card `padding: 24px`, `border-radius: 24px`,
  value 32px / 38px, `min-height: 200px`.
