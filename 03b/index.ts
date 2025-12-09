#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/3
// https://adventofcode.com/2025/day/3/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 3b')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()
const banks = data.split('\n')
const bankCount = banks.length

let totalOutputJoltage: bigint = 0n

const TARGET_DIGITS = 12

banks.forEach((bank, i) => {
  const isLastBank: boolean = bankCount === i + 1

  const digits = bank
    .trim()
    .split('')
    .map((b) => parseInt(b))
  const n = digits.length

  const result: number[] = []
  let startIdx = 0

  for (let pos = 0; pos < TARGET_DIGITS; pos++) {
    const remainingToPlace = TARGET_DIGITS - pos
    const endIdx = n - remainingToPlace

    let bestIdx = startIdx
    for (let j = startIdx + 1; j <= endIdx; j++) {
      if (digits[j] > digits[bestIdx]) {
        bestIdx = j
      }
    }

    result.push(digits[bestIdx])
    startIdx = bestIdx + 1
  }

  const activatedRow = BigInt(result.join(''))
  totalOutputJoltage += activatedRow

  if (isLastBank) {
    console.log({ totalOutputJoltage: totalOutputJoltage.toString() })
  }
})
