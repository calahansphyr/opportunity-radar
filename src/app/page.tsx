// The Dashboard — the landing page, previously called Opportunity Map.
//
// Anatomy from design/claude-design/kit-source/screen-opportunity-map.jsx:
// a centred 1440 main, a page header above the grid so all three columns
// start level, then 3 / 6 / 3 —
//
//   cols  1-3   founder dossier + action plan
//   cols  4-9   the match list
//   cols 10-12  unlock results (the ask) + deadlines
//
// A server component, so the live program count and today's date are read
// once here and passed down. `today` in particular must NOT be computed
// inside a client component: `Date.now()` on both sides of a hydration
// boundary produces a mismatch.
//
// Data comes from ./components/dashboard/fixture — a real `UiReport` — while
// the LLM backend is credit-blocked. See that file's header; wiring the live
// SSE stream replaces this one import and touches no component.

import type { Metadata } from "next";
import type { Opportunity } from "@/lib/types";
import { countLiveOpportunities } from "@/lib/engine/retrieve";
import { localIsoDate } from "@/lib/engine/dates";
import { buildTimeline } from "@/lib/engine/timeline";
import DashboardView from "./components/dashboard/dashboard-view";
import { FIXTURE_REPORT } from "./components/dashboard/fixture";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your funding matches, what's blocking them, and what to do next.",
};

/**
 * Programs a founder could apply to today. Null rather than a guess if ingest
 * hasn't run. See `countLiveOpportunities` for why this is not the row total:
 * summing every source called 4,596 rows "live" when 2,864 of them are
 * assistance-listing catalogue entries with no deadline to miss.
 */
function liveProgramCount(today: string): number | null {
  try {
    const n = countLiveOpportunities(today);
    return n > 0 ? n : null;
  } catch {
    return null;
  }
}

export default function DashboardPage() {
  const report = FIXTURE_REPORT;
  const today = localIsoDate();
  const opportunities = report.opportunities ?? {};

  // The action plan and the deadline rail are both worked back from the top
  // match's close date — the deadline that actually binds.
  const topMatch = report.matches.find((m) => opportunities[m.opportunityId]);
  const topOpportunity = topMatch ? opportunities[topMatch.opportunityId] : null;
  const steps = topOpportunity ? buildTimeline(topOpportunity, report.profile, today) : [];

  const matchedOpportunities = report.matches
    .map((m) => opportunities[m.opportunityId])
    .filter((o): o is Opportunity => o != null);

  return (
    <DashboardView
      report={report}
      steps={steps}
      matchedOpportunities={matchedOpportunities}
      today={today}
      liveCount={liveProgramCount(today)}
      // Say so on the page. A reader comparing this branch against another
      // build should never have to guess which parts are real.
      sample
    />
  );
}
