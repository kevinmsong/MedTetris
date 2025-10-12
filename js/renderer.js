// ===============================
// RENDERER.JS - Canvas Rendering
// ===============================

class Renderer {
    constructor(canvas, nextPieceCanvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nextPieceCanvas = nextPieceCanvas;
        this.nextPieceCtx = nextPieceCanvas.getContext('2d');
        
        // Particle system for effects
        this.particles = [];
    }

    // Clear canvas
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Draw grid lines
    drawGrid() {
        this.ctx.strokeStyle = '#C8D6E5';
        this.ctx.lineWidth = 1.5;
        
        // Vertical lines
        for (let x = 0; x <= BOARD_WIDTH; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * CELL_SIZE, 0);
            this.ctx.lineTo(x * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= BOARD_HEIGHT; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * CELL_SIZE);
            this.ctx.lineTo(BOARD_WIDTH * CELL_SIZE, y * CELL_SIZE);
            this.ctx.stroke();
        }
        
        // Add danger zone indicator (top 2 rows)
        this.ctx.fillStyle = 'rgba(230, 57, 70, 0.08)';
        this.ctx.fillRect(0, 0, BOARD_WIDTH * CELL_SIZE, 2 * CELL_SIZE);
    }

    // Draw a single cell with medical styling
    drawCell(x, y, color, alpha = 1) {
        const cellX = x * CELL_SIZE;
        const cellY = y * CELL_SIZE;
        
        this.ctx.globalAlpha = alpha;
        
        // Shadow layer (depth effect)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        this.ctx.fillRect(cellX + 2, cellY + 3, CELL_SIZE - 2, CELL_SIZE - 2);
        
        // Main cell with gradient
        const gradient = this.ctx.createLinearGradient(cellX, cellY, cellX, cellY + CELL_SIZE);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, this.darkenColor(color, 0.85));
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(cellX + 1, cellY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        
        // Glossy highlight (top)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.fillRect(cellX + 3, cellY + 3, CELL_SIZE - 6, (CELL_SIZE - 6) / 3);
        
        // Inner glow
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(cellX + 2, cellY + 2, CELL_SIZE - 4, CELL_SIZE - 4);
        
        // Strong border
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(cellX + 1, cellY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        
        this.ctx.globalAlpha = 1;
    }
    
    // Helper to darken colors
    darkenColor(color, factor) {
        const hex = color.replace('#', '');
        const r = Math.floor(parseInt(hex.substr(0, 2), 16) * factor);
        const g = Math.floor(parseInt(hex.substr(2, 2), 16) * factor);
        const b = Math.floor(parseInt(hex.substr(4, 2), 16) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Draw board
    drawBoard(board) {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                if (board.grid[y][x]) {
                    this.drawCell(x, y, board.grid[y][x].color);
                }
            }
        }
    }

    // Draw current piece
    drawPiece(piece, alpha = 1) {
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const drawX = piece.x + x;
                    const drawY = piece.y + y;
                    if (drawY >= 0) {
                        this.drawCell(drawX, drawY, piece.color, alpha);
                        
                        // Add medical cross symbol
                        this.drawMedicalSymbol(drawX, drawY, piece.color);
                    }
                }
            }
        }
    }

    // Draw ghost piece (preview)
    drawGhostPiece(piece, board) {
        const ghostY = piece.getGhostY(board.grid);
        const ghostPiece = { ...piece, y: ghostY };
        
        // Draw filled semi-transparent version
        for (let y = 0; y < ghostPiece.shape.length; y++) {
            for (let x = 0; x < ghostPiece.shape[y].length; x++) {
                if (ghostPiece.shape[y][x]) {
                    const drawX = ghostPiece.x + x;
                    const drawY = ghostPiece.y + y;
                    if (drawY >= 0) {
                        const cellX = drawX * CELL_SIZE;
                        const cellY = drawY * CELL_SIZE;
                        
                        // Filled background
                        this.ctx.fillStyle = piece.color;
                        this.ctx.globalAlpha = 0.15;
                        this.ctx.fillRect(cellX + 2, cellY + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                        
                        // Dashed border
                        this.ctx.globalAlpha = 0.5;
                        this.ctx.strokeStyle = piece.color;
                        this.ctx.lineWidth = 2;
                        this.ctx.setLineDash([4, 4]);
                        this.ctx.strokeRect(cellX + 2, cellY + 2, CELL_SIZE - 4, CELL_SIZE - 4);
                        
                        this.ctx.globalAlpha = 1;
                    }
                }
            }
        }
        
        this.ctx.setLineDash([]);
    }

    // Draw medical symbol on piece
    drawMedicalSymbol(x, y, color) {
        const centerX = x * CELL_SIZE + CELL_SIZE / 2;
        const centerY = y * CELL_SIZE + CELL_SIZE / 2;
        const size = CELL_SIZE / 4;
        
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        
        // Draw small medical cross
        // Vertical bar
        this.ctx.fillRect(centerX - size / 4, centerY - size / 2, size / 2, size);
        // Horizontal bar
        this.ctx.fillRect(centerX - size / 2, centerY - size / 4, size, size / 2);
    }

    // Draw next piece preview
    drawNextPiece(piece) {
        this.nextPieceCtx.clearRect(0, 0, this.nextPieceCanvas.width, this.nextPieceCanvas.height);
        
        if (!piece) return;
        
        const offsetX = (this.nextPieceCanvas.width - piece.shape[0].length * CELL_SIZE) / 2;
        const offsetY = (this.nextPieceCanvas.height - piece.shape.length * CELL_SIZE) / 2;
        
        for (let y = 0; y < piece.shape.length; y++) {
            for (let x = 0; x < piece.shape[y].length; x++) {
                if (piece.shape[y][x]) {
                    const cellX = offsetX + x * CELL_SIZE;
                    const cellY = offsetY + y * CELL_SIZE;
                    
                    // Main cell
                    this.nextPieceCtx.fillStyle = piece.color;
                    this.nextPieceCtx.fillRect(cellX + 1, cellY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                    
                    // Highlight
                    this.nextPieceCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    this.nextPieceCtx.fillRect(cellX + 2, cellY + 2, CELL_SIZE - 6, CELL_SIZE / 3);
                    
                    // Border
                    this.nextPieceCtx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                    this.nextPieceCtx.lineWidth = 2;
                    this.nextPieceCtx.strokeRect(cellX + 1, cellY + 1, CELL_SIZE - 2, CELL_SIZE - 2);
                }
            }
        }
    }

    // Line clear animation
    drawLineClearEffect(lines, frame) {
        const alpha = 1 - (frame / 20); // Fade out over 20 frames
        
        for (const line of lines) {
            // Flash white
            this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            this.ctx.fillRect(0, line * CELL_SIZE, BOARD_WIDTH * CELL_SIZE, CELL_SIZE);
            
            // Add medical cross particles
            if (frame % 3 === 0) {
                for (let i = 0; i < 3; i++) {
                    this.addParticle(
                        Math.random() * BOARD_WIDTH * CELL_SIZE,
                        line * CELL_SIZE + CELL_SIZE / 2,
                        '+',
                        '#00CED1'
                    );
                }
            }
        }
    }

    // Particle system
    addParticle(x, y, symbol, color) {
        this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: -Math.random() * 3 - 1,
            symbol: symbol,
            color: color,
            life: 60,
            maxLife: 60
        });
    }

    // Update and draw particles
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.2; // Gravity
            particle.life--;
            
            // Draw particle
            const alpha = particle.life / particle.maxLife;
            this.ctx.font = '16px Arial';
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = alpha;
            this.ctx.fillText(particle.symbol, particle.x, particle.y);
            this.ctx.globalAlpha = 1;
            
            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    // Render complete frame
    render(board, currentPiece, nextPiece, lineClearFrame = 0, linesToClear = []) {
        // console.log('Rendering frame...'); // Uncomment for debugging
        this.clear();
        this.drawGrid();
        this.drawBoard(board);
        
        // Draw ghost piece
        if (currentPiece && lineClearFrame === 0) {
            this.drawGhostPiece(currentPiece, board);
        }
        
        // Draw current piece
        if (currentPiece && lineClearFrame === 0) {
            this.drawPiece(currentPiece);
        }
        
        // Draw line clear effect
        if (lineClearFrame > 0 && linesToClear.length > 0) {
            this.drawLineClearEffect(linesToClear, lineClearFrame);
        }
        
        // Draw particles
        this.updateParticles();
        
        // Draw next piece
        this.drawNextPiece(nextPiece);
    }
}
