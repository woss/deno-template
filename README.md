# deno-template

[![CI](https://github.com/woss/deno-template/actions/workflows/ci.yml/badge.svg)](https://github.com/woss/deno-template/actions/workflows/ci.yml)
[![Release](https://github.com/woss/deno-template/actions/workflows/release.yml/badge.svg)](https://github.com/woss/deno-template/actions/workflows/release.yml)
[![Deno](https://img.shields.io/badge/deno-2.x-black?logo=deno)](https://deno.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Homebrew](https://img.shields.io/badge/brew-woss%2Ftap%2Fdt-blue?logo=homebrew)](https://github.com/woss/homebrew-tap)

Deno CLI starter template with CI/CD, cross-compilation, semantic-release, and Homebrew distribution.

## Quick start

```bash
deno task start          # Run the CLI
deno task check          # Type-check
deno lint                # Lint
deno fmt                 # Format
```

## Usage

```bash
dt hello                 # Hello, world!
dt hello Alice           # Hello, Alice!
dt echo foo bar baz      # foo bar baz
dt --help                # Show help
dt --version             # Show version
```

### JSON output

```bash
dt hello -o json         # {"greeting":"Hello, world!"}
```

## Build

```bash
deno task compile        # Produces ./dt
deno task compile-all    # Cross-compile for all platforms
```

## Rename for your project

When using this template, search-and-replace:

| Find               | Replace with              |
|--------------------|---------------------------|
| `deno-template`    | Your project name         |
| `dt`               | Your binary name          |
| `Your Deno CLI tool` | Your description        |

Update `deno.json` name field, CLI name in `main.ts`, and Homebrew formula name on release.

## License

MIT
