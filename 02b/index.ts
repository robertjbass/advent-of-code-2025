#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/2
// https://adventofcode.com/2025/day/2/input

import fs from "fs/promises";
import path from "path";

console.log("Day 02b");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();

function isInvalidId(n: number): boolean {
  const s = n.toString();
  const len = s.length;

  for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
    if (len % patternLen !== 0) continue; // Pattern must divide evenly

    const pattern = s.slice(0, patternLen);
    const repeatCount = len / patternLen;

    if (pattern.repeat(repeatCount) === s) {
      return true;
    }
  }
  return false;
}

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
