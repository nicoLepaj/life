import { config } from '../config'
import { Position } from '../types/position'

export class Canvas {
  private _ctx: CanvasRenderingContext2D

  constructor(id: string) {
    const { columns, rows, cellSize } = config
    const canvasEl = document.getElementById(id) as HTMLCanvasElement
    canvasEl.width = columns * cellSize
    canvasEl.height = rows * cellSize

    this._ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D
  }

  get ctx() {
    return this._ctx
  }

  paintCell(isCellOn: boolean, cellPosition: Position) {
    const { x, y } = cellPosition
    const { cellColorOn, cellColorOff, cellSize, borderColor, borderThickness } = config

    this._ctx.fillStyle = isCellOn ? cellColorOn : cellColorOff
    this._ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

    // Add the border to the cell
    this._ctx.strokeStyle = borderColor
    this._ctx.lineWidth = borderThickness
    this._ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }
}
