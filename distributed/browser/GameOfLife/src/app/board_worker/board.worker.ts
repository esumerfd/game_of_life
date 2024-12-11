/// <reference lib="webworker" />

import { GameOfLife } from '../../lib/domain/gameOfLife'
import { Board } from '../../lib/domain/board'

const board = Board.fromTemplate(
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

let gameOfLife = GameOfLife.init(board)

addEventListener('message', ({ data }) => {
  if (data == "reset") {
    gameOfLife = GameOfLife.init(Board.init())
  }
  else if (data == "get") {
    let encodedBoard = gameOfLife.board.encode()
    postMessage(encodedBoard)
  }
});

function initialize() {
  setInterval(loop, 1000)
}

function loop() {
  gameOfLife.update()
}

initialize()
