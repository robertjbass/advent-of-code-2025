#!/usr/bin/env tsx

import fs from 'fs/promises'

const args = process.argv.slice(2)

function padDay(input: string): string {
  const match = input.match(/^(\d+)(.*)/) // e.g. "4b" -> ["4b", "4", "b"]
  if (!match) return input
  return match[1].padStart(2, '0') + match[2]
}

function generateNewFile(day: string) {
  return `#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/${parseInt(day)}

import fs from "fs/promises";
import path from "path";

console.log("Day ${day}");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();
`
}

async function createDay(day: string) {
  await fs.mkdir(day, { recursive: true })
  await fs.writeFile(`${day}/input.txt`, '')
  await fs.writeFile(`${day}/example.txt`, '')
  await fs.writeFile(`${day}/index.ts`, generateNewFile(day), {
    encoding: 'utf8',
  })
  console.log(`Created day ${day}`)
}

const dirs = (await fs.readdir('.')).filter((item) => /^\d{2}/.test(item))
dirs.sort()

if (args.length === 0) {
  // No args: create next day
  const lastDay = parseInt(dirs[dirs.length - 1])
  const day = padDay((lastDay + 1).toString())
  await createDay(day)
} else {
  // Process each argument
  for (const arg of args) {
    const day = padDay(arg)
    if (dirs.includes(day)) {
      console.error(`Day ${day} already exists, skipping`)
      continue
    }
    await createDay(day)
  }
}
