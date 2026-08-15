// Seed match_reasoning from the Dashboard fixture.
//
//   pnpm tsx scripts/seed-reasoning.ts
//   pnpm tsx scripts/seed-reasoning.ts --clean
//
// WHY: the reasoning table is normally written by the SSE facade when a scan
// completes. The LLM backend is credit-blocked (NOTES-llm-backends.md), so no
// scan can complete, so clicking "View details" from the Dashboard would land
// on a page saying "you haven't been matched to this yet" — about a match
// visibly on screen one click earlier.
//
// This writes the fixture's own matches through the SAME function the facade
// uses, so the seeded rows are indistinguishable in shape from live ones and
// the read path is exercised for real. Delete them with --clean once the
// backend has credit and real scans take over.

import { FIXTURE_REPORT } from "../src/app/components/dashboard/fixture";
import { ANONYMOUS_COMPANY, countReasoning, saveReportReasoning } from "../src/lib/reasoning/db";
import { getDb } from "../src/lib/db";

if (process.argv.includes("--clean")) {
  const ids = FIXTURE_REPORT.matches.map((m) => m.opportunityId);
  const stmt = getDb().prepare(
    `DELETE FROM match_reasoning WHERE opportunity_id = ? AND company_id = ?`,
  );
  let removed = 0;
  for (const id of ids) removed += stmt.run(id, ANONYMOUS_COMPANY).changes;
  console.log(`removed ${removed} seeded reasoning rows (${countReasoning()} remain)`);
  process.exit(0);
}

const written = saveReportReasoning(FIXTURE_REPORT, ANONYMOUS_COMPANY);
console.log(`seeded reasoning for ${written} matches (${countReasoning()} rows total)`);
for (const m of FIXTURE_REPORT.matches) {
  const o = FIXTURE_REPORT.opportunities?.[m.opportunityId];
  console.log(`  ${m.tier.padEnd(19)} ${m.score}  ${o?.title.slice(0, 62) ?? m.opportunityId}`);
}
console.log("\nOpen any of these from the Dashboard's 'View details' to see it render.");
