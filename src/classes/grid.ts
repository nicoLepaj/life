import { Binary } from '../types/binary'
import { Position } from '../types/position'
import { make2dArray } from '../utils'
import { Cell } from './cell'

export class Grid {
  private _grid: Cell[][]

  constructor(columns: number, rows: number, cellInitialValueCalc: () => Binary) {
    this._grid = make2dArray(columns, rows, () => new Cell(cellInitialValueCalc()))
  }

  getCellByPosition(position: Position) {
    return this._grid[position.x][position.y]
  }
}
