# Opportunity Radar — design system

**The Federal Catalyst UI Kit is the design system. It is vendored, not
described.** This file tells you where it lives and how to use it. It does not
restate values — earlier versions of this file did, drifted from the code, and
became a trap.

## Where it lives

| Layer | Path | Edit? |
| --- | --- | --- |
| Tokens + `.or-*` component CSS | `src/app/styles/catalyst-kit.css` | **No.** Vendored verbatim from the kit bundle. |
| React bindings | `src/app/components/ui/` | Only to fix a port bug. |
| Tailwind bridge, page defaults, app motion | `src/app/globals.css` | Yes. |
| Product regions | `src/app/components/*.tsx` | Yes. |

Upstream source: the **"Federal Catalyst UI Kit"** artifact bundle (namespace
`OpportunityRadarDesignSystem_3ee40b`) — 21 components, a Material 3 token set
on a cool federal-blue seed, and two reference screens. The two screens are
also checked in as HTML at `design/claude-design/*.html`.

## Using it

```tsx
import { OpportunityCard, Badge, Button, Timeline } from "@/app/components/ui";
```

Available: `Avatar` `Badge` `Button` `Card` `Icon` `IconButton` `KeyValueRow`
`ProgressBar` `StatTile` · `OpportunityCard` `TaskRow` · `AlertCard`
`SuggestionCard` · `ChatComposer` `OptionCard` `TextArea` · `Breadcrumb`
`SideNavBar` `TopNavBar` · `StepProgress` `Timeline`.

Every one is `"use client"` and styled entirely by its `.or-*` class. Pass
`className` for layout (margin, grid placement) — never for color, type,
radius, or shadow. Icons are Material Symbols Outlined, by ligature name:
`<Icon name="handshake" />`.

Tailwind utilities still work and now resolve to kit values: `bg-bg` `bg-card`
`bg-surface-low/surface/surface-high/surface-variant` · `text-ink/muted/faint` ·
`border-hairline/line` · `bg-brand/brand-strong/accent/soft/brand-fixed` ·
`good/good-soft` `warn/warn-soft` `risk/risk-soft` `twin/twin-soft`. The
mapping table is the `@theme` block at the top of `globals.css`.

## Rules

1. **One blue.** `brand`/`primary` is the only blue. `good`/`warn`/`risk` mean
   status and nothing else — never decoration.
2. **Red is rare.** `risk`/`error` appears only for deadlines, alerts, and
   failures. If it stops being rare it stops being loud.
3. **Cyan is the funding twin.** `twin`/`secondary` marks historical precedent
   — comparable funded companies, past timeline steps, completed tasks.
4. **Mono is for data.** `--font-label` / `font-mono` covers numbers, dates,
   IDs, counts and small uppercase labels (≤12px). Never paragraphs.
5. **One shout per region.** Each region gets one big number or one heading;
   everything else supports it. If two things shout, demote one.
6. **No new colors.** If a screen needs a look the kit lacks, add a rule to the
   kit CSS — do not one-off it on a component.
7. **Light only.** There is no dark mode.
8. **No invented numbers.** Dollar amounts, dates, counts and award histories
   are pre-formatted by the caller from DB values. Kit components render what
   they are handed; they never compute or estimate.

## Deviations from the upstream bundle

Four, all deliberate and all commented in place:

1. `@font-face` blocks dropped — `next/font/google` loads Hanken Grotesk, Inter
   and JetBrains Mono in `layout.tsx`, so `--font-*` is rebound to the
   `next/font` CSS variables at the bottom of `catalyst-kit.css`.
2. Material Symbols Outlined is linked from Google Fonts in `layout.tsx`
   instead of embedding the kit's 3.9 MB variable woff2.
3. `TopNavBar` / `SideNavBar` / `Breadcrumb` accept `{ label, href }` and render
   real anchors. The kit used buttons + `onNavigate` because it was a
   single-page demo; passing a bare string keeps that behaviour.
4. Three accessibility corrections, at the foot of `catalyst-kit.css`:
   `--color-outline` moved from `#707881` to `#5c6570` (the original was
   4.48:1 on a card and 3.85:1 on a sunken card, under AA for the 12px text it
   drives); a `prefers-reduced-motion` block, which the kit shipped without
   even though `.or-ping` animates forever; and focus rings on buttons, icon
   buttons, nav rows and option cards, which the kit styled only on
   `.or-field`. `globals.css` already gave the app the last two — the kit
   needs them to stand alone.

## Re-syncing

If the kit bundle is regenerated: re-extract its `<style>` block into
`catalyst-kit.css` (strip `@font-face`, keep the deviation footer), then
re-check the `@theme` block in `globals.css` — its values are literal copies,
because `--color-surface` and `--color-surface-variant` exist in both
namespaces and a `var()` bridge would be self-referential.
