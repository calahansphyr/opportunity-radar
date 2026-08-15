"use client";

// Region: the Assistant drawer — mounted app-wide, closed by default.
//
// Anatomy from design/claude-design/kit-source/screen-assistant-drawer.jsx:
// fixed 384px panel under the nav, header with history/more/close, scrolling
// body, ChatComposer pinned to the foot, suggestion rows above it.
//
// One deliberate change from the kit screen, which the mock also makes: the
// kit reserves 420px of main padding while the drawer is open, squeezing the
// grid and reflowing the whole page on every toggle. This floats OVER the
// content instead and slides in on `transform`, so the layout never moves.
//
// The kit screen returns null when closed. It stays mounted here so the slide
// transition has something to animate, with `inert` keeping the closed panel
// out of the tab order and the accessibility tree.

import { useEffect, useState } from "react";
import { AlertCard, Button, ChatComposer, Icon, IconButton } from "@/app/components/ui";
import type { QuickReply } from "../shared";

const FAB_ID = "assistant-fab";

/** Return focus to the control that opened the drawer. */
function focusFab() {
  document.getElementById(FAB_ID)?.focus();
}

export default function AssistantDrawer({ suggestions }: { suggestions: QuickReply[] }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sent, setSent] = useState<string[]>([]);

  const close = () => {
    setOpen(false);
    focusFab();
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setSent((s) => s.concat(text));
    setDraft("");
  };

  // Escape closes, and focus returns to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        focusFab();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <aside
        className="app-drawer"
        data-open={open}
        aria-label="Assistant"
        // `inert` is the whole subtree in one attribute: no focus, no AT.
        inert={!open}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 24,
            borderBottom: "1px solid var(--color-border-ice)",
          }}
        >
          <h2
            style={{
              margin: 0,
              font: "600 var(--text-headline-md-size)/var(--text-headline-md-line) var(--font-headline)",
              color: "var(--color-text-deep)",
            }}
          >
            Assistant
          </h2>
          <div style={{ display: "flex", gap: 4 }}>
            <IconButton icon="history" size={20} dense aria-label="History" />
            <IconButton icon="more_vert" size={20} dense aria-label="More" />
            <IconButton
              icon="close"
              size={20}
              dense
              aria-label="Close assistant"
              onClick={close}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <AlertCard tone="info" title="The assistant answers from your report, not the open web.">
            It can read your profile, your matches and the eligibility gates behind them.
          </AlertCard>

          {sent.map((m, i) => (
            <div key={`${i}-${m}`} style={{ display: "contents" }}>
              <div className="app-drawer__sent">{m}</div>
              {/* An echo with no answer reads as a bug. This says what is
                  actually true — the model backend has no credit on this
                  branch — and points at the control that CAN answer, rather
                  than inventing a reply. Replace with the /api/answer stream
                  when the backend is live. */}
              <div className="app-drawer__reply">
                <Icon name="cloud_off" size={16} color="var(--color-outline)" aria-hidden />
                <span>
                  Not connected yet — this branch has no model backend. The eligibility questions
                  in <strong>Unlock Results</strong> are answerable right now, and every match card
                  explains its own reasoning.
                </span>
              </div>
            </div>
          ))}

          <div style={{ marginTop: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <h3
                style={{
                  margin: 0,
                  font: "500 var(--text-body-lg-size)/var(--text-body-lg-line) var(--font-body)",
                  color: "var(--color-text-deep)",
                }}
              >
                How can I assist you?
              </h3>
              <Icon name="auto_awesome" size={20} color="var(--color-primary)" aria-hidden />
            </div>
            <p className="app-label" style={{ display: "block", margin: "0 0 8px" }}>
              SUGGESTIONS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className="app-drawer__suggestion"
                  onClick={() => setDraft(s.message)}
                >
                  <Icon name="description" size={18} color="var(--color-outline)" aria-hidden />
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            padding: 16,
            borderTop: "1px solid var(--color-border-ice)",
            background: "var(--color-background)",
          }}
        >
          <ChatComposer value={draft} onChange={setDraft} onSend={send} model="GPT 5.6 Sol" />
        </div>
      </aside>

      {/* Stays mounted while the drawer is open so focus has somewhere to
          return to. `.or-btn` is display:inline-flex, which beats the UA rule
          behind the `hidden` attribute — so it is hidden by style, not by
          attribute. The kit's Button does not forward a ref, hence the id. */}
      <Button
        id={FAB_ID}
        pill
        icon="auto_awesome"
        className="app-fab"
        style={open ? { display: "none" } : undefined}
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        Assistant
      </Button>
    </>
  );
}
