#!/usr/bin/env tsx

import { execSync } from "child_process";

let day = process.argv[2];

function padDay(input: string): string {
  const match = input.match(/^(\d+)(.*)/); // e.g. "4b" -> ["4b", "4", "b"]
  if (!match) return input;
  return match[1].padStart(2, "0") + match[2];
}

day = padDay(day);

if (!day || parseInt(day) < 1 || parseInt(day) > 31) {
  console.error("Usage: pnpm day <day-number> (1-31)");
  process.exit(1);
}

try {
  execSync(`tsx ${day}/index.ts`, { stdio: "inherit" });
} catch (error) {
  console.error("Error running day", day, ":", error);
  process.exit(1);
}
