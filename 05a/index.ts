#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/5
// https://adventofcode.com/2025/day/5/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 5a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

const [rangesSection, idsSection] = data.split('\n\n')

const ranges = rangesSection.split('\n').map((line) => {
  const [start, end] = line.split('-').map(Number)
  return { start, end }
})

const ingredientIds = idsSection.split('\n').map(Number)

function isFresh(id: number): boolean {
  return ranges.some((range) => id >= range.start && id <= range.end)
}

const freshCount = ingredientIds.filter(isFresh).length

console.log('Fresh ingredient count:', freshCount)
