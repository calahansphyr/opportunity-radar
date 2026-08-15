// Region: one funding match — the product's signature surface.
//
// No "use client" directive: this component holds no state of its own, and its
// only consumer is match-list.tsx, which is already a client component. Adding
// the directive would make it a client ENTRY, and its `onToggle` prop would
// then have to be serializable across the boundary.
//
// WHY THIS IS NOT <OpportunityCard/>: the kit component is a good card and the
// wrong card here, on three counts the mock calls out at
// public/design-mocks/frontend-pages.html:372.
//   1. `RankedMatch` gives PARAGRAPHS (`whyFit: string`), not bullet arrays.
//      The kit renders `string[]` as a <ul>; a one-item bullet list is worse
//      typography than a paragraph.
//   2. The brief names FOUR explanation elements. The kit body has two slots
//      and no `whatToVerify`.
//   3. The card has to be a disclosure — collapsed by default, expanding on a
//      click on the header band, with `aria-expanded` carrying the state.
// So this composes the same vendored `.or-opp*` rules directly, which is what
// the mock does. Editing components/ui/content.tsx is reserved for port bugs
// (DESIGN-SPEC), and no `.or-*` class used here is absent from the kit CSS.

import Link from "next/link";
import { Badge, Icon } from "@/app/components/ui";
import type { BadgeTone } from "@/app/components/ui";
import type { EvidenceSummary, FitTier, Opportunity, RankedMatch } from "@/lib/types";
import { oddsLabel } from "@/lib/engine/timeline";
import type { CompanyProfile } from "@/lib/types";
import { TIERS, fmtUsd } from "../shared";
import { elide, fmtDeadline, toBullets, urgencyLabel } from "./format";
import { difficultyOf } from "./difficulty";

/** Kit badge tone per tier. Labels come from TIERS so the two never drift. */
const TONE: Record<FitTier, BadgeTone> = {
  likely_fit: "fit",
  verify_eligibility: "caution",
  adjacent: "neutral",
  not_a_fit: "outline",
};

function tierLabel(tier: FitTier): string {
  return TIERS.find((t) => t.tier === tier)?.label ?? "Not a fit";
}

/** One explanation column, as bullets — the Dashboard triages, it doesn't
 *  brief. The source field is one string; see `toBullets`. */
function Column({
  icon,
  title,
  color,
  children,
}: {
  icon: string;
  title: string;
  color?: string;
  children: string;
}) {
  const points = toBullets(children);
  if (!points.length) return null;
  return (
    <div>
      <h5 className="or-opp__h5" style={color ? { color } : undefined}>
        <Icon name={icon} size={18} color={color ?? "var(--color-primary)"} aria-hidden /> {title}
      </h5>
      <ul className="or-opp__list">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

/** Signal-strength bars: 1 low, 3 high. Brand blue — hard is not a failure. */
function DifficultyBars({ level, label, why }: { level: 1 | 2 | 3; label: string; why: string }) {
  return (
    <span
      className="app-bars"
      role="img"
      aria-label={`Difficulty ${level} of 3, ${label}. ${why}`}
      title={why}
    >
      <span data-on={level >= 1} />
      <span data-on={level >= 2} />
      <span data-on={level >= 3} />
    </span>
  );
}

export default function MatchCard({
  match,
  opportunity,
  profile,
  evidence,
  today,
  expanded,
  onToggle,
}: {
  match: RankedMatch;
  opportunity: Opportunity;
  /** Difficulty depends on the founder too — SAM.gov status, mainly. */
  profile: CompanyProfile;
  evidence?: EvidenceSummary;
  today: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const bodyId = `match-body-${match.opportunityId.replace(/[^a-zA-Z0-9]/g, "-")}`;
  const urgency = urgencyLabel(today, opportunity.closeDate);
  // Show the federal program number (ALN/CFDA) rather than our internal row
  // id. It is the identifier a grants person actually recognises, it joins to
  // USAspending, and it does not leak how our ingest names things.
  const identifier = opportunity.alnNumbers[0]
    ? `ALN ${opportunity.alnNumbers[0]}`
    : opportunity.id.split(":").slice(1).join(":") || opportunity.id;
  const twin = evidence?.similarAwards?.[0];
  // Real odds from real counts, or nothing at all. Never an estimate.
  const odds = oddsLabel(opportunity.expectedAwards, opportunity.expectedApplications);
  const difficulty = difficultyOf(opportunity, profile, today);

  return (
    <article className="or-opp" data-expanded={expanded}>
      <div className="or-opp__head app-opp__head">
        <button
          type="button"
          className="app-opp__toggle"
          aria-expanded={expanded}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          <span style={visuallyHidden}>
            {expanded ? "Collapse" : "Expand"} {opportunity.title}
          </span>
        </button>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
              <Badge tone={TONE[match.tier]} icon={match.tier === "likely_fit" ? "check_circle" : undefined}>
                {tierLabel(match.tier)}
              </Badge>
              <span className="or-opp__meta">{identifier}</span>
            </div>
            <h4 className="or-opp__title">{opportunity.title}</h4>
            <span className="or-opp__meta">{opportunity.agency}</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ textAlign: "right" }}>
              <span className="or-opp__amount">{fmtUsd(opportunity.awardCeilingUsd)}</span>
              <span className="or-opp__meta">Deadline: {fmtDeadline(opportunity.closeDate)}</span>
              {/* Urgency belongs WITH the date it qualifies, not beside the
                  fit chip — two badges in one row read as two verdicts. */}
              {urgency ? (
                <Badge tone="danger" style={{ marginTop: 6 }}>
                  {urgency}
                </Badge>
              ) : null}
            </div>
            <Icon name="expand_more" size={24} className="app-opp__chev" aria-hidden />
          </div>
        </div>
        {/* Elided: the notice's own summary runs long, and the Dashboard's
            job is triage. Full text is on the grant's page. */}
        {opportunity.description ? (
          <p className="or-opp__lede">{elide(opportunity.description, 190)}</p>
        ) : null}
      </div>

      <div className="or-opp__body app-opp__body" id={bodyId}>
        <Column icon="done_all" title="Why it fits">
          {match.whyFit}
        </Column>
        <Column icon="warning" title="What could disqualify" color="var(--color-error)">
          {match.whatCouldDisqualify}
        </Column>
        <Column icon="fact_check" title="What to verify" color="var(--color-caution-text)">
          {match.whatToVerify}
        </Column>

        {twin ? (
          <div
            style={{
              gridColumn: "1 / -1",
              paddingTop: 12,
              borderTop: "1px solid var(--color-border-ice)",
            }}
          >
            <h5 className="or-opp__h5">
              <Icon name="group" size={18} color="var(--color-outline)" aria-hidden /> Who else got
              this money
            </h5>
            <div className="or-opp__twin">
              <span
                style={{
                  background: "rgba(126,212,253,.2)",
                  padding: 8,
                  borderRadius: "var(--radius-full)",
                  marginTop: 4,
                  display: "inline-flex",
                }}
              >
                <Icon name="handshake" size={20} color="var(--color-secondary)" aria-hidden />
              </span>
              <div>
                <span
                  style={{
                    font: "var(--text-label-sm-weight) var(--text-label-sm-size)/var(--text-label-sm-line) var(--font-label)",
                    letterSpacing: "var(--text-label-sm-tracking)",
                    color: "var(--color-secondary)",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  Your Funding Twin
                </span>
                <h6
                  style={{
                    margin: 0,
                    font: "500 var(--text-body-md-size)/var(--text-body-md-line) var(--font-body)",
                    color: "var(--color-text-deep)",
                  }}
                >
                  {twin.recipient}
                </h6>
                <p
                  style={{
                    margin: "4px 0 0",
                    font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
                    color: "var(--color-on-surface-variant)",
                  }}
                >
                  Received {fmtUsd(twin.amountUsd)} in {twin.year}
                  {evidence?.totalAwards != null
                    ? `. ${evidence.totalAwards} awards on record` +
                      (evidence.utahCount ? `, ${evidence.utahCount} of them in Utah` : "") +
                      "."
                    : "."}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {match.nextSteps?.trim() ? (
          <div style={{ gridColumn: "1 / -1" }}>
            <h5 className="or-opp__h5">
              <Icon name="arrow_forward" size={18} color="var(--color-primary)" aria-hidden /> Next
              step
            </h5>
            <p
              style={{
                margin: 0,
                font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
                color: "var(--color-on-surface-variant)",
              }}
            >
              {match.nextSteps}
            </p>
          </div>
        ) : null}
      </div>

      {/* Two actions, both real destinations — never a dead button.
          Monitor is the "watch this, tell me when it moves" action and lands
          on the Monitor page. The primary action opens the grant's own page:
          full program detail plus the pursuit panel, which is what the
          2026-08-15 meeting meant by routing into Funding. */}
      <div className="or-opp__foot">
        <span
          className="or-opp__meta"
          style={{
            color: "var(--color-on-surface-variant)",
            marginLeft: 8,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <DifficultyBars {...difficulty} />
          {difficulty.label}
          {odds ? ` · ${odds}` : ""}
        </span>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link className="or-btn or-btn--outline" href="/radar">
            <Icon name="notifications_active" size={18} aria-hidden />
            Monitor
          </Link>
          <Link
            className="or-btn or-btn--filled"
            href={`/opportunity/${encodeURIComponent(match.opportunityId)}`}
          >
            View details
            <Icon name="arrow_forward" size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;
