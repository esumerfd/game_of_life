/// <reference lib="webworker" />

import { Board } from '../../lib/domain/board'

let board = Board.init()

addEventListener('message', ({ data }) => {
  if (data == "reset") {
    board = Board.init()
  }
  else if (data == "get") {
    let encodedBoard = board.encode()
    postMessage(encodedBoard)
  }
});

function initialize() {
  setInterval(loop, 1000)
}

function loop() {
  board.applyChange()
}

initialize()
