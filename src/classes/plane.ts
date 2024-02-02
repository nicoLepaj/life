import { make2dArray } from '../utils'

export class Plane {
  private _grid: [][]

  constructor(cols: number, rows: number) {
    this._grid = make2dArray(cols, rows)
  }

  get grid() {
    return this._grid
  }
}
