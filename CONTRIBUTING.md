# Contributing to jsonresume-theme-academic

## Quick Start (< 5 minutes)

1. Fork & clone
2. `npm install`
3. `npm run dev` — opens browser with live preview
4. Edit `src/`, see changes instantly

## Development Setup

### Prerequisites

- Node.js >= 20

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with live preview |
| `npm run build` | Build ESM + CJS + UMD |
| `npm test` | Run tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run lint` | Lint code |
| `npm run typecheck` | TypeScript check |

## Making Changes

### CSS Changes

Edit `src/styles/academic.css`. Changes appear instantly in dev mode.

### Adding a Section

1. Create `src/sections/new-section.ts`
2. Add to `src/render.ts`
3. Add tests in `test/sections/new-section.test.ts`
4. Update fixture resume with sample data

### Code Style

- TypeScript strict mode
- No `any` types
- Functions < 50 lines
- Immutable patterns (no mutation)

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Run `npm test` and `npm run lint` — all must pass
3. Update snapshot tests if HTML output changed: `npm test -- -u`
4. Write a descriptive PR title using conventional commits
5. Fill in the PR template

## Commit Convention

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation change
- `style:` — CSS/formatting change
- `refactor:` — Code change that doesn't fix a bug or add a feature
- `test:` — Adding or fixing tests
- `chore:` — Build, CI, tooling changes
