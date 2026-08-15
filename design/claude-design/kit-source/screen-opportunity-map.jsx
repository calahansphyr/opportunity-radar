// Recreation of design/claude-design/federal-catalyst.html — the Opportunity Map.
const {
  Card, Badge, Button, Icon, Avatar, KeyValueRow, ProgressBar,
  Timeline, OptionCard, OpportunityCard,
} = window.OpportunityRadarDesignSystem_3ee40b;

function SectionLabel({ children }) {
  return (
    <span style={{ font: "500 12px/14px var(--font-label)", letterSpacing: ".05em", color: "var(--color-outline)" }}>
      {children}
    </span>
  );
}

function FounderProfile() {
  return (
    <Card style={{ overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <ProgressBar value={75} top />
      <Avatar initials="NH" size="lg" style={{ marginBottom: 12, marginTop: 4 }} />
      <h3 style={{ margin: "0 0 4px", font: "600 24px/32px var(--font-headline)", color: "var(--color-text-deep)" }}>NuraHealth AI</h3>
      <span style={{ font: "500 12px/14px var(--font-label)", letterSpacing: ".05em", textTransform: "uppercase", color: "var(--color-outline)", marginBottom: 12 }}>Utah, USA</span>
      <Badge tone="caution" icon="info" style={{ width: "100%", justifyContent: "center", marginBottom: 24 }}>Confidence: Medium</Badge>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <KeyValueRow label="Industry" value="Healthcare IT" />
        <KeyValueRow label="ARR" value="$1M" />
        <KeyValueRow label="Raised" value="$2.5M" />
        <KeyValueRow label="Ownership" value="Unknown" tone="danger" pulse />
      </div>
    </Card>
  );
}

function ActionPlan() {
  return (
    <Card>
      <h4 style={{ margin: "0 0 24px", font: "600 20px/28px var(--font-headline)", color: "var(--color-text-deep)" }}>Action Plan</h4>
      <Timeline
        items={[
          { date: "This Week (Sep 1-7)", title: "Project Pitch", detail: "Submit 3-page NSF Project Pitch to get invited to full proposal.", state: "current" },
          { date: "Mid-September", title: "SAM.gov Registration", detail: "Check UEI status and ensure CAGE code is active." },
          { date: "October 15", title: "Full Proposal Deadline", detail: "Submit via Research.gov." },
        ]}
      />
    </Card>
  );
}

function UnlockResults({ ownership, setOwnership, onSave, saved }) {
  return (
    <Card style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0, padding: 16, opacity: 0.1, pointerEvents: "none" }}>
        <Icon name="lock_open" size={64} />
      </div>
      <h4 style={{ margin: "0 0 8px", font: "600 20px/28px var(--font-headline)", color: "var(--color-text-deep)", display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="key" color="var(--color-primary)" /> Unlock Results
      </h4>
      <p style={{ margin: "0 0 24px", font: "400 14px/20px var(--font-body)", color: "var(--color-on-surface-variant)" }}>
        Clarify ownership to reveal 14 hidden opportunities and confirm SBIR eligibility.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <OptionCard name="ownership" label=">50% Individual/Founder Owned" hint="Standard SBIR eligibility"
          checked={ownership === "individual"} onChange={() => setOwnership("individual")} />
        <OptionCard name="ownership" label=">50% VC/PE Owned" hint="Restricts some agencies"
          checked={ownership === "vc"} onChange={() => setOwnership("vc")} />
      </div>
      <Button variant="tonal" block onClick={onSave} disabled={!ownership} style={{ marginTop: 24 }}>
        {saved ? "Saved" : "Save Details"}
      </Button>
    </Card>
  );
}

function OpportunityMapScreen({ drawerOpen }) {
  const [ownership, setOwnership] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const [savedMatch, setSavedMatch] = React.useState(false);
  return (
    <main style={{ maxWidth: 1440, margin: "0 auto", padding: "48px var(--space-margin-desktop)", paddingRight: drawerOpen ? 420 : "var(--space-margin-desktop)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: 24, alignItems: "start" }}>
        <div style={{ gridColumn: "span 3", display: "flex", flexDirection: "column", gap: 24 }}>
          <FounderProfile />
          <ActionPlan />
        </div>
        <div style={{ gridColumn: "span 6", display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <h3 style={{ margin: 0, font: "600 24px/32px var(--font-headline)", color: "var(--color-text-deep)" }}>Top Matches</h3>
            <SectionLabel>{ownership && saved ? "1,703 live · 426 relevant awards" : "1,703 live · 412 relevant awards"}</SectionLabel>
          </div>
          <OpportunityCard
            title="NSF SBIR Phase I" amount="$275K" deadline="Oct 15" identifier="NSF-23-456"
            tier="fit" tierLabel="Likely fit"
            summary="Seed funding for deep-tech startups to conduct R&D on unproven, high-impact innovations."
            whyFit={[
              "Strong AI/Healthcare focus aligns with Digital Health topic.",
              "Revenue stage shows commercial viability potential.",
              "US-based small business requirement met.",
            ]}
            disqualifiers={[
              "Requires clear technical risk (not just software dev).",
              "VC funding limits (must be >50% individual owned). Verify Ownership.",
            ]}
            twin={{ name: "NuraHealth AI (Salt Lake City)", detail: 'Received $256K in 2022 for "Natural Language Processing for Nursing Triage." They had similar ARR and team size at application.' }}
            prepTime="Estimated prep time: 120 hours"
            secondaryAction={savedMatch ? "Saved" : "Save for Later"}
            onSave={() => setSavedMatch(true)}
          />
          <Card variant="dashed">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                  <Badge tone="neutral">{ownership && saved ? "Eligibility confirmed" : "Held - Missing Data"}</Badge>
                  <SectionLabel>ID: NIH-R43</SectionLabel>
                </div>
                <h4 style={{ margin: 0, font: "600 18px/26px var(--font-headline)", color: "var(--color-text-deep)" }}>NIH SBIR (NINR)</h4>
                <p style={{ margin: "4px 0 0", maxWidth: 640, font: "400 14px/20px var(--font-body)", color: "var(--color-on-surface-variant)" }}>
                  National Institute of Nursing Research grants. Highly relevant, but we need ownership details to confirm eligibility against VC backing limits.
                </p>
              </div>
              <Button variant="text" iconAfter="edit">Resolve</Button>
            </div>
          </Card>
        </div>
        <div style={{ gridColumn: "span 3" }}>
          <UnlockResults ownership={ownership} setOwnership={setOwnership} saved={saved} onSave={() => setSaved(true)} />
        </div>
      </div>
    </main>
  );
}

Object.assign(window, { OpportunityMapScreen });
