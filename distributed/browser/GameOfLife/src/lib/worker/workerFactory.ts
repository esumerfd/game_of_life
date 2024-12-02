import { Component } from '@angular/core';

export class WorkerFactory {

  static board(messageHandler: (message: string) => void): Worker {

    const worker = new Worker(new URL('../../app/board_worker/board.worker', import.meta.url));
    worker.onmessage = ({ data }) => {
      messageHandler(data)
    };

    return worker
  }

}
