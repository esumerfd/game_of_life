export class Cell {

  static CODE_EMPTY: string = " "
  static CODE_ALIVE: string = "x"
  static CODE_DEAD:  string = "_"

  static EMPTY: Cell = new Cell(Cell.CODE_EMPTY)
  static ALIVE: Cell = new Cell(Cell.CODE_ALIVE)
  static DEAD:  Cell = new Cell(Cell.CODE_DEAD)

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
    return this.equal(Cell.ALIVE)
  }

  public isDead() {
    return this.equal(Cell.DEAD)
  }

  public equal(other: Cell) {
    return this.state == other.state
  }

  public toCode(): string {
    return this.state
  }

  public neibors(): number {
    return 0
  }

  public die() {
    this.state = Cell.CODE_DEAD
  }

  public born() {
    this.state = Cell.CODE_ALIVE
  }
}

export class Board {
  public static fromTemplate(template: string): Board {
    const encodedBoard = Board.template(template)
    return Board.decode(encodedBoard)
  }

  public static template(template: string): string {
    let encodedBoard = ""
    let rows = template.split("\n")
    for (let row in rows) {
      encodedBoard += rows[row].trim() + "\n"
    }
    return encodedBoard
  }

  public static decode(template: string): Board {
    const state = []

    let rows = template.split("\n")
    for (let row in rows) {
      state.push(Cell.from(row))
    }

    return new Board(state)
  }

  public static init() {
    return new Board([
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________"),
      Cell.from("__________")
    ])
  }

  state: Array<Array<Cell>> = []

  constructor(state: Array<Array<Cell>>) {
    this.state = state
  }

  public eachCell(closure: (cell: Cell) => void) {
    for (let row in this.state) {
      for (let cell in this.state[row]) {
        closure(this.state[row][cell])
      }
    }
  }

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
}

