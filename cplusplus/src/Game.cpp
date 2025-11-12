#include "Game.hpp"
#include <iostream>

Game::Game(int width, int height, int delay)
    : board(width, height), generation(0), running(false), delayMs(delay) {
}

void Game::start() {
    running = true;
}

void Game::stop() {
    running = false;
}

void Game::step() {
    board.update();
    generation++;
}

void Game::reset() {
    board.clear();
    generation = 0;
    running = false;
}

void Game::display() {
    // Clear screen (ANSI escape code)
    std::cout << "\033[2J\033[H";

    std::cout << "Conway's Game of Life - Generation: " << generation << "\n";
    std::cout << board.toString();
    std::cout << "\nPress Ctrl+C to stop\n";
}
