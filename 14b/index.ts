#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/14
// https://adventofcode.com/2025/day/14/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 14b')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()
