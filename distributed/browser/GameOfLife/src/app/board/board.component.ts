import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WorkerFactory } from '../../lib/worker/workerFactory'

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  worker: Worker

  message: string = ""

  rows: Array<Array<string>> = [Array.from("Please wait. Rendering.")]

  constructor() {
    this.worker = WorkerFactory.board((data) => this.render(data));
  }

  public ready() {
    this.worker.postMessage('ready');
  }

  public render(message: string) {
    this.message = "Running"

    let rows = this.parseBoard(message)

    this.renderRows(rows)
  }

  parseBoard(encodedBoard: string): Array<Array<string>> {
    let rows: Array<Array<string>> = []

    let encodedRows = encodedBoard.split('\n')
    encodedRows.forEach((encodedRow: string) => {
      rows.push(Array.from(encodedRow))
    })

    return rows
  }

  renderRows(rows: Array<Array<string>>) {

    this.rows = []
    let renderRow: Array<string>
    this.each_row(rows, (row: Array<string>) => {
      renderRow = []
      this.rows.push(renderRow)
      this.each_cell(row, (cell: string) => {
        renderRow.push(cell)
      })
    })
  }

  each_row(rows: Array<Array<string>>, renderRow: (row: Array<string>) => void) {
    Array.from(rows).forEach(renderRow)
  }

  each_cell(row: Array<string>, renderCell: (cell: string) => void) {
    Array.from(row).forEach((cell) => renderCell(cell) )
  }
}
