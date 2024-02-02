document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`
import { Plane } from './classes/plane'
import { Position } from './types/position'
import { iterateGrid } from './utils'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const cellSize = 20
const cols = 10
const rows = 3
canvas.width = cols * cellSize
canvas.height = rows * cellSize

const plane = new Plane(cols, rows)
console.table(plane.grid)
window.requestAnimationFrame(draw)

function draw() {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
  ctx.clearRect(0, 0, cols * cellSize, rows * cellSize)

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const pos = { x: j, y: i }
      ctx.strokeRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize)
      const isCellOn = plane.grid[j][i] === 1
      if (isCellOn) {
        ctx.fillRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize)
      }
    }
  }
}