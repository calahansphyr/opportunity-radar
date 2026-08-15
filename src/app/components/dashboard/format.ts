// Dashboard-local formatters.
//
// Two rules from DESIGN-SPEC drive every function here:
//   - Rule 8, no invented numbers: a null date is "Rolling", never a guess.
//   - Dates are formatted from the yyyy-mm-dd STRING, never via `new Date()`.
//     Parsing an ISO date string yields UTC midnight, which renders as the
//     previous day west of Greenwich — and would differ between the server
//     render and the client hydration, which React reports as a mismatch.
//
// `today` is always passed in (from `localIsoDate()` on the server) for the
// same reason: `Date.now()` on both sides of a hydration boundary is a bug.

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/** "2026-10-15" -> "OCT 15". `null` -> "Rolling". */
export function fmtDay(iso: string | null): string {
  if (!iso) return "Rolling";
  const [, m, d] = iso.split("-");
  const month = MONTHS[Number(m) - 1];
  if (!month || !d) return iso;
  return `${month} ${Number(d)}`;
}

/** "2026-10-15" -> "Oct 15". `null` -> "Rolling". */
export function fmtDeadline(iso: string | null): string {
  const s = fmtDay(iso);
  if (s === "Rolling" || s === iso) return s;
  const [m, d] = s.split(" ");
  return `${m[0]}${m.slice(1).toLowerCase()} ${d}`;
}

/** Whole days from `today` to `iso`, both yyyy-mm-dd. `null` when rolling. */
export function daysBetween(today: string, iso: string | null): number | null {
  if (!iso) return null;
  const [fy, fm, fd] = today.split("-").map(Number);
  const [ty, tm, td] = iso.split("-").map(Number);
  return Math.round(
    (new Date(ty, tm - 1, td).getTime() - new Date(fy, fm - 1, fd).getTime()) / 86_400_000,
  );
}

/**
 * Short urgency chip for a deadline, or null when there is nothing urgent to
 * say. Red is rare (rule 2) — only the two-week window earns a chip.
 */
export function urgencyLabel(today: string, iso: string | null): string | null {
  const days = daysBetween(today, iso);
  if (days === null) return null;
  if (days < 0) return "CLOSED";
  if (days === 0) return "TODAY";
  if (days === 1) return "TOMORROW";
  if (days <= 14) return `IN ${days} DAYS`;
  return null;
}

/**
 * Split a prose field into bullets, one per sentence.
 *
 * `RankedMatch.whyFit` and its siblings are single strings, but the Dashboard
 * shows bullets: three short lines scan in about two seconds where three
 * paragraphs do not, and the Dashboard's job is triage. The fuller prose
 * belongs on the grant's own page.
 *
 * The lookahead requires a capital after the boundary, so "U.S. citizens" and
 * "SAM.gov registration" stay in one piece. `max` is a safety valve, not a
 * house style — the ranked copy is authored at 2-3 sentences a field, so
 * nothing is silently dropped in practice.
 *
 * The real fix is `RankedMatch` carrying `string[]`. That is a types.ts
 * change, so it is written up in NOTES-dashboard.md rather than made here.
 */
export function toBullets(text: string, max = 4): string[] {
  if (!text?.trim()) return [];
  return text
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+(?=[A-Z(])/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, max);
}

/**
 * Trim to a word boundary with an ellipsis. Federal titles run to 150+
 * characters ("NSF Small Business Innovation Research / Small Business
 * Technology Transfer Phase I, Phase II, Fast-Track Programs: A Pilot
 * Emphasis on Scientific Instrumentation"), which is eight wrapped lines in a
 * 3-column rail. Only ever used where the full title is one click away.
 */
export function elide(text: string, max = 52): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const boundary = cut.lastIndexOf(" ");
  return `${(boundary > max * 0.6 ? cut.slice(0, boundary) : cut).replace(/[\s,:;/-]+$/, "")}…`;
}

/** Initials for the dossier avatar. Falls back to the radar mark's "OR". */
export function initialsOf(name: string | null): string {
  if (!name) return "OR";
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "OR";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/** "Lehi, UT" / "UT" / null — never a placeholder. */
export function locationLabel(
  location: { city: string | null; state: string | null } | null,
): string | null {
  if (!location) return null;
  const { city, state } = location;
  if (city && state) return `${city}, ${state}`;
  return city ?? state ?? null;
}
