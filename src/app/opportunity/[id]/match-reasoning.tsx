// "Why this matched you" — the long-form home for match reasoning.
//
// The Dashboard shows the same four fields as BULLETS, because its job is
// triage and short lines scan. This page is where the founder has decided to
// look properly, so the reasoning renders as full prose, unabridged.
//
// Styled in this page's existing Tailwind idiom (`card`, `text-ink`, the
// bridge colours) rather than as a kit `.or-card`. The bridge resolves to kit
// tokens either way, and a lone kit card dropped into a page of `.card`
// sections reads as bolted on. When this page is rebuilt on the kit, this
// section comes with it.
//
// Nothing here is computed. The reasoning is exactly what the ranker wrote
// for THIS company against THIS opportunity, replayed.

import Link from "next/link";
import type { EvidenceSummary, RankedMatch } from "@/lib/types";
import { TIERS, fmtUsd } from "@/app/components/shared";

export interface ReasoningSource {
  match: RankedMatch;
  evidence: EvidenceSummary | null;
  profileName: string | null;
  createdAt: string | null;
  /** Where it came from — a completed report, or a started pursuit. */
  origin: "report" | "pursuit";
}

const FIELDS: { key: keyof RankedMatch; label: string; tone?: string }[] = [
  { key: "whyFit", label: "Why it fits" },
  { key: "whatCouldDisqualify", label: "What could disqualify", tone: "text-risk" },
  { key: "whatToVerify", label: "What to verify", tone: "text-warn" },
  { key: "nextSteps", label: "Next step" },
];

export default function MatchReasoning({ source }: { source: ReasoningSource | null }) {
  // No reasoning is a real state, not an error: this founder has never been
  // matched to this opportunity. Say so and offer the thing that fixes it,
  // rather than rendering an empty shell.
  if (!source) {
    return (
      <section id="opp-reasoning" className="card space-y-2 p-6">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
          WHY THIS MATCHED YOU
        </h2>
        <p className="text-sm leading-relaxed text-muted">
          You haven&apos;t been matched to this program yet, so there is nothing to explain. Run a
          scan and this fills in with the reasoning for your company specifically.
        </p>
        <Link
          href="/analyze"
          className="inline-block text-[13.5px] font-medium text-accent underline transition-colors hover:text-brand"
        >
          Run a scan →
        </Link>
      </section>
    );
  }

  const { match, evidence, profileName, createdAt, origin } = source;
  const tier = TIERS.find((t) => t.tier === match.tier);
  const twin = evidence?.similarAwards?.[0];

  return (
    <section id="opp-reasoning" className="card space-y-4 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.08em] text-faint">
          WHY THIS MATCHED {profileName ? profileName.toUpperCase() : "YOU"}
        </h2>
        <div className="flex items-center gap-2">
          {tier && (
            <span className={`rounded-full px-3 py-1 text-[12px] font-semibold ${tier.badge}`}>
              {tier.label}
            </span>
          )}
          <span className="tnum font-mono text-[12px] text-faint">{match.score}/100</span>
        </div>
      </div>

      <div className="space-y-4">
        {FIELDS.map(({ key, label, tone }) => {
          const text = match[key];
          if (typeof text !== "string" || !text.trim()) return null;
          return (
            <div key={key}>
              <h3
                className={`text-[11px] font-semibold uppercase tracking-[0.08em] ${tone ?? "text-brand"}`}
              >
                {label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/85">{text}</p>
            </div>
          );
        })}
      </div>

      {twin && (
        <div className="rounded-xl border border-twin-soft bg-bg p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-twin">
            Your funding twin
          </p>
          <p className="mt-1 text-[15px] font-medium text-ink">{twin.recipient}</p>
          <p className="mt-0.5 text-[13.5px] text-muted">
            Received <span className="tnum font-mono">{fmtUsd(twin.amountUsd)}</span> in {twin.year}
            {evidence?.totalAwards != null && (
              <>
                {" · "}
                <span className="tnum font-mono">{evidence.totalAwards}</span> awards on record
                {evidence.utahCount ? (
                  <>
                    {", "}
                    <span className="tnum font-mono">{evidence.utahCount}</span> in Utah
                  </>
                ) : null}
              </>
            )}
          </p>
        </div>
      )}

      {/* Provenance. Reasoning is only as current as the run that wrote it —
          say which run, so a stale explanation is visibly stale. */}
      <p className="border-t border-hairline pt-3 text-[12px] text-faint">
        {origin === "pursuit"
          ? "From the report you started this pursuit from."
          : "From your most recent scan."}
        {createdAt ? ` Scored ${createdAt.slice(0, 10)}.` : ""}{" "}
        <Link href="/" className="underline transition-colors hover:text-brand">
          Back to Dashboard
        </Link>
      </p>
    </section>
  );
}
