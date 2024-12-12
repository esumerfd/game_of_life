import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'

export class Context {
  initialBoard: Board = Board.fromTemplate(
    `__________
     __________
     __________
     __________
     ____xx____
     __________
     __________
     ____xxx___
     _____x____
     __________`)

  gameOfLife: GameOfLife

  constructor() {
    this.gameOfLife = GameOfLife.init(this.initialBoard.clone())
  }
}


