# Federal Catalyst UI Kit — extracted upstream source

Reference copy of the kit bundle the design system was vendored from. Nothing
here is compiled or imported. It exists so a future re-sync can be a diff
instead of an archaeology dig.

Extracted from `Federal Catalyst UI Kit.html` (7.0 MB Claude artifact,
2026-08-14), whose `__bundler/manifest` script tag holds gzip+base64 entries.

| File | What it is |
| --- | --- |
| `kit-page.html` | The kit's inner document — `<style>` block (tokens + all `.or-*` rules) and the demo app shell. Source of `src/app/styles/catalyst-kit.css`. |
| `components.js` | The 21 primitives, Babel-transpiled. Source of `src/app/components/ui/`. Carries the bundle manifest with each component's original `sourcePath`. |
| `screen-opportunity-map.jsx` | `SectionLabel` `FounderProfile` `ActionPlan` `UnlockResults` `OpportunityMapScreen` — raw JSX. |
| `screen-pursuit-workspace.jsx` | `PursuitWorkspaceScreen` — raw JSX. |
| `screen-assistant-drawer.jsx` | `AssistantDrawer` — raw JSX. |

The three screen files are **composites over fixture data**, not part of the
design system. Read them for anatomy — column splits, what goes in which rail,
how the kit expects a match to be laid out — then build the real thing from
`@/app/components/ui` against live engine data.

To re-extract:

```py
import re, json, base64, gzip
d = open("Federal Catalyst UI Kit.html", encoding="utf-8").read()
man = json.loads(re.search(r'<script type="__bundler/manifest">\s*(\{.*?\})\s*</script>', d, re.S).group(1))
for k, v in man.items():
    raw = base64.b64decode(v["data"])
    if v.get("compressed"):
        raw = gzip.decompress(raw)
    # v["mime"] tells you which entries are JS vs the embedded woff2 fonts
```

The kit's app shell names four sections — **Opportunity Map · Pursuit
Workspace · Screening · Utah View**. Only the first two have screens.
