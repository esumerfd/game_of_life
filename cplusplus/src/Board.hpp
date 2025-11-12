#ifndef BOARD_HPP
#define BOARD_HPP

#include <vector>
#include <string>

class Board {
private:
    int width;
    int height;
    std::vector<std::vector<bool>> grid;
    std::vector<std::vector<bool>> nextGrid;

public:
    Board(int w, int h);

    // Cell access
    bool isAlive(int x, int y) const;
    void setCell(int x, int y, bool alive);

    // Grid operations
    int countNeighbors(int x, int y) const;
    void update();
    void clear();

    // Display
    std::string toString() const;

    // Getters
    int getWidth() const { return width; }
    int getHeight() const { return height; }

    // Pattern initialization
    void setGlider(int startX, int startY);
    void setBeacon(int startX, int startY);
};

#endif
