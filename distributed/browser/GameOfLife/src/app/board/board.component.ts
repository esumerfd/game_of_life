import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  worker: Worker

  message: string = "hello"

  constructor() {
    this.worker = new Worker(new URL('../board_worker/board.worker', import.meta.url));

    this.message = "running"

  }

  public ready() {
    this.worker.onmessage = ({ data }) => {
      this.message = data
    };
    this.worker.postMessage('ready');
  }

  public status() {
    this.worker.postMessage('status');
  }
}
