// ============================================================
// Match-reasoning storage: why a given opportunity matched a given
// company, kept so the reasoning survives the report that produced
// it. Owns its own table (CREATE IF NOT EXISTS) on top of the shared
// radar.db, mirroring monitor/db.ts and pursuit/db.ts.
//
// WHY THIS EXISTS: a MatchReport only lives as long as the client
// holding it. The Dashboard shows each match's reasoning as bullets
// for triage; the full prose belongs on the opportunity's own page,
// which is server-rendered and had no way to reach it. Two stores
// already held fragments — `pursuits.match_json` (only once a pursuit
// is started) and `notifications.why_fit` (only whyFit, only from the
// watcher) — but neither covers "I just got matched to this, tell me
// why" on an arbitrary opportunity page.
//
// Written by the SSE facade whenever a report completes, so every
// match a founder has actually seen is readable later, including
// from a shared link.
// ============================================================

import { getDb } from "../db";
import type { EvidenceSummary, MatchReport, RankedMatch } from "../types";

/** company_id for a session that has not saved a company profile yet. */
export const ANONYMOUS_COMPANY = 0;

export interface StoredReasoning {
  opportunityId: string;
  companyId: number;
  match: RankedMatch;
  evidence: EvidenceSummary | null;
  /** Company name at the time of the run — the reasoning is about THEM. */
  profileName: string | null;
  createdAt: string;
}

let ready = false;
function db() {
  const d = getDb();
  if (!ready) {
    d.exec(`
      CREATE TABLE IF NOT EXISTS match_reasoning (
        opportunity_id TEXT NOT NULL,
        company_id INTEGER NOT NULL DEFAULT 0,
        match_json TEXT NOT NULL,        -- RankedMatch JSON
        evidence_json TEXT,              -- EvidenceSummary JSON, when the run had it
        profile_name TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        PRIMARY KEY (opportunity_id, company_id)
      );
      CREATE INDEX IF NOT EXISTS idx_match_reasoning_opp
        ON match_reasoning (opportunity_id, created_at DESC);
    `);
    ready = true;
  }
  return d;
}

/**
 * Persist every match in a completed report. Re-running an analysis
 * replaces the previous reasoning for the same (opportunity, company):
 * the latest run is the one that reflects the current profile, and
 * keeping stale reasoning around would let the page contradict itself.
 *
 * Returns rows written. Never throws — losing reasoning must not fail
 * a founder's scan, so callers treat this as best-effort.
 */
export function saveReportReasoning(
  report: MatchReport,
  companyId: number = ANONYMOUS_COMPANY,
): number {
  if (!report.matches.length) return 0;
  try {
    const stmt = db().prepare(
      `INSERT OR REPLACE INTO match_reasoning
         (opportunity_id, company_id, match_json, evidence_json, profile_name, created_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))`,
    );
    const name = report.profile.name;
    const tx = db().transaction((matches: RankedMatch[]) => {
      for (const m of matches) {
        const ev = report.evidence?.[m.opportunityId];
        stmt.run(
          m.opportunityId,
          companyId,
          JSON.stringify(m),
          ev ? JSON.stringify(ev) : null,
          name,
        );
      }
    });
    tx(report.matches);
    return report.matches.length;
  } catch (err) {
    console.error("match reasoning not saved:", err);
    return 0;
  }
}

/**
 * Reasoning for one opportunity. Prefers the named company's own run;
 * otherwise the most recent run for that opportunity, which is what a
 * single-founder session (company_id 0) always is.
 */
export function getReasoning(
  opportunityId: string,
  companyId?: number,
): StoredReasoning | null {
  try {
    const row = (
      companyId != null
        ? db()
            .prepare(
              `SELECT * FROM match_reasoning WHERE opportunity_id = ? AND company_id = ?`,
            )
            .get(opportunityId, companyId)
        : db()
            .prepare(
              `SELECT * FROM match_reasoning WHERE opportunity_id = ?
               ORDER BY created_at DESC LIMIT 1`,
            )
            .get(opportunityId)
    ) as Record<string, unknown> | undefined;
    return row ? rowToReasoning(row) : null;
  } catch {
    // Table absent (cold DB) is a normal "no reasoning yet", not an error.
    return null;
  }
}

function rowToReasoning(r: Record<string, unknown>): StoredReasoning {
  return {
    opportunityId: r.opportunity_id as string,
    companyId: r.company_id as number,
    match: JSON.parse(r.match_json as string) as RankedMatch,
    evidence: r.evidence_json ? (JSON.parse(r.evidence_json as string) as EvidenceSummary) : null,
    profileName: (r.profile_name as string) ?? null,
    createdAt: r.created_at as string,
  };
}

/** Rows for one opportunity across companies — used by the seed script. */
export function countReasoning(): number {
  try {
    return (db().prepare(`SELECT COUNT(*) n FROM match_reasoning`).get() as { n: number }).n;
  } catch {
    return 0;
  }
}
