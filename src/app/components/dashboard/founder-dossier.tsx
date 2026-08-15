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
// Two deliberate departures from the kit screen, both about rule 5 (one
// shout per region) in a 3-column rail:
//
//   - The kit's "Confidence: Medium" badge is GONE. It was the completeness
//     score said a second time, in words, directly above the same score in
//     numerals. The meter states it once, exactly.
//   - Four fact rows, not six. The rail is ~280px wide; every extra row is
//     another thing competing with the number at the foot. The four kept are
//     the ones the matches below actually turn on.
//
// The unknown rows are BUTTONS. They pulse red to say "this is blocking
// money", which is an invitation to click, and a pulse that does nothing when
// you click it is a broken promise — they scroll to the card that asks.

import { Avatar, Card, KeyValueRow } from "@/app/components/ui";
import type { CompanyProfile } from "@/lib/types";
import { profileCompleteness } from "@/lib/monitor/completeness";
import { fmtUsd } from "../shared";
import { initialsOf, locationLabel } from "./format";

/** The four facts the matches below actually turn on. */
function rows(p: CompanyProfile): { label: string; value: string; unknown: boolean }[] {
  return [
    { label: "Industry", value: p.industry ?? "Unknown", unknown: p.industry == null },
    { label: "ARR", value: fmtUsd(p.annualRevenueUsd), unknown: p.annualRevenueUsd == null },
    {
      label: "Ownership",
      value:
        p.majorityUsOwned == null ? "Unknown" : p.majorityUsOwned ? ">50% US" : "Not majority US",
      unknown: p.majorityUsOwned == null,
    },
    {
      label: "SAM.gov",
      value:
        p.samRegistered == null ? "Unknown" : p.samRegistered ? "Registered" : "Not registered",
      unknown: p.samRegistered == null,
    },
  ];
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
