#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/2

import fs from "fs/promises";
import path from "path";

console.log("Day 02");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = await fs.readFile(fileToInput, "utf-8");
const instructions = data.trim().split("\n");

let currentNumber = 50;
let zeroCount = 0;

function turnDial(instruction: string) {
  let steps = parseInt(instruction.slice(1));
  const direction = instruction[0] as "L" | "R";
  while (steps > 0) {
    if (direction === "L") {
      if (currentNumber === 0) {
        currentNumber = 99;
      } else {
        currentNumber--;
      }

      if (currentNumber === 0) {
        zeroCount++;
      }
    } else if (direction === "R") {
      if (currentNumber === 99) {
        currentNumber = 0;
      } else {
        currentNumber++;
      }

      if (currentNumber === 0) {
        zeroCount++;
      }
    }

    steps--;
  }

  console.log("final zeroCount:", zeroCount);
}

for (const instruction of instructions) {
  turnDial(instruction);
}
