import type { Metadata } from "next";
import OpportunityMap from "../opportunity-map";

// The original mission-control orchestrator, preserved at its own route.
//
// It is NOT the layout target — the Dashboard at `/` is — but it is the only
// working intake -> SSE -> report flow in the app: it owns the stream reader,
// profile persistence, quick-reply fetching and the spotlight contract (see
// NOTES-ui.md). The next phase lifts that stream logic across to the
// Dashboard, at which point this route can retire. Deleting it first would
// throw away the only thing that talks to /api/analyze.
//
// The component file stays at src/app/opportunity-map.tsx so its relative
// imports (./components/*, ./voice-panel, ./save-monitor) keep resolving.

export const metadata: Metadata = {
  title: "Analyze",
  description: "Describe your company and run a live funding scan.",
};

export default function AnalyzePage() {
  return <OpportunityMap />;
}
