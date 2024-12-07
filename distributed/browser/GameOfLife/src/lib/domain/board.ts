export class Cell {

  static CODE_EMPTY: string = "_"
  static CODE_ALIVE: string = "x"

  static EMPTY: Cell = new Cell(Cell.CODE_EMPTY)
  static ALIVE: Cell = new Cell(Cell.CODE_ALIVE)

  public static from(encodedRow: string) {

    return Array.from(encodedRow).map((encodedCell) => {
      return new Cell(encodedCell)
    })
  }

  state: string = Cell.CODE_EMPTY

  public constructor(encodedCell: string) {
    this.state = encodedCell
  }

  public isAlive() {
    return this.equal(Cell.EMPTY)
  }

  public equal(other: Cell) {
    return this.state == other.state
  }

  public toCode(): string {
    return this.state
  }
}

export class Board {
  public static template(template: string): string {
    let encodedBoard = ""
    let rows = template.split("\n")
    for (let row in rows) {
      encodedBoard += rows[row].trim() + "\n"
    }
    return encodedBoard
  }

  public static init() {
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
    this.state[1][1] = Cell.ALIVE
  }

  public hasLife() {
    for (let row in this.state) {
      for (let cell in this.state[row]) {
        if (this.state[row][cell].isAlive()) return true
      }
    }
    return false
  }

  public encode(): string {
    let encodedBoard = ""
    for (let row in this.state) {
      encodedBoard += this.state[row].map((cell) => cell.toCode()).join("") + "\n"
    }
    return encodedBoard
  }

  public applyChange() {
    let randomRow = Math.floor(Math.random() * 10);
    let randomCell = Math.floor(Math.random() * 10);

    this.state[randomRow][randomCell] = Cell.ALIVE
  }
}

