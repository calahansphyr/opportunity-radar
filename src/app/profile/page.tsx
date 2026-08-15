import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "../components/ui";

// Placeholder. Profile is one of the five approved nav destinations
// (2026-08-15 meeting) and absorbed Screening, which was dropped as a page.
// It is out of scope for the Dashboard build; a stub beats a 404 from the
// primary nav. The dossier on the Dashboard already shows the same profile,
// and the Analyze page is where it is currently edited.

export const metadata: Metadata = { title: "Profile" };

export default function ProfilePage() {
  return (
    <main className="app-page">
      <Card>
        <h1 className="app-h3" style={{ marginBottom: 8 }}>
          Profile
        </h1>
        <p
          style={{
            margin: "0 0 16px",
            maxWidth: 640,
            font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          Not built yet. Your profile is persistent and editable throughout the product — for now
          the Dashboard&apos;s dossier shows it, and Analyze is where you change it. This page will
          become the single editable view, with the screening questions folded in.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <Link className="or-btn or-btn--outline" href="/">
            Back to Dashboard
          </Link>
          <Link className="or-btn or-btn--filled" href="/analyze">
            Edit on Analyze
          </Link>
        </div>
      </Card>
    </main>
  );
}
