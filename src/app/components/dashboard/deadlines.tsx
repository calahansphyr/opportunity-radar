// Region: Deadlines — right rail, under the ask card.
//
// CLOSE DATES ONLY. An earlier pass merged the prerequisite steps in here as
// well, which sounded reasonable and looked terrible: both rails are fed by
// the same `buildTimeline()` call, so the left column listed four items as
// tasks and the right column listed the same four as dates. The mock only
// looks like it mixes them because its content was hand-written.
//
// The split now reads as two different questions:
//   Action Plan — what do I have to DO?
//   Deadlines   — when do these programs CLOSE?
//
// Rule 8 in its sharpest form: `closeDate === null` means rolling or
// forecast. It renders "Rolling", it never renders a guessed date, and it
// sorts last rather than being dropped.

import { Card, Timeline } from "@/app/components/ui";
import type { TimelineItem } from "@/app/components/ui";
import type { Opportunity } from "@/lib/types";
import { daysBetween, elide, fmtDay, urgencyLabel } from "./format";

export default function Deadlines({
  opportunities,
  today,
}: {
  opportunities: Opportunity[];
  today: string;
}) {
  // Soonest first; rolling programs sort last because they bind nothing.
  const sorted = [...opportunities].sort((a, b) =>
    a.closeDate === null
      ? b.closeDate === null
        ? 0
        : 1
      : b.closeDate === null
        ? -1
        : a.closeDate.localeCompare(b.closeDate),
  );

  // Only the soonest binding date is "current" — one shout per region.
  const firstUpcoming = sorted.find((o) => {
    const d = daysBetween(today, o.closeDate);
    return d !== null && d >= 0;
  });

  const items: TimelineItem[] = sorted.map((o) => {
    const days = daysBetween(today, o.closeDate);
    const past = days !== null && days < 0;
    return {
      date: fmtDay(o.closeDate),
      title: elide(o.title),
      detail:
        o.closeDate === null
          ? `${o.agency}. No fixed close date — we won't invent one.`
          : o.agency,
      state: past ? "done" : o === firstUpcoming ? "current" : "todo",
      badge: urgencyLabel(today, o.closeDate) ?? undefined,
    };
  });

  return (
    <Card flush>
      <div className="or-card__head">Deadlines</div>
      <div className="or-card__body">
        {items.length ? (
          <Timeline items={items} />
        ) : (
          <p className="or-task__detail" style={{ margin: 0 }}>
            No dated deadlines yet.
          </p>
        )}
      </div>
    </Card>
  );
}
