document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`
import { Plane } from './classes/plane'
import { Position } from './types/position'
import { iterateGrid } from './utils'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const cellSize = 20
const rows = 10
const cols = 10
canvas.width = cols * cellSize
canvas.height = rows * cellSize

const plane = new Plane(cols, rows)
console.table(plane.grid)
window.requestAnimationFrame(draw)

function draw() {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

  iterateGrid(plane.grid, (pos: Position) => {
    ctx.strokeRect(pos.x * cellSize, pos.y * cellSize, cellSize, cellSize)
  })
}