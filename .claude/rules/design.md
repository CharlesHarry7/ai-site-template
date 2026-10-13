# Design rules — "Paper & Clay" (v5, Claude style)

Full system in DESIGN.md (the v5 block at the top wins over the older v4
text below it). The hard rules:

- Warm paper canvas, ink text, ONE accent: clay (`--clay`, text/hover
  `--clay-deep`, soft fill `--clay-wash`). Primary buttons are clay with
  near-white text. No second accent color, no gradients.
- Type: `font-serif` (Source Serif 4) for H1/H2/section titles, sentence
  case, weight 400–500, no text shadow, no uppercase titles. `font-sans`
  (Inter) for UI and body. `font-mono` for credits, prices, code.
- 1px hairline borders (`border` uses `--border`). Shadows only via the
  `shadow-hard-*` utilities (now soft and short). No tilt, no press-jump.
- Motion: opacity/shadow transitions ≤ 200ms; reduced-motion respected.
- Keyword landing pages render from `src/config/landing.ts` through
  `src/components/site/keyword-landing.tsx`: H1 = the target keyword,
  the working prompt box in the first screen, then examples, steps, use
  cases, pricing, FAQ (with FAQPage JSON-LD), sibling tool links.
- Copy: plain and specific; paragraphs ≤ 2 sentences; no hype words, no
  emoji.
- Use tokens from `globals.css`; derive shades with `color-mix()` — no new
  oklch/hex literals in components.
