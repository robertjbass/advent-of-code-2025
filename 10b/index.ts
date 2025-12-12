#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/10
// https://adventofcode.com/2025/day/10/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 10b')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, 'example.txt')

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

type Machine = {
  buttons: number[][]
  targets: number[]
}

function parseLine(line: string): Machine {
  const buttonMatches = [...line.matchAll(/\(([^)]+)\)/g)]
  const targetMatch = line.match(/\{([^}]+)\}/)

  const buttons = buttonMatches.map((m) => m[1].split(',').map(Number))
  const targets = targetMatch![1].split(',').map(Number)

  return { buttons, targets }
}

function solveMinPresses(machine: Machine): number {
  const { buttons, targets } = machine
  const n = targets.length
  const m = buttons.length

  // For each counter, which buttons affect it
  const counterToButtons: number[][] = Array.from({ length: n }, () => [])
  for (let j = 0; j < m; j++) {
    for (const i of buttons[j]) {
      counterToButtons[i].push(j)
    }
  }

  // Use constraint propagation + DFS
  // State: remaining[i] = how much more counter i needs
  // presses[j] = number of times button j is pressed (-1 = undetermined)

  function solve(
    remaining: number[],
    presses: number[],
    currentSum: number,
    bestSoFar: number,
  ): number {
    if (currentSum >= bestSoFar) return Infinity

    // Propagate: if a counter has only one undetermined button, that button is forced
    let changed = true
    while (changed) {
      changed = false
      for (let i = 0; i < n; i++) {
        if (remaining[i] === 0) continue
        if (remaining[i] < 0) return Infinity

        const undetermined = counterToButtons[i].filter((j) => presses[j] === -1)

        if (undetermined.length === 0) {
          if (remaining[i] !== 0) return Infinity // Impossible
        } else if (undetermined.length === 1) {
          const j = undetermined[0]
          const needed = remaining[i]

          // Check if valid for all counters this button affects
          for (const idx of buttons[j]) {
            if (remaining[idx] < needed) return Infinity
          }

          presses[j] = needed
          currentSum += needed

          if (currentSum >= bestSoFar) return Infinity

          for (const idx of buttons[j]) {
            remaining[idx] -= needed
          }
          changed = true
        }
      }
    }

    // Check if done
    let allZero = true
    for (let i = 0; i < n; i++) {
      if (remaining[i] < 0) return Infinity
      if (remaining[i] > 0) allZero = false
    }

    if (allZero) return currentSum

    // Find an undetermined button to branch on
    // Prefer buttons that affect the most constrained counter
    let branchButton = -1
    let minMax = Infinity

    for (let j = 0; j < m; j++) {
      if (presses[j] !== -1) continue

      let maxForThis = Infinity
      for (const i of buttons[j]) {
        maxForThis = Math.min(maxForThis, remaining[i])
      }

      if (maxForThis < minMax) {
        minMax = maxForThis
        branchButton = j
      }
    }

    if (branchButton === -1) return Infinity

    // Lower bound: remaining total / max button size
    let remainingTotal = 0
    let maxBtnSize = 0
    for (let i = 0; i < n; i++) {
      remainingTotal += remaining[i]
    }
    for (let j = 0; j < m; j++) {
      if (presses[j] === -1) {
        maxBtnSize = Math.max(maxBtnSize, buttons[j].length)
      }
    }
    const lb = Math.ceil(remainingTotal / maxBtnSize)
    if (currentSum + lb >= bestSoFar) return Infinity

    // Try values for branchButton from 0 to minMax
    let best = bestSoFar

    for (let p = 0; p <= minMax; p++) {
      const newRemaining = [...remaining]
      const newPresses = [...presses]

      newPresses[branchButton] = p
      for (const i of buttons[branchButton]) {
        newRemaining[i] -= p
      }

      const result = solve(newRemaining, newPresses, currentSum + p, best)
      if (result < best) {
        best = result
      }
    }

    return best
  }

  const initialPresses = new Array(m).fill(-1)
  const result = solve([...targets], initialPresses, 0, Infinity)
  return result === Infinity ? 0 : result
}

const lines = data.split('\n').filter((line) => line.trim())
let total = 0

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]
  const machine = parseLine(line)
  const minPresses = solveMinPresses(machine)
  if (minPresses === Infinity || minPresses === 0) {
    console.log(`Line ${i + 1}: ${minPresses}`)
  }
  total += minPresses
}

console.log(total)
