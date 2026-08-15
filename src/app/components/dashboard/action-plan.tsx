"use client";

// Region: Action Plan — left rail, under the dossier.
//
// The work the founder has to do, worked backward from the top match's close
// date by `buildTimeline()` (deterministic, no LLM, safe to import client-side).
//
// ONE completion control: a square checkbox on every row. The kit ships three
// shapes for one idea — `.or-task__box` for todo, `.or-task__radio` for
// current, a cyan check glyph for done — so "current" is expressed by the row
// instead (spine + tint, `.or-task--current`), and the box is the only control.
// Completed work collapses into a counted group rather than accumulating in
// the active list.
//
// Completion is local UI state. There is no task-persistence contract on
// `MatchReport`, and inventing one here would be a type change — which
// CLAUDE.md routes to NOTES-<module>.md, not to a component.

import { useState } from "react";
import { Button, Card, Icon } from "@/app/components/ui";
import type { TimelineStep } from "@/lib/engine/timeline";
import { fmtDay } from "./format";

function TaskRow({
  step,
  done,
  current,
  onToggle,
}: {
  step: TimelineStep;
  done: boolean;
  current: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={`or-task${current && !done ? " or-task--current" : ""}`}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <button
          type="button"
          className="app-check"
          role="checkbox"
          aria-checked={done}
          aria-label={`Mark "${step.title}" ${done ? "incomplete" : "complete"}`}
          onClick={onToggle}
        >
          <Icon name="check" size={14} aria-hidden />
        </button>
        <div>
          <p className={`or-task__title${done ? " or-task__title--done" : ""}`}>{step.title}</p>
          {!done ? <p className="or-task__detail">{step.detail}</p> : null}
        </div>
      </div>
      <span className={`or-task__due${step.urgent && !done ? " or-task__due--urgent" : ""}`}>
        {fmtDay(step.due)}
      </span>
    </div>
  );
}

export default function ActionPlan({ steps }: { steps: TimelineStep[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [showDone, setShowDone] = useState(false);
  const [own, setOwn] = useState<TimelineStep[]>([]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");

  const toggle = (title: string) => setDone((d) => ({ ...d, [title]: !d[title] }));

  const addTask = () => {
    const title = draft.trim();
    // A generated plan can't know everything the founder has to do. Their own
    // tasks carry no due date rather than a guessed one.
    if (!title || steps.some((s) => s.title === title) || own.some((s) => s.title === title)) return;
    setOwn((o) => o.concat({ title, detail: "Added by you", due: null, urgent: false }));
    setDraft("");
    setAdding(false);
  };

  const all = steps.concat(own);
  const active = all.filter((s) => !done[s.title]);
  const completed = all.filter((s) => done[s.title]);
  // The soonest unfinished step is the one in play.
  const currentTitle = active[0]?.title;

  return (
    <Card flush>
      <div className="or-card__head">
        Action Plan
        <Button variant="text" size="sm" icon="add" onClick={() => setAdding((v) => !v)}>
          Add task
        </Button>
      </div>

      {adding ? (
        <div className="or-card__body" style={{ display: "flex", gap: 8 }}>
          <input
            className="or-field"
            autoFocus
            placeholder="What else do you have to do?"
            aria-label="New task"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
              if (e.key === "Escape") setAdding(false);
            }}
          />
          <Button variant="tonal" size="sm" disabled={!draft.trim()} onClick={addTask}>
            Add
          </Button>
        </div>
      ) : null}

      {active.length === 0 && completed.length === 0 ? (
        <p className="or-card__body or-task__detail" style={{ margin: 0 }}>
          No steps yet — the plan is built from your top match&apos;s deadline.
        </p>
      ) : null}

      {active.map((s) => (
        <TaskRow
          key={s.title}
          step={s}
          done={false}
          current={s.title === currentTitle}
          onToggle={() => toggle(s.title)}
        />
      ))}

      {completed.length > 0 ? (
        <>
          <button
            type="button"
            className="app-donehead"
            aria-expanded={showDone}
            aria-controls="action-plan-done"
            onClick={() => setShowDone((v) => !v)}
          >
            Completed ({completed.length})
            <Icon name="expand_more" size={18} className="app-opp__chev" aria-hidden />
          </button>
          <div id="action-plan-done" hidden={!showDone}>
            {completed.map((s) => (
              <TaskRow
                key={s.title}
                step={s}
                done
                current={false}
                onToggle={() => toggle(s.title)}
              />
            ))}
          </div>
        </>
      ) : null}
    </Card>
  );
}
