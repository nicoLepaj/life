import { config } from '../config'
import { Binary } from '../types/binary'
import { Position } from '../types/position'
import { iterateGrid, make2dArray } from '../utils'
import { Cell } from './cell'

export class Grid {
  private _grid: Cell[][]
  private _gridCopy: Cell[][]

  constructor(columns: number, rows: number, cellInitialValueCalc: () => Binary) {
    this._grid = make2dArray(columns, rows, () => new Cell(cellInitialValueCalc()))
  }

  step() {
    const { rows, columns } = config

    // iterate the grid
    iterateGrid(rows, columns, (position) => {
      // set cell's active neighbors
      const cell = this.getCellByPosition(position)
      cell.setActiveNeighbors(this, position)
      const nextState = cell.getNextState()
      console.log(position, cell.activeNeighborsCount)
      console.log('NEXT STATE', nextState)
    })

    // determine cell's next state by checking active neighbors

    // set next state for the cell in gridCopy only. Keep original grid intact
    // once the looping is over, replace the contents of the original grid by the ones of the copied grid
  }

  getCellByPosition(position: Position) {
    return this._grid[position.x]?.[position.y]
  }
}
