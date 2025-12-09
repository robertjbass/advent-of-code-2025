#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/1
// https://adventofcode.com/2025/day/1/input

import fs from "fs/promises";
import path from "path";

console.log("Day 01a");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = await fs.readFile(fileToInput, "utf-8");
const instructions = data.trim().split("\n");

let dial = 50;
let zeroCount = 0;

for (const instruction of instructions) {
  const direction = instruction[0];
  const steps = parseInt(instruction.slice(1));

  if (direction === "L") {
    dial = (((dial - steps) % 100) + 100) % 100;
  } else {
    dial = (dial + steps) % 100;
  }

  if (dial === 0) {
    zeroCount++;
  }
}

console.log("Password:", zeroCount);
