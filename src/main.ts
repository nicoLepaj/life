document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="canvas" />
`
import { make2dArray } from './utils'

// const canvas = document.getElementById('canvas')

let grid = make2dArray(10, 10)
console.table(grid)
