import { Binary } from '../types/binary'
import { Position } from '../types/position'

export function make2dArray(
  cols: number,
  rows: number,
  fillFunction: Function
): [][] {
  let arr = new Array(cols)
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows)
    for (let j = 0; j < rows; j++) {
      arr[i][j] = fillFunction()
    }
  }
  return arr
}

export function randomBinary(): Binary {
  return Math.round(Math.random()) as Binary
}

export function iterateGrid(
  rows: number,
  cols: number,
  action: (position: Position) => any
) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      action({ x: j, y: i })
    }
  }
}
