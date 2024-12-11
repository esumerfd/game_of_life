export class Location {
  static INVALID = new Location(-1, -1)
  static DEFAULT = new Location(0, 0)

  static from(cell: string, row: string) {
    let x = parseInt(row)
    let y = parseInt(cell)
    return new Location(x, y)
  }

  public x: number = 0
  public y: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public isInvalid(): boolean {
    return this.x === Location.INVALID.x
        && this.y === Location.INVALID.y
  }

  public top() {
    return new Location(this.x, this.y - 1)
  }
  public topRight() {
    return new Location(this.x + 1, this.y - 1)
  }
  public right() {
    return new Location(this.x + 1, this.y)
  }
  public bottomRight() {
    return new Location(this.x + 1, this.y + 1)
  }
  public bottom() {
    return new Location(this.x, this.y + 1)
  }
  public bottomLeft() {
    return new Location(this.x - 1, this.y + 1)
  }
  public left() {
    return new Location(this.x - 1, this.y)
  }
  public topLeft() {
    return new Location(this.x - 1, this.y - 1)
  }
}

export class Cell {

  static CODE_EMPTY: string = " "
  static CODE_ALIVE: string = "x"
  static CODE_DEAD:  string = "_"

  static EMPTY: Cell = new Cell(Cell.CODE_EMPTY)
  static ALIVE: Cell = new Cell(Cell.CODE_ALIVE)
  static DEAD:  Cell = new Cell(Cell.CODE_DEAD)

  public static noop() {
    return new Cell("_", Location.INVALID)
  }

  public static from(encodedRow: string) {
    return Array.from(encodedRow).map((encodedCell) => {
      return new Cell(encodedCell)
    })
  }

  state: string = Cell.CODE_EMPTY

  board?: Board = undefined

  location: Location = Location.DEFAULT

  public constructor(encodedCell: string, location: Location = Location.INVALID) {
    this.state = encodedCell
    if (location && !location.isInvalid()) this.location = location
  }

  public isAlive(): boolean {
    return this.equal(Cell.ALIVE)
  }

  public isDead(): boolean {
    return this.equal(Cell.DEAD)
  }

  public equal(other: Cell) {
    return this.state == other.state
  }

  public toCode(): string {
    return this.state
  }

  public neibors(): number {
    if (!this.board) return 0

    let lifeCount = 0

    this.board.top(this).isAlive()         ? lifeCount++ : 0
    this.board.topRight(this).isAlive()    ? lifeCount++ : 0
    this.board.right(this).isAlive()       ? lifeCount++ : 0
    this.board.bottomRight(this).isAlive() ? lifeCount++ : 0
    this.board.bottom(this).isAlive()      ? lifeCount++ : 0
    this.board.bottomLeft(this).isAlive()  ? lifeCount++ : 0
    this.board.left(this).isAlive()        ? lifeCount++ : 0
    this.board.topLeft(this).isAlive()     ? lifeCount++ : 0

    return lifeCount
  }

  public die() {
    this.state = Cell.CODE_DEAD
  }

  public born() {
    this.state = Cell.CODE_ALIVE
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

  public static fromTemplate(template: string): Board {
    const encodedBoard = Board.template(template)
    return Board.decode(encodedBoard)
  }

  public static decode(encodedBoard: string): Board {
    const state = []

    let rows = encodedBoard.split("\n")
    for (let row in rows) {
      if (rows[row]) state.push(Cell.from(rows[row]))
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

    this.eachCell((cell: Cell, location: Location) => {
      cell.board = this
      cell.location = location
    })
  }

  public atLocation(location: Location): Cell {
    return this.at(location.x, location.y)
  }

  public at(x: number, y: number): Cell {

    if (y < 0 || y >= this.state.length) return Cell.noop()
    const stateY = this.state[y]

    if (x < 0 || x >= stateY.length) return Cell.noop()

    return stateY[x]
  }

  public eachCell(closure: (cell: Cell, location: Location) => void) {
    for (let row in this.state) {
      for (let cell in this.state[row]) {
        closure(this.state[row][cell], Location.from(row, cell))
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

  public apply(changes: Array<() => void>) {
    changes.forEach((change) => change())
  }

  public top(cell: Cell) {
    return this.atLocation(cell.location.top())
  }
  public topRight(cell: Cell) {
    return this.atLocation(cell.location.topRight())
  }
  public right(cell: Cell) {
    return this.atLocation(cell.location.right())
  }
  public bottomRight(cell: Cell) {
    return this.atLocation(cell.location.bottomRight())
  }
  public bottom(cell: Cell) {
    return this.atLocation(cell.location.bottom())
  }
  public bottomLeft(cell: Cell) {
    return this.atLocation(cell.location.bottomLeft())
  }
  public left(cell: Cell) {
    return this.atLocation(cell.location.left())
  }
  public topLeft(cell: Cell) {
    return this.atLocation(cell.location.topLeft())
  }
}

