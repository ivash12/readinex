# CLAUDE.md

Instructions for Claude when working in this repository.

## 1. Project

- **Readinex**: a test-prep web app for the 2026 TOEFL iBT.
- Reading and Listening are auto-graded (two-stage adaptive).
- Writing and Speaking are AI-graded.
- Portfolio project for data science / AI internships.
- The owner does not write code. Explain decisions briefly, in plain language.

## 2. Stack

- Next.js (App Router, TypeScript strict + `noUncheckedIndexedAccess`) on Vercel.
- Tailwind v4 + shadcn/ui (style `base-nova`, `cn` package for class merging).
  Tailwind runs through `@tailwindcss/turbopack` (rule in `next.config.ts`); there is
  no `postcss.config`. Don't add PostCSS.
- Supabase: Postgres with RLS, auth, private storage.
- Inngest for background jobs.
- Upstash Redis for rate limiting.
- LLM, speech-to-text (word timestamps) and TTS APIs, all behind interfaces in
  `src/server/ai/`.
- Paddle or Lemon Squeezy for payments.
- Sentry for error monitoring.
- Python (pandas, scikit-learn, Jupyter) in `analysis/`.
- Vitest (unit) and Playwright (e2e).
- Read the real versions from `package.json`. Never hardcode them.

## 3. Folders

- `src/app`: routes, layouts, pages.
- `src/components`: React components; `ui/` = shadcn components.
- `src/lib`: pure logic, no I/O, unit-tested.
- `src/server`: server-only code; every file starts with `import 'server-only'`.
- `src/server/ai`: LLM / STT / TTS interfaces and provider adapters.
- `supabase/migrations`: SQL migrations.
- `prompts/`: versioned prompt files. Never edit a released version; add a new one.
- `scripts/`: one-off and maintenance scripts.
- `analysis/`: Python notebooks and data analysis.
- `tests/unit`, `tests/e2e`: Vitest and Playwright tests.
- `docs/`: `PROGRESS.md`, `DEVLOG.md` (later `THREAT_MODEL.md`, `RUNBOOK.md`).

## 4. Workflow (most important)

1. **PLAN first** and wait for approval.
2. Implement in small steps.
3. Run `pnpm lint ; pnpm typecheck ; pnpm test ; pnpm format:check`
   (and `pnpm build` for bigger changes).
4. Fix failures, then summarise what changed.

- Never commit or push unless asked.
- Never run destructive commands (git reset --hard, force push, deleting folders, dropping database tables) without asking first.
- Don't add dependencies without saying why.
- Ask when unsure rather than guess.
- After meaningful work, add short dated bullets to `docs/DEVLOG.md`.

## 5. Conventions

- pnpm only.
- `@/` imports.
- Named exports. Exception: Next.js files that require a default export
  (`page.tsx`, `layout.tsx`, etc.).
- zod for all external input.
- Pure scoring logic lives in `src/lib`, with tests.
- No `any`.
- Server actions and route handlers stay thin and call `src/server`.

## 6. Security rules

NEVER break these, even if asked casually. If a request would break one, stop and say so.

- Secrets only in server env vars. Never NEXT_PUBLIC_ for secrets. The service-role key is used only in src/server and scripts/.
- Answer keys and explanations reach the browser only after submission. All scoring happens on the server.
- Every table has RLS. Every server action checks auth and ownership and validates input with zod.
- Every paid API call passes a quota and budget check. Rate limits on auth, uploads and grading.
- Student text and transcripts go to LLMs inside delimiters, as data. Scores are clamped. AI output is never rendered as HTML.
- Uploads are validated on the server (type, size, duration), stored in private buckets, and served with signed URLs.
- Never create, read aloud or commit .env.local or real keys. New env vars go into .env.example (name only).

## 7. Windows / PowerShell

- Dev machine: Windows 11 + Windows PowerShell 5.1. Chain commands with `;`, not `&&`.
- Use `Remove-Item -Recurse -Force`, not `rm -rf`.
- Use forward slashes in code paths.
- Line endings are LF (`.gitattributes` + Prettier). Never introduce CRLF.
- CI runs on Linux, so paths are case-sensitive there. Match import casing exactly.

## 8. Next.js notes

- `next.config.ts` has `cacheComponents: true`, `partialPrefetching: true` and a
  turbopack `*.css` rule. create-next-app 16.4.2 generated all three; none were added by hand.
- `cacheComponents`: pages are prerendered as a static shell by default. Anything that
  reads request data (`cookies()`, `headers()`, the auth session, `searchParams`) must sit
  inside `<Suspense>`, or the build fails. Cache shared data explicitly with `"use cache"`.
- Next.js 16 changes fast. Check the bundled docs in `node_modules/next/dist/docs/` (or the
  official docs) before relying on memory.
