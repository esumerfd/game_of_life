# Game of Life - Distributed

So, what does that mean, firstly, the game of life is about births, and deaths, which is about states transitioning based on a set of rule, not unlike any appliation.

    [Game of Life Rules](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

We will host a Game of Life board in a browser, distribute the rull engine to the server, and use a set of entirely unnecessary technologies to distribute the state changes to the board.

## Browser

* Servie Worker

Incongurent to the simple solution a worker will intercept calls to the server for a state change and mutate them into an event that can be understood by the browser app.

* Web Worker

Since performance is so critical we will employ a multi-threaded approach to ensure that we can work through the volume of state changes as they arrive.

* DOM

In the Dom we will host a table, yes vomit if you like, a table that represents the cells of the grid of the board.

* No wasm

Phase 2 perhaps.




