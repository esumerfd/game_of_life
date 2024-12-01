/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  if (data == "ready") {
    postMessage(`ready: ${Date.now()}`);
  }
});
