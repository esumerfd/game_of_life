#include "Game.hpp"
#include <iostream>
#include <thread>
#include <chrono>

int main() {
    // Create a 40x20 board with 200ms delay between generations
    Game game(40, 20, 200);

    // Initialize with patterns
    Board& board = game.getBoard();

    // Add a glider in top-left area
    board.setGlider(5, 5);

    // Add a beacon in the middle
    board.setBeacon(20, 10);

    // Add another glider
    board.setGlider(30, 2);

    std::cout << "Starting Conway's Game of Life...\n";
    std::cout << "Press Ctrl+C to stop\n\n";

    std::this_thread::sleep_for(std::chrono::seconds(2));

    game.start();

    // Main game loop
    while (true) {
        game.display();
        game.step();
        std::this_thread::sleep_for(std::chrono::milliseconds(200));
    }

    return 0;
}
