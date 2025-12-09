#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/8
// https://adventofcode.com/2025/day/8/input

import fs from "fs/promises";
import path from "path";

console.log("Day 8a");

const fileToInput = path.resolve(import.meta.dirname, "input.txt");
// const fileToInput = path.resolve(import.meta.dirname, "example.txt");

const data = (await fs.readFile(fileToInput, "utf-8")).trim();

const boxes = data.split("\n").map((line) => {
  const [x, y, z] = line.split(",").map(Number);
  return { x, y, z };
});

type Edge = { i: number; j: number; dist: number };
const edges: Edge[] = [];

for (let i = 0; i < boxes.length; i++) {
  for (let j = i + 1; j < boxes.length; j++) {
    const dx = boxes[i].x - boxes[j].x;
    const dy = boxes[i].y - boxes[j].y;
    const dz = boxes[i].z - boxes[j].z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    edges.push({ i, j, dist });
  }
}

edges.sort((a, b) => a.dist - b.dist);

const parent: number[] = boxes.map((_, i) => i);
const rank: number[] = boxes.map(() => 0);

function find(x: number): number {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x: number, y: number): boolean {
  const px = find(x);
  const py = find(y);
  if (px === py) return false; // in same circuit

  if (rank[px] < rank[py]) {
    parent[px] = py;
  } else if (rank[px] > rank[py]) {
    parent[py] = px;
  } else {
    parent[py] = px;
    rank[px]++;
  }
  return true;
}

const connectCount = boxes.length <= 20 ? 10 : 1000;
let connected = 0;

for (const edge of edges) {
  if (connected >= connectCount) break;
  union(edge.i, edge.j);
  connected++;
}

const circuitSizes = new Map<number, number>();
for (let i = 0; i < boxes.length; i++) {
  const root = find(i);
  circuitSizes.set(root, (circuitSizes.get(root) ?? 0) + 1);
}

const sizes = [...circuitSizes.values()].sort((a, b) => b - a);
const result = sizes[0] * sizes[1] * sizes[2];

console.log("Product of three largest circuits:", result);
