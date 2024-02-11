import { Canvas } from './classes/canvas'
import { Cell } from './classes/cell'
import { config } from './config'
import { GridType } from './enums/gridType'
import { initGrid, iterateGrid } from './utils'

const { canvasId, columns, rows, cellSize } = config

let intervalId: number | null

let grid = initGrid(GridType.RANDOM)

const canvas = new Canvas(canvasId, grid)
iterateGrid((position) => {
  canvas.drawBorders(position)
})

function runLife() {
  intervalId = setInterval(stepLife, config.refreshInterval)
}

function stepLife() {
  canvas.ctx.clearRect(0, 0, columns * cellSize, rows * cellSize)

  iterateGrid((position) => {
    const cell = grid.getCellByPosition(grid.original, position)

    // Draw cell
    canvas.paintCell(cell, position)

    // Set next step in grid copy
    cell.setActiveNeighbors(grid, position)
    const nextState = cell.getNextState()
    grid.setCellByPosition(grid.copy, new Cell(nextState), position)
  })

  // Second iteration to copy the cells from the copied grid to the original grid, to get the grid for the next painting step
  iterateGrid((position) => {
    const cell = grid.getCellByPosition(grid.copy, position)
    grid.setCellByPosition(grid.original, cell, position)
  })
}

function clearLife() {
  grid = initGrid(GridType.ALL_DEAD)
  stepLife()
}

document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case config.buttons.startStop:
      if (!intervalId) {
        runLife()
      } else {
        clearInterval(intervalId)
        intervalId = null
      }
      break

    case config.buttons.step:
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      } else {
        stepLife()
      }
      break

    case config.buttons.clear:
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      clearLife()
      break
  }
})