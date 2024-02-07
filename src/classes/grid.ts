import { config } from '../config'
import { Binary } from '../types/binary'
import { Position } from '../types/position'
import { clone, iterateGrid, make2dArray } from '../utils'
import { Cell } from './cell'

export class Grid {
  private _grid: Cell[][]
  private _gridCopy: Cell[][]

  constructor(columns: number, rows: number, cellInitialValueCalc: () => Binary) {
    this._grid = make2dArray(columns, rows, () => new Cell(cellInitialValueCalc()))
    this._gridCopy = clone(this._grid)
  }

  step() {
    const { rows, columns } = config
    this._gridCopy = clone(this._grid)

    // iterate the grid
    iterateGrid(rows, columns, (position) => {
      // set cell's active neighbors
      const cell = this.getCellByPosition(this.original, position)
      cell.setActiveNeighbors(this, position)

      // determine cell's next state by checking active neighbors
      const nextState = cell.getNextState()

      // set cell with next state in gridCopy only. Keep original grid intact
      this.setCellByPosition(this._gridCopy, new Cell(nextState), position)
    })

    // once the looping is over, replace the contents of the original grid by the ones of the copied grid
    // this._grid = clone(this._gridCopy)
    console.log('original', this._grid)
    console.log('copy', this._gridCopy)
  }

  get original() {
    return this._grid
  }

  set original(grid: Cell[][]) {
    this._grid = grid
  }

  get copy() {
    return this._gridCopy
  }

  // Current grid
  getCellByPosition(grid: Cell[][], position: Position) {
    return grid[position.x]?.[position.y]
  }

  // Next grid
  setCellByPosition(grid: Cell[][], cell: Cell, position: Position) {
    grid[position.x][position.y] = cell
  }
}
