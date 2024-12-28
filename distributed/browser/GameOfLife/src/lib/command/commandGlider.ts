import { ICommandDiscovery,  ICommandRunner } from './command'
import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'
import { Context } from '../../lib/domain/context'

export class CommandGlider implements ICommandDiscovery, ICommandRunner {

  context: Context

  public constructor(context: Context) {
    this.context = context
  }

  public isSupported(command: any) {
    return command == 'beacon'
  }

  public run() {
    let board = Board.fromTemplate(
      `__________
       __________
       _____x____
       ___x_x____
       ____xx____
       __________
       __________
       __________
       __________
       __________`)

    this.context.gameOfLife = GameOfLife.init(board)
  }
}


