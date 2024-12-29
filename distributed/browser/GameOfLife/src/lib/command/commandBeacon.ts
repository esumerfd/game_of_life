import { ICommandDiscovery,  ICommandRunner } from './command'
import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'
import { Context } from '../../lib/domain/context'

export class CommandBeacon implements ICommandDiscovery, ICommandRunner {

  context: Context

  public constructor(context: Context) {
    this.context = context
  }

  public isSupported(command: any) {
    return command == 'beacon'
  }

  public run() {
    fetch("http://localhost:4200/api/beacon")
      .then((response) => {
        return response.text()
      })
      .then((template) => {
        let board = Board.fromTemplate(template)
        this.context.gameOfLife = GameOfLife.init(board)
      })
  }
}


