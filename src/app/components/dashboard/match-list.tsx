"use client";

// Region: the match list, plus the page header that controls it.
//
// The header sits ABOVE the 3/6/3 grid so all three columns start level —
// with the heading inside the centre column its first card sat ~48px below
// the rails. But the header's controls drive the list's state, so the state
// lives in `useMatchList()` here and both consumers receive it. dashboard-view
// .tsx is the one component that calls the hook and places the two pieces.
//
// Traditional list chrome: filter and sort collapse to glyphs and open their
// options on demand; a third button collapses or expands every card at once.
// One popover open at a time, dismissed by outside click or Escape.
//
// Cards start collapsed except the top match — paragraphs hidden by default,
// click to expand (team decision, 2026-08-15). Several may be open at once:
// founders compare, so a one-at-a-time accordion would fight the task.

import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge, Button, Card, IconButton } from "@/app/components/ui";
import type {
  CompanyProfile,
  FitTier,
  GatedOpportunity,
  Opportunity,
  RankedMatch,
} from "@/lib/types";
import { TIERS } from "../shared";
import type { UiReport } from "../shared";
import MatchCard from "./match-card";

type SortKey = "fit" | "deadline" | "amount";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "fit", label: "Best fit" },
  { key: "deadline", label: "Deadline soonest" },
  { key: "amount", label: "Largest award" },
];

export interface MatchListState {
  opportunities: Record<string, Opportunity>;
  /** Matches whose Opportunity row is present — the renderable set. */
  rows: RankedMatch[];
  sorted: RankedMatch[];
  held: GatedOpportunity[];
  tiersPresent: typeof TIERS;
  hidden: Set<FitTier>;
  toggleTier: (tier: FitTier) => void;
  sort: SortKey;
  setSort: (key: SortKey) => void;
  allOpen: boolean;
  toggleAll: () => void;
  expanded: Set<string>;
  toggleCard: (id: string) => void;
  openPop: string | null;
  setOpenPop: (id: string | null) => void;
  /** Gate-unknown entries — shown by default, filterable like a tier. */
  showHeld: boolean;
  setShowHeld: (show: boolean) => void;
  /** Hard-failed entries. Never shown by default; they are dead ends. */
  blocked: GatedOpportunity[];
  showBlocked: boolean;
  setShowBlocked: (show: boolean) => void;
}

export function useMatchList(report: UiReport): MatchListState {
  const opportunities = useMemo(() => report.opportunities ?? {}, [report.opportunities]);
  // A match whose row is missing cannot be rendered honestly — drop it rather
  // than invent a title. (Live, the facade always attaches the lookup.)
  const rows = useMemo(
    () => report.matches.filter((m) => opportunities[m.opportunityId]),
    [report.matches, opportunities],
  );

  const [hidden, setHidden] = useState<Set<FitTier>>(() => new Set());
  const [sort, setSort] = useState<SortKey>("fit");
  const [openPop, setOpenPop] = useState<string | null>(null);
  const [showHeld, setShowHeld] = useState(true);
  // Off by default: a hard-failed programme is a dead end, and the product's
  // honesty is in saying so on request rather than padding the list with it.
  const [showBlocked, setShowBlocked] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(rows.length ? [rows[0].opportunityId] : []),
  );

  // One popover at a time; outside click or Escape dismisses.
  useEffect(() => {
    const close = () => setOpenPop(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPop(null);
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const sorted = useMemo(() => {
    const visible = rows.filter((m) => !hidden.has(m.tier));
    return visible.sort((a, b) => {
      const oa = opportunities[a.opportunityId];
      const ob = opportunities[b.opportunityId];
      if (sort === "deadline") {
        // Rolling programs bind nothing, so they sort last.
        if (oa.closeDate === null) return ob.closeDate === null ? 0 : 1;
        if (ob.closeDate === null) return -1;
        return oa.closeDate.localeCompare(ob.closeDate);
      }
      if (sort === "amount") return (ob.awardCeilingUsd ?? 0) - (oa.awardCeilingUsd ?? 0);
      return b.score - a.score;
    });
  }, [rows, hidden, sort, opportunities]);

  const toggleCard = useCallback((id: string) => {
    setExpanded((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allOpen = sorted.length > 0 && sorted.every((m) => expanded.has(m.opportunityId));

  const toggleAll = useCallback(
    () => setExpanded(allOpen ? new Set() : new Set(sorted.map((m) => m.opportunityId))),
    [allOpen, sorted],
  );

  const toggleTier = useCallback(
    (tier: FitTier) =>
      setHidden((s) => {
        const next = new Set(s);
        if (next.has(tier)) next.delete(tier);
        else next.add(tier);
        return next;
      }),
    [],
  );

  return {
    opportunities,
    rows,
    sorted,
    // Entries the ranker could not score because a gate is unknown.
    held: report.rejected.filter((r) => r.verdict === "unknown"),
    showHeld,
    setShowHeld,
    // Entries that hard-failed a gate. Not a maybe — a no.
    blocked: report.rejected.filter((r) => r.verdict === "fail"),
    showBlocked,
    setShowBlocked,
    tiersPresent: TIERS.filter((t) => rows.some((m) => m.tier === t.tier)),
    hidden,
    toggleTier,
    sort,
    setSort,
    allOpen,
    toggleAll,
    expanded,
    toggleCard,
    openPop,
    setOpenPop,
  };
}

/* -------------------------------------------------------------------------- */

/** Popover that closes on outside click and Escape (see the hook's effect). */
function Popover({
  id,
  icon,
  label,
  title,
  children,
  open,
  onOpen,
}: {
  id: string;
  icon: string;
  label: string;
  title: string;
  children: React.ReactNode;
  open: boolean;
  onOpen: (open: boolean) => void;
}) {
  return (
    <div className="app-pop" onClick={(e) => e.stopPropagation()}>
      <IconButton
        icon={icon}
        aria-label={label}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        active={open}
        onClick={() => onOpen(!open)}
      />
      <div className="app-pop__menu" id={id} role="group" aria-label={title} hidden={!open}>
        <p className="app-pop__title">{title}</p>
        {children}
      </div>
    </div>
  );
}

export function MatchListHeader({
  state,
  liveCount,
}: {
  state: MatchListState;
  /** Programs currently monitored, counted in the DB. Null if ingest is cold. */
  liveCount: number | null;
}) {
  const {
    rows,
    held,
    blocked,
    tiersPresent,
    hidden,
    toggleTier,
    sort,
    setSort,
    allOpen,
    toggleAll,
    openPop,
    setOpenPop,
    showHeld,
    setShowHeld,
    showBlocked,
    setShowBlocked,
  } = state;

  return (
    <div className="app-pagehead">
      <h2 className="app-h3">Top Matches</h2>
      <div className="app-row" style={{ gap: 16 }}>
        <span className="app-label">
          {liveCount != null ? `${liveCount.toLocaleString("en-US")} live · ` : ""}
          {rows.length} relevant
          {held.length ? ` · ${held.length} held` : ""}
        </span>
        <div className="app-row" style={{ gap: 4 }}>
          <Popover
            id="match-filter"
            icon="filter_list"
            label="Filter matches"
            title="Show"
            open={openPop === "filter"}
            onOpen={(o) => setOpenPop(o ? "filter" : null)}
          >
            {tiersPresent.map((t) => (
              <label className="app-pop__row" key={t.tier}>
                <input
                  type="checkbox"
                  checked={!hidden.has(t.tier)}
                  onChange={() => toggleTier(t.tier)}
                />
                <span>{t.label}</span>
                <span className="app-num">{rows.filter((m) => m.tier === t.tier).length}</span>
              </label>
            ))}
            {held.length ? (
              <label className="app-pop__row">
                <input
                  type="checkbox"
                  checked={showHeld}
                  onChange={() => setShowHeld(!showHeld)}
                />
                <span>Held — missing data</span>
                <span className="app-num">{held.length}</span>
              </label>
            ) : null}
            {blocked.length ? (
              <label className="app-pop__row">
                <input
                  type="checkbox"
                  checked={showBlocked}
                  onChange={() => setShowBlocked(!showBlocked)}
                />
                <span>Blocked</span>
                <span className="app-num">{blocked.length}</span>
              </label>
            ) : null}
          </Popover>

          <Popover
            id="match-sort"
            icon="swap_vert"
            label="Sort matches"
            title="Order by"
            open={openPop === "sort"}
            onOpen={(o) => setOpenPop(o ? "sort" : null)}
          >
            {SORTS.map((s) => (
              <label className="app-pop__row" key={s.key}>
                <input
                  type="radio"
                  name="match-sort-order"
                  checked={sort === s.key}
                  onChange={() => setSort(s.key)}
                />
                <span>{s.label}</span>
              </label>
            ))}
          </Popover>

          <IconButton
            icon={allOpen ? "unfold_less" : "unfold_more"}
            aria-label={allOpen ? "Collapse all matches" : "Expand all matches"}
            title={allOpen ? "Collapse all" : "Expand all"}
            onClick={toggleAll}
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export default function MatchList({
  state,
  report,
  profile,
  today,
}: {
  state: MatchListState;
  report: UiReport;
  /** Live profile (report profile + this session's answers). */
  profile: CompanyProfile;
  today: string;
}) {
  const { sorted, rows, held, blocked, opportunities, expanded, toggleCard, showHeld, showBlocked } =
    state;

  return (
    <>
      {sorted.map((m) => (
        <MatchCard
          key={m.opportunityId}
          match={m}
          opportunity={opportunities[m.opportunityId]}
          profile={profile}
          evidence={report.evidence?.[m.opportunityId]}
          today={today}
          expanded={expanded.has(m.opportunityId)}
          onToggle={() => toggleCard(m.opportunityId)}
        />
      ))}

      {sorted.length === 0 ? (
        <Card variant="dashed">
          <p
            style={{
              margin: 0,
              font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
            }}
          >
            {rows.length === 0
              ? "No matches yet — run a scan from the Analyze page."
              : "Every tier is filtered out. Re-enable one from the filter menu."}
          </p>
        </Card>
      ) : null}

      {showHeld ? held.map((h) => <HeldCard key={h.opportunity.id} entry={h} />) : null}
      {showBlocked
        ? blocked.map((h) => <HeldCard key={h.opportunity.id} entry={h} blocked />)
        : null}
    </>
  );
}

/** An opportunity we refuse to rank, either because a gate is unknown (held —
 *  answerable, so it offers Resolve) or because one hard-failed (blocked — a
 *  no, and nothing to resolve). Saying so is the honest alternative to
 *  quietly dropping it, and the reason the right rail exists. */
function HeldCard({ entry, blocked = false }: { entry: GatedOpportunity; blocked?: boolean }) {
  const reason =
    entry.gates.find((g) => g.verdict === (blocked ? "fail" : "unknown"))?.detail ?? "";
  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
            <Badge tone={blocked ? "danger" : "caution"}>
              {blocked ? "Not eligible" : "Uncertain eligibility"}
            </Badge>
            <span className="app-label">
              {entry.opportunity.alnNumbers[0]
                ? `ALN ${entry.opportunity.alnNumbers[0]}`
                : entry.opportunity.id}
            </span>
          </div>
          <h4 style={{ margin: 0, font: "600 18px/26px var(--font-headline)", color: "var(--color-text-deep)" }}>
            {entry.opportunity.title}
          </h4>
          <p
            style={{
              margin: "4px 0 0",
              maxWidth: 640,
              font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
              color: "var(--color-on-surface-variant)",
            }}
          >
            {entry.opportunity.agency}. {reason}.
          </p>
        </div>
        {blocked ? null : (
          <Button
            variant="text"
            iconAfter="edit"
            onClick={() =>
              document.getElementById("unlock")?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          >
            Resolve
          </Button>
        )}
      </div>
    </Card>
  );
}
