# 🎄 Advent of Code 2025

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/robertjbass/advent-of-code-2025)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.23.0-orange?logo=pnpm)](https://pnpm.io/)

My solutions for [Advent of Code 2025](https://adventofcode.com/2025) written in TypeScript.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation

```bash
git clone https://github.com/robertjbass/advent-of-code-2025.git
cd advent-of-code-2025
pnpm install
```

## 🛠️ Usage

| Command            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `pnpm day <day>`   | Run a specific day's solution                  |
| `pnpm new <day>`   | Create a new day directory with template files |
| `pnpm new`         | Create the next day directory                  |
| `pnpm clone <day>` | Clone day into parts a and b (05 → 05a + 05b)  |

### Examples

```bash
# Run day 1 solution
pnpm day 1

# Run day 3 part b solution
pnpm day 3b

# Create day 3 from template
pnpm new 3

# Create day 4 part b from template
pnpm new 4b

# Clone day 5 into 05a and 05b for part 2
pnpm clone 5
```

Day numbers are zero-padded automatically (e.g., `3b` → `03b`).

## 📁 Project Structure

```
advent-2025/
├── 01/              # Day 1 solution
│   ├── index.ts     # Solution code
│   └── input.txt    # Puzzle input
├── 02/              # Day 2 solution
├── _scripts/        # Helper scripts
│   ├── clone.ts     # Clone day into a/b parts
│   ├── new.ts       # Template generator
│   └── run.ts       # Solution runner
└── package.json
```

## Get Input:

https://adventofcode.com/2025/day/<day#>/input

## 📝 License

ISC © [Bob Bass](https://github.com/robertjbass)
