import { Board } from './board'

export class GameOfLife {

  public static init(board: Board) {
    return new GameOfLife(board)
  }

  board: Board

  constructor(board: Board) {
    this.board = board
  }

  public update() {
    // this.board.applyChange()
  }
}
