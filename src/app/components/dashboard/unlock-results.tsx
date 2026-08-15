// Region: Unlock Results — the right rail's canonical top card.
//
// No "use client" directive despite the hook below: its only consumer is
// dashboard-view.tsx, which is already a client component, so this file is
// in the client graph either way. Adding the directive would make it a client
// ENTRY, and its `onAnswer` callback would then have to cross a serialization
// boundary it never actually crosses.
//
// Anatomy from screen-opportunity-map.jsx (UnlockResults): heading with the
// key glyph, one sentence of why, OptionCard choices, block CTA. The card is
// tinted (`.app-ask`) because it is the one card on the page that ASKS rather
// than reports.
//
// Every number is the meter's own: `unlockUsd` and `opportunityCount` come
// from `EligibilityMeter.unlocks`, which the engine computes by greedy
// attribution over gated opportunities. Nothing here estimates anything.
//
// Saving is NOT decorative. The answer is lifted to dashboard-view.tsx and
// merged into the profile, so the dossier's matching row flips from a red
// pulsing "Unknown" to the answer, the completeness meter climbs, and this
// card advances to the next open question. What it deliberately does NOT do
// is move the meter's dollar totals: those need the gates re-run over every
// opportunity, which is engine work. Claiming a new total here would be
// exactly the invented number rule 8 forbids — so the card says where the
// real total comes from instead.

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Icon, OptionCard, TextArea } from "@/app/components/ui";
import type { EligibilityMeter, GateField, InterviewQuestion } from "@/lib/types";
import { fmtUsd } from "../shared";

/** The choices an answer type offers, as OptionCard rows. */
function choicesFor(q: InterviewQuestion): { value: string; label: string; hint?: string }[] | null {
  if (q.answerType === "boolean") {
    return [
      {
        value: "yes",
        label: "Yes",
        hint: q.field === "majorityUsOwned" ? "Standard SBIR eligibility" : undefined,
      },
      {
        value: "no",
        label: "No",
        hint: q.field === "majorityUsOwned" ? "Restricts some agencies" : undefined,
      },
    ];
  }
  if (q.answerType === "choice" && q.choices?.length) {
    return q.choices.map((c) => ({ value: c, label: c }));
  }
  return null;
}

/** Keyed by question field, so a new question always starts empty. */
function AskForm({
  question,
  onSave,
}: {
  question: InterviewQuestion;
  onSave: (value: string) => void;
}) {
  const [answer, setAnswer] = useState("");
  const options = choicesFor(question);

  return (
    <>
      <p
        style={{
          margin: "0 0 16px",
          font: "500 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
          color: "var(--color-text-deep)",
        }}
      >
        {question.question}
      </p>

      {options ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {options.map((o) => (
            <OptionCard
              key={o.value}
              name={`unlock-${question.field}`}
              label={o.label}
              hint={o.hint}
              checked={answer === o.value}
              onChange={() => setAnswer(o.value)}
            />
          ))}
        </div>
      ) : (
        <TextArea
          rows={2}
          inputMode={question.answerType === "number" ? "numeric" : undefined}
          aria-label={question.question}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <Button
        variant="tonal"
        block
        disabled={!answer.trim()}
        onClick={() => onSave(answer)}
        style={{ marginTop: 24 }}
      >
        Save Details
      </Button>
    </>
  );
}

export default function UnlockResults({
  meter,
  questions,
  answered,
  onAnswer,
}: {
  meter: EligibilityMeter;
  questions: InterviewQuestion[];
  /** Fields the founder has already answered this session. */
  answered: GateField[];
  onAnswer: (field: GateField, value: string) => void;
}) {
  const open = questions.filter((q) => !answered.includes(q.field));
  const question = open[0] ?? null;
  const unlock = question ? (meter.unlocks.find((u) => u.field === question.field) ?? null) : null;

  if (!question) {
    return (
      <Card className="app-ask">
        <h4 style={headingStyle}>
          <Icon name="key" color="var(--color-primary)" aria-hidden /> Unlock Results
        </h4>
        <p style={ledeStyle}>
          Nothing is waiting on you — every eligibility gate we can test now has an answer. Re-run
          the scan to score the programs that were held back.
        </p>
        <Link className="or-btn or-btn--tonal or-btn--block" href="/analyze">
          Re-run scan
          <Icon name="arrow_forward" size={18} aria-hidden />
        </Link>
      </Card>
    );
  }

  return (
    <Card className="app-ask">
      <h4 style={headingStyle}>
        <Icon name="key" color="var(--color-primary)" aria-hidden /> Unlock Results
      </h4>
      <p style={ledeStyle}>
        {unlock && unlock.unlockUsd > 0
          ? `Answer this to unlock ${fmtUsd(unlock.unlockUsd)} across ${unlock.opportunityCount} ` +
            `${unlock.opportunityCount === 1 ? "program" : "programs"}.`
          : question.whyAsking}
      </p>

      <AskForm
        key={question.field}
        question={question}
        onSave={(value) => onAnswer(question.field, value)}
      />

      <p className="app-label" style={{ display: "block", marginTop: 16 }}>
        {answered.length > 0 ? `${answered.length} answered · ` : ""}
        {open.length - 1 > 0
          ? `${open.length - 1} more after this`
          : "Last question"}
      </p>
    </Card>
  );
}

const headingStyle = {
  margin: "0 0 8px",
  font: "600 var(--text-headline-md-size)/var(--text-headline-md-line) var(--font-headline)",
  color: "var(--color-text-deep)",
  display: "flex",
  alignItems: "center",
  gap: 8,
} as const;

const ledeStyle = {
  margin: "0 0 16px",
  font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
  color: "var(--color-on-surface-variant)",
} as const;
