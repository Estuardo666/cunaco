# FintechX — Page Topology

Viewport used for measurement: **1440 × 900**.
Total document height after full lazy-render: **14490px** (9763px before scroll — sections lazy-mount).

## Fixed / overlay layers

| Layer | Position | z-index | Notes |
|---|---|---|---|
| Navbar (`.framer-1cbvfqs-container`) | `fixed`, top 0 | above content | height 100px, full width, contains logo + nav links + CTA |
| Progress/scroll widget (`.framer-tfreq5-container`) | `fixed` | 9 | zero-height utility container |
| "Get it for FREE" floating badge (`.framer-xxhg1r-container`) | `fixed` | 10 | bottom-right, 38px tall, marquee text |
| "Made in Framer" badge | `fixed` | — | bottom-right, Framer attribution — **excluded from clone** |

## Flow sections (top → bottom, `<main class="framer-m6f8sq">`)

| # | `data-framer-name` | `id` | Top | Height | Interaction model |
|---|---|---|---|---|---|
| 1 | Hero | — | 0 | 1575 | static + entrance animation, layered cloud images, dashboard image |
| 2 | Client | — | 1575 | 118 | infinite marquee of 11 client logos |
| 3 | Comparison | `products` | 1693 | 1525 | before/after split, dark card |
| 4 | Features | `features` | 3218 | 1211 | feature grid |
| 5 | Overview | `overview` | 4429 | 1654 | dashboard showcase |
| 6 | Step | `how-it-works` | 6083 | 687 | 3-step process |
| 7 | Security | — | 6770 | 458 | security/compliance band |
| 8 | Use Cases | `use-cases` | 7228 | 1177 | image ticker / marquee columns |
| 9 | Integrations | `integrations` | 8405 | 1065 | integration icon grid |
| 10 | Stats | — | 9469 | 1180 | metrics + decoration image |
| 11 | Testimonial | — | 10649 | 907 | testimonial cards + avatars |
| 12 | Pricing | `pricing` | 11556 | 1220 | pricing plans |
| 13 | FAQs | `faqs` | 12777 | 621 | accordion |
| 14 | Footer (`.framer-pnc1uf-container`) | — | 13398 | ~1092 | dark footer, social icons |

## Anchor targets used by the navbar

`#products`, `#features`, `#overview`, `#how-it-works`, `#use-cases`, `#integrations`, `#pricing`, `#faqs`

## Assets

- 85 unique images (all `framerusercontent.com`), 0 `<video>` elements, 0 inline `<svg>`.
- Every icon is delivered as an `<img src="*.svg">`, so icons are downloaded files rather than inline React SVG components.
- 88 files downloaded (85 images + 2 favicons + 1 OG image) → `public/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/`
