// ===============================
// TETROMINO.JS - Piece Management
// ===============================

// Tetromino shapes - Medical themed pieces
const TETROMINOS = {
    I: {
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: '#06D6A0', // Bright medical cyan - Syringe
        name: 'Syringe'
    },
    O: {
        shape: [
            [2, 2],
            [2, 2]
        ],
        color: '#E63946', // Medical red - Pill bottle
        name: 'Pill Bottle'
    },
    T: {
        shape: [
            [0, 3, 0],
            [3, 3, 3],
            [0, 0, 0]
        ],
        color: '#118AB2', // Hospital teal - Stethoscope
        name: 'Stethoscope'
    },
    S: {
        shape: [
            [0, 4, 4],
            [4, 4, 0],
            [0, 0, 0]
        ],
        color: '#FFD23F', // Bright yellow - Bandage
        name: 'Bandage'
    },
    Z: {
        shape: [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0]
        ],
        color: '#9D4EDD', // Medical purple - Medical tape
        name: 'Medical Tape'
    },
    J: {
        shape: [
            [6, 0, 0],
            [6, 6, 6],
            [0, 0, 0]
        ],
        color: '#4CC9F0', // Bright blue - IV drip
        name: 'IV Drip'
    },
    L: {
        shape: [
            [0, 0, 7],
            [7, 7, 7],
            [0, 0, 0]
        ],
        color: '#FF6B35', // Emergency orange - Thermometer
        name: 'Thermometer'
    }
};

class Tetromino {
    constructor(type) {
        this.type = type;
        this.shape = JSON.parse(JSON.stringify(TETROMINOS[type].shape));
        this.color = TETROMINOS[type].color;
        this.name = TETROMINOS[type].name;
        this.x = Math.floor((BOARD_WIDTH - this.shape[0].length) / 2);
        this.y = 0;
    }

    // Rotate piece clockwise
    rotate() {
        const newShape = this.shape[0].map((_, i) =>
            this.shape.map(row => row[i]).reverse()
        );
        return newShape;
    }

    // Get ghost piece (preview where piece will land)
    getGhostY(board) {
        let ghostY = this.y;
        while (this.canMove(this.x, ghostY + 1, this.shape, board)) {
            ghostY++;
        }
        return ghostY;
    }

    // Check if piece can move to new position
    canMove(newX, newY, newShape, board) {
        for (let y = 0; y < newShape.length; y++) {
            for (let x = 0; x < newShape[y].length; x++) {
                if (newShape[y][x]) {
                    const boardX = newX + x;
                    const boardY = newY + y;

                    // Check boundaries
                    if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
                        return false;
                    }

                    // Check collision with existing pieces (ignore if above board)
                    if (boardY >= 0 && board[boardY][boardX]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // Move piece
    move(dx, dy, board) {
        const newX = this.x + dx;
        const newY = this.y + dy;
        
        if (this.canMove(newX, newY, this.shape, board)) {
            this.x = newX;
            this.y = newY;
            return true;
        }
        return false;
    }

    // Rotate piece with wall kicks
    rotateWithKicks(board) {
        const newShape = this.rotate();
        
        // Try standard rotation
        if (this.canMove(this.x, this.y, newShape, board)) {
            this.shape = newShape;
            return true;
        }

        // Try wall kicks (Super Rotation System)
        const kicks = [
            [1, 0],   // Right
            [-1, 0],  // Left
            [0, -1],  // Up
            [2, 0],   // Right 2
            [-2, 0]   // Left 2
        ];

        for (const [kickX, kickY] of kicks) {
            if (this.canMove(this.x + kickX, this.y + kickY, newShape, board)) {
                this.x += kickX;
                this.y += kickY;
                this.shape = newShape;
                return true;
            }
        }

        return false;
    }

    // Hard drop
    hardDrop(board) {
        let dropDistance = 0;
        while (this.move(0, 1, board)) {
            dropDistance++;
        }
        return dropDistance;
    }
}

// Generate random tetromino
function getRandomTetromino() {
    const types = Object.keys(TETROMINOS);
    const randomType = types[Math.floor(Math.random() * types.length)];
    return new Tetromino(randomType);
}

// Bag randomizer for better piece distribution
class TetrominoBag {
    constructor() {
        this.bag = [];
        this.refillBag();
    }

    refillBag() {
        const types = Object.keys(TETROMINOS);
        this.bag = [...types].sort(() => Math.random() - 0.5);
    }

    getNext() {
        if (this.bag.length === 0) {
            this.refillBag();
        }
        const type = this.bag.pop();
        return new Tetromino(type);
    }
}
