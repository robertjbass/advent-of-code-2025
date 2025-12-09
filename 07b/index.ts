#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/7
// https://adventofcode.com/2025/day/7/input

import fs from "fs/promises";
import path from "path";

console.log("Day 7b");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();

const grid = data.split("\n").map((line) => line.split(""));
const height = grid.length;
const width = grid[0].length;

let startCol = 0;
for (let col = 0; col < width; col++) {
  if (grid[0][col] === "S") {
    startCol = col;
    break;
  }
}

// number is too large for number type
let beams = new Map<number, bigint>([[startCol, 1n]]);
let totalTimelines = 0n;

for (let row = 1; row < height && beams.size > 0; row++) {
  const nextBeams = new Map<number, bigint>();

  for (const [col, count] of beams) {
    const cell = grid[row][col];

    if (cell === "^") {
      if (col > 0) {
        nextBeams.set(col - 1, (nextBeams.get(col - 1) ?? 0n) + count);
      }
      if (col < width - 1) {
        nextBeams.set(col + 1, (nextBeams.get(col + 1) ?? 0n) + count);
      }
    } else {
      nextBeams.set(col, (nextBeams.get(col) ?? 0n) + count);
    }
  }

  beams = nextBeams;
}

for (const count of beams.values()) {
  totalTimelines += count;
}

console.log("Total timelines:", totalTimelines.toString());
