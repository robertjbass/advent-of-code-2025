#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/6
// https://adventofcode.com/2025/day/6/input

import fs from "fs/promises";
import path from "path";

console.log("Day 6b");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trimEnd();

const lines = data.split("\n");
const numRows = lines.length;
const width = Math.max(...lines.map((l) => l.length));

const grid = lines.map((l) => l.padEnd(width));

const problemColumns: number[][] = [];
let currentProblem: number[] = [];

for (let col = 0; col < width; col++) {
  let allSpaces = true;
  for (let row = 0; row < numRows; row++) {
    if (grid[row][col] !== " ") {
      allSpaces = false;
      break;
    }
  }

  if (allSpaces) {
    if (currentProblem.length > 0) {
      problemColumns.push(currentProblem);
      currentProblem = [];
    }
  } else {
    currentProblem.push(col);
  }
}
if (currentProblem.length > 0) {
  problemColumns.push(currentProblem);
}

let grandTotal = 0;

for (const cols of problemColumns) {
  const numbers: number[] = [];
  let operator = "";

  for (let colIdx = cols.length - 1; colIdx >= 0; colIdx--) {
    const col = cols[colIdx];
    let numStr = "";

    for (let row = 0; row < numRows - 1; row++) {
      const char = grid[row][col];
      if (char !== " ") {
        numStr += char;
      }
    }

    if (numStr.length > 0) {
      numbers.push(parseInt(numStr));
    }

    const opChar = grid[numRows - 1][col];
    if (opChar === "+" || opChar === "*") {
      operator = opChar;
    }
  }

  let result: number;
  if (operator === "+") {
    result = numbers.reduce((a, b) => a + b, 0);
  } else {
    result = numbers.reduce((a, b) => a * b, 1);
  }

  grandTotal += result;
}

console.log("Grand total:", grandTotal);
