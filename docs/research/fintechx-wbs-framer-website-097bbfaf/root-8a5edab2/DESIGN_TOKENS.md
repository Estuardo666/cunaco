# FintechX — Design Tokens

Source: https://fintechx-wbs.framer.website/ (Framer, generator `Framer 0ff06f1`)
All values read from live CSS custom properties on the Framer root.

## Color palette (raw Framer tokens → semantic name)

| Framer token | Hex | Semantic name | Usage |
|---|---|---|---|
| `--token-b78e610c…` | `#406ae4` | `brand-600` | primary button fill, brand blue |
| `--token-bddc6f23…` | `#3b82f6` | `brand-500` | links, current/hover link color |
| `--token-a6a29af8…` | `#5290f4` | `brand-400` | lighter brand accent |
| `--token-c2de9ec9…` | `#3a77e580` | `brand-500/50` | translucent brand border |
| `--token-0edc2e6a…` | `#1d1d1d` | `ink` | headings, primary text |
| `--token-3773b559…` | `#1d1d1d80` | `ink/50` | muted heading text |
| `--token-b923e1cb…` | `#4d585f` | `body` | body copy (default `--framer-text-color`) |
| `--token-60bca774…` | `#323232` | `ink-700` | dark surface |
| `--token-a4ae1e21…` | `#000` | `black` | dark section background |
| `--token-f02a5c8a…` | `#000c` | `black/80` | dark overlay |
| `--token-22e76413…` | `#0003` | `black/20` | scrim |
| `--token-1da6f336…` | `#0000004d` | `black/30` | scrim |
| `--token-08dc1709…` | `#0000001a` | `border` | default 1px border (`--border-color`) |
| `--token-51f94b53…` | `#bababa` | `gray-400` | disabled / faint text |
| `--token-8a16c1e0…` | `#edf1f4` | `surface-100` | light section surface |
| `--token-3992e4b1…` | `#dde5ed` | `surface-200` | card surface / divider |
| `--token-3434016c…` | `#dde5edb3` | `surface-200/70` | translucent card surface |
| `--token-fffc2df6…` | `#e2f5ff` | `sky-50` | pale blue tint |
| `--token-260f9222…` | `#fff` | `white` | page background (`html body` background) |
| `--token-1b8f888c…` | `#fff0` | `transparent` | transparent underline color |
| `--token-0a34df0a…` | `#ffffff4d` | `white/30` | glass border on dark |
| `--token-0810840b…` | `#ffffff1a` | `white/10` | glass fill on dark |
| `--token-e266aeaf…` | `#ffffff80` | `white/50` | muted text on dark |
| `--token-456a706a…` | `#ffffffb3` | `white/70` | body text on dark |
| `--token-7db4a30a…` | `#10b981` | `success` | positive delta |
| `--token-da6f8224…` | `#10b9811a` | `success/10` | positive pill fill |
| `--token-022f990a…` | `#10b9814d` | `success/30` | positive pill border |
| `--token-7ef1bbb2…` | `#10b98133` | `success/20` | positive glow |
| `--token-e16e43db…` | `#0bcf2d` | `green` | chart up |
| `--token-1d407f87…` | `#8ae389` | `green-300` | chart up light |
| `--token-014f2a3f…` | `#f51c23` | `danger` | negative delta |
| `--token-5a4e4777…` | `#f28778` | `danger-300` | negative light |
| `--token-a545ebfd…` | `#ff0d0d0d` | `danger/5` | negative pill fill |
| `--token-1b12818c…` | `#ff0d0d4d` | `danger/30` | negative pill border |
| `--token-f56bc79b…` | `#ff8b06` | `warning` | warning / amber |
| `--token-9ac3fcd6…` | `#fdbb6e` | `warning-300` | warning light |

## Typography

- Primary display family: `"Inter Display", sans-serif` — `--framer-font-family`
- Bold / body family: `"Inter", sans-serif` — `--framer-font-family-bold`
- Also loaded: `Bricolage Grotesque` (600, 700), `Geist` (700) — from Google Fonts
- Base font size: `16px`
- Base weight: `500`; bold weight: `700`
- Base line-height: `1.3em`
- Letter spacing: `0em`
- Paragraph spacing: `20px`
- OpenType features: `"blwf" on, "cv09" on, "cv03" on, "cv04" on, "cv11" on`
- `text-wrap: balance` is applied globally (`--framer-text-wrap-override: balance`)

## Borders

- `--border-*-width: 1px`, `--border-style: solid`
- `--border-color: #0000001a`

## Links

- Default color `#4d585f`, underline, offset `2px`, thickness `1px`
- Hover / current color `#3b82f6`, underline color transparent (`#fff0`)

## Global behavior

- Smooth scrolling: **Lenis** (`<html class="lenis">`)
- Animation engine: **Framer Motion** (`motion.*.mjs` module preloaded)
- Page background forced by inline style: `html body { background: #fff }`
