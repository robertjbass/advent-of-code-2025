#!/usr/bin/env tsx

import { execSync } from "child_process";

let day = process.argv[2];
day = day.padStart(2, "0");

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
