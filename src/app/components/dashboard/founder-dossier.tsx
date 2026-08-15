"use client";

// Region: the founder dossier — left rail, top card.
//
// Anatomy from design/claude-design/kit-source/screen-opportunity-map.jsx
// (FounderProfile): centred initials avatar, name, location eyebrow,
// KeyValueRow stack with a red ping on the unknown that is blocking money.
// The completeness meter moves to the FOOT of the card (kit addition
// `.or-meter`) — the kit pinned a 4px ProgressBar to the top edge, where it
// reads as card trim rather than as data.
//
// The four fact rows are the mock's four: Industry, ARR, Raised, Ownership.
// Raised earns its place — a $2.5M venture raise is the fact the whole SBIR
// ownership question hangs on.
//
// CONFIDENCE BADGE: derived from `profileCompleteness` for now, which is a
// stand-in. It is meant to be the AI agent's own read on how much it trusts
// this profile, and there is no field for that yet — adding one is a
// types.ts change, so it is written up in NOTES-dashboard.md rather than
// made here. `confidence()` below is the single place to re-point when the
// agent supplies it.
//
// The unknown rows are BUTTONS. They pulse red to say "this is blocking
// money", which is an invitation to click, and a pulse that does nothing when
// you click it is a broken promise — they scroll to the card that asks.

import { Avatar, Badge, Card, KeyValueRow } from "@/app/components/ui";
import type { CompanyProfile } from "@/lib/types";
import { profileCompleteness } from "@/lib/monitor/completeness";
import { fmtUsd } from "../shared";
import { initialsOf, locationLabel } from "./format";

/** The mock's four facts — the ones the matches below actually turn on. */
function rows(p: CompanyProfile): { label: string; value: string; unknown: boolean }[] {
  return [
    { label: "Industry", value: p.industry ?? "Unknown", unknown: p.industry == null },
    { label: "ARR", value: fmtUsd(p.annualRevenueUsd), unknown: p.annualRevenueUsd == null },
    { label: "Raised", value: fmtUsd(p.capitalRaisedUsd), unknown: p.capitalRaisedUsd == null },
    {
      label: "Ownership",
      value:
        p.majorityUsOwned == null ? "Unknown" : p.majorityUsOwned ? ">50% US" : "Not majority US",
      unknown: p.majorityUsOwned == null,
    },
  ];
}

/**
 * How much the agent trusts this profile. STAND-IN: derived from profile
 * completeness until the agent emits its own confidence — see the file
 * header. Re-point this one function, not the component.
 */
function confidence(score: number): { label: string; tone: "fit" | "caution" | "danger" } {
  if (score >= 0.85) return { label: "Confidence: High", tone: "fit" };
  if (score >= 0.6) return { label: "Confidence: Medium", tone: "caution" };
  return { label: "Confidence: Low", tone: "danger" };
}

function scrollToUnlock() {
  document.getElementById("unlock")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

export default function FounderDossier({
  profile,
  /** Marks the card as a sample so nobody mistakes it for their own data. */
  sample = false,
}: {
  profile: CompanyProfile;
  sample?: boolean;
}) {
  const completeness = profileCompleteness(profile);
  const pct = Math.round(completeness.score * 100);
  const conf = confidence(completeness.score);
  const facts = rows(profile);
  const unknowns = facts.filter((f) => f.unknown);
  const place = locationLabel(profile.location);

  // Name what is missing rather than restating the percentage in words.
  const note = completeness.missing.length
    ? `Still needed before we can monitor for you: ${completeness.missing.join(", ")}.`
    : unknowns.length
      ? `${facts.length - unknowns.length} of ${facts.length} key facts answered. ` +
        `${unknowns.map((u) => u.label).join(" and ")} ${unknowns.length === 1 ? "is" : "are"} ` +
        `still blocking programs below.`
      : "Every fact we need is answered.";

  return (
    <Card
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Avatar
        initials={initialsOf(profile.name)}
        size="lg"
        style={{ marginBottom: 12, marginTop: 4 }}
      />
      <h3
        style={{
          margin: "0 0 4px",
          font: "600 var(--text-headline-md-size)/var(--text-headline-md-line) var(--font-headline)",
          color: "var(--color-text-deep)",
        }}
      >
        {profile.name ?? "Your company"}
      </h3>
      {place ? (
        <span className="app-label" style={{ textTransform: "uppercase", marginBottom: 16 }}>
          {place}
        </span>
      ) : null}

      <Badge
        tone={conf.tone}
        icon="info"
        style={{ width: "100%", justifyContent: "center", marginBottom: sample ? 12 : 24 }}
      >
        {conf.label}
      </Badge>

      {sample ? (
        <a className="app-sample" href="/analyze">
          Sample report · analyze your company
        </a>
      ) : null}

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        {facts.map((f) =>
          f.unknown ? (
            <button key={f.label} type="button" className="app-kv-button" onClick={scrollToUnlock}>
              <KeyValueRow label={f.label} value={f.value} tone="danger" pulse />
            </button>
          ) : (
            <KeyValueRow key={f.label} label={f.label} value={f.value} />
          ),
        )}
      </div>

      <div className="or-meter">
        <div className="or-meter__head">
          <span className="or-meter__label">PROFILE COMPLETE</span>
          <span className="or-meter__value">{pct}%</span>
        </div>
        <div
          className="or-meter__track"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Profile complete"
        >
          <div className="or-meter__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="or-meter__note">{note}</p>
      </div>
    </Card>
  );
}
