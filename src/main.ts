document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`
import { Plane } from './classes/plane'
import { iterateGrid } from './utils'

const cellSize = 20
const cols = 10
const rows = 6

const canvas = document.getElementById('canvas') as HTMLCanvasElement
canvas.width = cols * cellSize
canvas.height = rows * cellSize

const plane = new Plane(cols, rows)

window.requestAnimationFrame(draw)

function draw() {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize)

  iterateGrid(rows, cols, (position) => {
    const { x, y } = position
    ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
    const isCellOn = plane.grid[x][y] === 1
    if (isCellOn) {
      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    }
  })
}

