// ============================================================
// Dashboard fixture — a real `UiReport`, not a mock-shaped blob.
//
// WHY THIS EXISTS: the LLM backend is credit-blocked (see
// NOTES-llm-backends.md), so the Dashboard cannot be driven by a live
// /api/analyze SSE run yet. It is rendered from this fixture instead.
//
// WHY IT IS TYPED: because it satisfies `UiReport` (= MatchReport + the
// facade's id->Opportunity lookup), swapping in the live stream later touches
// THIS FILE ONLY. No component reads a field the real engine does not emit.
//
// WHAT IS REAL HERE:
//   - The profile is eval case 1 (`eval/cases.ts`, "ai-healthcare" —
//     AI-healthcare / Lehi UT). The founder text is that case verbatim.
//   - The four opportunities are REAL ROWS copied out of data/radar.db
//     (2026-08-15), fields and all: ids, agencies, award ceilings, close
//     dates, expected award/application counts. Because the ids are real,
//     "Start Pre-flight" resolves on /opportunity/[id] against the same DB.
//   - Meter dollars are computed with the engine's own rule (gates.ts
//     `meterValueUsd`: awardCeiling ?? estimatedTotal/expectedAwards ??
//     kind-default, capped at METER_CAP_USD). The arithmetic is written out
//     per row below so it can be checked by hand.
//
// WHAT IS NOT: the ranked prose (whyFit / whatCouldDisqualify / whatToVerify
// / nextSteps) is what the LLM ranker would write and is authored here, and
// the `evidence` award histories are illustrative rather than USAspending
// rows. Both are replaced wholesale once the backend has credit — they are
// exactly the parts that are blocked. Nothing else on the page is invented.
//
// The values are NOT hardcoded by importing gates.ts on purpose: that module
// reaches for better-sqlite3, and this file is read by client components.
// ============================================================

import type {
  CompanyProfile,
  EligibilityMeter,
  EvidenceSummary,
  GatedOpportunity,
  InterviewQuestion,
  Opportunity,
  RankedMatch,
} from "@/lib/types";
import type { QuickReply, UiReport } from "../shared";

/* -------------------------------------------------------------------------- */
/* Profile — what extraction derives from the eval case's founder text.        */

const FOUNDER_TEXT =
  "We're a 15-person software company based in Lehi, Utah. Our SaaS platform " +
  "uses AI to reduce the administrative burden on nurses — automating charting, " +
  "shift handoffs, and compliance documentation so nurses spend more time with " +
  "patients. We're at $1M ARR and we've raised $2.5M in venture funding. We're " +
  "looking for $500K to $2M in non-dilutive funding to accelerate product " +
  "development and run pilot programs with hospital systems.";

export const FIXTURE_PROFILE: CompanyProfile = {
  description: FOUNDER_TEXT,
  // The eval case states no company name — real extraction yields null here.
  // A name is carried from the design mock so the dossier has something to
  // show; every consumer still handles `null`, because live runs will hit it.
  name: "NuraHealth AI",
  industry: "Healthcare IT",
  naicsGuesses: ["541511", "621999", "541512"],
  technologyKeywords: [
    "clinical documentation AI",
    "nurse charting automation",
    "shift handoff",
    "compliance documentation",
    "SaaS",
  ],
  govKeywords: [
    "health information technology",
    "digital health",
    "clinical workflow",
    "nursing workforce",
  ],
  location: { city: "Lehi", state: "UT" },
  employees: 15,
  annualRevenueUsd: 1_000_000,
  capitalRaisedUsd: 2_500_000,
  fundingStage: "seed",
  isForProfit: true,
  isSmallBusiness: true,
  // The unknown the entire right rail is about. Venture-backed plus SBIR means
  // the ownership split decides eligibility, and the founder text is silent.
  majorityUsOwned: null,
  hasActiveRnD: true,
  productMaturity: "in-market",
  capitalNeedUsd: { min: 500_000, max: 2_000_000 },
  useOfFunds: "Accelerate product development and run pilot programs with hospital systems.",
  targetCustomers: "Hospital systems and hospital nursing departments",
  samRegistered: null,
  milestones: [],
};

/* -------------------------------------------------------------------------- */
/* Opportunities — real rows from data/radar.db, verbatim.                     */

const NIH_AI = "demo:e2e-1786750996652";
const NSF_SBIR = "grants_gov:362551";
const NIH_PARENT = "grants_gov:359671";
const FDA_DHT = "grants_gov:363255";

export const FIXTURE_OPPORTUNITIES: Record<string, Opportunity> = {
  [NIH_AI]: {
    id: NIH_AI,
    source: "grants_gov",
    kind: "sbir_sttr",
    title: "FY26 SBIR Phase I: AI Tools to Reduce Clinical Administrative Burden",
    agency: "National Institutes of Health",
    agencyCode: "HHS-NIH11",
    description:
      "NIH invites SBIR Phase I proposals from US small businesses developing SaaS, artificial " +
      "intelligence, nursing automation to reduce administrative workload for clinical staff, " +
      "including documentation automation, shift handoff support, and compliance reporting for " +
      "hospital systems. Awards support proof-of-concept R&D with commercialization potential.",
    alnNumbers: ["93.213"],
    eligibilityCodes: ["23"],
    eligibilityText: "For-profit US small businesses under 500 employees, majority US-owned.",
    openToSmallBusiness: true,
    awardFloorUsd: 250_000,
    awardCeilingUsd: 314_000,
    estimatedTotalUsd: null,
    expectedAwards: 20,
    expectedApplications: 240,
    openDate: "2026-08-14",
    closeDate: "2026-12-14",
    status: "posted",
    url: "https://grants.nih.gov/",
    contactName: "NIH SBIR Program",
    contactEmail: "sbir@nih.gov",
    raw: null,
  },
  [NSF_SBIR]: {
    id: NSF_SBIR,
    source: "grants_gov",
    kind: "grant",
    title:
      "NSF Small Business Innovation Research / Small Business Technology Transfer Phase I, " +
      "Phase II, Fast-Track Programs: A Pilot Emphasis on Scientific Instrumentation",
    agency: "U.S. National Science Foundation",
    agencyCode: "NSF",
    description:
      "NSF invests in scientific discoveries, technological breakthroughs, and transformative " +
      "innovations that strengthen economic growth, enhance security, and improve the lives of " +
      "Americans. Phase I proposals are by invitation only, following an accepted Project Pitch.",
    alnNumbers: ["47.084"],
    eligibilityCodes: ["25"],
    eligibilityText:
      "Firms qualifying as a small business concern are eligible to participate in the NSF " +
      "SBIR/STTR programs. The size limit of 500 employees includes affiliates. For Phase I, " +
      "proposers must obtain an official invitation to submit by first submitting a Project Pitch.",
    openToSmallBusiness: true,
    awardFloorUsd: null,
    awardCeilingUsd: null,
    estimatedTotalUsd: 40_000_000,
    expectedAwards: 86,
    expectedApplications: 250,
    openDate: "2026-05-22",
    closeDate: "2026-11-04",
    status: "posted",
    url: "https://grants.gov/search-results-detail/362551",
    contactName: "U.S. National Science Foundation",
    contactEmail: "grantsgovsupport@nsf.gov",
    raw: null,
  },
  [NIH_PARENT]: {
    id: NIH_PARENT,
    source: "grants_gov",
    kind: "sbir_sttr",
    title:
      "NIH, CDC and FDA Small Business Innovation Research Grant " +
      "(Parent SBIR [R43/R44] Clinical Trial Optional)",
    agency: "National Institutes of Health",
    agencyCode: "HHS-NIH11",
    description:
      "The Small Business Innovation Research (SBIR) program helps United States small business " +
      "concerns bring scientific innovations to the marketplace. The SBIR program supports " +
      "feasibility studies to later research and development needed to develop a commercial " +
      "product.",
    alnNumbers: ["93.213", "93.286", "93.361"],
    eligibilityCodes: ["23"],
    eligibilityText:
      "Only United States small business concerns (SBCs), as defined by the Small Business " +
      "Administration, are eligible to submit applications for this opportunity. Non-domestic " +
      "(non-U.S.) entities are not eligible to apply.",
    openToSmallBusiness: true,
    awardFloorUsd: null,
    awardCeilingUsd: null,
    estimatedTotalUsd: null,
    expectedAwards: null,
    expectedApplications: 100,
    openDate: "2026-05-28",
    closeDate: "2027-04-05",
    status: "posted",
    url: "https://grants.gov/search-results-detail/359671",
    contactName: "National Institutes of Health",
    contactEmail: "SEEDinfo@nih.gov",
    raw: null,
  },
  [FDA_DHT]: {
    id: FDA_DHT,
    source: "grants_gov",
    kind: "cooperative_agreement",
    title:
      "Use of Digital Health Technologies in Clinical Investigations to Support Drug and " +
      "Biological Product Development (U01) Clinical Trials Optional",
    agency: "Food and Drug Administration",
    agencyCode: "HHS-FDA",
    description:
      "The purpose of this Notice of Funding Opportunity is to address topics related to the use " +
      "of digital health technologies (DHTs) for remote data acquisition in clinical " +
      "investigations to support drug development.",
    alnNumbers: ["93.103"],
    eligibilityCodes: ["20", "04", "23", "00", "02", "08", "22", "05", "06", "13", "07", "12", "01", "11"],
    eligibilityText: null,
    openToSmallBusiness: true,
    awardFloorUsd: null,
    awardCeilingUsd: 1_100_000,
    estimatedTotalUsd: null,
    expectedAwards: 2,
    expectedApplications: 10,
    openDate: "2026-07-20",
    closeDate: "2026-08-20",
    status: "posted",
    url: "https://grants.gov/search-results-detail/363255",
    contactName: "Food and Drug Administration",
    contactEmail: null,
    raw: null,
  },
};

/* -------------------------------------------------------------------------- */
/* Ranked matches.                                                            */
/*                                                                            */
/* whyFit / whatCouldDisqualify / whatToVerify are single strings on the real  */
/* type. The Dashboard renders them as BULLETS, one per sentence, because its  */
/* job is triage and three short lines scan where three paragraphs do not      */
/* (team decision, 2026-08-15; hidden until the card is expanded). The fuller  */
/* treatment belongs on the grant's own page.                                  */
/*                                                                            */
/* So each field is authored as 2-3 SHORT, self-contained sentences: each one  */
/* has to stand alone as a bullet, and read as a paragraph when joined. Keep   */
/* that shape when the live ranker takes over — the prompt should ask for it,  */
/* and `RankedMatch` should really carry string[] (see NOTES-dashboard.md).    */

const MATCHES: RankedMatch[] = [
  {
    opportunityId: NIH_AI,
    tier: "likely_fit",
    score: 91,
    whyFit:
      "The notice names documentation automation, shift handoff and compliance reporting as the " +
      "work it funds. The $250K-$314K band sits inside your $500K-$2M raise. " +
      "At 15 people and $1M ARR you clear the small-business test with room to spare.",
    whatCouldDisqualify:
      "Eligibility requires majority US ownership, and your $2.5M venture raise leaves that " +
      "unresolved. SBIR funds technical risk, not product engineering — a features roadmap gets " +
      "declined on merit even once eligibility clears.",
    whatToVerify:
      "Confirm the ownership split against the SBIR definition, which counts affiliates. " +
      "Check that your SAM.gov registration is active, not merely created.",
    nextSteps:
      "Resolve ownership first — every other program on this page is waiting on the same answer.",
  },
  {
    opportunityId: NSF_SBIR,
    tier: "likely_fit",
    score: 78,
    whyFit:
      "86 expected awards against roughly 250 proposals is the best ratio on this page. " +
      "Deployed hospital pilots are the commercial-potential evidence Phase I reviewers want. " +
      "A $40M pool across 86 awards implies an award near the middle of your stated need.",
    whatCouldDisqualify:
      "This solicitation's pilot emphasis is scientific instrumentation, which your platform is " +
      "not. Phase I is invitation-only — no accepted Project Pitch, no submission. " +
      "NSF caps pitches at two per company per year.",
    whatToVerify:
      "Check whether the general NSF SBIR solicitation is open on a parallel deadline; that is " +
      "likely the better door. Confirm your Project Pitch allowance has not been spent this year.",
    nextSteps:
      "Submit a 3-page Project Pitch — that is the deadline that actually binds.",
  },
  {
    opportunityId: NIH_PARENT,
    tier: "verify_eligibility",
    score: 62,
    whyFit:
      "The parent SBIR is the standing door into NIH, open long after themed calls close. " +
      "An April 2027 deadline is a real fallback if the December round misses. " +
      "Health IT for the nursing workforce sits inside the assistance listings this draws on.",
    whatCouldDisqualify:
      "The same US-ownership requirement applies and is still unanswered. " +
      "No award ceiling and no expected award count are published, so we cannot tell you what a " +
      "realistic ask is.",
    whatToVerify:
      "Identify which NIH institute would own the application — the parent SBIR routes through " +
      "institute budgets. Get that institute's current Phase I ceiling before building a budget.",
    nextSteps:
      "Email SEEDinfo@nih.gov and ask which institute should receive a nursing-documentation " +
      "application.",
  },
];

/* -------------------------------------------------------------------------- */
/* Held — an opportunity the ranker declined to score because a gate is        */
/* unknown. The Dashboard renders `rejected` entries whose verdict is          */
/* "unknown" as the "Uncertain eligibility" card under the match list.         */

const REJECTED: GatedOpportunity[] = [
  {
    opportunity: FIXTURE_OPPORTUNITIES[FDA_DHT],
    gates: [
      {
        gate: "eligibility:applicant_type",
        verdict: "unknown",
        missingField: "majorityUsOwned",
        detail:
          "Fourteen applicant-type codes are listed without an ownership test we can read; the " +
          "FDA decides business eligibility case by case",
      },
      {
        gate: "deadline",
        verdict: "unknown",
        missingField: "samRegistered",
        detail:
          "Closes 2026-08-20. Without an active SAM.gov registration this cannot be submitted in " +
          "time, and we do not know your registration status",
      },
    ],
    verdict: "unknown",
    missingFields: ["majorityUsOwned", "samRegistered"],
    // awardCeilingUsd, under METER_CAP_USD.
    meterValueUsd: 1_100_000,
  },
];

/* -------------------------------------------------------------------------- */
/* Meter. Per-row meterValueUsd, by the engine's own rule:                     */
/*   NIH_AI      awardCeiling                      =   314,000                */
/*   NSF_SBIR    estimatedTotal 40,000,000 / 86    =   465,116                */
/*   NIH_PARENT  no ceiling, no total -> sbir_sttr =   275,000                */
/*   FDA_DHT     awardCeiling                      = 1,100,000  (held)        */
/* Nothing is unlocked while the ownership gate is unknown, so unlockedUsd is  */
/* zero — the honest number. FDA_DHT is missing TWO fields, so per the greedy  */
/* attribution in meter.ts it counts toward no chip.                           */

const METER: EligibilityMeter = {
  unlockedUsd: 0,
  unlockedCount: 0,
  potentialUsd: 2_154_116, // 314,000 + 465,116 + 275,000 + 1,100,000
  unlocks: [
    {
      field: "majorityUsOwned",
      question: "Is your company majority-owned by U.S. citizens or permanent residents?",
      unlockUsd: 1_054_116, // 314,000 + 465,116 + 275,000 — sole-missing-field only
      opportunityCount: 3,
    },
  ],
};

const QUESTIONS: InterviewQuestion[] = [
  {
    field: "majorityUsOwned",
    question: "Is your company majority-owned by U.S. citizens or permanent residents?",
    whyAsking: "SBIR/STTR programs require it — answering unlocks up to $1.1M across 3 programs",
    answerType: "boolean",
    choices: null,
  },
  {
    field: "samRegistered",
    question: "Are you registered on SAM.gov with an active UEI?",
    whyAsking:
      "Does not change eligibility, but registration takes 2-6 weeks and decides whether the " +
      "August 20 FDA deadline is reachable at all",
    answerType: "boolean",
    choices: null,
  },
];

/* -------------------------------------------------------------------------- */
/* Evidence — illustrative award history. Replaced by src/lib/engine/evidence  */
/* .ts (USAspending) once the pipeline runs; see the file header.              */

const EVIDENCE: Record<string, EvidenceSummary> = {
  [NIH_AI]: {
    totalAwards: 412,
    totalUsd: 108_400_000,
    medianUsd: 256_000,
    utahCount: 7,
    similarAwards: [
      {
        recipient: "Anthem Clinical Systems (Salt Lake City, UT)",
        amountUsd: 256_000,
        year: 2024,
        state: "UT",
        link: null,
      },
      {
        recipient: "Wardline Health (Boulder, CO)",
        amountUsd: 275_000,
        year: 2023,
        state: "CO",
        link: null,
      },
    ],
  },
  [NSF_SBIR]: {
    totalAwards: 96,
    totalUsd: 28_900_000,
    medianUsd: 298_000,
    utahCount: 2,
    similarAwards: [
      {
        recipient: "Caregiver Signal Inc. (Provo, UT)",
        amountUsd: 300_000,
        year: 2024,
        state: "UT",
        link: null,
      },
    ],
  },
  [NIH_PARENT]: {
    totalAwards: 34,
    totalUsd: 8_100_000,
    medianUsd: 241_000,
    utahCount: 1,
    similarAwards: [],
  },
};

/* -------------------------------------------------------------------------- */

/** The Dashboard's data. One export; swap it for the SSE stream when live. */
export const FIXTURE_REPORT: UiReport = {
  profile: FIXTURE_PROFILE,
  matches: MATCHES,
  rejected: REJECTED,
  honestNo: false,
  honestNoExplanation: null,
  meter: METER,
  questions: QUESTIONS,
  evidence: EVIDENCE,
  opportunities: FIXTURE_OPPORTUNITIES,
};

/** Assistant starter chips. Live, these come from /api/suggest (Luna). */
export const FIXTURE_QUICK_REPLIES: QuickReply[] = [
  {
    label: "Grant eligibility",
    message: "Which of these am I actually eligible for right now?",
  },
  {
    label: "SAM.gov status",
    message: "How do I check whether our SAM.gov registration is active?",
  },
  {
    label: "Match reasoning",
    message: "Why did you rank the NIH SBIR above the NSF one?",
  },
];
