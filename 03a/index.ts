#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/3
// https://adventofcode.com/2025/day/3/input

import fs from "fs/promises";
import path from "path";

console.log("Day 3a");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();
const banks = data.split("\n");
const bankCount = banks.length;

function joinJoltageNumbers(...args: number[]) {
  return parseInt(
    args.reduce((prev, cur) => {
      return prev + cur.toString();
    }, "")
  );
}

let totalOutputJoltage: number = 0;

banks.forEach((bank, i) => {
  const isLastBank: boolean = bankCount === i + 1;

  let maxBank2BatteryJoltage: number = 0;

  let bestRowTensPosition: number = 0;
  let bestRowOnesPosition: number = 0;

  const bankBatteriesRow = bank.trim().split("");
  const bankBatteriesInRowCount: number = bankBatteriesRow.length;

  bankBatteriesRow.forEach((battery, j) => {
    const isLastBatteryInRow: boolean = bankBatteriesInRowCount === j + 1;
    const isFirstBatteryInRow: boolean = j === 0;

    const currentBatteryJoltage: number = parseInt(battery);

    if (isFirstBatteryInRow) {
      bestRowTensPosition = currentBatteryJoltage;
      bestRowOnesPosition = parseInt(bankBatteriesRow[j + 1]);
    } else if (isLastBatteryInRow) {
      if (currentBatteryJoltage > bestRowOnesPosition) {
        bestRowOnesPosition = currentBatteryJoltage;
      }
    } else {
      if (currentBatteryJoltage > bestRowTensPosition) {
        bestRowTensPosition = currentBatteryJoltage;
        // set ones position to next index if it is not 0 to prevent having the ones position battery index being to the left of the tens position number
        bestRowOnesPosition = parseInt(bankBatteriesRow[j + 1]);
      } else if (currentBatteryJoltage > bestRowOnesPosition) {
        bestRowOnesPosition = currentBatteryJoltage;
      }
    }
  });

  // after row is completed, set the max row joltage
  maxBank2BatteryJoltage = joinJoltageNumbers(
    bestRowTensPosition,
    bestRowOnesPosition
  );

  totalOutputJoltage += maxBank2BatteryJoltage;

  if (isLastBank) {
    console.log({ totalOutputJoltage });
  }
});
