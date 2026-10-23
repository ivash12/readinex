# Dev log

## 2026-10-23

- Scaffolded Next.js 16 (App Router, TypeScript strict, Tailwind v4, `src/`) with pnpm.
- Added shadcn/ui (button), ESLint + Prettier, Vitest, `server-only`.
- Created the folder layout (`src/server`, `prompts/`, `analysis/`, `tests/`, etc.).
- `typecheck` runs `next typegen` first, so it passes on a fresh clone.
- `.gitattributes`: LF line endings, binary rules for media and fonts.
- `git init` and first commit.
- `.env.example` with variable names only (no values).
- Added `CLAUDE.md`, `docs/PROGRESS.md`, `docs/DEVLOG.md`.
