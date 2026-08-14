# Design system

Extracted from what the site actually renders (`src/app/globals.css`), not
aspirational. If you change a token here, change it there.

## Typeface

| Role | Family | Loaded via |
|---|---|---|
| Display (headings, prices) | Playfair Display | `next/font/google`, `--font-playfair` |
| Body / UI | Montserrat | `next/font/google`, `--font-montserrat` |

Two families, no more. Both variable classes go on `<html>`, **not** `<body>` —
Tailwind v4 resolves `@theme` font tokens at `:root`, and a variable defined
lower in the tree resolves to empty there, silently falling back to system sans.

## Colour

Tokens are HSL triplets consumed as `hsl(var(--token))`.

| Token | Value | Use |
|---|---|---|
| `--background` | `240 10% 3.9%` | Page ground |
| `--foreground` | `0 0% 98%` | Body text |
| `--primary` | `346 75% 62%` | Rose accent: CTAs, prices, links, focus rings |
| `--accent-gold` | `35 91% 65%` | Warnings |
| `--accent-mauve` | `300 15% 70%` | Reserved |
| `--muted` | `240 3.7% 15.9%` | Skeletons, fills |
| `--muted-foreground` | `240 5% 64.9%` | Secondary text |
| `--border` / `--input` | `240 3.7% 15.9%` | Hairlines, field borders |
| `--destructive` | `0 62.8% 30.6%` | Destructive |

Dark by default; there is no light theme and no `dark:` variant in the codebase.
**One accent.** Rose carries every interactive affordance. Gold is warnings only.

## Radius

`--radius: 0.5rem` drives `rounded-lg` (0.5rem), `rounded-md` (0.375rem),
`rounded-sm` (0.25rem). Do not delete it: `rounded-*` resolves through
`calc(var(--radius) - Npx)`, so an undefined `--radius` silently collapses every
one of them to square corners.

## Interaction states

Every state is specified. Do not invent new ones ad hoc.

| State | Treatment |
|---|---|
| Loading (media) | `bg-muted animate-pulse rounded-md` |
| Failed (media) | Same muted fill, `border-dashed`, "Image unavailable", `role="img"` |
| Submitting | Button disabled, label "Sending…" |
| Field error | `border-[hsl(0_62%_50%)]`, message below the field, `aria-invalid` |
| Success | Green banner + a WhatsApp link the visitor taps |
| Rate limited | Gold banner, plain language, phone number offered |
| Server error | Red banner, form retained, phone number offered |

Rules that hold across all of them:

- **Never dead-end.** Every failure state offers `+91 84317 86944`.
- **Never colour alone.** Each banner carries a mark and explicit text.
- Banners are `role="status"`/`role="alert"` with `aria-live`, and focus moves
  to them so the outcome is announced and on-screen.
- Interactive targets are `min-h-[44px]`.
- Focus is `focus:ring-2 focus:ring-primary/50` with `outline-hidden`. Never
  remove focus styling without a replacement.

## Layout and motion

- Sections: `py-20 md:py-32`, content in `Container`.
- Portfolio tiles: `aspect-[3/4]`.
- Motion via `motion/react`: entrance fades with small y-offsets, `staggerChildren`
  for lists, `viewport={{ once: true }}`. Transitions are 200-500ms.

## Anti-patterns, rejected here

- **No symmetric 3-column icon-card grids.** Services is a menu with hairline
  rules for exactly this reason.
- No icons in coloured circles as decoration.
- No uniform bubbly radius on everything.
- No default font stacks. Playfair and Montserrat carry the identity.
- Cards must earn their existence; prefer rules and spacing.
