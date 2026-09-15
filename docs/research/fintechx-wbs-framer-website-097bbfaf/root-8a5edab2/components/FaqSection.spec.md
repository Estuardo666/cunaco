# FaqSection Specification

## Overview
- **Target file:** `src/components/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/FaqSection.tsx`
- **Interaction model:** **click-driven accordion**. Verified with real pointer clicks: each row toggles
  independently — **multiple rows can be open at once**, and the first row is open on load.

## Section
`<section id="faqs">`, 1425 × 621, `padding: 0 0 100px`, `display: flex`, `flex-direction: column`,
`align-items: center`.
`Container`: `max-width: 1260px`, `padding: 0 30px`.
`Content`: 1200 wide, `display: flex`, `gap: 70px`, `align-items: flex-start`.

## Left column — 424 wide, flex column, `gap: 80px`

### Header, flex column, `gap: 10px`
- `<h2>` 424 wide: `48px / 57.6px`, `font-weight: 600`, `letter-spacing: -1px`, `color: #1d1d1d` —
  `Frequently asked questions`
- `<p>` 424 wide: `18px / 23.4px`, `font-weight: 500`, `color: #4d585f` —
  `Find quick answers to common questions about the platform, pricing, and security.`

### Aside card — 424 × 269
`padding: 40px`, `background: #edf1f4`, `border-radius: 30px`, `overflow: clip`,
`display: flex`, `flex-direction: column`, `gap: 20px`.

**Top row** — 344 × 40, `display: flex`, `align-items: center`:
- An overlapping avatar stack: three 40 × 40 circles (`border-radius: 50%`, `overflow: hidden`,
  `object-fit: cover`) each occupying only **30px** of horizontal space so they overlap by 10px;
  the stack container is `padding-right: 10px` and 100px wide.
  Assets in order: `gDcaZH5xt6hqSU2VbK2snAw.jpg`, `X0ECJ5xGgYrCVgHB8RYd3RABTQ.jpg`,
  `622M5cyJBdKPIK1fPnBlo3qONk.jpg` (all natural 150×150).
- A `+` glyph: `18px / 23.4px`, `font-weight: 600`, `color: #1d1d1d`
- A `You` badge: 40 × 40 circle, `border-radius: 50%`, `display: flex`, `align-items: center`,
  `justify-content: center`, `background: #1d1d1d`, label `14px / 18.2px`, `font-weight: 600`, `color: #fff`

**Bottom block** — 344 × 129, flex column, `gap: 16px`:
- `Still have questions?` — `24px / 28.8px`, `font-weight: 600`, `color: #1d1d1d`
- `Reach out, and our team will guide you.` — `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`
- `<FxButton href="/contact" tone="dark" size="lg">Talk to our team</FxButton>` (label 18px / 23.4px, weight 600, white)

## Right column — accordion wrapper, 706 wide, flex column, `gap: 20px`

### Row (closed)
`border-radius: 20px`, `overflow: hidden`, `background: transparent`.
Question row 706 × 70: `padding: 20px`, `display: flex`, `align-items: center`,
`justify-content: space-between`, `gap: 10px`, `cursor: pointer`, `overflow: hidden`.
- Question text: `20px / 26px`, `font-weight: 500`, `color: #1d1d1d`
- Toggle icon, 30 × 30: `border-radius: 50%`, `background: #edf1f4`, `overflow: clip`,
  containing two bars centred on each other — one 16 × 2 and one 2 × 16, both `background: #1d1d1d`,
  `border-radius: 100px` → a **plus**.

### Row (open)
`background: #edf1f4` (the row fill appears), same 20px radius.
- Toggle icon: `background: #1d1d1d`, the whole icon wrapper `transform: rotate(90deg)`,
  both bars `background: #fff`, and the **vertical bar's `opacity` goes to 0** → a **minus**.
- Answer block appears below the question: `padding: 0 60px 20px 20px`, `overflow: hidden`,
  text `16px / 20.8px`, `font-weight: 500`, `color: #4d585f`.
  (The open first row measures 706 × 152 total: 70px question + 82px answer.)

Animate with a `grid-template-rows: 0fr → 1fr` (or max-height) transition of ~300ms ease plus a
background-color and icon rotation transition of the same duration.

### The five items (verbatim)
1. **`How secure is my financial data?`** — open by default —
   `Your data is protected with industry-standard encryption and secure infrastructure. We follow strict security practices to ensure your financial information remains private and safe.`
2. **`Can I connect multiple investment accounts?`** —
   `Yes. You can securely connect multiple bank, trading, and investment accounts to track everything in one unified dashboard.`
3. **`How do the AI insights work?`** —
   `Our AI analyzes market trends, portfolio performance, and risk signals to generate insights that help you make smarter investment decisions.`
4. **`Is a trial available before subscribing?`** —
   `Yes. You can explore the platform with a trial period to understand how the features work before choosing a paid plan.`
5. **`Do you offer plans for financial teams or organizations?`** —
   `Yes. We offer enterprise solutions designed for financial teams and institutions. You can contact our sales team to discuss custom requirements.`

## States & Behaviors
- Each row toggles independently; opening one does **not** close the others. Row 1 starts open.
- The question row must be a real `<button type="button">` with `aria-expanded` and `aria-controls`,
  and the answer region an element with the matching `id`.
- Entrance: the left column and the accordion fade from `opacity: 0` / `translateY(20px)` over 600ms
  ease-out once, on entering the viewport. Follow the pattern in `OverviewSection.tsx` in the same folder,
  including `motion-reduce:translate-y-0 motion-reduce:transition-none`.

## Assets
`gDcaZH5xt6hqSU2VbK2snAw.jpg`, `X0ECJ5xGgYrCVgHB8RYd3RABTQ.jpg`, `622M5cyJBdKPIK1fPnBlo3qONk.jpg`

## Responsive Behavior
- **Desktop (≥1024px):** exact values above.
- **Tablet (768px):** the two columns stack — header, accordion, then the aside card, `gap: 40px`;
  heading 36px / 43px; accordion full width; left column `gap: 40px`.
- **Mobile (390px):** section `padding-bottom: 60px`; heading 28px / 34px; sub 16px / 22px;
  question row `padding: 16px`, question text 17px / 22px; answer `padding: 0 44px 16px 16px`, 15px / 20px;
  toggle icon 26 × 26 with 14 × 2 bars; aside card `padding: 24px`, `border-radius: 24px`,
  title 20px / 24px, button full width.
