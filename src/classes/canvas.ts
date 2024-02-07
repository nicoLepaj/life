import { config } from '../config'
import { Position } from '../types/position'
import { Cell } from './cell'
import { Grid } from './grid'

export class Canvas {
  private _canvasEl: HTMLCanvasElement
  private _cellGrid: Grid
  private _clickedPosition!: Position
  private _contextId: string = '2d'
  private _ctx: CanvasRenderingContext2D

  constructor(id: string, cellGrid: Grid) {
    const { columns, rows, cellSize } = config
    this._canvasEl = document.getElementById(id) as HTMLCanvasElement
    this._canvasEl.width = columns * cellSize
    this._canvasEl.height = rows * cellSize

    this._ctx = this._canvasEl.getContext(this._contextId) as CanvasRenderingContext2D

    this._cellGrid = cellGrid

    this.setClickHandler()
  }

  get ctx() {
    return this._ctx
  }

  paintCell(cell: Cell, cellPosition: Position) {
    const { x, y } = cellPosition
    const { cellColorOn, cellColorOff, cellSize } = config

    this._ctx.fillStyle = cell.isOn ? cellColorOn : cellColorOff
    this._ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)

    this.drawBorders(cellPosition)
  }

  drawBorders(position: Position) {
    const { x, y } = position
    const { cellSize, borderColor, borderThickness } = config
    this._ctx.strokeStyle = borderColor
    this._ctx.lineWidth = borderThickness
    this._ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
  }

  setClickHandler() {
    const rect = this._canvasEl.getBoundingClientRect()

    this._canvasEl.addEventListener('click', (event) => {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      this._clickedPosition = {
        x: Math.floor(x / config.cellSize),
        y: Math.floor(y / config.cellSize)
      }

      const clickedCell = this._cellGrid.getCellByPosition(
        this._cellGrid.original,
        this._clickedPosition
      )
      clickedCell.reverseState()

      this.paintCell(clickedCell, this._clickedPosition)
    })
  }
}
