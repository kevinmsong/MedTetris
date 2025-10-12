# 🏥 Medical Tetris - Clinical Edition

A fully-featured, medical-themed Tetris game with hospital aesthetics, clinical terminology, and engaging gameplay built with pure HTML5, CSS3, and JavaScript.

[![Version](https://img.shields.io/badge/version-1.0-blue)](https://github.com/yourusername/medical-tetris)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<div align="center">
  
  ![Medical Tetris Banner](https://via.placeholder.com/800x400/0066CC/FFFFFF?text=Medical+Tetris+🏥+Play+Now!)
  
  <p><em>🎮 Experience the thrill of organizing medical supplies! ⚕️</em></p>
  
  > **Note**: Replace this placeholder with `assets/gameplay.gif` once created. See [HOW_TO_CREATE_GIF.md](assets/HOW_TO_CREATE_GIF.md) for instructions.
  
</div>

---

## 🎮 [Play Now!](https://yourusername.github.io/medical-tetris/)

---

## 🎮 Features

### Core Gameplay
- **Classic Tetris mechanics** with modern enhancements
- **7 medical-themed pieces**: Syringes, pill bottles, stethoscopes, bandages, medical tape, IV drips, and thermometers
- **Ghost piece preview** showing where pieces will land
- **Wall kick rotation system** for smooth gameplay
- **Hard drop and soft drop** mechanics
- **Combo system** for consecutive line clears

### Medical Theme
- **Hospital color scheme** with clinical blues, greens, and whites
- **Medical terminology**: "Treatment Points", "Emergency Level", "Cases Resolved"
- **Particle effects** with medical symbols (⚕️, +, ♥)
- **ECG-style speed monitor** that pulses with game intensity
- **Storage capacity indicator** showing board fill percentage
- **Achievement system** tracking player progress

### Audio
- **Medical-themed sound effects**:
  - Movement beeps (medical equipment sounds)
  - Line clear success chimes
  - Level up hospital PA notifications
  - Game over flatline tone
  - Combo sounds
- **Mute/unmute toggle** for sound control
- **Web Audio API** for high-quality procedural sounds

### Visual Effects
- **Smooth animations** for line clearing
- **Medical cross symbols** on pieces
- **Particle system** with floating medical symbols
- **Pulsing animations** for status indicators
- **Gradient backgrounds** with hospital aesthetics
- **Responsive design** for desktop, tablet, and mobile

### Controls
- **Keyboard controls**:
  - Arrow keys: Move and rotate
  - Space: Hard drop
  - P/Escape: Pause
  - R: Restart (when game over)
- **Touch controls** for mobile:
  - Swipe left/right: Move piece
  - Swipe down: Soft drop
  - Swipe up: Hard drop
  - Tap: Rotate piece

## 📁 Project Structure

```
Tetris/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # Medical-themed stylesheet
├── js/
│   ├── game.js            # Core game engine
│   ├── tetromino.js       # Piece management
│   ├── board.js           # Game board logic
│   ├── renderer.js        # Canvas rendering
│   ├── controls.js        # Input handling
│   └── audio.js           # Sound management
├── DESIGN_DOCUMENT.md     # Complete design documentation
└── README.md              # This file
```

## 🚀 Quick Start

### Play Online
Visit the [live demo](https://yourusername.github.io/medical-tetris/) to play instantly in your browser!

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/medical-tetris.git

# Navigate to the directory
cd medical-tetris

# Open in browser (no build required!)
# Option 1: Double-click index.html
# Option 2: Use a local server
python -m http.server 8000
# Then visit http://localhost:8000
```

No build process, no dependencies, no installation required! Just pure HTML5, CSS3, and vanilla JavaScript.

### System Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- HTML5 Canvas support
- Web Audio API support (for sound)

## 🎯 How to Play

### Objective
Organize falling medical supplies by arranging them into complete horizontal lines. Clear lines to earn treatment points and prevent the storage area from filling up!

### Scoring
- **Soft Drop**: 1 point per cell
- **Hard Drop**: 2 points per cell
- **Single Line**: 100 × level
- **Double Lines**: 300 × level
- **Triple Lines**: 500 × level
- **Tetris (4 lines)**: 800 × level
- **Combo Bonus**: +50 points per consecutive clear

### Level Progression
- Start at Emergency Level 1
- Level up every 10 lines cleared
- Speed increases with each level
- Maximum speed reached at Level 15+

### Achievements
- 🩺 **First Responder**: Clear 10 lines
- ⚕️ **Resident**: Reach Level 5
- 👨‍⚕️ **Attending Physician**: Score 10,000 points

## 🎨 Design Highlights

### Color Palette
- **Medical Blue**: #0077BE
- **Scrub Green**: #006D5B
- **Red Cross**: #DC143C
- **Soft Cyan**: #00CED1
- **Clinical Background**: #F0F8FF

### Typography
- **Headers**: Orbitron (futuristic medical tech)
- **Body**: Roboto (clean and readable)
- **Stats**: Roboto Mono (precise medical data)

### Animations
- Pulsing medical icons
- Heartbeat effect on status indicators
- ECG-style line animation
- Particle effects on line clears
- Smooth piece movement and rotation

## 🔧 Technical Details

### Architecture
- **Pure JavaScript** (ES6+) with OOP design
- **Canvas-based rendering** for smooth graphics
- **Request Animation Frame** for 60 FPS gameplay
- **LocalStorage** for high score persistence
- **Event-driven input system** for responsive controls

### Performance
- Efficient collision detection
- Object pooling for particles
- Optimized rendering with layer separation
- Minimal DOM manipulation
- Smooth animations even on mobile devices

## 🎵 Audio System

The game uses the Web Audio API to generate procedural sounds:
- Medical equipment beeps for movement
- Success chimes for line clears
- Hospital PA sounds for level ups
- Flatline tone for game over
- All sounds synthesized in real-time (no audio files needed!)

## 📱 Mobile Support

The game is fully responsive and includes:
- Touch gesture controls
- Optimized layout for smaller screens
- Performance tuning for mobile browsers
- Portrait and landscape support

## 🔮 Future Enhancements

Potential features for future versions:
- Multiplayer mode ("Collaborative Treatment")
- Daily challenges ("Medical Emergencies")
- Global leaderboard
- Hold piece functionality
- Custom themes (different hospital departments)
- Power-ups (medical equipment boosts)
- Story mode with progression
- Tutorial mode

## � Deployment

### GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from branch"
4. Choose `main` branch and `/ (root)` folder
5. Click Save
6. Your game will be live at `https://yourusername.github.io/medical-tetris/`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/medical-tetris)

1. Click the button above or drag & drop the folder to Netlify
2. Your site will be live instantly!

### Vercel

```bash
npm i -g vercel
vercel
```

### Local Server Options

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

## � Project Stats

- **Lines of Code**: ~1,500+
- **File Size**: < 100KB (uncompressed)
- **Performance**: 60 FPS constant
- **Mobile Support**: ✅ Full responsive design
- **Browser Support**: All modern browsers
- **Dependencies**: Zero! Pure vanilla JavaScript

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - Feel free to use, modify, and distribute this game!

See [LICENSE](LICENSE) file for details.

## 🙏 Credits & Acknowledgments

- **Design & Development**: Kevin
- **Inspired by**: Classic Tetris (1984) by Alexey Pajitnov
- **Theme**: Healthcare & Medical Aesthetics
- **Fonts**: Google Fonts (Orbitron, Roboto, Roboto Mono)
- **Icons**: Unicode Medical Symbols

## 📧 Contact

Created by [@yourusername](https://github.com/yourusername)

- GitHub: [@yourusername](https://github.com/yourusername)
- Project Link: [https://github.com/yourusername/medical-tetris](https://github.com/yourusername/medical-tetris)

---

<div align="center">
  <p>Made with ❤️ and ⚕️</p>
  <p>If you enjoy this game, please consider giving it a ⭐️!</p>
</div>

## 🐛 Known Issues

None at this time! If you find any bugs, please let us know.

## 💡 Tips for High Scores

1. **Use ghost pieces** to plan your placements
2. **Build flat surfaces** to avoid gaps
3. **Save I-pieces** for Tetris clears (4 lines)
4. **Clear lines consecutively** for combo bonuses
5. **Don't let the board fill** past 70% capacity
6. **Plan ahead** using the next piece preview

## 🏆 High Score Competition

Try to beat these milestones:
- **Beginner**: 5,000 points
- **Intermediate**: 15,000 points
- **Advanced**: 30,000 points
- **Expert**: 50,000+ points
- **Chief of Medicine**: 100,000+ points

---

**Ready to start your medical emergency operations?** Open `index.html` and begin playing! 🏥🎮

*"Organizing medical supplies, one Tetris at a time!"*
