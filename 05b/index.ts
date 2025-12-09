#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/5
// https://adventofcode.com/2025/day/5/input

import fs from "fs/promises";
import path from "path";

console.log("Day 5b");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();

const [rangesSection] = data.split("\n\n");

const ranges = rangesSection.split("\n").map((line) => {
  const [start, end] = line.split("-").map(Number);
  return { start, end };
});

ranges.sort((a, b) => a.start - b.start);

const merged: { start: number; end: number }[] = [];
for (const range of ranges) {
  if (merged.length === 0 || merged[merged.length - 1].end < range.start - 1) {
    merged.push({ ...range });
  } else {
    merged[merged.length - 1].end = Math.max(
      merged[merged.length - 1].end,
      range.end
    );
  }
}

const totalFresh = merged.reduce((sum, r) => sum + (r.end - r.start + 1), 0);

console.log("Total fresh IDs:", totalFresh);
