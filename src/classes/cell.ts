import { Binary } from '../types/binary'

export class Cell {
  private _state: Binary

  constructor(state: Binary) {
    this._state = state
  }

  get state() {
    return this._state
  }
}
