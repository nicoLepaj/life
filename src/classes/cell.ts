import { Binary } from '../types/binary'
import { Position } from '../types/position'
import { Grid } from './grid'
export class Cell {
  private _state: Binary
  private _activeNeighbors: Cell[] = []

  constructor(state: Binary) {
    this._state = state
  }

  setActiveNeighbors(grid: Grid, position: Position) {
    this._activeNeighbors = []
    const neighborCoords = this.getNeighborCoords(position)

    for (const coords of neighborCoords) {
      const neighbor = grid.getCellByPosition(grid.original, { x: coords.x, y: coords.y })
      if (neighbor !== undefined && neighbor.isOn) {
        this._activeNeighbors.push(neighbor)
      }
    }
  }

  getNextState(): Binary {
    let nextState: Binary

    if (this.isOff) {
      if (this.activeNeighborsCount === 3) {
        nextState = 1
      } else {
        nextState = 0
      }
    } else {
      if (this.activeNeighborsCount < 2 || this.activeNeighborsCount > 3) {
        nextState = 0
      } else {
        nextState = 1
      }
    }

    return nextState
  }

  get activeNeighborsCount() {
    return this._activeNeighbors.length
  }

  private getNeighborCoords(position: Position): Position[] {
    const { x, y } = position
    return [
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 }
    ]
  }

  reverseState() {
    this._state = this.isOn ? 0 : 1
  }

  get state() {
    return this._state
  }

  get isOn() {
    return this._state === 1
  }

  get isOff() {
    return this._state === 0
  }
}
