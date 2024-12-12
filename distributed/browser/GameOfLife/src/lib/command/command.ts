export interface ICommandDiscovery {
  isSupported(command: any): boolean
}

export interface ICommandRunner {
  run(command: any): void
}


