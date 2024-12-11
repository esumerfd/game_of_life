import { Board, Cell, Location } from './board';

export class Rules {
  public static init() {
    return new Rules()
  }

  public check(board: Board) {
    const changes: Array<() => void> = []

    board.eachCell((cell: Cell, location: Location) => {

      if (cell.isAlive() && cell.neibors() < 2)   changes.push(() => cell.die())
      if (cell.isDead()  && cell.neibors() === 3) changes.push(() => cell.born())
      if (cell.isAlive() && cell.neibors() > 3)   changes.push(() => cell.die())
    })

    return changes
  }
}



