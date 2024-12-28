import { CommandReset } from '../../lib/command/commandReset'
import { CommandGet } from '../../lib/command/commandGet'
import { CommandBeacon } from '../../lib/command/commandBeacon'
import { CommandGlider } from '../../lib/command/commandGlider'
import { CommandNoop } from '../../lib/command/commandNoop'
import { Context } from '../../lib/domain/context'

export class CommandFactory {
  public static create(data: any, context: Context)  {
    if (data.command === 'reset') return new CommandReset(context)
    else if (data.command === 'get') return new CommandGet(context)
    else if (data.command === 'beacon') return new CommandBeacon(context)
    else if (data.command === 'glider') return new CommandGlider(context)
    else return new CommandNoop()
  }
}
