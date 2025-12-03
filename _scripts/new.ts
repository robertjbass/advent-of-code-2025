#!/usr/bin/env tsx

import fs from "fs/promises";

let day = process.argv[2];

function generateNewFile(day: string) {
  return `#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/${parseInt(day)}

import fs from "fs/promises";
import path from "path";

console.log("Day ${day}");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = await fs.readFile(fileToInput, "utf-8");
`;
}

const dirs = (await fs.readdir(".")).filter((item) => /^\d{2}$/.test(item));
dirs.sort();

if (!day) {
  const lastDay = parseInt(dirs[dirs.length - 1]);
  day = (lastDay + 1).toString();
} else {
  day = day.padStart(2, "0");

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
