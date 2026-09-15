# SecuritySection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/SecuritySection.tsx`
- **Interaction model:** **static** — no click, scroll, hover, or timed state. Entrance reveal only.

## Section
`<section>`, 1425 × 458, `padding: 0`, `display: flex`, `flex-direction: column`, `align-items: center`.
`Container`: `max-width: 1260px`, `padding: 0 30px`.
`Content`: 1200 wide, `display: flex`, `gap: 70px`, `align-items: center`.

## Left — image panel, 628 × 458
`padding: 30px 60px`, `background: #edf1f4`, `border-radius: 30px`, `overflow: clip`,
`display: flex`, `align-items: center`, `justify-content: center`, `gap: 40px`.
Inside, an image block 508 × 398, `overflow: clip`:
`ShWpChwHKJXjkAo8ZPOmvydAuFE.png` (natural 507×398), `object-fit: contain`, `alt=""` (decorative).

## Right — 502 × 391, flex column, `gap: 40px`, `align-items: flex-start`

### Top block — flex column, `align-items: flex-start`, `gap: 10px`
- Eyebrow pill 180 × 38: `padding: 10px 20px`, `border-radius: 100px`, `background: #edf1f4`, `overflow: clip`.
  Label `Security & compliance` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 502 wide: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Your data is protected at every level`
- `<FxButton href="/pricing" tone="dark" size="lg">Get started now</FxButton>` (rendered 228 × 59)

### Bottom block — checklist, 502 × 118, flex column, `gap: 10px`
Four rows, each 502 × 22, `display: flex`, `align-items: center`, `gap: 6px`.
Icon in every row: `OXmFlFjSz1lrJp3vaL02MNthg.svg` (natural 9×14) rendered **6 × 10**.
Label type for all rows: `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`.

1. `End-to-end encryption`
2. `Secure data infrastructure`
3. `Privacy-first approach`
4. `Compliance standards`

Drive the four rows from a typed `const` array.

## States & Behaviors
- Entrance only: content fades from `opacity: 0` / `translateY(20px)` over 600ms ease-out when the section
  enters the viewport (once). Follow the IntersectionObserver pattern already used in `OverviewSection.tsx`
  in the same folder (read it for reference, do not modify it), including
  `motion-reduce:translate-y-0 motion-reduce:transition-none` so reduced-motion users see content immediately.
- No hover state on the checklist rows.

## Assets
`ShWpChwHKJXjkAo8ZPOmvydAuFE.png`, `OXmFlFjSz1lrJp3vaL02MNthg.svg`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Laptop (1024–1279px):** both columns `flex: 1`, `gap: 40px`; the image panel keeps its 30px radius and
  scales its inner image with `max-width: 100%`.
- **Tablet (768px):** columns stack — image panel first, then the text column, `gap: 40px`;
  heading 36px / 43px; image panel `padding: 30px 40px`; the checklist becomes a 2-column grid with `gap: 12px`.
- **Mobile (390px):** heading 28px / 34px; image panel `padding: 20px`, `border-radius: 20px`;
  button full width; checklist back to a single column with `gap: 10px`, label 15px / 20px.
