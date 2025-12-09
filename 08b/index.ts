#!/usr/bin/env tsx

// https://adventofcode.com/2025/day/8
// https://adventofcode.com/2025/day/8/input

import fs from "fs/promises";
import path from "path";

console.log("Day 8b");

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
  if (px === py) return false;

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

let circuitCount = boxes.length;
let lastEdge: Edge | null = null;

for (const edge of edges) {
  if (union(edge.i, edge.j)) {
    circuitCount--;
    lastEdge = edge;
    if (circuitCount === 1) break;
  }
}

const result = boxes[lastEdge!.i].x * boxes[lastEdge!.j].x;
console.log("Product of X coordinates:", result);
