#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/10
// https://adventofcode.com/2025/day/10/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 10a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()

type Machine = {
  target: boolean[]
  buttons: number[][]
}

function parseLine(line: string): Machine {
  const targetMatch = line.match(/\[([.#]+)\]/)
  if (!targetMatch) throw new Error(`Invalid line: ${line}`)
  const target = targetMatch[1].split('').map((c) => c === '#')

  const buttonMatches = line.matchAll(/\(([0-9,]+)\)/g)
  const buttons: number[][] = []
  for (const match of buttonMatches) {
    const indices = match[1].split(',').map(Number)
    buttons.push(indices)
  }

  return { target, buttons }
}

function findMinPresses(machine: Machine): number {
  const { target, buttons } = machine
  const numButtons = buttons.length
  const numLights = target.length

  let minPresses = Infinity

  for (let mask = 0; mask < 1 << numButtons; mask++) {
    const pressCount = countBits(mask)
    if (pressCount >= minPresses) continue

    const state = new Array(numLights).fill(false)
    for (let b = 0; b < numButtons; b++) {
      if (mask & (1 << b)) {
        for (const lightIdx of buttons[b]) {
          state[lightIdx] = !state[lightIdx]
        }
      }
    }

    let matches = true
    for (let i = 0; i < numLights; i++) {
      if (state[i] !== target[i]) {
        matches = false
        break
      }
    }

    if (matches) {
      minPresses = pressCount
    }
  }

  return minPresses
}

function countBits(n: number): number {
  let count = 0
  while (n) {
    count += n & 1
    n >>>= 1
  }
  return count
}

const lines = data.split('\n')
let totalPresses = 0

for (const line of lines) {
  const machine = parseLine(line)
  const minPresses = findMinPresses(machine)
  totalPresses += minPresses
}

console.log('Total minimum presses:', totalPresses)
