function lets_go() {
  const element = document.getElementById("board")
  const board = new Board(element)

  board.render();

}

class Board {
  constructor(element) {
    this.board = element
  }

  render() {
    this.board.innerHTML = "<table><tr><td>_</td><td>_</td></tr></table>"
  }
}
