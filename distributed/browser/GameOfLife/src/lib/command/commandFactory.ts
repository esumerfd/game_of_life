import { CommandReset } from '../../lib/command/commandReset'
import { CommandGet } from '../../lib/command/commandGet'
import { CommandNoop } from '../../lib/command/commandNoop'
import { Context } from '../../lib/domain/context'

export class CommandFactory {
  public static create(data: any, context: Context)  {
    if (data.command === 'reset') return new CommandReset(context)
    else if (data.command === 'get') return new CommandGet(context)
    else return new CommandNoop()
  }
}
