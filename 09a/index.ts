#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/9
// https://adventofcode.com/2025/day/9/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 09a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, 'example.txt')

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

type Point = { x: number; y: number }

const redTiles: Point[] = data.split('\n').map((line) => {
  const [x, y] = line.split(',').map(Number)
  return { x, y }
})

let maxArea = 0

for (let i = 0; i < redTiles.length; i++) {
  for (let j = i + 1; j < redTiles.length; j++) {
    const width = Math.abs(redTiles[i].x - redTiles[j].x) + 1
    const height = Math.abs(redTiles[i].y - redTiles[j].y) + 1
    const area = width * height
    if (area > maxArea) {
      maxArea = area
    }
  }
}

console.log('Answer:', maxArea)
