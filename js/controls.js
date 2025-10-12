// ===============================
// CONTROLS.JS - Input Handling
// ===============================

class Controls {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.lastMoveTime = 0;
        this.moveDelay = 100; // ms between moves
        this.lastDropTime = 0;
        this.dropDelay = 50; // ms for soft drop
        
        this.setupKeyboard();
        this.setupTouch();
    }

    setupKeyboard() {
        document.addEventListener('keydown', (e) => {
            if (this.game.state === 'MENU') return;
            
            this.keys[e.key] = true;
            
            // Prevent default for game keys
            if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'p', 'P', 'Escape', 'r', 'R', 'z', 'Z', 'x', 'X'].includes(e.key)) {
                e.preventDefault();
            }
            
            // Handle immediate actions
            this.handleKeyPress(e.key);
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    handleKeyPress(key) {
        const now = Date.now();
        
        switch (key) {
            case 'p':
            case 'P':
            case 'Escape':
                this.game.togglePause();
                break;
                
            case 'r':
            case 'R':
                if (this.game.state === 'GAME_OVER') {
                    this.game.restart();
                }
                break;
                
            case 'ArrowUp':
            case 'z':
            case 'Z':
                if (this.game.state === 'PLAYING') {
                    this.game.rotatePiece();
                }
                break;
                
            case 'x':
            case 'X':
                if (this.game.state === 'PLAYING') {
                    this.game.rotatePiece();
                }
                break;
                
            case ' ':
                if (this.game.state === 'PLAYING') {
                    this.game.hardDrop();
                }
                break;
        }
    }

    update() {
        if (this.game.state !== 'PLAYING') return;
        
        const now = Date.now();
        
        // Handle continuous movement
        if (this.keys['ArrowLeft'] && now - this.lastMoveTime > this.moveDelay) {
            this.game.movePiece(-1, 0);
            this.lastMoveTime = now;
        }
        
        if (this.keys['ArrowRight'] && now - this.lastMoveTime > this.moveDelay) {
            this.game.movePiece(1, 0);
            this.lastMoveTime = now;
        }
        
        // Handle soft drop
        if (this.keys['ArrowDown'] && now - this.lastDropTime > this.dropDelay) {
            this.game.softDrop();
            this.lastDropTime = now;
        }
    }

    setupTouch() {
        // Touch controls for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.game.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });
        
        this.game.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        });
        
        this.game.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (this.game.state !== 'PLAYING') return;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            const threshold = 30;
            
            // Swipe detection
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (Math.abs(deltaX) > threshold) {
                    if (deltaX > 0) {
                        this.game.movePiece(1, 0);
                    } else {
                        this.game.movePiece(-1, 0);
                    }
                }
            } else {
                // Vertical swipe
                if (deltaY > threshold) {
                    this.game.softDrop();
                } else if (deltaY < -threshold) {
                    this.game.hardDrop();
                }
            }
            
            // Tap to rotate
            if (Math.abs(deltaX) < threshold && Math.abs(deltaY) < threshold) {
                this.game.rotatePiece();
            }
        });
    }
}
