#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/11
// https://adventofcode.com/2025/day/11/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 11b')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()
const devices = data.split('\n')

const startDevice = 'svr'
const outDevice = 'out'

const deviceMap: Record<string, string[]> = devices
  .filter((line) => line.includes(': '))
  .reduce(
    (deviceMap, device) => {
      const [deviceName, deviceConnectionsString] = device.split(': ')
      const deviceConnections = deviceConnectionsString.split(' ')
      deviceMap[deviceName] = deviceConnections
      return deviceMap
    },
    {} as Record<string, string[]>,
  )

const memo = new Map<string, number>()

function countPathsVisitingBoth(
  fromDeviceName: string,
  seenDac: boolean,
  seenFft: boolean,
): number {
  const key = `${fromDeviceName}:${seenDac}:${seenFft}`
  if (memo.has(key)) return memo.get(key)!

  if (!deviceMap[fromDeviceName]) return 0
  const toDevices = deviceMap[fromDeviceName]

  let pathCount = 0
  for (const toDevice of toDevices) {
    const newSeenDac = seenDac || toDevice === 'dac'
    const newSeenFft = seenFft || toDevice === 'fft'

    if (toDevice === outDevice) {
      if (newSeenDac && newSeenFft) pathCount++
    } else {
      pathCount += countPathsVisitingBoth(toDevice, newSeenDac, newSeenFft)
    }
  }

  memo.set(key, pathCount)
  return pathCount
}

const totalPathsFound = countPathsVisitingBoth(startDevice, false, false)
console.log({ totalPathsFound })
