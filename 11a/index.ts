#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/11
// https://adventofcode.com/2025/day/11/input

import fs from 'fs/promises'
import path from 'path'

console.log('Day 11a')

const fileToInput = path.resolve(import.meta.dirname, 'input.txt')
// const fileToInput = path.resolve(import.meta.dirname, 'example.txt')

const data = (await fs.readFile(fileToInput, 'utf-8')).trim()
const devices = data.split('\n')

const myDevice = 'you'
const outDevice = 'out'

const deviceMap: Record<string, string[]> = devices.reduce(
  (deviceMap, device) => {
    const [deviceName, deviceConnectionsString] = device.split(': ')
    const deviceConnections = deviceConnectionsString.split(' ')
    deviceMap[deviceName] = deviceConnections
    return deviceMap
  },
  {} as Record<string, string[]>,
)

function countPaths(fromDeviceName: string): number {
  if (!deviceMap[fromDeviceName]) return 0
  const toDevices = deviceMap[fromDeviceName]

  let pathCount = 0
  for (const toDevice of toDevices) {
    if (toDevice === outDevice) {
      pathCount++ // Found a complete path
    } else {
      pathCount += countPaths(toDevice) // Recursively count paths
    }
  }
  return pathCount
}

const totalPathsFound = countPaths(myDevice)
console.log({ totalPathsFound })
