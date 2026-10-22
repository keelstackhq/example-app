# Project notes: hull-canary

Canary repo for keelstackhq/hull, hosted at keelstackhq/example-app (stands in for the doc's
suggested keelstackhq/hull-canary): rendered from hull's template (web combo) to measure CI
against the budget and catch template bugs. It holds no product code; keep changes minimal.

- Source: keelstackhq/hull@efc8d9e, `node scripts/render.mjs new … --piece base
  --piece preact-app:web --piece ui-storybook --piece hono-worker:api --data scope=keelstackhq`
- Budget: job `ci` p50 <= 45 s on a typical PR (warm), <= 15 s docs-only. `ci-ok` is the only
  required check.
- Setup instructions: doc "Set up a repo from hull"
  (https://claude.ai/code/artifact/5cded5ba-c915-4680-b9c6-a206522e3041).

## How to work here

- Start every task with superpowers:using-superpowers; follow the skills it names.
- Subagents (see CLAUDE.md): `explorer` for searches, `implementer` for changes (test first),
  `reviewer` on every diff before commit, `ci-fixer` for red CI. Reports <= 10 lines.
- Before "done": superpowers:verification-before-completion with real output (`pnpm run ci`,
  the PR's CI run). A failure: superpowers:systematic-debugging, root cause first.
- Never skip, disable or weaken a check; never edit template-owned files (CLAUDE.md, .claude/,
  .github/, configs) to get green. A template bug is reported to hull, not patched here.
- Test PRs are minimal one-line edits; merge only when `ci-ok` is green.

## Steps

- [x] 1 Render web combo, single vite ok
- [x] 2 project.md written, `pnpm run ci` green locally, main pushed
- [ ] 3 GitHub settings (branch protection on ci-ok, Renovate, optional Cloudflare secrets)
- [x] 4 First CI run on main green
- [x] 5 PR docs only (expect early exit, <= 15 s)
- [x] 6 PR one package: apps/web (expect web only, <= 45 s)
- [x] 7 PR shared UI: packages/ui (expect ui + web)
- [x] 8 PR root config: vite.config.ts (expect all packages)
- [x] 9 ci-timing.mjs --budget 45: n / p50 / p90 recorded
- [x] 10 Report sent (doc comment + final message)

## Progress

<!-- one line per step: YYYY-MM-DD · step · link · result · seconds -->

- 2026-10-15 · 1 · keelstackhq/hull@efc8d9e · render ok:true, exit 0, 66 changes; `ok: single vite (@voidzero-dev/vite-plus-core@1.1.0)` (Node 24.22.0, pnpm 12.11.2) · install 12.6 s
- 2026-10-15 · 2 · https://github.com/keelstackhq/example-app (main) · project.md written; `pnpm run ci` exit 0, 21/21 tasks, cold · 12.6 s
- 2026-10-15 · 3 · https://github.com/keelstackhq/example-app/settings · blocked: agent has no repo-admin tools (see Blocked) · -
- 2026-10-15 · 4 · https://github.com/keelstackhq/example-app/actions/runs/38796201776 · green, full run (no base) · ci 47 s, ci-ok 3 s
- 2026-10-15 · 5 · https://github.com/keelstackhq/example-app/pull/1 · green, early exit (affected check 7 s, rest skipped); 1 s over budget, the time is in npx downloading turbo for "query affected" · ci 16 s, ci-ok 3 s
- 2026-10-15 · 6 · https://github.com/keelstackhq/example-app/pull/2 · green, matched: scope // + web only (//#format:check from docs/**), 7 tasks, 1 cached, turbo 6.9 s · ci 34 s, ci-ok 5 s
- 2026-10-15 · 7 · https://github.com/keelstackhq/example-app/pull/3 · green, matched: scope // + ui + web, 11 tasks, 2 cached, turbo 6.6 s · ci 29 s, ci-ok 3 s
- 2026-10-15 · 8 · https://github.com/keelstackhq/example-app/pull/4 · green, matched: all 5 packages, 21 tasks, 0 cached, turbo 18.1 s · ci 51 s, ci-ok 4 s
- 2026-10-15 · 9 · hull scripts/ci-timing.mjs --repo keelstackhq/example-app --budget 45 --limit 20 · n=4 p50=29s p90=51s, ok (exit 0) · -
- 2026-10-15 · 10 · https://claude.ai/code/artifact/5cded5ba-c915-4680-b9c6-a206522e3041 · report posted as a doc comment · -
- 2026-10-16 · update · https://github.com/keelstackhq/example-app/pull/7 · template-owned ci.yml + session-start.sh from keelstackhq/hull@e485214 (turbo via curl, session-start.d) · ci 30 s
- 2026-10-16 · 5 (re-run) · https://github.com/keelstackhq/example-app/pull/8 · green, early exit; affected step 1.1 s (turbo via curl, was npx), within budget · ci 7 s (was 16 s), ci-ok 4 s
- 2026-10-22 · splice bot · .github/workflows/splice.yml (keelstackhq/splice/action@v1, scope all, splice 0.2.0) · no .splice/lock.toml: `--all` updates only the decisions channel, main is skipped silently (`scope: main` would exit 2) · -
- 2026-10-22 · adopt · https://github.com/keelstackhq/example-app/pull/11 · main lock via `splice new --ref v0.1.1 --force` → `update` v0.2.0 → `channel add gh:keelstackhq/hull//rigging --piece claude` → `update` v0.2.1 (5571be1); `splice check` 0; bot dispatch after merge: up to date, no PR · ci 39 s (all packages, cold), ci-ok 3 s
- 2026-10-22 · 6 (re-run) · https://github.com/keelstackhq/example-app/pull/12 · green, web only, 6 tasks, 1 cached via keelstackhq/hoard@v0 remote cache (`hoard vp restore: no cache found`), turbo 3.7 s; ci-timing.mjs --budget 45: n=13 p50=23s p90=39s, ok; `preview` red (not required): Workers never deployed, `wrangler versions upload` needs a first `wrangler deploy` · ci 23 s, ci-ok 2 s

## Blocked

<!-- what is missing and the exact action a human must take -->

- Repo settings (admin on keelstackhq/example-app): Settings → Actions → General: allow actions,
  workflow permissions "Read repository contents".
- Branch protection: protect `main`, require only the `ci-ok` status check (merge queue optional).
- Renovate: install the Renovate GitHub app on keelstackhq/example-app; give it read access to
  keelstackhq/hull if hull is private.
- Optional: repo secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` for PR previews.

<!-- splice:decisions:begin — managed by `splice update --channel decisions`; edit the source -->

## Org decisions

Cross-repo decisions from keelstackhq/decisions; follow them. To change one, open a PR there.
`splice update --channel decisions` refreshes this snapshot; commit it alone as `chore: sync org decisions`.

@docs/agents/org-decisions.md

<!-- splice:decisions:end -->
