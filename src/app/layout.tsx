import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "./components/side-nav";
import AssistantDrawer from "./components/dashboard/assistant-drawer";
import { FIXTURE_QUICK_REPLIES } from "./components/dashboard/fixture";

// Type system (Federal Catalyst kit): Hanken Grotesk headlines,
// Inter body, JetBrains Mono labels/data/buttons.
const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: "Opportunity Radar", template: "%s — Opportunity Radar" },
  description: "Match your startup to US government funding — honestly.",
};

// App shell — the map chrome from
// design/claude-design/kit-source/screen-opportunity-map.jsx: an 80px solid
// `.or-nav` with the brand left, five destinations, icon buttons and the CTA
// right. NO side nav; pages centre their own 1440 column via `.app-page`.
//
// The assistant drawer is mounted app-wide and closed by default, so it is
// reachable from every page and its slide transition survives navigation.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${inter.variable} ${jbMono.variable} h-full antialiased`}
    >
      <head>
        {/* Material Symbols Outlined — the kit's only icon source. Loaded from
            Google rather than vendored: the variable woff2 is 3.9 MB. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="flex min-h-full flex-col">
        <TopNav />

        <div className="flex-1">{children}</div>

        <footer className="border-t border-hairline bg-card">
          <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-2 px-4 py-6 text-[12.5px] text-faint sm:px-6 lg:px-10">
            <p>
              <span className="font-semibold text-muted">Sources</span> · Grants.gov · SAM.gov
              Assistance Listings · USAspending · Utah state programs
            </p>
            <p>Honest matches only — we say so when there&apos;s no fit.</p>
          </div>
        </footer>

        <AssistantDrawer suggestions={FIXTURE_QUICK_REPLIES} />
      </body>
    </html>
  );
}
