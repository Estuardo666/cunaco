# IntegrationsSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/IntegrationsSection.tsx`
- **Interaction model:** **static**. The icon ring does **not** rotate — the `Avatar List` transform is
  identical after 3 seconds. Entrance reveal only.

## Section
`<section id="integrations">`, 1425 × 1065, `padding: 0`, `display: flex`, `flex-direction: column`,
`align-items: center`.
`Container`: `max-width: 1260px`, `padding: 0 30px`.

`Content` — the whole section is one big card: 1200 × 1065, `padding: 100px`, `background: #edf1f4`,
`border-radius: 30px`, `overflow: clip`, `position: relative`, `display: flex`, `flex-direction: column`,
`align-items: center`, `gap: 50px`.

## Top block — 520 wide (`max-width: 520px`), flex column, centered, `gap: 30px`

Header, flex column, centered, `gap: 10px`:
- Eyebrow pill 114 × 38: `padding: 10px 20px`, `border-radius: 100px`, **`background: #fff`**
  (white here, not `#edf1f4`, because the card behind it is `#edf1f4`), `overflow: clip`.
  Label `Integrations` — `14px / 18.2px`, `font-weight: 500`, `color: #1d1d1d`
- `<h2>` 520 wide, centered: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Connect with the tools you already use`
- `<p>` 520 wide, centered: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
  `Seamlessly integrate with your financial platforms, data sources, and tools to keep everything connected and up to date.`

CTA: `<FxButton href="https://www.framer.com/marketplace/plugins/" tone="brand" size="lg">Explore all integrations</FxButton>`
(rendered 283 × 59). It is an external link — render it as a plain `<a>` wrapper is NOT needed; `FxButton`
already uses `next/link`, which handles absolute URLs.

## Center — the icon ring, 1000 × 505

Wrapper: `position: relative`, `width: 1000px`, `height: 505px`, `padding: 120px`, `overflow: clip`.

Inside, a ring container ("Avatar List") 940 × 940, `position: absolute`, `top: 0`,
horizontally centred (its left edge sits 30px inside the 1000px wrapper). Its bottom half is clipped away
by the wrapper, so only the **top arc** of the ring is visible.

Ring geometry, exactly as measured:
- Ring centre = (470, 470) inside the 940 × 940 box.
- **16 tiles**, one every **22.5°**, each 80 × 80, centred on a circle of **radius 430**.
- Each tile: `background: #fff`, `border-radius: 50%`, `display: flex`, `align-items: center`,
  `justify-content: center`, holding a 32 × 32 icon (`object-fit: contain`).
- The live DOM builds this as 8 "arm" bars (80 × 940, `position: absolute`, `top: 470px`, `left: 470px`,
  `transform: translate(-40px, -470px) rotate(θ)`, `display: flex`, `flex-direction: column`,
  `justify-content: space-between`) with a tile at each end and the icon counter-rotated by `-θ` so it
  stays upright. θ takes the values `0°, -22.5°, -45°, -67.5°, -90°, -112.5°, -135°, -157.5°`.
  Reproduce it exactly this way — it is simpler and matches the measured transforms.

Each arm carries the **same** icon at both ends:

| arm | θ | icon asset |
|---|---|---|
| 01 | `0deg` | `6v4CjsDf4gvmPpf7ZtLW7G99Tc.svg` (natural 41×40) |
| 02 | `-22.5deg` | `iSF7qOzhCe2kHFtzp023A7Su5Y4.svg` (natural 43×40) |
| 03 | `-45deg` | `oCjXqTKPpfQHNzVG3RMACjYdDn4.svg` (natural 43×36) |
| 04 | `-67.5deg` | `4cTZo2mECVaFc4LeLKFAjcOFZi0.svg` (natural 40×34) |
| 05 | `-90deg` | `C9McjHMSQSnRTJJraeYy1FnTxk.svg` (natural 44×42) |
| 06 | `-112.5deg` | `IKob6Rf6oNE2AA0Ljnrxy64qX8.svg` (natural 37×42) |
| 07 | `-135deg` | `y19UMvv1KCbNvFgwFlFjufnrRg.svg` (natural 42×42) |
| 08 | `-157.5deg` | `UoQUbbEaQZyR3CxLxoIhGhmYL3c.svg` (natural 38×40) |

All ring icons are decorative: `alt=""`, `aria-hidden` on the ring container.

## Bottom block — 520 wide (`max-width: 520px`), flex column, centered, `gap: 30px`
- Hub icon 130 × 130: `border-radius: 50%`, `overflow: clip`, `display: flex`, `align-items: center`,
  `justify-content: center`, `background: linear-gradient(135deg, #323232 0%, #000 100%)`,
  containing `4LS9gC9h4W4WbsmhQmoxQ7DsncQ.svg` (natural 84×63) rendered **53 × 40**.
- `<h3>` 520 wide, centered: `28px / 33.6px`, `font-weight: 600`, `color: #1d1d1d` —
  `100+ integrations available and growing`

## Decoration
An image `XlxsE037ei7LGhxYPQDC3jctO9A.png` (natural 1220×321) rendered 1220 × 321,
`position: absolute`, horizontally centred, sitting behind the Bottom block near the card's lower edge,
`object-fit: contain`, `pointer-events-none`, `aria-hidden`, `alt=""`. Place it with
`bottom: 0; left: 50%; transform: translateX(-50%)` inside the `Content` card.

## States & Behaviors
- No rotation, no hover, no click, no scroll-driven state.
- Entrance: the whole `Content` card fades from `opacity: 0` / `translateY(20px)` over 600ms ease-out once,
  on entering the viewport (the live DOM has `transform: matrix(1,0,0,1,0,20)` on it at rest before reveal).
  Follow the pattern in `OverviewSection.tsx` in the same folder, including
  `motion-reduce:translate-y-0 motion-reduce:transition-none`.

## Assets
`6v4CjsDf4gvmPpf7ZtLW7G99Tc.svg`, `iSF7qOzhCe2kHFtzp023A7Su5Y4.svg`, `oCjXqTKPpfQHNzVG3RMACjYdDn4.svg`,
`4cTZo2mECVaFc4LeLKFAjcOFZi0.svg`, `C9McjHMSQSnRTJJraeYy1FnTxk.svg`, `IKob6Rf6oNE2AA0Ljnrxy64qX8.svg`,
`y19UMvv1KCbNvFgwFlFjufnrRg.svg`, `UoQUbbEaQZyR3CxLxoIhGhmYL3c.svg`,
`4LS9gC9h4W4WbsmhQmoxQ7DsncQ.svg`, `XlxsE037ei7LGhxYPQDC3jctO9A.png`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Laptop (1024–1279px):** card `padding: 80px`; the ring wrapper scales down with
  `transform: scale(0.85); transform-origin: top center` inside a height-adjusted box (430px tall).
- **Tablet (768px):** card `padding: 60px 40px`; heading 36px / 43px; ring wrapper `scale(0.7)`, box 360px tall;
  hub icon 100 × 100 with a 40 × 30 glyph; bottom heading 24px / 29px.
- **Mobile (390px):** card `padding: 40px 20px`, `border-radius: 24px`; heading 28px / 34px;
  sub 16px / 22px; CTA full width; ring wrapper `scale(0.45)`, box 240px tall; hub icon 80 × 80 with a
  32 × 24 glyph; bottom heading 20px / 24px; decoration image `width: 200%` so it still bleeds correctly.
