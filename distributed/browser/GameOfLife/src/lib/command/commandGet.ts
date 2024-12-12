import { ICommandDiscovery,  ICommandRunner } from './command'
import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'
import { Context } from '../../lib/domain/context'

export class CommandGet implements ICommandDiscovery, ICommandRunner {

  context: Context

  public constructor(context: Context) {
    this.context = context
  }

  public isSupported(command: any) {
    return command == 'get'
  }

  public run() {
    let encodedBoard = this.context.gameOfLife.board.encode()
    postMessage(encodedBoard)
  }
}


