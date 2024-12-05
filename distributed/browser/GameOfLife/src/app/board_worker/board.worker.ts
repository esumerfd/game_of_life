/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data == "ready") {
    postMessage(`ready: ${Date.now()}`);
  }
});

function initialize() {
  setInterval(loop, 1000)
}

let board = [Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________"),Array.from("__________")]

function loop() {
  applyChange(board)

  let encodedBoard = encodeBoard(board)

  postMessage(encodedBoard)
}

function applyChange(board: Array<Array<string>>) {
  let randomRow = Math.floor(Math.random() * 10);
  let randomCell = Math.floor(Math.random() * 10);

  board[randomRow][randomCell] = "X"
}

function encodeBoard(board: Array<Array<string>>): string {
  let encodedBoard = ""
  for (let row in board) {
    encodedBoard += board[row].join("") + "\n"
  }
  return encodedBoard
}

initialize()
