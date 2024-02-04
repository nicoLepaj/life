export class Canvas {
  private _ctx: CanvasRenderingContext2D

  constructor(id: string, columns: number, rows: number, cellSize: number) {
    const canvasEl = document.getElementById(id) as HTMLCanvasElement
    canvasEl.width = columns * cellSize
    canvasEl.height = rows * cellSize

    this._ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D
  }

  get ctx() {
    return this._ctx
  }
}
