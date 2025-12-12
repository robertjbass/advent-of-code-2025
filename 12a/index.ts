#!/usr/bin/env tsx
// TODO

// https://adventofcode.com/2025/day/12
// https://adventofcode.com/2025/day/12/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 12a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()
