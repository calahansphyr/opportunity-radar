"use client";

// Region: primary navigation — the kit's solid `.or-nav` bar.
//
// Five destinations, fixed at the 2026-08-15 team meeting: Dashboard ·
// Funding · Monitor · Utah Resources · Profile. Screening was dropped as a
// page (judged redundant with Profile). "Funding" is the Pursuit Workspace
// under its new name.
//
// The bar is SOLID, not glass — glass is workspace chrome. There is no side
// nav on this page: `SideNavBar` belongs to the workspace screen alone
// (design/claude-design/kit-source/screen-opportunity-map.jsx).
//
// The file keeps its old name and default export so every existing importer
// (layout.tsx) keeps working.

import { useRouter, usePathname } from "next/navigation";
import { TopNavBar } from "./ui";

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Dashboard" },
  { href: "/pursuits", label: "Funding" },
  { href: "/radar", label: "Monitor" },
  { href: "/utah", label: "Utah Resources" },
  { href: "/profile", label: "Profile" },
];

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  // Longest matching prefix wins, so "/" only claims the exact root.
  const active = LINKS.filter((l) =>
    l.href === "/" ? pathname === "/" : pathname === l.href || pathname.startsWith(`${l.href}/`),
  ).sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <TopNavBar
      brand="Opportunity Radar"
      links={LINKS}
      activeLink={active?.label}
      actions={["notifications", "help", "account_circle"]}
      // The kit screen's CTA is "Apply Now", which is demo chrome — you do not
      // apply from a dashboard, and it left the app with no route to its one
      // working feature. Running a scan is the real primary action, and
      // /analyze is the only place it happens.
      cta="New scan"
      onCta={() => router.push("/analyze")}
    />
  );
}
