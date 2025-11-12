#include "Board.hpp"
#include <sstream>
#include <algorithm>

Board::Board(int w, int h) : width(w), height(h) {
    grid.resize(height, std::vector<bool>(width, false));
    nextGrid.resize(height, std::vector<bool>(width, false));
}

bool Board::isAlive(int x, int y) const {
    if (x < 0 || x >= width || y < 0 || y >= height) {
        return false;
    }
    return grid[y][x];
}

void Board::setCell(int x, int y, bool alive) {
    if (x >= 0 && x < width && y >= 0 && y < height) {
        grid[y][x] = alive;
    }
}

int Board::countNeighbors(int x, int y) const {
    int count = 0;
    for (int dy = -1; dy <= 1; dy++) {
        for (int dx = -1; dx <= 1; dx++) {
            if (dx == 0 && dy == 0) continue;

            int nx = x + dx;
            int ny = y + dy;

            if (isAlive(nx, ny)) {
                count++;
            }
        }
    }
    return count;
}

void Board::update() {
    // Apply Conway's Game of Life rules
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            int neighbors = countNeighbors(x, y);
            bool currentState = grid[y][x];

            // Rule 1: Any live cell with 2 or 3 neighbors survives
            // Rule 2: Any dead cell with exactly 3 neighbors becomes alive
            // Rule 3: All other cells die or stay dead
            if (currentState && (neighbors == 2 || neighbors == 3)) {
                nextGrid[y][x] = true;
            } else if (!currentState && neighbors == 3) {
                nextGrid[y][x] = true;
            } else {
                nextGrid[y][x] = false;
            }
        }
    }

    // Swap grids
    std::swap(grid, nextGrid);
}

void Board::clear() {
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            grid[y][x] = false;
        }
    }
}

std::string Board::toString() const {
    std::ostringstream oss;

    // Top border
    oss << "+";
    for (int x = 0; x < width; x++) {
        oss << "-";
    }
    oss << "+\n";

    // Grid
    for (int y = 0; y < height; y++) {
        oss << "|";
        for (int x = 0; x < width; x++) {
            oss << (grid[y][x] ? "█" : " ");
        }
        oss << "|\n";
    }

    // Bottom border
    oss << "+";
    for (int x = 0; x < width; x++) {
        oss << "-";
    }
    oss << "+\n";

    return oss.str();
}

void Board::setGlider(int startX, int startY) {
    // Glider pattern:
    //  X
    //   X
    // XXX
    setCell(startX + 1, startY, true);
    setCell(startX + 2, startY + 1, true);
    setCell(startX, startY + 2, true);
    setCell(startX + 1, startY + 2, true);
    setCell(startX + 2, startY + 2, true);
}

void Board::setBeacon(int startX, int startY) {
    // Beacon pattern:
    // XX
    // XX
    //   XX
    //   XX
    setCell(startX, startY, true);
    setCell(startX + 1, startY, true);
    setCell(startX, startY + 1, true);
    setCell(startX + 1, startY + 1, true);

    setCell(startX + 2, startY + 2, true);
    setCell(startX + 3, startY + 2, true);
    setCell(startX + 2, startY + 3, true);
    setCell(startX + 3, startY + 3, true);
}
