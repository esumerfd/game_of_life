export class Cell {
  static from(encodedRow: string) {

    return Array.from(encodedRow).map((encodedCell) => {
      return new Cell(encodedCell)
    })
  }

  state: string = '_'

  public constructor(encodedCell: string) {
    this.state = encodedCell
  }

  public isAlive() {
    return this.state == 'X'
  }
}

export class Board {
  static init() {
    return new Board()
  }

  state: Array<Array<Cell>> = [
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
    Cell.from("__________"),
  ]

  public addLife() {
    this.state[1][1] = new Cell('X')
  }

  public hasLife() {
    for (let row in this.state) {
      for (let cell in this.state[row]) {
        if (this.state[row][cell].isAlive()) return true
      }
    }
    return false
  }
}

