#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/2
// https://adventofcode.com/2025/day/2/input

import fs from "fs/promises";
import path from "path";

console.log("Day 02a");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();

// Check if a number is "invalid" (made of a repeated digit sequence)
function isInvalidId(n: number): boolean {
  const s = n.toString();
  const len = s.length;
  // Must have even length to be a repeated sequence
  if (len % 2 !== 0) return false;
  const half = len / 2;
  return s.slice(0, half) === s.slice(half);
}

// Parse ranges from input
const ranges = data.split(",").filter((r) => r.trim().length > 0);

let sum = 0;

for (const range of ranges) {
  const [startStr, endStr] = range.trim().split("-");
  const start = parseInt(startStr);
  const end = parseInt(endStr);

  for (let id = start; id <= end; id++) {
    if (isInvalidId(id)) {
      sum += id;
    }
  }
}

console.log("sum of invalid IDs:", sum);
