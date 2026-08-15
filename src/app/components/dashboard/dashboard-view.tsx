"use client";

// The Dashboard's composition — page header above the 3/6/3 grid, exactly as
// screen-opportunity-map.jsx composes it (with the header lifted out of the
// centre column so all three columns start level).
//
// This is the only client boundary the Dashboard needs. It exists for two
// pieces of shared state:
//
//   1. The header's filter/sort/collapse controls and the match list are one
//      widget rendered in two places (see match-list.tsx).
//   2. Interview answers. The founder answers a question in the right rail
//      and the LEFT rail has to change — that unknown stops pulsing red, the
//      completeness meter climbs. Without that, "Save Details" is a button
//      that flips its own label, which is the dead control the 2026-08-15
//      meeting ruled out.
//
// What answers deliberately do NOT do is restate the meter's dollar totals.
// Re-gating every opportunity against a new fact is engine work; guessing the
// new number here would be the invented statistic rule 8 forbids.
//
// Everything else is presentational, and all data arrives as serializable
// props from the server page — including `today`, because computing that
// below a client boundary is how you get a hydration mismatch.

import { useState } from "react";
import type { CompanyProfile, GateField, Opportunity } from "@/lib/types";
import type { TimelineStep } from "@/lib/engine/timeline";
import type { UiReport } from "../shared";
import ActionPlan from "./action-plan";
import Deadlines from "./deadlines";
import FounderDossier from "./founder-dossier";
import MatchList, { MatchListHeader, useMatchList } from "./match-list";
import UnlockResults from "./unlock-results";

/** One interview answer as a profile patch. Mirrors the GateField union. */
function asProfilePatch(
  field: GateField,
  raw: string,
  profile: CompanyProfile,
): Partial<CompanyProfile> {
  const yes = raw === "yes";
  const num = Number(raw.replace(/[^0-9.]/g, ""));
  switch (field) {
    case "majorityUsOwned":
      return { majorityUsOwned: yes };
    case "samRegistered":
      return { samRegistered: yes };
    case "isForProfit":
      return { isForProfit: yes };
    case "isSmallBusiness":
      return { isSmallBusiness: yes };
    case "hasActiveRnD":
      return { hasActiveRnD: yes };
    case "employees":
      return Number.isFinite(num) ? { employees: num } : {};
    case "annualRevenueUsd":
      return Number.isFinite(num) ? { annualRevenueUsd: num } : {};
    case "productMaturity":
      return { productMaturity: raw };
    case "location":
      return { location: { city: profile.location?.city ?? null, state: raw } };
    default:
      return {};
  }
}

export default function DashboardView({
  report,
  steps,
  matchedOpportunities,
  today,
  liveCount,
  sample = false,
}: {
  report: UiReport;
  steps: TimelineStep[];
  matchedOpportunities: Opportunity[];
  today: string;
  liveCount: number | null;
  /** True while the page renders the fixture rather than a live scan. */
  sample?: boolean;
}) {
  const state = useMatchList(report);
  const [patch, setPatch] = useState<Partial<CompanyProfile>>({});
  const [answered, setAnswered] = useState<GateField[]>([]);

  const profile = { ...report.profile, ...patch };

  const onAnswer = (field: GateField, value: string) => {
    setPatch((p) => ({ ...p, ...asProfilePatch(field, value, profile) }));
    setAnswered((a) => (a.includes(field) ? a : [...a, field]));
  };

  return (
    <main className="app-page">
      <MatchListHeader state={state} liveCount={liveCount} />

      <div className="app-grid">
        <div className="app-c3">
          <FounderDossier profile={profile} sample={sample} />
          <ActionPlan steps={steps} />
        </div>

        <div className="app-c6">
          <MatchList state={state} report={report} profile={profile} today={today} />
        </div>

        <div className="app-c3" id="unlock">
          <UnlockResults
            meter={report.meter}
            questions={report.questions}
            answered={answered}
            onAnswer={onAnswer}
          />
          <Deadlines opportunities={matchedOpportunities} today={today} />
        </div>
      </div>
    </main>
  );
}
