// ===============================
// BOARD.JS - Game Board Management
// ===============================

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;

class GameBoard {
    constructor() {
        this.grid = this.createEmptyGrid();
        this.linesToClear = [];
    }

    // Create empty grid
    createEmptyGrid() {
        return Array.from({ length: BOARD_HEIGHT }, () => 
            Array(BOARD_WIDTH).fill(0)
        );
    }

    // Reset board
    reset() {
        this.grid = this.createEmptyGrid();
        this.linesToClear = [];
    }

    // Lock piece onto board
    lockPiece(piece) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const boardY = piece.y + y;
                    const boardX = piece.x + x;
                    
                    if (boardY >= 0 && boardY < BOARD_HEIGHT && 
                        boardX >= 0 && boardX < BOARD_WIDTH) {
                        this.grid[boardY][boardX] = {
                            value: piece.shape[y][x],
                            color: piece.color
                        };
                    }
                }
            }
        }
    }

    // Check for completed lines
    checkLines() {
        const completedLines = [];
        
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            if (this.grid[y].every(cell => cell !== 0)) {
                completedLines.push(y);
            }
        }
        
        return completedLines;
    }

    // Clear completed lines with animation preparation
    clearLines(lines) {
        this.linesToClear = lines;
        
        // Remove cleared lines
        for (const line of lines.sort((a, b) => b - a)) {
            this.grid.splice(line, 1);
            this.grid.unshift(Array(BOARD_WIDTH).fill(0));
        }
        
        return lines.length;
    }

    // Check if game is over (pieces at top)
    isGameOver() {
        // Check top two rows
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (this.grid[y][x] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    // Get board fill percentage
    getFillPercentage() {
        let filledCells = 0;
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (this.grid[y][x] !== 0) {
                    filledCells++;
                }
            }
        }
        return Math.round((filledCells / (BOARD_WIDTH * BOARD_HEIGHT)) * 100);
    }

    // Get the highest filled row (for danger zone)
    getHighestFilledRow() {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (this.grid[y][x] !== 0) {
                    return y;
                }
            }
        }
        return BOARD_HEIGHT - 1;
    }

    // Clone grid for ghost piece calculation
    cloneGrid() {
        return this.grid.map(row => [...row]);
    }
}
