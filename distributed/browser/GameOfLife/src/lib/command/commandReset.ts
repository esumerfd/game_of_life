import { ICommandDiscovery,  ICommandRunner } from './command'
import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'
import { Context } from '../../lib/domain/context'

export class CommandReset implements ICommandDiscovery, ICommandRunner {

  context: Context

  public constructor(context: Context) {
    this.context = context
  }

  public isSupported(command: any) {
    return command == 'get'
  }

  public run() {
    let board = this.context.initialBoard.clone()
    this.context.gameOfLife = GameOfLife.init(board)
  }
}


