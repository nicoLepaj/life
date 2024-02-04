import { Binary } from '../types/binary'
import { Position } from '../types/position'

export function make2dArray<T>(columns: number, rows: number, fillMethod: () => T): T[][] {
  return Array.from({ length: columns }, () => Array.from({ length: rows }, fillMethod))
}

export function randomBinary(): Binary {
  return Math.round(Math.random()) as Binary
}

export function iterateGrid(rows: number, cols: number, action: (position: Position) => any) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      action({ x: j, y: i })
    }
  }
}
