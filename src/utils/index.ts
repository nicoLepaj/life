export function make2dArray(cols: number, rows: number): [][] {
    let arr = new Array(cols)
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows)
        for (let j = 0; j < rows; j++) {
            arr[i][j] = JSON.stringify({ x: j, y: i })
        }
    }
    return arr
}
