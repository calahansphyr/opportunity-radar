import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "../components/ui";

// Placeholder. Utah Resources is one of the five approved nav destinations
// (2026-08-15 meeting) but is explicitly out of scope for the Dashboard
// build, and it is Josh's page rather than this branch's. A stub beats a 404
// from the primary nav; it states plainly that nothing is built here yet
// rather than mocking up content that does not exist.

export const metadata: Metadata = { title: "Utah Resources" };

export default function UtahPage() {
  return (
    <main className="app-page">
      <Card>
        <h1 className="app-h3" style={{ marginBottom: 8 }}>
          Utah Resources
        </h1>
        <p
          style={{
            margin: "0 0 16px",
            maxWidth: 640,
            font: "400 var(--text-body-sm-size)/var(--text-body-sm-line) var(--font-body)",
            color: "var(--color-on-surface-variant)",
          }}
        >
          Not built yet. Utah state programs are already ingested and searchable — 25 of them are
          in the database and they show up in your matches. This page will collect them in one
          place, alongside GOED and Utah Innovation Fund contacts.
        </p>
        <Link className="or-btn or-btn--outline" href="/">
          Back to Dashboard
        </Link>
      </Card>
    </main>
  );
}
