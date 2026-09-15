# UseCasesSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/UseCasesSection.tsx`
- **Interaction model:** **continuous horizontal ticker** (CSS marquee) that **pauses on hover**. No clicks, no scroll-driven state.

## Section
`<section id="use-cases">`, 1425 × 1177, `padding: 200px 0`, `display: flex`, `flex-direction: column`,
`align-items: center`.
`Container` / `Content`: full width (`max-width: 100%`), flex column, `align-items: center`, `gap: 50px`.

## Top — 860 wide (`max-width: 860px`), `padding: 0 30px`, flex column, centered, `gap: 10px`
- Eyebrow pill 105 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `Use cases` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 800 wide, centered: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Who this platform is built for`

## Ticker — full bleed, 1425 × 420, `overflow: clip`
Track: `<ul>`, `display: flex`, `gap: 10px`, `width: max-content`.
Eight cards, each `<li>` 380 × 420, alternating **image-only** and **glass content** cards.
Duplicate the whole eight-card set a second time in the DOM (`aria-hidden` on the copy) and animate
`translateX(0) → translateX(-50%)`. Use the existing global `fx-marquee-track` utility with
`--fx-marquee-duration: 60s` set inline. Add `hover:[animation-play-state:paused]` on the track
(the live ticker pauses while the pointer is over it) and `motion-reduce:animate-none`.

### Image-only cards (positions 1, 3, 5, 7 of the set)
A single photo filling the card: 380 × 420, `border-radius: 30px`, `overflow: clip`, `object-fit: cover`.
| # | asset (natural 380×475) |
|---|---|
| 1 | `QJxW9eYj0OFH6UvNuY4WNkVNJ0.jpg` |
| 3 | `ir92iMEO3JaF66SNrwrpEtYCY.jpg` |
| 5 | `nkS8pAWPKcD8U7ncGVFOqXVV0o.jpg` |
| 7 | `omPOmfMdMLLw0U7G41FgZY7Cfmg.jpg` |
These are decorative — `alt=""`, `aria-hidden`.

### Glass content cards (positions 2, 4, 6, 8)
Outer 380 × 420: `padding: 10px`, `border-radius: 30px`, `overflow: hidden`, `position: relative`.
- Background photo, `position: absolute`, `inset: 0`, 380 × 420, `border-radius: 30px`, `object-fit: cover`.
- Inner `Content` panel 360 × 400, `position: relative`, `padding: 30px`, `border-radius: 20px`,
  `overflow: clip`, `background: rgba(255, 255, 255, 0.3)`, `backdrop-filter: blur(20px)`,
  `display: flex`, `flex-direction: column`, `justify-content: space-between`.
  - `Top` block 300 wide, `padding-bottom: 30px`, flex column, `gap: 6px`:
    - `<h3>` `28px / 33.6px`, `font-weight: 600`, `color: #1d1d1d`
    - `<p>` `18px / 23.4px`, `font-weight: 500`, `color: #4d585f`
  - `Bottom` block 300 wide, flex column, `gap: 6px`:
    - `<h4>` `24px / 28.8px`, `font-weight: 600`, `color: #1d1d1d`
    - `<p>` `16px / 20.8px`, `font-weight: 500`, `color: #1d1d1d`

| # | background asset (natural 380×475) | title | description | metric | metric label |
|---|---|---|---|---|---|
| 2 | `l4todGvJ7jL3WhxngE8F0mr2mks.jpg` | `Individual investors` | `Track your portfolio, get AI insights, and make smarter investment decisions without relying on guesswork.` | `+32% Faster` | `Decision-making with AI insights` |
| 4 | `rF4nkbqTtccZBPQrR1TG1yKqD8.jpg` | `Financial teams` | `Collaborate on financial strategies, monitor investments, and make data-driven decisions at scale.` | `Real-Time` | `Collaboration across all investment data` |
| 6 | `Rl52kJV49NxXXh2BR2NJhjJuN7I.jpg` | `Wealth managers` | `Manage multiple client portfolios efficiently with real-time data, risk analysis, and performance tracking.` | `10+` | `Portfolios managed from a single dashboard` |
| 8 | `nPSRrYomcOALmLPJavAfjBIboI.jpg` | `Active traders` | `Stay ahead of market movements with real-time alerts and AI-powered signals for quick decisions.` | `Up to 2X` | `Better goal tracking and portfolio growth` |

The eight cards run in the DOM order 1, 2, 3, 4, 5, 6, 7, 8 as listed above (image, content, image, content, …).

## Bottom — 860 wide (`max-width: 860px`), `padding: 0 30px`, flex column, centered, `gap: 30px`

### Trust pills — 800 wide, `display: flex`, `justify-content: center`, `gap: 10px`
Each pill 28px tall: `padding: 4px 14px 6px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
Label `14px / 18.2px`, `font-weight: 500`, `color: #4d585f`. No icons.
Rendered widths 119 / 90 / 140 / 149. Labels: `10,000+ Users`, `4.9 Rating`, `Real-time insights`, `Secure & compliant`.

### Founder quote — 500 wide (`max-width: 500px`), flex column, centered, `gap: 16px`
- `<p>` 500 wide, centered: `18px / 23.4px`, `font-weight: 500`, `color: #1d1d1d` —
  `"We built this platform to remove the guesswork from investing and give people clear, data-driven insights."`
  (straight double quotes, exactly as shown, included in the text)
- Attribution row, `display: flex`, `align-items: center`, `gap: 6px`:
  - Avatar 30 × 30, `border-radius: 50%`, `overflow: clip`, `object-fit: cover` —
    `7Z2d6WeDiCpoz0B6ookMTPOFAU.jpg` (natural 50×57)
  - `<p>` `14px / 18.2px`, `font-weight: 500`, `color: #4d585f` — `Founder & CEO`

## States & Behaviors
- Ticker: continuous leftward scroll, pauses while hovered, `motion-reduce:animate-none`.
- No hover state on individual cards beyond the ticker pause.
- Entrance: the Top block and Bottom block fade from `opacity: 0` / `translateY(20px)` over 600ms ease-out
  once, on entering the viewport. Follow the pattern in `OverviewSection.tsx` in the same folder
  (read for reference, do not modify), including `motion-reduce:translate-y-0 motion-reduce:transition-none`.

## Assets
`QJxW9eYj0OFH6UvNuY4WNkVNJ0.jpg`, `l4todGvJ7jL3WhxngE8F0mr2mks.jpg`, `ir92iMEO3JaF66SNrwrpEtYCY.jpg`,
`rF4nkbqTtccZBPQrR1TG1yKqD8.jpg`, `nkS8pAWPKcD8U7ncGVFOqXVV0o.jpg`, `Rl52kJV49NxXXh2BR2NJhjJuN7I.jpg`,
`omPOmfMdMLLw0U7G41FgZY7Cfmg.jpg`, `nPSRrYomcOALmLPJavAfjBIboI.jpg`, `7Z2d6WeDiCpoz0B6ookMTPOFAU.jpg`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Tablet (768px):** heading 36px / 43px; cards 320 × 380, inner panel padding 24px, title 24px / 29px,
  description 16px / 21px; trust pills wrap to two rows.
- **Mobile (390px):** section `padding: 100px 0`; heading 28px / 34px; cards 280 × 340 with
  `border-radius: 24px`, inner panel `padding: 20px`, `border-radius: 16px`, title 22px / 27px,
  description 15px / 20px, metric 20px / 24px, metric label 14px / 18px; trust pills wrap, `gap: 8px`;
  quote 16px / 21px.
