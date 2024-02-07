import { Canvas } from './classes/canvas'
import { Cell } from './classes/cell'
import { Grid } from './classes/grid'
import { config } from './config'
import { iterateGrid, randomBinary } from './utils'

const { canvasId, columns, rows, cellSize } = config

let grid: Grid
// const grid = new Grid(columns, rows, randomBinary)

let interval: number | null
initRandomGrid()
const canvas = new Canvas(canvasId, grid)
iterateGrid(rows, columns, (position) => {
  canvas.drawBorders(position)
})

function runLife() {
  interval = setInterval(stepLife, config.refreshInterval)
}

function initRandomGrid() {
  grid = new Grid(columns, rows, randomBinary)
}

function stepLife() {
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
}

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case config.buttons.startStop:
      if (!interval) {
        runLife()
      } else {
        clearInterval(interval)
        interval = null
      }
      break
    case config.buttons.step:
      if (interval) {
        clearInterval(interval)
        interval = null
      } else {
        stepLife()
      }
  }
})

