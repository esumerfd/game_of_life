/// <reference lib="webworker" />
import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'
import { Context } from '../../lib/domain/context'
import { CommandFactory } from '../../lib/command/commandFactory'

let context: Context = new Context()

addEventListener('message', ({data}) => {
  CommandFactory.create(data, context).run()
});

function initialize() {
  setInterval(loop, 1000)
}

function loop() {
  context.gameOfLife.update()
}

initialize()
