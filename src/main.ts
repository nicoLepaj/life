document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`
import { Canvas } from './classes/canvas'
import { config } from './config'
import { iterateGrid, make2dArray, randomBinary } from './utils'

const { canvasId, columns, rows, cellSize } = config

const cellGrid = make2dArray(columns, rows, randomBinary)
const canvas = new Canvas(canvasId, columns, rows, cellSize)

window.requestAnimationFrame(draw)

function draw() {
  canvas.ctx.clearRect(0, 0, columns * cellSize, rows * cellSize)

  iterateGrid(rows, columns, (position) => {
    const { x, y } = position
    canvas.ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
    const isCellOn = cellGrid[x][y] === 1
    if (isCellOn) {
      canvas.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  })
}

