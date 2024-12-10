import { Board, Cell } from './board';

export class Rules {
  public static init() {
    return new Rules()
  }

  public check(board: Board) {
    const changes: Array<() => void> = []

    board.eachCell((cell: Cell) => {

      if (cell.isAlive() && cell.neibors() < 2)  changes.push(() => cell.die())
      if (cell.isDead()  && cell.neibors() == 3) changes.push(() => cell.born())
      if (cell.isAlive() && cell.neibors() > 3)  changes.push(() => cell.die())
    })

    return changes
  }

  // public applyChange() {
  //   let randomRow = Math.floor(Math.random() * 10);
  //   let randomCell = Math.floor(Math.random() * 10);

  //   this.state[randomRow][randomCell] = Cell.ALIVE
  // }
}



