// Recreation of design/claude-design/pursuit-workspace.html.
const {
  Card, Badge, Button, Icon, IconButton, StatTile, Breadcrumb,
  SideNavBar, StepProgress, Timeline, TaskRow, AlertCard, SuggestionCard,
} = window.OpportunityRadarDesignSystem_3ee40b;

const TASKS = [
  { title: "Draft Specific Aims", detail: "Create 1-2 page outline", due: "SEP 02", state: "done", assignee: "AK" },
  { title: "Define pilot outcomes", detail: "Measurable success criteria", due: "SEP 05", state: "current", urgent: true, assignee: "AK" },
  { title: "Write commercialization plan", detail: "Path to market strategy", due: "SEP 09", state: "todo", assignee: "AK" },
];

function EditorPanel() {
  return (
    <Card flush style={{ display: "flex", flexDirection: "column", minHeight: 500 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12, padding: 12, borderBottom: "1px solid var(--color-border-ice)", background: "var(--color-surface-glass)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="description" color="var(--color-primary)" />
          <span style={{ font: "500 16px/24px var(--font-body)", color: "var(--color-text-deep)" }}>Specific Aims — working draft</span>
          <span style={{ font: "500 12px/14px var(--font-label)", letterSpacing: ".05em", color: "var(--color-outline)", marginLeft: 8 }}>Saved 2 min ago</span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          <IconButton icon="share" size={16} dense aria-label="Share" />
          <IconButton icon="history" size={16} dense aria-label="History" />
          <IconButton icon="open_in_full" size={16} dense aria-label="Expand" />
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: 8, borderBottom: "1px solid var(--color-border-ice)", background: "rgba(247,249,251,.5)" }}>
        <select className="or-composer__model" style={{ border: 0, background: "none", font: "400 14px/20px var(--font-body)", color: "var(--color-text-deep)" }}><option>Normal</option></select>
        <div style={{ width: 1, height: 16, background: "var(--color-outline-variant)" }} />
        <select className="or-composer__model" style={{ border: 0, background: "none", font: "400 14px/20px var(--font-body)", color: "var(--color-text-deep)" }}><option>Inter</option></select>
        <div style={{ width: 1, height: 16, background: "var(--color-outline-variant)" }} />
        <IconButton icon="format_bold" size={16} dense aria-label="Bold" />
        <IconButton icon="format_italic" size={16} dense aria-label="Italic" />
        <IconButton icon="format_underlined" size={16} dense aria-label="Underline" />
        <div style={{ width: 1, height: 16, background: "var(--color-outline-variant)" }} />
        <IconButton icon="format_list_bulleted" size={16} dense aria-label="Bulleted list" />
        <IconButton icon="format_list_numbered" size={16} dense aria-label="Numbered list" />
      </div>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, padding: 24, font: "400 16px/26px var(--font-body)", color: "var(--color-text-deep)" }}>
          <p style={{ fontWeight: 700, margin: "0 0 8px" }}>1. Aim 1: Develop and validate an AI-powered clinical decision support tool</p>
          <p style={{ margin: "0 0 24px" }}>
            We will design, build, and validate an AI-powered decision support tool that analyzes EHR data to identify high-risk inpatients at risk of clinical deterioration. We will use retrospective data from{" "}
            <span style={{ background: "rgba(126,212,253,.3)", borderBottom: "1px solid var(--color-secondary-container)", padding: "0 2px", cursor: "pointer" }} title="AI Suggestion: Clarify exact sample size origin.">~10,000 encounters</span>{" "}
            and validate performance prospectively.
          </p>
          <p style={{ fontWeight: 700, margin: "0 0 8px" }}>2. Aim 2: Conduct a hospital pilot to improve early intervention</p>
          <p style={{ margin: "0 0 24px" }}>
            We will implement the tool in a real-world hospital setting and test whether it improves early detection and intervention. Success will be measured using{" "}
            <span style={{ background: "rgba(3,105,161,.2)", borderBottom: "2px solid var(--color-primary)", padding: "0 2px", cursor: "pointer" }}>predefined clinical outcomes.</span>
          </p>
          <p style={{ fontWeight: 700, margin: "0 0 8px" }}>3. Aim 3: Prepare for commercialization and broader implementation</p>
          <p style={{ margin: 0 }}>We will develop a commercialization plan, engage partners, and lay the groundwork for a future Phase II study and market adoption.</p>
        </div>
        <div style={{ width: 288, flex: "none", borderLeft: "1px solid var(--color-border-ice)", background: "rgba(247,249,251,.3)", padding: 16, overflowY: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, font: "700 14px/16px var(--font-label)", letterSpacing: ".05em", color: "var(--color-primary)" }}>
            <Icon name="auto_awesome" size={16} /> AI Suggestions (3)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SuggestionCard accent title="Strengthen measurable outcomes">
              Define specific, quantifiable pilot outcomes and targets. E.g., "Reduce 30-day unplanned readmissions by 15%".
            </SuggestionCard>
            <SuggestionCard title="Clarify sample size source">
              Specify the specific hospital network or database providing the 10,000 encounters.
            </SuggestionCard>
          </div>
        </div>
      </div>
    </Card>
  );
}

function PursuitWorkspaceScreen() {
  const [tasks, setTasks] = React.useState(TASKS);
  const [section, setSection] = React.useState("Active Grants");
  const done = tasks.filter((t) => t.state === "done").length;
  const toggle = (i) =>
    setTasks((ts) => ts.map((t, j) => (j === i ? { ...t, state: t.state === "done" ? "todo" : "done" } : t)));
  return (
    <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
      <SideNavBar
        name="Agent Catalyst" role="Federal Funding Lead" initials="AC"
        activeItem={section} onSelect={setSection} cta="New Application"
        items={[
          { label: "Dashboard", icon: "dashboard" },
          { label: "Active Grants", icon: "assignment" },
          { label: "Compliance", icon: "verified_user" },
          { label: "Reports", icon: "analytics" },
        ]}
        footerItems={[
          { label: "Settings", icon: "settings" },
          { label: "Support", icon: "help" },
          { label: "Logout", icon: "logout", tone: "danger" },
        ]}
      />
      <main style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Breadcrumb items={[section, "NSF SBIR Phase I"]} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <h2 style={{ margin: 0, font: "700 32px/40px var(--font-headline)", letterSpacing: "-0.01em", color: "var(--color-text-deep)" }}>
              NSF SBIR Phase I Workspace
            </h2>
            <Button variant="glass" pill icon="open_in_new">Review official notice</Button>
          </div>
        </div>
        <Card variant="glass" style={{ display: "flex", gap: 48, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ font: "700 24px/32px var(--font-headline)", color: "var(--color-primary)" }}>{34 + done * 8}% ready</span>
              <Badge tone="neutral">Target: Oct 16</Badge>
            </div>
            <StepProgress steps={["Eligibility", "Narrative", "Budget", "Review", "Submit"]} current={1} percent={34 + done * 8} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, borderLeft: "1px solid var(--color-border-ice)", paddingLeft: 48 }}>
            <StatTile icon="check_circle" iconColor="var(--color-secondary)" label="Fit Score" value="Strong (82)" />
            <StatTile icon="account_balance" label="Funding" value="Up to $314K" />
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Card variant="glass" flush>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottom: "1px solid var(--color-border-ice)", background: "rgba(255,255,255,.5)" }}>
                <h3 style={{ margin: 0, font: "600 16px/24px var(--font-headline)", color: "var(--color-text-deep)" }}>Narrative Tasks</h3>
                <Button variant="text" size="sm" icon="add">Add Task</Button>
              </div>
              {tasks.map((t, i) => (
                <TaskRow key={t.title} {...t} onClick={() => toggle(i)} style={{ cursor: "pointer" }} />
              ))}
            </Card>
            <EditorPanel />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <AlertCard title="SAM.gov status unconfirmed" action="Verify now">
              Active registration is required at time of submission. Confirm or update before <strong style={{ color: "var(--color-error)" }}>Oct 02</strong>.
            </AlertCard>
            <Card variant="glass">
              <h3 style={{ margin: "0 0 20px", paddingBottom: 8, borderBottom: "1px solid var(--color-border-ice)", font: "600 16px/24px var(--font-headline)", color: "var(--color-text-deep)" }}>
                Deadline Timeline
              </h3>
              <Timeline items={[
                { date: "AUG 14", title: "Pursuit created", state: "done" },
                { date: "AUG 20", title: "Eligibility complete", state: "done" },
                { date: "SEP 05", title: "Pilot outcomes due", state: "current", badge: "IN 3 DAYS" },
                { date: "SEP 12", title: "First full draft due" },
                { date: "OCT 16", title: "Submit application", detail: "by 5:00 PM ET" },
              ]} />
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

Object.assign(window, { PursuitWorkspaceScreen });
