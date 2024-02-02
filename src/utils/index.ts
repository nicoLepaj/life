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
      arr[i][j] = JSON.stringify({ x: j, y: i })
    }
  }
  return arr
}

export function randomBinary(): Binary {
  return Math.round(Math.random()) as Binary
}

export function iterateGrid(grid: [][], action: (pos: Position) => any) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      action({ x: j, y: i })
    }
  }
}
