#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/7
// https://adventofcode.com/2025/day/7/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 7a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

const grid = data.split('\n').map((line) => line.split(''))
const height = grid.length
const width = grid[0].length

let startCol = 0
for (let col = 0; col < width; col++) {
  if (grid[0][col] === 'S') {
    startCol = col
    break
  }
}

let beams = new Set<number>([startCol])
let splitCount = 0

for (let row = 1; row < height && beams.size > 0; row++) {
  const nextBeams = new Set<number>()

  for (const col of beams) {
    const cell = grid[row][col]

    if (cell === '^') {
      splitCount++
      if (col > 0) nextBeams.add(col - 1)
      if (col < width - 1) nextBeams.add(col + 1)
    } else {
      nextBeams.add(col)
    }
  }

  beams = nextBeams
}

console.log('Split count:', splitCount)
