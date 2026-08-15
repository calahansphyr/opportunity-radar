# Notes from the Dashboard module

The Dashboard at `/` (formerly Opportunity Map), built on `feat/frontend-pages`
from `design/claude-design/kit-source/screen-opportunity-map.jsx` and the
approved mockup at `public/design-mocks/frontend-pages.html`.

Files: `src/app/components/dashboard/*`, `src/app/page.tsx`,
`src/app/layout.tsx`, `src/app/components/side-nav.tsx`, plus an ADDITIONS
block at the foot of `src/app/styles/catalyst-kit.css` and an app-shell layer
in `src/app/globals.css`.

## Data that is not right yet

This is a proof of concept. The UX is the deliverable; the numbers below are
known-wrong and are listed so nobody has to rediscover them.

1. **"N live" in the page header overcounts.** `page.tsx` sums
   `countBySource()`, which is every row in `opportunities` — currently 4,596:
   1,707 grants.gov + 2,864 assistance listings + 25 Utah. Assistance listings
   are catalogue entries, not open solicitations, and the total includes
   forecast and closed records. The honest figure is closer to the mock's
   1,703. **Fix:** count only `status IN ('posted','open')` with
   `close_date >= today`, and say "programs" rather than "live" for the rest.

2. **The top match is a seeded demo row.** `demo:e2e-1786750996652` ("FY26 SBIR
   Phase I: AI Tools to Reduce Clinical Administrative Burden") is the best
   topical fit in the DB for eval case 1 and it resolves on
   `/opportunity/[id]`, but it came from `scripts/demo-inject.ts`, not from
   ingest. Its raw id is no longer displayed — cards show the ALN/CFDA number
   instead — but it should be replaced once real SBIR ingest lands.

3. **No SBIR source is ingested.** `countBySource()` returns only
   `grants_gov`, `assistance_listing` and `utah`. Every SBIR/STTR program on
   the Dashboard is either a grants.gov row that happens to be SBIR or the
   demo row above. `OpportunitySource` already has an `sbir` member with
   nothing writing to it.

4. **Ranked prose is authored, not generated.** `whyFit`,
   `whatCouldDisqualify`, `whatToVerify` and `nextSteps` in `fixture.ts` are
   what the ranker would write. The LLM backend is credit-blocked (see
   `NOTES-llm-backends.md`), so nothing generated them. Same for the
   `evidence` award histories, which are illustrative rather than USAspending
   rows.

5. **The meter's dollars do not move when a question is answered.** Answering
   in Unlock Results updates the profile — the dossier row flips, the
   completeness meter climbs — but `unlockedUsd` / `potentialUsd` stay put,
   because recomputing them means re-running `gates.ts` over every
   opportunity. The card points at "re-run scan" rather than showing a number
   it has not earned.

6. **"Monitor" on a match card navigates but does not subscribe.** Monitoring
   in this codebase is per-COMPANY (`companies.monitoring`, `scripts/watch.ts`),
   not per-opportunity. There is no "watch this one program" concept yet. The
   button goes to `/radar`; making it actually subscribe needs either a new
   table or a per-opportunity flag, which is a schema change and therefore a
   note rather than an edit.

7. **`/utah` and `/profile` are stubs.** Both are approved nav destinations
   that are out of scope for this build. They render an honest "not built yet"
   card so the primary nav has no 404s.

## Decisions worth not re-litigating

- **Match cards do not use the kit's `<OpportunityCard/>`.** `RankedMatch`
  gives paragraphs (`whyFit: string`); the kit renders `string[]` as bullets.
  The brief also names four explanation elements where the kit card has two
  slots and no `whatToVerify`, and the card has to be a disclosure. So
  `match-card.tsx` composes the vendored `.or-opp*` rules directly, which is
  what the mockup does. `components/ui/` is still reserved for port bugs.

- **Action Plan and Deadlines were merged, then split again.** Both were fed by
  `buildTimeline()` for the top match, so the two rails rendered the same four
  items — left as tasks, right as dates. Deadlines now carries close dates
  only. Action Plan answers "what do I do?"; Deadlines answers "when do these
  close?".

- **The page header lives above the grid, not in the centre column**, so all
  three columns start level. Its filter/sort state is shared with the list via
  `useMatchList()` in `match-list.tsx`.

- **The assistant drawer overlays rather than reserving padding.** The kit
  screen sets `paddingRight: 420` on `main` while open, which reflows the
  whole grid on every toggle.

- **`.or-*` belongs to the kit alone.** Product CSS in `globals.css` uses an
  `app-` prefix, so a stray product class can never be mistaken for a vendored
  one. Two genuinely generic patterns (`.or-card__head`, `.or-meter`) were
  promoted into `catalyst-kit.css` per kit rule 6, as new rules only — no
  vendored value was edited. `.or-stackbar` from the plan was NOT added: its
  only consumer was the Screening page, which the 2026-08-15 meeting dropped.

## Still open

- Live SSE. `fixture.ts` is a real `UiReport`, so wiring the stream replaces
  one import and touches no component. The working intake → SSE → report flow
  is preserved at `/analyze` (`src/app/opportunity-map.tsx`) and is where the
  stream logic gets lifted from.
- Profile editability. The 2026-08-15 meeting decided the profile is
  persistent and editable throughout the product. Today it is editable only
  through the interview questions in Unlock Results; the dossier's unknown
  rows link there rather than editing in place.
