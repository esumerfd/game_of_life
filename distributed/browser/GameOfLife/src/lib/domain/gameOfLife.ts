import { Board } from './board'
import { Rules } from './rule'

export class GameOfLife {

  public static init(board: Board) {
    return new GameOfLife(board)
  }

  rules: Rules = Rules.init()
  board: Board

  constructor(board: Board) {
    this.board = board
  }

  public update() {
    const changes = this.rules.check(this.board)

    this.board.apply(changes)
  }
}
