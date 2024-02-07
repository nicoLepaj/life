import { config } from '../config'
import { Position } from '../types/position'
import { Cell } from './cell'

export class Canvas {
  private _ctx: CanvasRenderingContext2D
  private _contextId: string = '2d'

  constructor(id: string) {
    const { columns, rows, cellSize } = config
    const canvasEl = document.getElementById(id) as HTMLCanvasElement
    canvasEl.width = columns * cellSize
    canvasEl.height = rows * cellSize

    this._ctx = canvasEl.getContext(this._contextId) as CanvasRenderingContext2D
  }

  get ctx() {
    return this._ctx
  }

  paintCell(cell: Cell, cellPosition: Position) {
    const { x, y } = cellPosition
    const { cellColorOn, cellColorOff, cellSize, borderColor, borderThickness } = config

    this._ctx.fillStyle = cell.isOn ? cellColorOn : cellColorOff
    this._ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

    // Add the border to the cell
    this._ctx.strokeStyle = borderColor
    this._ctx.lineWidth = borderThickness
    this._ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }
}
