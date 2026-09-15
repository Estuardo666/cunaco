# TestimonialSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/TestimonialSection.tsx`
- **Interaction model:** **continuous horizontal ticker** (CSS marquee), pauses on hover. No clicks.

## Section
`<section>`, 1425 × 907, `padding: 200px 0`, `display: flex`, `flex-direction: column`,
`align-items: center`, `overflow: clip`, `position: relative`.

### Background layer (`position: absolute`, `inset: 0`, `overflow: clip`, behind content)
- `cQBpXWVe2IileA0HCzW5W4uvgY.jpg` (natural 1440×810) filling 1425 × 907, `object-fit: cover`
- Top fade: `position: absolute`, `top: 0`, `left: -10px`, `right: -10px`, `height: 200px`,
  `background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)`
- Bottom fade: same but `bottom: 0`,
  `background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, #fff 50%)`
- All `pointer-events-none`, `aria-hidden`.

### Container
`max-width: 1260px`, `padding: 0 30px`. `Content`: 1200 wide, flex column, `gap: 50px`, `position: relative`.

## Top row — 1200 × 157, `display: flex`, `gap: 50px`, `align-items: flex-start`, `justify-content: space-between`

**Left** (719 wide, flex column, `gap: 20px`):
- `<h2>`: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `What investors say about the platform`
- Trust list, 719 × 22, `display: flex`, `align-items: center`, `gap: 20px`.
  Each item: `display: flex`, `align-items: center`, `gap: 6px`; label `16px / 20.8px`,
  `font-weight: 500`, `color: #4d585f`.
  Between items a divider: `width: 1px`, `height: 22px`, `background: #1d1d1d`, `overflow: clip`.

  | icon asset | rendered | label |
  |---|---|---|
  | `DR5ESv57oR37TVFwEH7Mx1yI0.svg` (natural 19×18) | 19 × 18 | `4.9/5 Rating` |
  | `aljF5lhKI0wLwJbLJN7Va9tNyCI.svg` (natural 20×18) | 20 × 18 | `75+ Testimonials` |
  | `haC1N7nJkCBSyVJF33CEFhE4Ls.svg` (natural 24×18) | 24 × 18 | `10K+ Growth community` |

**Right** (431 wide, `display: flex`, `justify-content: flex-end`, `align-items: center`):
- `<FxButton href="/pricing" tone="dark" size="lg">Get started today</FxButton>` (rendered 240 × 59)

## Ticker — 1200 × 300
Track `<ul>`: `display: flex`, `gap: 50px`, `width: max-content`.
Five cards, each 400 × 300. Duplicate the whole five-card set (`aria-hidden` on the copy) and animate
`translateX(0) → translateX(-50%)` with the global `fx-marquee-track` utility and
`--fx-marquee-duration: 50s` set inline. Add `hover:[animation-play-state:paused]` and
`motion-reduce:animate-none`. Because a flex `gap` puts the midpoint mid-gap, give each card a
`margin-right: 50px` instead of a track `gap`, so the loop is seamless.

### Card — 400 × 300
`padding: 40px`, `background: #fff`, `border-radius: 30px`, `overflow: hidden`,
`display: flex`, `flex-direction: column`, `justify-content: space-between`.

**Top** — 320 × 144, `padding-bottom: 40px`, flex column, `gap: 16px`:
- Star row: `Ks3rxCrb5LDuCsoN57uNgnYXtc.svg` (natural 182×30) rendered **109 × 18**, `object-fit: contain`
- Quote `<p>` 320 wide: `18px / 23.4px`, `font-weight: 500`, `color: #1d1d1d`

**Bottom** — 320 × 50, `display: flex`, `align-items: center`, `gap: 16px`:
- Avatar 50 × 50, `border-radius: 50%`, `overflow: clip`, `object-fit: cover`
- Name/role column, `display: flex`, `flex-direction: column`, `justify-content: center`, `gap: 2px`:
  - Name `<p>`: `20px / 26px`, `font-weight: 500`, `color: #1d1d1d`
  - Role `<p>`: `14px / 18.2px`, `font-weight: 500`, `color: #4d585f`

### The five testimonials (verbatim — the apostrophes are U+2019)
| # | avatar asset (natural 150×150 unless noted) | quote | name | role |
|---|---|---|---|---|
| 1 | `7Z2d6WeDiCpoz0B6ookMTPOFAU.jpg` (natural 50×57) | `This platform helped me understand my portfolio in ways I couldn’t before. The insights are clear and actually useful.` | `David Miller` | `Individual Investor` |
| 2 | `hYfCvJ3IVdEznEOwIQiiAxWOsPY.jpg` | `Managing multiple portfolios is much easier now. The risk analysis tools save us hours every week.` | `Sarah Thompson` | `Wealth Manager` |
| 3 | `622M5cyJBdKPIK1fPnBlo3qONk.jpg` | `The real-time insights and alerts help me react faster to market changes. It’s become part of my daily workflow.` | `Michael Chen` | `Active Trader` |
| 4 | `W13V3WO2YwDah4yBxCcZc70Es.jpg` | `The data visualization and analytics tools make complex financial information far easier to interpret.` | `Emily Rodriguez` | `Financial Analyst` |
| 5 | `5O8P63EQwkFO1m5OTR4jsw7hI8.jpg` | `The insights are clear and actionable. It helps me track performance and make better investment decisions every day.` | `Daniel Carter` | `Portfolio Manager` |

## States & Behaviors
- Ticker: continuous leftward scroll, pauses on hover, `motion-reduce:animate-none`.
- No hover state on the cards themselves.
- Entrance: the Top row fades from `opacity: 0` / `translateY(20px)` over 600ms ease-out once, on entering
  the viewport. Follow the pattern in `OverviewSection.tsx` in the same folder, including
  `motion-reduce:translate-y-0 motion-reduce:transition-none`.

## Assets
`cQBpXWVe2IileA0HCzW5W4uvgY.jpg`, `DR5ESv57oR37TVFwEH7Mx1yI0.svg`, `aljF5lhKI0wLwJbLJN7Va9tNyCI.svg`,
`haC1N7nJkCBSyVJF33CEFhE4Ls.svg`, `Ks3rxCrb5LDuCsoN57uNgnYXtc.svg`, `7Z2d6WeDiCpoz0B6ookMTPOFAU.jpg`,
`hYfCvJ3IVdEznEOwIQiiAxWOsPY.jpg`, `622M5cyJBdKPIK1fPnBlo3qONk.jpg`, `W13V3WO2YwDah4yBxCcZc70Es.jpg`,
`5O8P63EQwkFO1m5OTR4jsw7hI8.jpg`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Tablet (768px):** Top row stacks (heading, trust list, then the button), `gap: 24px`, button
  left-aligned; heading 36px / 43px; cards 340 × 280 with `padding: 32px`, gap 40px kept.
- **Mobile (390px):** section `padding: 100px 0`; heading 28px / 34px; trust list wraps to a column with
  `gap: 10px` and the 1px dividers hidden; button full width; cards 300 × 260 with `padding: 24px`,
  `border-radius: 24px`, `margin-right: 20px`; quote 16px / 21px; avatar 44 × 44; name 18px / 23px.
