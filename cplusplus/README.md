# Game of Life - C++ Implementation

A C++ implementation of Conway's Game of Life.

## Features

- Efficient grid-based simulation
- Double-buffered updates for correctness
- Predefined patterns (Glider, Beacon)
- Console-based visualization
- Configurable board size and simulation speed

## Building

```bash
make
```

## Running

```bash
make run
```

Or directly:

```bash
./bin/game_of_life
```

## Project Structure

- `src/Board.hpp/cpp` - Board class managing the grid and cell states
- `src/Game.hpp/cpp` - Game class handling simulation control
- `src/main.cpp` - Entry point with pattern initialization
- `Makefile` - Build configuration

## Game Rules

Conway's Game of Life follows these rules:

1. Any live cell with 2 or 3 neighbors survives
2. Any dead cell with exactly 3 neighbors becomes alive
3. All other cells die or stay dead

## Patterns Included

- **Glider**: A small moving pattern that travels diagonally
- **Beacon**: An oscillator that alternates between two states
