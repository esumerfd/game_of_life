import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent {

  public ready() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('../board_worker/board.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        console.log(data);
      };
      worker.postMessage('ready');
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      console.log("oops")
    }
  }
}
