#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/10
// https://adventofcode.com/2025/day/10/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 10a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()
