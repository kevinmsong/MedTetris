// ===============================
// GAME.JS - Main Game Engine
// ===============================

class MedicalTetris {
    constructor() {
        // Canvas setup
        this.canvas = document.getElementById('gameCanvas');
        this.nextPieceCanvas = document.getElementById('nextPieceCanvas');
        
        // Game components
        this.board = new GameBoard();
        this.renderer = new Renderer(this.canvas, this.nextPieceCanvas);
        this.controls = new Controls(this);
        this.audio = new AudioManager();
        this.tetrominoBag = new TetrominoBag();
        
        // Game state
        this.state = 'MENU';
        this.currentPiece = null;
        this.nextPiece = null;
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.highScore = this.loadHighScore();
        this.combo = 0;
        
        // Timing
        this.dropInterval = 1000; // ms
        this.lastDropTime = 0;
        this.lineClearFrame = 0;
        this.linesToClear = [];
        
        // Animation
        this.animationId = null;
        
        this.setupUI();
        this.updateDisplay();
        
        // Initial render of empty board
        this.renderInitial();
    }
    
    renderInitial() {
        // Draw the empty board on the start screen
        try {
            console.log('Rendering initial board...');
            console.log('Canvas size:', this.canvas.width, 'x', this.canvas.height);
            console.log('Context:', this.renderer.ctx);
            
            this.renderer.clear();
            this.renderer.drawGrid();
            this.renderer.drawBoard(this.board);
            console.log('Initial board rendered');
        } catch (error) {
            console.error('Error rendering initial board:', error);
            console.error('Stack:', error.stack);
        }
    }

    setupUI() {
        // Start button
        document.getElementById('startButton').addEventListener('click', () => {
            this.start();
        });
        
        // Restart button
        document.getElementById('restartButton').addEventListener('click', () => {
            this.restart();
        });
        
        // Sound toggle
        document.getElementById('soundToggle').addEventListener('click', () => {
            const enabled = this.audio.toggle();
            document.getElementById('soundIcon').textContent = enabled ? '🔊' : '🔇';
            document.getElementById('soundStatus').textContent = enabled ? 'ON' : 'OFF';
        });
    }

    start() {
        console.log('Game starting...');
        this.audio.init();
        this.state = 'PLAYING';
        this.board.reset();
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        this.combo = 0;
        this.dropInterval = 1000;
        
        this.currentPiece = this.tetrominoBag.getNext();
        this.nextPiece = this.tetrominoBag.getNext();
        
        console.log('Current piece:', this.currentPiece);
        console.log('Next piece:', this.nextPiece);
        
        document.getElementById('startOverlay').classList.add('hidden');
        document.getElementById('gameOverOverlay').classList.add('hidden');
        
        this.updateDisplay();
        this.lastDropTime = Date.now();
        console.log('Starting game loop...');
        this.gameLoop();
    }

    restart() {
        this.start();
    }

    togglePause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            document.getElementById('pauseOverlay').classList.remove('hidden');
        } else if (this.state === 'PAUSED') {
            this.state = 'PLAYING';
            document.getElementById('pauseOverlay').classList.add('hidden');
            this.lastDropTime = Date.now();
        }
    }

    movePiece(dx, dy) {
        if (this.currentPiece && this.currentPiece.move(dx, dy, this.board.grid)) {
            if (dx !== 0) {
                this.audio.playMove();
            }
            return true;
        }
        return false;
    }

    rotatePiece() {
        if (this.currentPiece && this.currentPiece.rotateWithKicks(this.board.grid)) {
            this.audio.playRotate();
        }
    }

    softDrop() {
        if (this.movePiece(0, 1)) {
            this.score += 1;
            this.updateDisplay();
        }
    }

    hardDrop() {
        if (!this.currentPiece) return;
        
        const distance = this.currentPiece.hardDrop(this.board.grid);
        this.score += distance * 2;
        this.lockPiece();
        this.updateDisplay();
    }

    lockPiece() {
        this.audio.playLock();
        this.board.lockPiece(this.currentPiece);
        
        const completedLines = this.board.checkLines();
        
        if (completedLines.length > 0) {
            this.handleLineClears(completedLines);
        } else {
            this.combo = 0;
            this.spawnNewPiece();
        }
    }

    handleLineClears(lines) {
        this.linesToClear = lines;
        this.lineClearFrame = 20;
        
        // Calculate score
        const lineScores = {
            1: 100,
            2: 300,
            3: 500,
            4: 800
        };
        
        const baseScore = lineScores[lines.length] || 0;
        const levelMultiplier = this.level;
        const comboBonus = this.combo * 50;
        
        this.score += (baseScore * levelMultiplier) + comboBonus;
        this.lines += lines.length;
        this.combo++;
        
        // Level up every 10 lines
        const newLevel = Math.floor(this.lines / 10) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 50);
            this.audio.playLevelUp();
            this.checkAchievements();
        }
        
        // Play sounds
        if (lines.length === 4) {
            this.audio.playTetris();
            this.showMessage('TETRIS! Perfect Treatment!');
        } else {
            this.audio.playClear(lines.length);
        }
        
        if (this.combo > 1) {
            this.audio.playCombo(this.combo);
            this.showMessage(`COMBO x${this.combo}!`);
        }
        
        // Add particle effects
        for (const line of lines) {
            for (let i = 0; i < 10; i++) {
                this.renderer.addParticle(
                    i * CELL_SIZE + CELL_SIZE / 2,
                    line * CELL_SIZE + CELL_SIZE / 2,
                    ['⚕️', '+', '♥'][Math.floor(Math.random() * 3)],
                    '#00CED1'
                );
            }
        }
        
        this.updateDisplay();
    }

    spawnNewPiece() {
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.tetrominoBag.getNext();
        
        // Check game over
        if (!this.currentPiece.canMove(this.currentPiece.x, this.currentPiece.y, this.currentPiece.shape, this.board.grid)) {
            this.gameOver();
        }
    }

    gameOver() {
        this.state = 'GAME_OVER';
        this.audio.playGameOver();
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.saveHighScore();
            this.showMessage('NEW HIGH SCORE! Chief of Medicine!');
        }
        
        // Show game over screen
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLevel').textContent = this.level;
        document.getElementById('finalLines').textContent = this.lines;
        document.getElementById('gameOverOverlay').classList.remove('hidden');
        
        this.updateDisplay();
    }

    showMessage(message) {
        // Simple toast notification (could be enhanced)
        console.log(message);
    }

    updateDisplay() {
        // Update score displays
        document.getElementById('score').textContent = this.score;
        document.getElementById('level').textContent = this.level;
        document.getElementById('lines').textContent = this.lines;
        document.getElementById('highScore').textContent = this.highScore;
        
        // Update capacity bar
        const fillPercent = this.board.getFillPercentage();
        const capacityBar = document.getElementById('capacityBar');
        capacityBar.style.width = fillPercent + '%';
        
        if (fillPercent > 70) {
            capacityBar.classList.add('danger');
            capacityBar.classList.remove('warning');
        } else if (fillPercent > 50) {
            capacityBar.classList.add('warning');
            capacityBar.classList.remove('danger');
        } else {
            capacityBar.classList.remove('warning', 'danger');
        }
        
        document.getElementById('capacityPercent').textContent = fillPercent + '%';
        
        // Update status badge
        const statusBadge = document.getElementById('statusBadge');
        if (this.state === 'PLAYING') {
            statusBadge.textContent = 'ACTIVE';
            statusBadge.classList.add('active');
            statusBadge.classList.remove('critical');
        } else if (fillPercent > 80) {
            statusBadge.textContent = 'CRITICAL';
            statusBadge.classList.add('critical');
            statusBadge.classList.remove('active');
        } else {
            statusBadge.textContent = 'READY';
            statusBadge.classList.remove('active', 'critical');
        }
        
        // Update ECG line based on level
        const ecgLine = document.getElementById('ecgLine');
        const speed = Math.min(this.level * 0.2, 2);
        ecgLine.style.setProperty('--pulse-speed', `${2 - speed}s`);
    }

    checkAchievements() {
        // Check and unlock achievements
        if (this.lines >= 10) {
            document.getElementById('achievement1').classList.add('unlocked');
        }
        if (this.level >= 5) {
            document.getElementById('achievement2').classList.add('unlocked');
        }
        if (this.score >= 10000) {
            document.getElementById('achievement3').classList.add('unlocked');
        }
    }

    gameLoop() {
        if (this.state !== 'PLAYING') {
            if (this.state !== 'GAME_OVER') {
                this.animationId = requestAnimationFrame(() => this.gameLoop());
            }
            console.log('Game loop stopped, state:', this.state);
            return;
        }
        
        const now = Date.now();
        
        // Handle line clear animation
        if (this.lineClearFrame > 0) {
            this.lineClearFrame--;
            if (this.lineClearFrame === 0) {
                this.board.clearLines(this.linesToClear);
                this.linesToClear = [];
                this.spawnNewPiece();
            }
        } else {
            // Normal game update
            this.controls.update();
            
            // Auto drop
            if (now - this.lastDropTime > this.dropInterval) {
                if (!this.movePiece(0, 1)) {
                    this.lockPiece();
                }
                this.lastDropTime = now;
            }
        }
        
        // Render
        try {
            this.renderer.render(
                this.board,
                this.currentPiece,
                this.nextPiece,
                this.lineClearFrame,
                this.linesToClear
            );
        } catch (error) {
            console.error('Render error:', error);
        }
        
        this.animationId = requestAnimationFrame(() => this.gameLoop());
    }

    saveHighScore() {
        try {
            localStorage.setItem('medicalTetrisHighScore', this.highScore.toString());
        } catch (e) {
            console.warn('Could not save high score');
        }
    }

    loadHighScore() {
        try {
            const saved = localStorage.getItem('medicalTetrisHighScore');
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            return 0;
        }
    }
}

// Initialize game when page loads
let game;
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    try {
        game = new MedicalTetris();
        console.log('Game initialized successfully');
        console.log('Canvas:', game.canvas);
        console.log('Board:', game.board);
        console.log('Renderer:', game.renderer);
    } catch (error) {
        console.error('Error initializing game:', error);
    }
});
