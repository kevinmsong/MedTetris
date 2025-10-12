// ===============================
// AUDIO.JS - Sound Management
// ===============================

class AudioManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.sounds = {};
        
        // Initialize audio context on first user interaction
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Play medical beep sound
    playBeep(frequency = 440, duration = 0.1, type = 'sine') {
        if (!this.enabled || !this.initialized) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Error playing sound:', e);
        }
    }

    // Movement sound
    playMove() {
        this.playBeep(600, 0.05, 'sine');
    }

    // Rotation sound
    playRotate() {
        this.playBeep(800, 0.08, 'square');
    }

    // Piece lock sound
    playLock() {
        this.playBeep(400, 0.15, 'triangle');
    }

    // Line clear sound
    playClear(lines) {
        if (!this.enabled || !this.initialized) return;
        
        // Medical success chime
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C
        
        frequencies.slice(0, lines).forEach((freq, i) => {
            setTimeout(() => {
                this.playBeep(freq, 0.2, 'sine');
            }, i * 100);
        });
    }

    // Tetris (4 lines) sound
    playTetris() {
        if (!this.enabled || !this.initialized) return;
        
        // Emergency code clear sound
        const melody = [
            {freq: 523, time: 0},
            {freq: 659, time: 100},
            {freq: 784, time: 200},
            {freq: 1047, time: 300},
            {freq: 1047, time: 400},
            {freq: 1047, time: 500}
        ];
        
        melody.forEach(note => {
            setTimeout(() => {
                this.playBeep(note.freq, 0.15, 'sine');
            }, note.time);
        });
    }

    // Level up sound
    playLevelUp() {
        if (!this.enabled || !this.initialized) return;
        
        // Hospital PA notification
        const sequence = [
            {freq: 800, time: 0},
            {freq: 1000, time: 150},
            {freq: 800, time: 300}
        ];
        
        sequence.forEach(note => {
            setTimeout(() => {
                this.playBeep(note.freq, 0.12, 'sine');
            }, note.time);
        });
    }

    // Game over sound
    playGameOver() {
        if (!this.enabled || !this.initialized) return;
        
        // Flatline sound
        this.playBeep(200, 1.5, 'sawtooth');
    }

    // Heartbeat background (passive)
    startHeartbeat(bpm = 60) {
        if (!this.enabled || !this.initialized) return;
        
        const interval = (60 / bpm) * 1000;
        
        const beat = () => {
            this.playBeep(100, 0.08, 'sine');
            setTimeout(() => {
                this.playBeep(120, 0.08, 'sine');
            }, 150);
        };
        
        // Store interval for cleanup
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
        
        this.heartbeatInterval = setInterval(beat, interval);
    }

    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }

    // Combo sound
    playCombo(comboCount) {
        const freq = 600 + (comboCount * 100);
        this.playBeep(Math.min(freq, 1500), 0.15, 'square');
    }
}
