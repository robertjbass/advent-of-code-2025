#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/9
// https://adventofcode.com/2025/day/9/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 09b')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, 'example.txt')

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

type Point = { x: number; y: number }

const redTiles: Point[] = data.split('\n').map((line) => {
  const [x, y] = line.split(',').map(Number)
  return { x, y }
})

type Edge = { p1: Point; p2: Point }
const edges: Edge[] = []
for (let i = 0; i < redTiles.length; i++) {
  const next = (i + 1) % redTiles.length
  edges.push({ p1: redTiles[i], p2: redTiles[next] })
}

function isPointInsidePolygon(px: number, py: number): boolean {
  let crossings = 0
  for (const { p1, p2 } of edges) {
    if (p1.x === p2.x) {
      const minY = Math.min(p1.y, p2.y)
      const maxY = Math.max(p1.y, p2.y)
      if (py > minY && py <= maxY && px < p1.x) {
        crossings++
      }
    }
  }
  return crossings % 2 === 1
}

function isPointOnBoundary(px: number, py: number): boolean {
  for (const { p1, p2 } of edges) {
    const minX = Math.min(p1.x, p2.x)
    const maxX = Math.max(p1.x, p2.x)
    const minY = Math.min(p1.y, p2.y)
    const maxY = Math.max(p1.y, p2.y)

    if (p1.x === p2.x) {
      if (px === p1.x && py >= minY && py <= maxY) return true
    } else {
      if (py === p1.y && px >= minX && px <= maxX) return true
    }
  }
  return false
}

function isPointInOrOnPolygon(px: number, py: number): boolean {
  return isPointOnBoundary(px, py) || isPointInsidePolygon(px, py)
}

const allX = [...new Set(redTiles.map((p) => p.x))].sort((a, b) => a - b)
const allY = [...new Set(redTiles.map((p) => p.y))].sort((a, b) => a - b)

const gridStatus: boolean[][] = allX.map((x) => allY.map((y) => isPointInOrOnPolygon(x, y)))

const cellStatus: boolean[][] = []
for (let ix = 0; ix < allX.length - 1; ix++) {
  const row: boolean[] = []
  for (let iy = 0; iy < allY.length - 1; iy++) {
    const cx = (allX[ix] + allX[ix + 1]) / 2
    const cy = (allY[iy] + allY[iy + 1]) / 2
    row.push(isPointInsidePolygon(cx, cy))
  }
  cellStatus.push(row)
}

function findIndex(arr: number[], val: number): number {
  let lo = 0
  let hi = arr.length
  while (lo < hi) {
    const mid = (lo + hi) >>> 1
    if (arr[mid] < val) lo = mid + 1
    else hi = mid
  }
  return lo
}

function isRectangleValid(minX: number, maxX: number, minY: number, maxY: number): boolean {
  const ix1 = findIndex(allX, minX)
  const ix2 = findIndex(allX, maxX)
  const iy1 = findIndex(allY, minY)
  const iy2 = findIndex(allY, maxY)

  for (let ix = ix1; ix <= ix2; ix++) {
    for (let iy = iy1; iy <= iy2; iy++) {
      if (!gridStatus[ix][iy]) return false
    }
  }

  for (let ix = ix1; ix < ix2; ix++) {
    for (let iy = iy1; iy < iy2; iy++) {
      if (!cellStatus[ix][iy]) return false
    }
  }

  return true
}

let maxArea = 0

for (let i = 0; i < redTiles.length; i++) {
  for (let j = i + 1; j < redTiles.length; j++) {
    const p1 = redTiles[i]
    const p2 = redTiles[j]

    const minX = Math.min(p1.x, p2.x)
    const maxX = Math.max(p1.x, p2.x)
    const minY = Math.min(p1.y, p2.y)
    const maxY = Math.max(p1.y, p2.y)

    if (isRectangleValid(minX, maxX, minY, maxY)) {
      const width = maxX - minX + 1
      const height = maxY - minY + 1
      const area = width * height
      if (area > maxArea) {
        maxArea = area
      }
    }
  }
}

console.log('Answer:', maxArea)
