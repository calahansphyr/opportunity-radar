// Recreation of the AI Assistant drawer in design/claude-design/federal-catalyst.html.
const { IconButton, Icon, AlertCard, ChatComposer } = window.OpportunityRadarDesignSystem_3ee40b;

function AssistantDrawer({ open, onClose }) {
  const [draft, setDraft] = React.useState("");
  const [sent, setSent] = React.useState([]);
  if (!open) return null;
  const send = () => {
    if (!draft.trim()) return;
    setSent((s) => s.concat(draft.trim()));
    setDraft("");
  };
  return (
    <aside style={{
      position: "fixed", right: 0, top: 80, bottom: 0, width: 384, zIndex: 50,
      background: "var(--color-surface-container-lowest)", borderLeft: "1px solid var(--color-border-ice)",
      boxShadow: "var(--shadow-drawer)", display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 24, borderBottom: "1px solid var(--color-border-ice)" }}>
        <h2 style={{ margin: 0, font: "600 24px/32px var(--font-headline)", color: "var(--color-text-deep)" }}>Assistant</h2>
        <div style={{ display: "flex", gap: 4 }}>
          <IconButton icon="history" size={20} dense aria-label="History" />
          <IconButton icon="more_vert" size={20} dense aria-label="More" />
          <IconButton icon="close" size={20} dense onClick={onClose} aria-label="Close" />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <AlertCard tone="info" title="The Assistant has just been updated to help you better!" action="Permission settings">
          You may now opt-in to share specific project details for better matching.
        </AlertCard>
        {sent.map((m, i) => (
          <div key={i} style={{ alignSelf: "flex-end", maxWidth: "85%", background: "var(--color-primary-fixed)", color: "var(--color-on-primary-fixed)", borderRadius: "var(--radius-lg)", padding: "8px 12px", font: "400 14px/20px var(--font-body)" }}>
            {m}
          </div>
        ))}
        <div style={{ marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <h3 style={{ margin: 0, font: "500 18px/28px var(--font-body)", color: "var(--color-text-deep)" }}>How can I assist you?</h3>
            <Icon name="auto_awesome" size={20} color="var(--color-primary)" />
          </div>
          <p style={{ margin: "0 0 8px", font: "500 12px/14px var(--font-label)", letterSpacing: ".05em", textTransform: "uppercase", color: "var(--color-outline)" }}>Suggestions</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Grant Eligibility", "SAM.gov Status", "Match Reasoning"].map((s) => (
              <button key={s} type="button" onClick={() => setDraft(s)}
                style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: 8, border: 0, background: "none", cursor: "pointer", borderRadius: "var(--radius-default)", font: "400 14px/20px var(--font-body)", color: "var(--color-text-deep)" }}>
                <Icon name="description" size={18} color="var(--color-outline)" /> {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ padding: 16, borderTop: "1px solid var(--color-border-ice)", background: "var(--color-background)" }}>
        <ChatComposer value={draft} onChange={setDraft} onSend={send} />
      </div>
    </aside>
  );
}

Object.assign(window, { AssistantDrawer });
