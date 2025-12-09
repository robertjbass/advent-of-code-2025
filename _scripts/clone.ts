#!/usr/bin/env tsx

import fs from 'fs/promises'
import path from 'path'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('Usage: pnpm clone <day> [day2] [day3] ...')
  process.exit(1)
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

async function updateIndexFile(dir: string, day: string, suffix: string) {
  const indexPath = path.join(dir, 'index.ts')
  if (!(await fileExists(indexPath))) return

  let content = await fs.readFile(indexPath, 'utf-8')

  // Update console.log("Day X"); to console.log("Day Xa"); or console.log("Day Xb");
  const dayNum = parseInt(day)
  content = content.replace(`console.log("Day ${day}");`, `console.log("Day ${day}${suffix}");`)
  content = content.replace(
    `console.log("Day ${dayNum}");`,
    `console.log("Day ${dayNum}${suffix}");`,
  )

  await fs.writeFile(indexPath, content)
}

async function cloneDay(dayArg: string) {
  const day = dayArg.padStart(2, '0')
  const dayA = `${day}a`
  const dayB = `${day}b`

  if (!(await fileExists(day))) {
    console.error(`Directory ${day} does not exist, skipping`)
    return
  }

  if (await fileExists(dayA)) {
    console.error(`Directory ${dayA} already exists, skipping`)
    return
  }

  if (await fileExists(dayB)) {
    console.error(`Directory ${dayB} already exists, skipping`)
    return
  }

  // Copy day to dayB first (before renaming)
  await copyDir(day, dayB)

  // Rename day to dayA
  await fs.rename(day, dayA)

  // Update index.ts files
  await updateIndexFile(dayA, day, 'a')
  await updateIndexFile(dayB, day, 'b')

  console.log(`Cloned ${day} → ${dayA} + ${dayB}`)
}

for (const arg of args) {
  await cloneDay(arg)
}
