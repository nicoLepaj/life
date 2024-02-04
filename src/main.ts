document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`
import { Canvas } from './classes/canvas'
import { Cell } from './classes/cell'
import { config } from './config'
import { iterateGrid, make2dArray, randomBinary } from './utils'

const { canvasId, columns, rows, cellSize } = config

const cellGrid = make2dArray(columns, rows, () => new Cell(randomBinary()))
const canvas = new Canvas(canvasId, columns, rows, cellSize)

window.requestAnimationFrame(draw)

function draw() {
  canvas.ctx.clearRect(0, 0, columns * cellSize, rows * cellSize)

  iterateGrid(rows, columns, (position) => {
    const isCellOn = cellGrid[position.x][position.y].state === 1
    canvas.paintCell(isCellOn, position)
  })
}

