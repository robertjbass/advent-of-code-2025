#!/usr/bin/env tsx

import fs from "fs/promises";

let day = process.argv[2];

function padDay(input: string): string {
  const match = input.match(/^(\d+)(.*)/); // e.g. "4b" -> ["4b", "4", "b"]
  if (!match) return input;
  return match[1].padStart(2, "0") + match[2];
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
`;
}

const dirs = (await fs.readdir(".")).filter((item) => /^\d{2}$/.test(item));
dirs.sort();

if (!day) {
  const lastDay = parseInt(dirs[dirs.length - 1]);
  day = (lastDay + 1).toString();
} else {
  day = padDay(day);

  if (dirs.includes(day)) {
    console.error(`Day ${day} already exists`);
    process.exit(0);
  }
}

await fs.mkdir(day, { recursive: true });
await fs.writeFile(`${day}/input.txt`, "");
await fs.writeFile(`${day}/example.txt`, "");
await fs.writeFile(`${day}/index.ts`, generateNewFile(day), {
  encoding: "utf8",
});
