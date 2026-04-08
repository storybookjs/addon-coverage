# Agent Instructions for addon-coverage

Keep this file, `AGENTS.md`, up to date when the repo's release workflow or contributor guidance changes.

This file is the canonical instruction source for coding agents. `CLAUDE.md` points here instead of duplicating instructions.

## Release Process

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

```bash
pnpm changeset   # Create a changeset for your changes
pnpm release     # Build and publish (CI handles this automatically)
```

**Before committing, always run the format script to avoid CI failures:**

```bash
pnpm format
```

### Creating Changesets (MANDATORY for user-facing changes)

When making changes that affect users (bug fixes, new features, breaking changes, dependency updates, or release workflow changes), you **MUST** create a changeset file.

1. Create a new `.md` file in the `.changeset/` directory.
2. Use the format below:

```markdown
---
'@storybook/addon-coverage': patch
---

Short description of what changed.
```

Version bump guidance:

- `patch` — Bug fixes, release/process changes, and non-breaking dependency updates
- `minor` — Backward-compatible features
- `major` — Breaking changes
