#ifndef GAME_HPP
#define GAME_HPP

#include "Board.hpp"
#include <chrono>
#include <thread>

class Game {
private:
    Board board;
    int generation;
    bool running;
    int delayMs;

public:
    Game(int width, int height, int delay = 200);

    // Simulation control
    void start();
    void stop();
    void step();
    void reset();

    // Display
    void display();

    // Getters
    int getGeneration() const { return generation; }
    Board& getBoard() { return board; }
};

#endif
