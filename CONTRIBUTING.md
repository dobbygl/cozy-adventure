# Contributing

Thanks for working on **Cozy Adventure**. It is a TypeScript (strict) ESM **pnpm monorepo** (`@cozy/game` client on Three.js + Vite, `@cozy/server` multiplayer server, `@cozy/shared` kernel). Use pnpm, not npm. Keep the toolchain green and commit messages consistent.

For architecture notes, conventions, and non-obvious gotchas, see [`CLAUDE.md`](CLAUDE.md).

## Before you commit

Run the same gates CI runs (`.github/workflows/ci.yml`) and keep them green:

```bash
pnpm -r run lint        # ESLint across workspaces (lint:fix autofixes; Prettier via format)
pnpm -r run typecheck   # tsc strict, noEmit, every workspace
pnpm -r run test        # Vitest run (game + server)
pnpm -r run build       # build every workspace (game via Vite, server via tsup)
```

## Commit messages

All commits **must** follow the [Conventional Commits](https://www.conventionalcommits.org/) specification and **must be written in English**. This is mandatory, with no exceptions, even though the in-game and chat copy is in Spanish. Do not mix languages within a message.

Format:

```
type(scope): description

[optional body]

[optional footer(s)]
```

- **type** (required): one of `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
- **scope** (optional but encouraged): the area touched, as a lowercase noun, e.g. `player`, `world`, `building`, `save`, `ui`, `deps`.
- **description**: imperative mood, lowercase start, no trailing period, concise.
- **breaking changes**: append `!` after the type/scope (`feat(save)!: ...`) and/or add a `BREAKING CHANGE:` footer.
- **body** (optional): blank line after the subject, then wrap prose explaining the what and why. Bullets are fine.

Examples:

```
feat(player): add a three-phase jump with takeoff-synced animation
fix(world): stop chopped trees from reappearing on load
docs(readme): document the controls table
build(deps): bump three to 0.185.0
```

## Branching

Work on a feature branch and open a pull request against `main`, keeping the quality gates green. Commits authored by Claude end with a `Co-Authored-By: Claude ... <noreply@anthropic.com>` trailer.
