# 🎄 Advent of Code 2025

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/robertjbass/advent-of-code-2025)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-10.23.0-orange?logo=pnpm)](https://pnpm.io/)

My solutions for [Advent of Code 2025](https://adventofcode.com/2025) written in TypeScript.

## 📊 Progress

|    Day     | Part 1 | Part 2 |
| :--------: | :----: | :----: |
| [01](./01) |   ⭐   |   ⭐   |
| [02](./02) |   ⭐   |   ⭐   |

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

| Command          | Description                                    |
| ---------------- | ---------------------------------------------- |
| `pnpm day <day>` | Run a specific day's solution                  |
| `pnpm new <day>` | Create a new day directory with template files |
| `pnpm new`       | Create the next day directory                  |

### Examples

```bash
# Run day 1 solution
pnpm day 1

# Create day 3 from template
pnpm new 3
```

## 📁 Project Structure

```
advent-2025/
├── 01/              # Day 1 solution
│   ├── index.ts     # Solution code
│   └── input.txt    # Puzzle input
├── 02/              # Day 2 solution
├── _scripts/        # Helper scripts
│   ├── new.ts       # Template generator
│   └── run.ts       # Solution runner
└── package.json
```

## 📝 License

ISC © [Bob Bass](https://github.com/robertjbass)
