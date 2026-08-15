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

1. ~~**"N live" in the page header overcounts.**~~ **FIXED.**
   `countLiveOpportunities()` in `retrieve.ts` now counts what a founder could
   actually apply to today: not `assistance_listing` (catalogue entries with
   no deadline, permanently status "open" — 2,864 of the old 4,596), status in
   posted/open, and close date null-or-future. **1,146** rather than 4,596.
   The header reads "open now", not "live", because the words differ.

2. **The top match is a seeded demo row, and this is the least-bad option.**
   `demo:e2e-1786750996652` came from `scripts/demo-inject.ts`, not ingest.
   Its raw id is not displayed — cards show the ALN/CFDA number. I looked at
   replacing it: of the 63 open `kind='sbir_sttr'` rows, the realistic
   alternatives are NIH *parent* announcements (`grants_gov:359671`,
   `:359757`) which publish **no award ceiling and no expected-award count**.
   Swapping would render an em-dash where the award figure goes, kill the odds
   line and flatten the difficulty bars — a worse page built from better
   provenance. Kept the demo row; revisit when a themed SBIR solicitation with
   real numbers is in the DB.

3. ~~**No SBIR source is ingested.**~~ **NOT A DEFECT — I had this wrong.**
   `scripts/ingest/grants-gov.ts:104` already sets `kind: "sbir_sttr"` for any
   title or number matching `/SBIR|STTR/i`, and the ingest searches with an
   empty keyword across `forecasted|posted`, so it is not under-sweeping.
   `OpportunitySource.sbir` is unused because **SBIR.gov's API returns 403
   "maintenance"** — documented at `docs/api-notes.md:42`, which names
   grants.gov keyword flagging as the sanctioned fallback. That fallback is
   what is running. Nothing to fix; re-point at SBIR.gov only if it comes back.

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

## Match reasoning: where it lives now

`/opportunity/[id]` renders a "WHY THIS MATCHED YOU" section above the pursuit
panel — the long-form home for the four ranked fields, as full prose. The
Dashboard shows the same fields as bullets for triage; this is where the
unabridged version lives.

- **Store:** `src/lib/reasoning/db.ts`, a new module owning
  `match_reasoning (opportunity_id, company_id, match_json, evidence_json,
  profile_name, created_at)` via `CREATE TABLE IF NOT EXISTS`, the same pattern
  `monitor/db.ts` and `pursuit/db.ts` already use. **No `db.ts` edit and no
  `types.ts` edit** — it stores `RankedMatch` and `EvidenceSummary` as they are.
- **Write:** `sseResponse()` in `api/engine-facade.ts`, the single choke point
  both `/api/analyze` and `/api/answer` pass through. Best-effort: a storage
  failure logs and is swallowed, because it must never cost a founder a scan.
  Re-running replaces prior reasoning for the same (opportunity, company) —
  stale reasoning would let the page contradict the Dashboard.
- **Read:** `match_reasoning` → `pursuits.match_json` (the RankedMatch captured
  when a pursuit was started) → nothing. "Nothing" is a real state and renders
  as an honest empty with a link to run a scan, not an empty shell.
- **Seeding:** `pnpm tsx scripts/seed-reasoning.ts` writes the Dashboard
  fixture's matches through the same `saveReportReasoning()` the facade uses,
  so seeded rows are shape-identical to live ones. Needed only while the LLM
  backend has no credit; `--clean` removes them.

Note the held row (`grants_gov:363255`) has no reasoning by design — it was
never ranked, so its detail page correctly shows the empty state.

## Type changes this module wants (per CLAUDE.md, proposed not made)

1. **`RankedMatch` should carry `string[]`, not `string`.** The Dashboard
   renders `whyFit` / `whatCouldDisqualify` / `whatToVerify` as bullets —
   three short lines scan where three paragraphs do not, and triage is the
   page's job. Today `format.ts:toBullets()` splits the string on sentence
   boundaries, and the fixture copy is authored as 2-3 short self-contained
   sentences so the split lands cleanly. That is a workaround. The real fix:

   ```ts
   whyFit: string[];              // was: string
   whatCouldDisqualify: string[];
   whatToVerify: string[];
   ```

   **DECIDED 2026-08-15: do NOT change the type — constrain the prompt.**
   Seventeen files reference these fields and `notifications.why_fit` is a
   TEXT column, so `string[]` is a ~10-file refactor touching the ranker the
   eval harness scores. Instead `rank.ts:139` ("write 1-2 sentences each for
   whyFit…") becomes a demand for **2-3 short, self-contained sentences, each
   able to stand alone as a bullet**. One line, reversible, and it makes the
   splitter reliable on live output. Revisit `string[]` only if real ranker
   output still splits badly. NOT YET APPLIED — scoped to the next pass, so
   the change lands with an eval run rather than blind.

2. **Profile confidence should be the agent's own read, not a stand-in.** The
   dossier's "Confidence: High/Medium/Low" badge is currently derived from
   `profileCompleteness()`, which measures how many fields are filled — not
   how much the extractor trusts what it pulled out. Those are different
   questions, and the meeting flagged this as something the AI agent will
   evaluate.

   **DECIDED 2026-08-15: the extractor emits it.** `profile.ts` already knows
   which facts the founder stated outright and which it inferred, which is
   exactly the signal the badge wants and something no downstream heuristic
   can reconstruct. Needs one field:

   ```ts
   extractionConfidence: "high" | "medium" | "low";   // on CompanyProfile
   ```

   This is a `types.ts` edit, so it is written here per CLAUDE.md and awaits
   the go-ahead. When it lands, re-point `founder-dossier.tsx:confidence()` —
   one function, deliberately isolated for this. NOT YET APPLIED.

## Difficulty bars are derived, and here is the weighting

The match-card footer shows a 1-3 effort estimate as signal bars, replacing
the mock's "Estimated prep time: 120 hours" (no field supports an hour count).
`dashboard/difficulty.ts` scores: competition from
`expectedAwards / expectedApplications` (+2 under 1-in-8, +1 under ~1-in-3),
`kind` (+1 for sbir_sttr, +1 for cooperative_agreement), SAM.gov not yet
registered (+1), and closing within 30 days (+1). Totals of 0-1 / 2-3 / 4+ map
to levels 1 / 2 / 3. Bars fill in brand blue, never red — rule 2 keeps red for
deadlines, alerts and failures, and a hard grant is none of those.

It is deliberately a 1-3 band rather than a percentage or an hour count: that
is the most precision these inputs support.

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

- **Live SSE on the Dashboard.** See below.
- **"Monitor" navigates but does not subscribe** (item 6 above).
- **`/utah` and `/profile` are stubs** (item 7 above).
- **Profile editability** — the meeting decided the profile is editable
  throughout the product; today it is editable only through the interview
  questions in Unlock Results.


- Live SSE. `fixture.ts` is a real `UiReport`, so wiring the stream replaces
  one import and touches no component. The working intake → SSE → report flow
  is preserved at `/analyze` (`src/app/opportunity-map.tsx`) and is where the
  stream logic gets lifted from.
- Profile editability. The 2026-08-15 meeting decided the profile is
  persistent and editable throughout the product. Today it is editable only
  through the interview questions in Unlock Results; the dossier's unknown
  rows link there rather than editing in place.
