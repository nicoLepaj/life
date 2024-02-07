import { Canvas } from './classes/canvas'
import { Cell } from './classes/cell'
import { Grid } from './classes/grid'
import { config } from './config'
import { clone, iterateGrid, randomBinary } from './utils'

const { canvasId, columns, rows, cellSize } = config

const grid = new Grid(columns, rows, randomBinary)
const canvas = new Canvas(canvasId)
const interval = setInterval(draw, config.refreshInterval)
// window.requestAnimationFrame(draw)

function draw() {
  canvas.ctx.clearRect(0, 0, columns * cellSize, rows * cellSize)

  iterateGrid(rows, columns, (position) => {
    const cell = grid.getCellByPosition(grid.original, position)

    // Draw cell
    canvas.paintCell(cell, position)

    // Set next step in grid copy
    cell.setActiveNeighbors(grid, position)
    const nextState = cell.getNextState()
    grid.setCellByPosition(grid.copy, new Cell(nextState), position)
  })

  // Second iteration to copy the cells from the copied grid to the original grid, to get the grid for the next painting step
  iterateGrid(rows, columns, (position) => {
    const cell = grid.getCellByPosition(grid.copy, position)
    grid.setCellByPosition(grid.original, cell, position)
  })

  // window.requestAnimationFrame((t) => draw(t))
}

