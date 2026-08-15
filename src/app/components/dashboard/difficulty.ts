// How hard is this one to actually win? — the Dashboard's effort estimate.
//
// Replaces the mock's "Estimated prep time: 120 hours", which no field in the
// data supports. This is a 1-3 scale rendered as signal bars: 1 low, 3 high.
//
// It is DERIVED, not invented: every input is a real field off the
// Opportunity row or the founder's own profile, and the weighting is written
// out below so it can be argued with. It is deliberately NOT a percentage or
// an hour count — a 1-3 band is the most precision these inputs support, and
// claiming more would be the invented number rule 8 forbids.
//
// Colour note: the bars fill in the brand blue, never red. Red means
// deadlines, alerts and failures (rule 2); a hard grant is not a failure.

import type { CompanyProfile, Opportunity } from "@/lib/types";
import { daysBetween } from "./format";

export interface Difficulty {
  level: 1 | 2 | 3;
  label: string;
  /** The dominant driver, for the tooltip and the accessible name. */
  why: string;
}

export function difficultyOf(
  opp: Opportunity,
  profile: CompanyProfile,
  today: string,
): Difficulty {
  let score = 0;
  const reasons: string[] = [];

  // 1. Competition. The only hard number most notices publish.
  const { expectedAwards: awards, expectedApplications: apps } = opp;
  if (awards != null && apps != null && apps > 0 && awards > 0) {
    const ratio = awards / apps;
    if (ratio < 0.12) {
      score += 2;
      reasons.push(`roughly 1-in-${Math.round(apps / awards)} odds`);
    } else if (ratio < 0.35) {
      score += 1;
      reasons.push("competitive field");
    }
  }

  // 2. Programme shape. SBIR/STTR wants a technical-risk narrative plus a
  //    commercialisation plan; cooperative agreements carry partnership and
  //    reporting obligations a plain grant does not.
  if (opp.kind === "sbir_sttr") {
    score += 1;
    reasons.push("SBIR narrative plus commercialisation plan");
  } else if (opp.kind === "cooperative_agreement") {
    score += 1;
    reasons.push("cooperative agreement — partnership and reporting duties");
  }

  // 3. Registration. Not being on SAM.gov yet adds 2-6 weeks of prerequisite
  //    before a single word of the application counts.
  if (profile.samRegistered !== true) {
    score += 1;
    reasons.push("SAM.gov registration still needed");
  }

  // 4. Time pressure. A near deadline makes the same work harder.
  const days = daysBetween(today, opp.closeDate);
  if (days !== null && days >= 0 && days <= 30) {
    score += 1;
    reasons.push(`closes in ${days} days`);
  }

  const level: 1 | 2 | 3 = score <= 1 ? 1 : score <= 3 ? 2 : 3;
  const label = level === 1 ? "Low effort" : level === 2 ? "Moderate effort" : "High effort";

  return {
    level,
    label,
    why: reasons.length ? reasons.join("; ") : "no complicating factors in the notice",
  };
}
