import { Grid } from '../classes/grid'
import { config } from '../config'
import { GridType } from '../enums/gridType'
import { Binary } from '../types/binary'
import { Position } from '../types/position'

const { columns, rows } = config

export function make2dArray<T>(columns: number, rows: number, fillMethod: () => T): T[][] {
  return Array.from({ length: columns }, () => Array.from({ length: rows }, fillMethod))
}

export function randomBinary(): Binary {
  return Math.round(Math.random()) as Binary
}

export function iterateGrid(action: (position: Position) => any) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      action({ x: j, y: i })
    }
  }
}

export function clone<T>(item: T): T {
  return JSON.parse(JSON.stringify(item))
}

export function initGrid(gridType: GridType) {
  let fillMethod: () => Binary
  switch (gridType) {
    case GridType.ALL_DEAD:
      fillMethod = () => 0
      break
    case GridType.ALL_LIVE:
      fillMethod = () => 1
      break
    case GridType.RANDOM:
      fillMethod = randomBinary
      break
  }

  return new Grid(columns, rows, fillMethod)
}
