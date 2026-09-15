# FintechX — Motion Refinement

## Motion identity

The original ships **no CSS transitions at all** — every button reports
`transition: all` with no duration, and section reveals report `transition: all` with `opacity: 1`.
Everything is driven by Framer Motion springs at runtime. That is why repeated `getComputedStyle`
reads of the hero drift between samples: the values are still settling.

Personality read from the result — **Premium / Corporate**: damped, decisive, zero overshoot.
Encoded in `shared/motion.ts`:

| Token | Value | Use |
|---|---|---|
| `FX_EASE` | `cubic-bezier(0.4, 0, 0.2, 1)` | the one signature curve, used for ~all transitions |
| `FX_DURATION.quick` | 180ms | interactive feedback (hover, colour) |
| `FX_DURATION.base` | 300ms | state change (icon swap, accordion, crossfade) |
| `FX_DURATION.slow` | 600ms | section reveals |

Overshoot: **0%**. A fintech page that bounces reads as a toy.

---

## 1. Hero parallax (was missing entirely)

Measured on the live site by settling the page at `scrollY` 0 and at `scrollY` 900 and reading the
resulting matrices:

| element | scrollY 0 | scrollY 900 |
|---|---|---|
| dashboard block, 1060 × 614 | `scale(0.64) translateY(-190px)` | `scale(1) translateY(0)` |
| decoration wrapper | `opacity: 1` | `opacity: 0` |
| decoration image, 1445 × 565 | `scale(1) translateY(0)` | `scale(1.93652) translateY(1311.13px)` |

**The 678 × 393 dashboard I originally hardcoded was wrong**: it is a 1060 × 614 element sitting at
`scale(0.64)`. It grows into place as you scroll — the section's primary motion.

Three motion layers, as the pillar model requires:
- **Primary** — the dashboard rising and expanding (`translateY` + `scale`).
- **Secondary** — the decoration landscape zooming and drifting downward at a different rate,
  which is what creates the depth cue.
- **Ambient** — that same landscape fading out, so the section resolves into clean white.

Implementation: `useScrollSpring` in `shared/motion.ts`. Raw target is `scrollY / 900`, clamped,
smoothed by a critically damped spring (stiffness 90, damping 20, ζ ≈ 1.05).

Two details worth keeping:
- **Fixed-step integration.** Advancing a spring by one variable `dt` makes it frame-rate dependent —
  on a throttled tab a clamped `dt` runs the spring in slow motion. The loop sub-steps at a fixed
  1/60 s so settle time is identical at 120fps or 5fps.
- **Reduced motion** skips the spring entirely and tracks raw scroll, so the parallax still resolves
  to the correct state for the current scroll position; it just does not drift.

Parallax is gated to `min-width: 1024px` — below that the original changes layout and the decoration
is not part of the composition.

### Verified endpoints (clone vs original)

| | original | clone |
|---|---|---|
| dashboard @ 0 | `matrix(0.64, 0, 0, 0.64, 0, -190)` | `matrix(0.64, 0, 0, 0.64, 0, -190)` |
| dashboard @ 900 | `none` | `matrix(1, 0, 0, 1, 0, 0)` |
| decoration opacity @ 0 / @ 900 | 1 / 0 | 1 / 0 |
| decoration image @ 900 | `matrix(1.93652, 0, 0, 1.93652, 0, 1311.13)` | `matrix(1.93652, 0, 0, 1.93652, 0, 1311.13)` |

---

## 2. Buttons

Interactive feedback belongs under 150ms; state colour changes under 200ms.

| Element | Before | After |
|---|---|---|
| Primary pill — press | none | `scale(0.97)`, 120ms, signature curve |
| Primary pill — arrow swap | 300ms `ease-out` | 300ms signature curve, diagonal exit/entry preserved |
| Ghost pill — hover fill | 300ms `ease-out` | 180ms signature curve |
| Ghost pill — press | none | `scale(0.97)`, 180ms |

The press dip is invisible at rest, so the measured resting design is untouched — it only adds the
tactile beat the original gets from its spring. Both buttons carry `motion-reduce:` escapes, and the
incoming arrow is hidden under reduced motion rather than parked mid-slot.

---

## 3. Section reveals

All eleven sections already shared one reveal (`opacity 0 → 1`, `translateY(20px) → 0`, 600ms) but
were split across `ease-out` and `ease-[ease]`. Unified onto the signature curve so the whole page
decelerates the same way — that consistency is what makes a page read as *designed* rather than
assembled. The Comparison crossfade and the FAQ accordion's `grid-template-rows` transition moved
onto it too.

---

## Deliberately not added

- **Entrance overshoot / bounce.** Off-personality for fintech, and absent from the original.
- **Hover lift or shadow growth on the pills.** Measurable on the original as *no change* — adding it
  would be my taste, not the design's.
- **Parallax on the cloud PNGs.** Diffing every element in the hero across scroll positions found
  exactly three animated nodes; the clouds are static.
- **Parallax on the Stats cards.** Their `translate()` offsets are constant across five sampled
  scroll positions — they are layout, not motion.
