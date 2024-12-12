import { ICommandDiscovery,  ICommandRunner } from './command'

export class CommandNoop implements ICommandDiscovery, ICommandRunner {
  public isSupported() { return false }
  public run() {}
}
