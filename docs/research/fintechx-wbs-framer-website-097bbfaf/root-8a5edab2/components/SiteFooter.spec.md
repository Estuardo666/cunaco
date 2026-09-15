# SiteFooter Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/SiteFooter.tsx`
  (site-scoped shared component, not page-scoped)
- **Interaction model:** **static** — links only. Entrance reveal optional.
- This block is the closing CTA band *and* the footer in one `<footer>` element.

## Root
`<footer>`, 1425 × 1092, `padding: 100px 0`, `display: flex`, `flex-direction: column`,
`align-items: center`, `position: relative`.

### Background layer — `position: absolute`, `inset: 0`, `overflow: clip`, behind content
- `BG Image`: `Osh2UHQcarC8mZnL6oh6gwYnbA.jpg` (natural 1440×810) filling 1425 × 1092, `object-fit: cover`
- `Overlay`: `position: absolute`, `inset: 0`,
  `background: linear-gradient(#fff 0%, #fff 0%, rgba(255,255,255,0.8) 100%)`
  (measured prefix `linear-gradient(rgb(255,255,255) 0%, rgb(255,255,255) 0%, rgba(255,…`)
- `pointer-events-none`, `aria-hidden`.

### Container
`max-width: 1260px`, `padding: 0 30px`. `Content`: 1200 wide, flex column, `align-items: center`,
`gap: 100px`, `position: relative`.

## CTA band — 600 wide (`max-width: 600px`), flex column, centered, `gap: 40px`
Title/body, flex column, centered, `gap: 10px`:
- `<h2>` 600 wide, centered: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Ready to invest smarter?`
- `<p>` 600 wide, centered: `20px / 26px`, `font-weight: 500`, `color: #4d585f` —
  `Join investors using AI insights and real-time data to track portfolios and make better financial decisions.`

Buttons, `display: flex`, `gap: 20px`, `justify-content: center`:
- `<FxButton href="/pricing" tone="brand" size="lg">Start free trial</FxButton>` (rendered 210 × 59)
- `<FxGhostButton href="/request-demo">Try the live demo</FxGhostButton>` (rendered 227 × 59, white at rest)

## Footer card — 1200 × 573
`padding: 100px`, `background: #fff`, `border-radius: 30px`, `overflow: clip`,
`display: flex`, `flex-direction: column`, `gap: 60px`.

### Top — 1000 wide, `display: flex`, `justify-content: space-between`, `gap: 100px`

**Left column** — 340 wide, flex column, `align-items: flex-start`, `gap: 40px`:
- Brand block, flex column, `gap: 20px`:
  - Logo link to `/`: `YRLlnG3joxHrTMikBU58pHjeOA.svg` (natural 122×30) rendered **163 × 40**,
    `object-fit: contain`, `overflow: clip`
  - `<p>` 340 wide: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
    `A modern platform for smarter portfolio tracking and financial insights.`
- Mail button, rendered 294 × 59:
  `<FxGhostButton href="mailto:support@yourbrand.com" tone="dark">support@yourbrand.com</FxGhostButton>`
  (`background: #1d1d1d`, label `18px / 23.4px`, weight 600, `#fff`)

**Right** — 560 wide, `display: grid`, `grid-template-columns: repeat(3, 166.663px)`, `gap: 30px`.
Each column: flex column, `gap: 20px`, with a heading (`20px / 26px`, `font-weight: 500`, `color: #1d1d1d`)
and a `List` of links, flex column, `gap: 16px`, each `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`.
Give links a hover colour of `#3b82f6` (the site's `--framer-link-hover-text-color`).

| column | heading | links (label → href) |
|---|---|---|
| 01 | `Quick links` | `Features` → `/#features`, `How It Works` → `/#how-it-works`, `Use Cases` → `/#use-cases`, `Integrations` → `/#integrations` |
| 02 | `Pages` | `About` → `/about`, `Feature` → `/feature`, `Blog` → `/blog`, `Waitlist` → `/waitlist`, `Request a Demo` → `/request-demo`, `Error 404` → `/404` |
| 03 | `Support` | `FAQs` → `/faqs`, `Contact` → `/contact`, `Changelog` → `/changelog`, `Privacy Policy` → `/legal-pages/privacy-policy` |

### Bottom — 1000 × 62, `padding-top: 30px`, `display: flex`, `align-items: center`, `justify-content: space-between`, `gap: 100px`
- Credit line, `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`:
  `Designed by ` + a link `Webestica` → `https://www.webestica.com/` + `, Powered by ` +
  a link `Framer` → `https://framer.com/` + `.`
  The two link words are inline `<a>` elements inside one `<p>`.
- `Socials`, 338 wide, `display: flex`, `align-items: center`, `justify-content: flex-end`, `gap: 16px`.
  Four tiles, each 32 × 32: `background: #edf1f4`, `border-radius: 10px`, `display: flex`,
  `align-items: center`, `justify-content: center`, holding a **14 × 14** icon.

  | href | icon asset (natural 20×20) |
  |---|---|
  | `https://www.instagram.com/` | `o2TaY2EYkSR14NmiylM3v3i9wM.svg` |
  | `https://www.linkedin.com/` | `H9Hsu1XWqgxCmWVKfgBn5BvSlrI.svg` |
  | `https://www.facebook.com` | `yapJfaMs4UJGW8x5avLvLiT0juU.svg` |
  | `https://x.com/` | `DFinrfV7RnNPMg9DUYcgTgRnaM.svg` |

  Each social link needs an accessible name (`aria-label` with the network name); the icons are `alt=""`.
  External links get `target="_blank"` and `rel="noopener noreferrer"`.

## Excluded
The live page also renders a fixed "Get it for FREE" marquee badge and a "Made in Framer" attribution
badge in the bottom-right corner. Both are Framer platform chrome and are **out of scope** — do not build them.

## Assets
`Osh2UHQcarC8mZnL6oh6gwYnbA.jpg`, `YRLlnG3joxHrTMikBU58pHjeOA.svg`,
`o2TaY2EYkSR14NmiylM3v3i9wM.svg`, `H9Hsu1XWqgxCmWVKfgBn5BvSlrI.svg`,
`yapJfaMs4UJGW8x5avLvLiT0juU.svg`, `DFinrfV7RnNPMg9DUYcgTgRnaM.svg`

## Responsive Behavior
- **Desktop (≥1280px):** exact values above.
- **Laptop (1024–1279px):** footer card `padding: 60px`; link grid `repeat(3, minmax(0, 1fr))`, `gap: 24px`.
- **Tablet (768px):** CTA heading 36px / 43px; footer card `padding: 40px`; `Top` stacks — brand block
  above a 3-column link grid, `gap: 40px`; `Bottom` keeps its row but with `gap: 24px`.
- **Mobile (390px):** footer `padding: 60px 0`; content `gap: 60px`; CTA heading 28px / 34px,
  body 16px / 22px, buttons stack full width with `gap: 12px`; footer card `padding: 24px`,
  `border-radius: 24px`, `gap: 40px`; link grid becomes 2 columns with `gap: 24px`; mail button full width;
  `Bottom` stacks to a column with `gap: 20px`, credit line centred, socials centred.
