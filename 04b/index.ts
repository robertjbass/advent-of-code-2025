#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/4
// https://adventofcode.com/2025/day/4/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 4b')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

const totalRows = data.split('\n').length
const totalColumns = data.split('\n')[0].length

type Location = `r${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}c${
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10}`

type LocationMap = Partial<Record<Location, '.' | '@'>>

function createKey(row: number, column: number) {
  return `r${row}c${column}` as Location
}

function checkAccessibleLocation(location: Location, locationMap: LocationMap) {
  let adjacentPaperCount = 0

  const [row, column] = location.replace('r', '').replace('c', '|').split('|').map(Number)

  const rowAbove = row - 1
  const rowBelow = row + 1
  const columnLeft = column - 1
  const columnRight = column + 1

  const hasRowAbove = rowAbove > 0
  const hasRowBelow = rowBelow <= totalRows
  const hasColumnLeft = columnLeft > 0
  const hasColumnRight = columnRight <= totalColumns

  if (hasRowAbove) {
    if (hasColumnLeft) {
      locationMap[createKey(rowAbove, columnLeft)] === '@' && adjacentPaperCount++
    }
    locationMap[createKey(rowAbove, column)] === '@' && adjacentPaperCount++
    if (hasColumnRight) {
      locationMap[createKey(rowAbove, columnRight)] === '@' && adjacentPaperCount++
    }
  }

  if (hasRowBelow) {
    if (hasColumnLeft) {
      locationMap[createKey(rowBelow, columnLeft)] === '@' && adjacentPaperCount++
    }
    locationMap[createKey(rowBelow, column)] === '@' && adjacentPaperCount++
    if (hasColumnRight) {
      locationMap[createKey(rowBelow, columnRight)] === '@' && adjacentPaperCount++
    }
  }

  if (hasColumnLeft) {
    locationMap[createKey(row, columnLeft)] === '@' && adjacentPaperCount++
  }
  if (hasColumnRight) {
    locationMap[createKey(row, columnRight)] === '@' && adjacentPaperCount++
  }

  const canAccessPaper = adjacentPaperCount < 4

  return canAccessPaper ? location : null
}

const map: LocationMap = {}

let row = 1
let column = 1

data.split('').forEach((char) => {
  if (char === '\n') {
    if (row === totalRows) return
    row++
    column = 1
    return
  }

  const mapKey = createKey(row, column)
  map[mapKey as keyof typeof map] = char as '.' | '@'

  column++
})

function findAccessibleRolls(locationMap: LocationMap): Location[] {
  const accessible: Location[] = []
  for (let r = 1; r <= totalRows; r++) {
    for (let c = 1; c <= totalColumns; c++) {
      const key = createKey(r, c)
      if (locationMap[key] === '@') {
        const result = checkAccessibleLocation(key, locationMap)
        if (result) {
          accessible.push(result)
        }
      }
    }
  }
  return accessible
}

let totalRemoved = 0

while (true) {
  const accessible = findAccessibleRolls(map)
  if (accessible.length === 0) break

  // Remove all accessible rolls
  for (const loc of accessible) {
    map[loc] = '.'
  }
  totalRemoved += accessible.length
}

console.log('total removed', totalRemoved)
