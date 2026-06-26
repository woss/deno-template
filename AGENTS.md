# AGENTS.md — deno-template

Deno CLI starter template — project bootstrapped from `woss/deno-template`.

## Tech Stack

- **Runtime**: Deno 2.x (no Node.js, no npm)
- **CLI framework**: `jsr:@cliffy/command@^1.0.0-rc.7`
- **Table formatting**: `jsr:@cliffy/table@^1.0.0-rc.7`
- **Paths**: `jsr:@std/path@^1.0.0`
- **Formatting**: `deno fmt` (no Prettier, no ESLint)
- **Type checking**: `deno check main.ts` (not tsc)
- **Linting**: `deno lint`
- **Binary distribution**: `deno compile` → standalone binary (~7MB)
- **Distribution channels**: GitHub Releases, Homebrew tap `woss/homebrew-tap`
- **CI/CD**: semantic-release with conventional commits, GitHub Actions

## Project Structure

```
main.ts                  # CLI entrypoint, all subcommands defined inline
lib/
  format.ts              # Output formatting — formatOutput() JSON vs text dispatch
  spinner.ts             # ASCII spinner (stderr)
  types.ts               # TS interfaces
```

## Architecture Rules

1. **main.ts** owns ALL CLI parsing. Subcommands defined inline with action callbacks. No separate command files.
2. **lib/** owns domain logic. Each module is a named function file.
3. **lib/format.ts** owns ALL display formatting. Pure functions only.
4. **No classes** — pure functions, typed interfaces, no OOP.
5. **Error handling**: try/catch around operations, `spinner.stop()` in both success and catch, `Deno.exit(1)` on error.
6. **Output dispatch**: formatOutput() handles JSON vs text routing.

## CLI Commands

| Command     | Example             | Description              |
|-------------|---------------------|--------------------------|
| `hello`     | `dt hello world`    | Say hello                |
| `echo`      | `dt echo foo bar`   | Echo back arguments      |
| Global      | `-o, --output json` | All commands support JSON|

## Code Conventions

- **Imports**: Prefer JSR specifiers; npm: specifiers also supported.
- **Naming**: `camelCase` functions, `PascalCase` types/interfaces, `kebab-case` files.
- **No classes** — pure functions, typed interfaces, no OOP.
- **No TUI frameworks** — pure ANSI escape codes if needed.
- **Spinner pattern**:
  ```ts
  const spinner = showSpinner("msg");
  try {
    // work
    spinner.stop();
  } catch (cause) {
    spinner.stop();
    console.error(`Error: ${cause}`);
    Deno.exit(1);
  }
  ```
- **Run tasks**: `deno task start` (dev), `deno task compile` (binary), `deno task check` (type-check).
- **No runtime assertions or validation libraries** — manual guard clauses with descriptive error messages.
- **No debug logging or console.log** outside of intended output.
- **Run verification**: always run `deno check main.ts` after changes. Also `deno lint` if modifying structure.

## Git Workflow

- **Conventional commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `ci:`.
- **Pre-commit hook** (`.githooks/pre-commit`): runs `deno fmt --check`, `deno lint`, `deno check main.ts lib/*.ts`.
- **semantic-release** auto-publishes on push to `main`.
- **Branch naming**: any convention works. Stacked branches per GitButler workflow.
- **CI** (`.github/workflows/ci.yml`): runs on PRs to `main` — `deno lint` + `deno fmt --check` + `deno check main.ts`.
- **Release** (`.github/workflows/release.yml`): runs on push to `main` — cross-compiles 4 targets, creates GitHub Release with gzipped binaries via semantic-release.

## Distribution

- Cross-compiled for 4 targets via `deno task compile-all`.
- Targets: `x86_64-unknown-linux-gnu`, `aarch64-unknown-linux-gnu`, `aarch64-apple-darwin`, `x86_64-apple-darwin`.
- Binaries gzipped (`tar czf`) and attached to GitHub Releases.
- Homebrew formula at `woss/homebrew-tap` (auto-updated on release).
- Binary name: `dt`.

## Rename Checklist (when using this template)

1. `deno.json` — update `name` field
2. `main.ts` — update CLI name and description
3. `AGENTS.md` — update project-specific info
4. `README.md` — update badges, description, usage
5. `.github/workflows/release.yml` — update binary name in compile/upload steps
6. `homebrew-tap/Formula/dt.rb` — rename formula file and class name
