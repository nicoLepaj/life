import { Canvas } from './classes/canvas'
import { Grid } from './classes/grid'
import { config } from './config'
import { iterateGrid, randomBinary } from './utils'

const { canvasId, columns, rows, cellSize } = config

const grid = new Grid(columns, rows, randomBinary)
const canvas = new Canvas(canvasId)

window.requestAnimationFrame(draw)

function draw() {
  canvas.ctx.clearRect(0, 0, columns * cellSize, rows * cellSize)

  iterateGrid(rows, columns, (position) => {
    const cell = grid.getCellByPosition(position)
    canvas.paintCell(cell.isOn, position)
  })
}

// TODO Remove config usage from classes ? If yes, would only be used in main.ts when instantianting classes or calling methods, as destructured params
