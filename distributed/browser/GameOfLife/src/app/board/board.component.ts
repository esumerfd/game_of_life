import { Component } from '@angular/core';
import { WorkerFactory } from '../../lib/worker/workerFactory';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  worker: Worker

  message: string

  constructor() {

    this.worker = WorkerFactory.board(data => {
      this.message = data
    });

    this.message = ""
  }

  public ready() {
    this.worker.postMessage('ready');
  }

  public status() {
    this.worker.postMessage('status');
  }
}
