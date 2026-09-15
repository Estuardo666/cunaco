# PricingSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/PricingSection.tsx`
- **Interaction model:** **click-driven** — a single Monthly/Yearly switch. Verified with a real pointer
  click: the switch track changes colour and both prices change. Nothing else in the section is interactive.

## Section
`<section id="pricing">`, 1425 × 1220, `padding: 0 0 200px`, `display: flex`, `flex-direction: column`,
`align-items: center`.
`Container`: `max-width: 860px`, `padding: 0 30px`. `Content`: 800 wide, flex column, centered, `gap: 50px`.

## Header — 800 × 163, flex column, centered, `gap: 10px`
- Eyebrow pill 156 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `Subscription plans` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 800 wide, centered: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Transparent pricing without hidden fees`

## Billing switch — 315 × 50, `position: relative`, `padding: 10px 20px`, `display: flex`, `align-items: center`, `gap: 20px`, centred on the pricing card's top edge

Decorative frame (identical construction to the Step section's pill bar):
- `Left Line`: `position: absolute`, `top: 0`, `left: -39px`, 40 × 51, `border-radius: 0 0 20px 0`, transparent
- `Right Line`: `position: absolute`, `top: 0`, `left: 314.175px`, 40 × 51, `border-radius: 0 0 0 20px`, transparent
- `Bottom Line`: `position: absolute`, `left: -39px`, `right: -39px`, `height: 1px`, `background: #fff`,
  aligned to the switch's bottom edge (width 393)
- `Grad Overlay`: `position: absolute`, `top: 0`, `left: -2px`, `right: -2px`, `height: 50px`,
  `background: linear-gradient(#fff 0%, rgba(255,255,255,0) 100%)`

Controls, left to right:
1. `Monthly` — `16px / 20.8px`, `font-weight: 500`, `color: #1d1d1d`
2. The switch itself — a `<button role="switch">`, 60 × 30, `border-radius: 6px`, `padding: 3px`,
   `cursor: pointer`. Track background `#edf1f4` when Monthly, `#406ae4` when Yearly (transition 200ms ease).
   Thumb: 24 × 24, `background: #fff`, `border-radius: 4px`; offset **3px from the left** when Monthly and
   **33px from the left** when Yearly (transition `translateX` 200ms ease).
   Give it an accessible label such as `aria-label="Billing period"` and `aria-checked`.
3. `Yearly` — `16px / 20.8px`, `font-weight: 500`, `color: #4d585f` — immediately followed by a small
   `20%off` badge (rendered inline in the same 117 × 22 block).

## Plans card — 800 × 581 outer
`padding: 6px 6px 20px`, `border-radius: 30px`, `overflow: clip`, flex column, `gap: 20px`.
Inner grid 788 × 517: `padding: 10px`, `background: #edf1f4`, `border-radius: 24px`,
`display: grid`, `grid-template-columns: repeat(2, minmax(0, 1fr))`, `gap: 10px`.

### Plan card shell — 379 × 497
`padding: 30px`, `border-radius: 20px`, `overflow: clip`, flex column, `gap: 30px`.

Inside, in order:
1. `Title` row, 319 wide, `display: flex`, `align-items: flex-start`, `justify-content: space-between`, `gap: 10px`:
   - Title/description column, `gap: 6px`: plan name `24px / 28.8px`, `font-weight: 600`;
     tagline `18px / 23.4px`, `font-weight: 500`
   - Optional `Popular` badge, 77 × 30: `padding: 6px 14px`, `border-radius: 100px`, `overflow: clip`,
     `background: linear-gradient(110deg, #406ae4 0%, #5290f4 100%)`,
     label `14px / 18.2px`, `font-weight: 600`, `color: #fff`
2. `Price` row, 319 × 48, `display: flex`, `align-items: baseline`, `gap: 6px`:
   - the amount at `40px / 48px`, `font-weight: 600`
   - `/month` at `16px / 20.8px`, `font-weight: 500`
   The live site animates the digits with a NumberFlow counter; a 250ms opacity/`translateY` crossfade on
   the amount is an acceptable equivalent. `/month` stays fixed for both billing periods.
3. CTA — full-width (319 × 59) `FxGhostButton`
4. `List` — 319 × 182, flex column, `gap: 10px`. Each row: `display: flex`, `align-items: center`, `gap: 6px`,
   with the tick `5qbimdlaVq6A7LLm15aiqqrGNMQ.svg` (natural 7×10) rendered **7 × 10**, and a label at
   `16px / 20.8px`, `font-weight: 500`.

### Plan 01 — Starter (light)
`background: #edf1f4`. Name `Starter plan` (`#1d1d1d`), tagline `Best for individual investors` (`#4d585f`),
`/month` in `#1d1d1d`, features in `#4d585f`. No badge.
Price: **Monthly `$19` · Yearly `$16`**.
CTA: `<FxGhostButton href="/contact" tone="dark" className="w-full">Get started</FxGhostButton>`
(rest `background: #1d1d1d`, label `#fff`).
Features: `Connect up to 5 investment accounts`, `Portfolio performance tracking`, `Basic AI insights`,
`Market updates & alerts`, `Real-time price alerts`, `Email support`.

### Plan 02 — Pro (dark, highlighted)
`background: linear-gradient(132deg, #323232 0%, #000 100%)`. Name `Pro plan` (`#fff`),
tagline `Best for active investors` (`#bababa`), `/month` in `#fff`, features in `#bababa`.
Badge: `Popular`.
Price: **Monthly `$39` · Yearly `$32`**.
CTA: `<FxGhostButton href="/contact" tone="light" className="w-full">Get started</FxGhostButton>`
(rest `background: #fff`, label `#1d1d1d`).
Features: `Unlimited account connections`, `Advanced AI investment insights`, `Portfolio risk analysis`,
`Smart alerts & automation`, `Historical performance analytics`, `Priority support`.

### Footnote row — 788 × 18, `display: flex`, `align-items: center`, `justify-content: center`, `gap: 20px`
Three labels at `14px / 18.2px`, `font-weight: 500`, `color: #4d585f`, separated by 4 × 4 dots
(`border-radius: 50%`, `background: #4d585f`):
`7-day free trial available` · `No credit card required` · `Cancel anytime`

## Enterprise card — 800 × 146
`padding: 30px`, `border-radius: 30px`, `overflow: clip`, `position: relative`,
`background: linear-gradient(#e2f5ff 0%, #fff 100%)`.
Content row 740 × 86, `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: 10px`,
`position: relative`, `z-index: 1`:
- Left, 406 wide, flex column, `gap: 10px`:
  - `Enterprise plan` — `24px / 28.8px`, `font-weight: 600`, `color: #1d1d1d`
  - `<p>` — `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
    `Need a custom solution for your organization? Talk with our team to design a plan for your needs.`
- Right: `<FxGhostButton href="/contact" tone="dark">Contact sales</FxGhostButton>` (rendered 201 × 59)

Decoration: `KbVFR1CeRk5msFRW70lzRZLV8I.png` (natural 454×179) rendered 455 × 180,
`position: absolute`, right-aligned to the card, `pointer-events-none`, `aria-hidden`, `alt=""`, `z-index: 0`.

## States & Behaviors
- The billing switch is the only interactive control. Toggling it changes both plan prices and the
  switch's own colours. Everything else is static.
- Entrance: the header and the plans block fade from `opacity: 0` / `translateY(20px)` over 600ms ease-out
  once, on entering the viewport. Follow the pattern in `OverviewSection.tsx` in the same folder, including
  `motion-reduce:translate-y-0 motion-reduce:transition-none`.

## Assets
`5qbimdlaVq6A7LLm15aiqqrGNMQ.svg`, `KbVFR1CeRk5msFRW70lzRZLV8I.png`

## Responsive Behavior
- **Desktop (≥1024px):** exact values above.
- **Tablet (768px):** heading 36px / 43px; the two plan cards stay side by side but the inner grid gap
  drops to 8px and card padding to 24px; Enterprise card content stacks with `gap: 20px`, button full width.
- **Mobile (390px):** section `padding-bottom: 100px`; heading 28px / 34px; plans grid becomes a single
  column with `gap: 12px`; plan card `padding: 24px`, price 32px / 38px; the footnote row wraps to a column
  with `gap: 8px` and the dots hidden; Enterprise card `padding: 24px`, `border-radius: 24px`, title
  20px / 24px, body 16px / 21px, decoration image hidden.
