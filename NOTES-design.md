# NOTES-design — Opportunity Radar visual mockup

Handoff for [opportunity-radar](https://github.com/JoshTheMenace/opportunity-radar). HTML mocks: `design/mockups/`. This file is the visual contract (`NOTES-ui.md` is the component map).

**Canonical screens (use these, not earlier experiments):**

| Screen | File | Repo region |
| --- | --- | --- |
| Opportunity Map (homepage) | `design/mockups/map.html` | `opportunity-map.tsx` + `report-view.tsx` + `match-card.tsx` + `#guidance` |
| Opportunity brief (next page) | `design/mockups/opportunity.html` | `match-card.tsx` expanded / a dedicated `/opportunity/[id]` if you add one |
| Chosen visual system | Polished cards (iteration A in `design/mockups/hybrid-iterations.html`) | Restyle region files only; do not move state |

Do **not** implement `layout-v1.html`, `homepage.html`, or Stitch `index.html`. Those were discarded.

---

## Product rules the mocks encode

Aligned with the hackathon brief and Radar’s own principles ([README](https://github.com/JoshTheMenace/opportunity-radar): honesty over hype; LLM never invents numbers).

1. **Answer now, then refine.** The map is visible while the profile is incomplete. The profile is a persistent **control surface**, not an intake wizard.
2. **Locked results stay listed.** Held / gated rows are dashed + sunken, **full contrast** — never `opacity: 50%` and never blurred skeletons.
3. **No percentage match scores in the UI.** Engine `match.score` can stay in data. Do not render `score 87` or `confidence 72%` as a fit number. Fit is a **tier chip** (`likely_fit` / `verify_eligibility` / `adjacent`) plus prose. Program-officer preview can keep qualitative breakdowns; drop or reword the `%` line.
4. **No chat window beside the map.** Interview lives in `#guidance` as the Unlock card + one-tap / chips. Freeform chat can exist *inside* that card, not as a second column of bubbles.
5. **No step wizard.** The only meter on the map is profile completeness + “match confidence: Medium — 2 unknowns limiting results” (plus Radar’s existing unlock-$ copy if it stays honest).
6. **Facts from the DB.** Dollar amounts, dates, IDs, “4 Utah winners”, “median $261K across 412 similar awards” — never LLM-invented. Mocks use the hackathon AI-healthcare strings as fixtures.

---

## Design tokens (polished cards)

Light surface. Geist + JetBrains Mono (Radar already loads Geist / Geist Mono in `layout.tsx`). 24px cards, 12px field chips, pill buttons, 44px min tap targets, 2px black `:focus-visible`.

```css
:root {
  --surface-base: #f8fafc;
  --surface-lowest: #ffffff;
  --surface-sunken: #f1f5f9;
  --surface-container-low: #eef4ff;
  --on-surface: #0d1c2d;
  /* #64748B fails WCAG at 11px caps — use this for labels */
  --text-muted: #3d4a5c;
  --border-subtle: #e2e8f0;
  --outline-variant: #8a8d91;
  --primary: #000101;
  --on-primary: #ffffff;
  --secondary: #006c4a;
  --status-warning-bg: #fff7ed;
  --fit-likely-bg: #dcfce7;
  --fit-likely-fg: #14532d;
  --fit-verify-bg: #fef3c7;
  --fit-verify-fg: #7c2d12;
  --held-border: #8a8d91;
  --radius-card: 24px;
  --radius-chip: 12px;
  --radius-pill: 999px;
}
```

Update `src/app/components/shared.ts` `TIERS[].badge` to these light-mode classes (current green-400-on-10% is dark-theme and weak contrast):

```ts
{ tier: "likely_fit", label: "Likely fit", badge: "bg-[#DCFCE7] text-[#14532D]" },
{ tier: "verify_eligibility", label: "Verify eligibility", badge: "bg-[#FEF3C7] text-[#7C2D12]" },
{ tier: "adjacent", label: "Adjacent", badge: "bg-[#ccdbf2] text-[#0d1c2d]" },
```

Held / gated (not in `TIERS` today): dashed border, `bg-[#F1F5F9]`, chip “Held · {field}”.

---

## Map HTML → Radar components

Per [NOTES-ui.md](https://github.com/JoshTheMenace/opportunity-radar/blob/main/NOTES-ui.md): restyle region files; `opportunity-map.tsx` stays the orchestrator.

| Mock block | Component | Notes |
| --- | --- | --- |
| Top bar “Federal Catalyst” + Map / Screening / Utah | `layout.tsx` | Product in-repo is **Opportunity Radar**. Keep that name. Nav: Analyze · Pursuits · Radar. Drop the 📡 emoji (a11y + our “no emoji as chrome” rule). |
| Founder Profile card + 6 field cells | New region or extend `intake-panel.tsx` **after** first report | Provenance: Confirmed / Inferred / Soft gap / Hard gap. Fields are buttons (editable). Completeness = `role="meter"` + “Medium — 2 unknowns…”. |
| Screening chip | `activity-feed.tsx` | Monospace: “Screening 1,703…” — use **real** ingest counts from the DB, not the mock’s 1,703 if the cache is ~4,600. |
| Ranked list | `report-view.tsx` + `match-card.tsx` | Bordered 24px cards. First likely_fit can show the five blocks collapsed-preview; **Open full brief** → detail page. |
| Unlock card (right rail) | `meter-panel.tsx` + `interview-panel.tsx` | Loss-framed: “Ownership unknown is holding 4 listings…”. Radios / Yes-No, 44px. Radar’s “answer X to unlock $Y” stays if dollars are posted ceilings, not promises. |
| Dated action plan | `match-card.tsx` timeline (`buildTimeline`) | Mock D0 / D7 / D14 = Plan backward, always visible on the map rail for the top fit, not only after expand. |
| Honest no | `report-view.tsx` `HonestNoPanel` | Same card chrome as a hit. Fixture copy: “Federal grants probably aren’t your path right now.” Eval case: consumer youth marketplace. |

**Match card body order** (hackathon + mock):

1. Why it fits  
2. What could disqualify  
3. Who else got this money (`EvidenceStrip` — already exists)  
4. Funding twin (best similar award path, DB only)  
5. What to do next  

Do not show engine `score` on the card.

---

## Opportunity brief page

`design/mockups/opportunity.html` is the drill-in from the map.

- Breadcrumb: Opportunity Map / {title}  
- Profile card stays (compact).  
- Left: full five blocks + “What you should verify” + evidence table.  
- Right: dated plan, UEI soft-gap (does **not** hide the listing), others in the ranked set.  
- Disclaimer on every screen: not a determination of eligibility.

If you do not add a route, expand `MatchCard` in-place to this density instead of a second URL.

---

## Accessibility (WCAG 2.1 AA)

- Skip link to `#report` / `#brief`  
- `:focus-visible { outline: 2px solid #000101; outline-offset: 2px; }`  
- Label text ≥ 11px and ≥ 4.5:1 (`--text-muted: #3D4A5C`)  
- Icons `aria-hidden`  
- Completeness is a `meter` with `aria-valuetext`  
- Unlock is a `fieldset` / radios, not four unlabeled buttons  
- `prefers-reduced-motion`  
- Do not use color as the only fit signal (chip text required)

---

## What the engine already gives you (don’t restyle by inventing UI state)

- `RankedMatch.tier`, `whyFit`, disqualify, verify, next steps — render; don’t invent.  
- `EligibilityMeter.unlocks` — maps to Unlock card.  
- `EvidenceSummary` — “who else got this money”.  
- `honestNo` — dedicated panel, same visual weight as a match.  
- Interim SSE `report` events — list grows; don’t block the map behind a spinner.

`src/lib/types.ts` stays locked. If a provenance enum is missing, keep it in the profile UI as derived labels (confirmed vs inferred vs gap) without a type change, or file a `NOTES-` request.

---

## Apply order for the styling pass

1. Tokens in `globals.css` + `TIERS` in `shared.ts`.  
2. `layout.tsx` chrome (no emoji).  
3. `match-card.tsx` — chips, five-block order, hide numeric score, held/gated treatment.  
4. `meter-panel.tsx` + `interview-panel.tsx` — Unlock card layout from `map.html` aside.  
5. Profile control surface after first `report`.  
6. Optional: `opportunity.html` as `/opportunity/[id]` using the same card CSS.

Open `design/mockups/map.html` then `design/mockups/opportunity.html` in a browser. Those two files are the mockup; this note is the contract for implementing them on Radar.
