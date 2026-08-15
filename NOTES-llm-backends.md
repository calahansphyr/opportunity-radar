# Notes on the LLM backends (findings, 2026-08-15)

Written per CLAUDE.md: the fix belongs in `src/lib/engine/profile.ts`, which
this module doesn't own, so it is recorded here rather than edited.

## The anthropic backend cannot run profile extraction today

`LLM_BACKEND=anthropic` works for `complete()` — verified live, backend
reports `anthropic:claude-opus-5` and returns text. It fails on
`completeJSON()` for `PROFILE_SCHEMA`, hitting three separate limits of the
`output_config.format: json_schema` API, each only visible after fixing the
one before it:

1. **`maxItems` / `minItems` unsupported.**
   `output_config.format.schema: For 'array' type, property 'maxItems' is not
   supported`. From `strArray()` in profile.ts and the `maxItems: 4` /
   `maxLength` in suggest.ts. Codex accepts them, so the schemas aren't wrong
   — they're just not portable.

2. **Union-typed parameter cap (limit 16, schema has 17).**
   `Schemas contains too many parameters with union types ... This causes
   exponential compilation cost.` Caused by `nullable()`, which emits
   `type: [T, "null"]` on nearly every CompanyProfile field so the model can
   report "not stated" without inventing a value.

3. **`Schema is too complex.`** Reached after collapsing the unions into
   optional properties. No numeric limit given; `PROFILE_SCHEMA` is simply
   too large — 21 required fields, nested objects, several arrays.

### What was tried and reverted

An adapter-level sanitizer in `llm-anthropic.ts` that stripped the
unsupported keywords, rewrote `[T,"null"]` as optional `T`, and re-densified
missing keys to `null` after parsing. It cleared limits 1 and 2 and died on
3. Reverted — the adapter was the wrong place, and bending it further was
patching around a schema that needs redesigning.

Note the re-densify step is required for any future fix: `extractProfile`
does `{ ...extracted }` straight into a `CompanyProfile`, so an omitted key
arrives as `undefined`, and the gate checks test `!== null`. `undefined`
would slip through as a real value.

### Suggested fix (for whoever owns profile.ts)

Split extraction into two `completeJSON` calls against smaller schemas —
gate fields first, then keywords/prose — and merge. `FAST_PROFILE_SCHEMA`
already proves the split is viable; it exists for latency, and the same shape
would solve portability. That would make the app runnable on Claude without a
Codex CLI, which matters for any teammate who doesn't have one.

## The codex backend needs the CLI, not a key

`llm-codex.ts` spawns `codex app-server` (JSON-RPC over stdio) and runs on a
ChatGPT subscription. There is no API-key path. `CODEX_BIN` defaults to
`codex`; if it isn't on PATH the backend dies with `spawn codex ENOENT`.
Anyone setting this up needs the Codex CLI installed and logged in — an API
key will not substitute.

## Scripts do not read .env.local

Only Next loads it. `pnpm tsx scripts/...` and `eval/run.ts` see none of it,
so they silently fall back to the default backend (codex). Either prefix the
run (`LLM_BACKEND=mock pnpm tsx ...`) or source it first:

```bash
set -a; . ./.env.local; set +a
```

This is easy to miss — a smoke test that "passes" may have run on a different
backend than intended.

## Verified working

- `GEMINI_API_KEY` mints ephemeral auth tokens against
  `v1alpha/auth_tokens` (HTTP 200), so voice mode is good to go.
- `LLM_BACKEND=mock` runs the whole app with no network and no key.
