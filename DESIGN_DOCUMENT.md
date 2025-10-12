# Medical Tetris - Game Design Document
## Version 1.0 - Clinical Edition

---

## 1. GAME CONCEPT & THEME

### Core Concept
A medically-themed Tetris game where players "organize" medical supplies and equipment in a clinical storage facility. The game combines classic Tetris gameplay with a hospital/medical aesthetic.

### Theme Elements

#### Visual Theme
- **Setting**: Hospital supply storage room / Medical cabinet
- **Color Palette**: 
  - Primary: Clean white (#FFFFFF), Medical blue (#0077BE), Scrub green (#006D5B)
  - Accent: Red cross (#DC143C), Soft cyan (#00CED1), Sterile gray (#E8E8E8)
  - Background: Light clinical blue-gray (#F0F8FF)

#### Tetromino Designs (Medical Equipment)
- **I-piece**: Syringe (long and thin)
- **O-piece**: Pill bottle (square)
- **T-piece**: Stethoscope
- **S-piece**: Bandage roll
- **Z-piece**: Medical tape
- **J-piece**: IV drip stand
- **L-piece**: Thermometer

#### Terminology
- Score → "Treatment Points"
- Level → "Emergency Level"
- Lines Cleared → "Cases Resolved"
- Game Over → "Code Blue!"
- New High Score → "Chief of Medicine!"
- Pause → "Break Room"

---

## 2. TECHNICAL ARCHITECTURE

### Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas API
- **Audio**: Web Audio API / HTML5 Audio
- **Storage**: LocalStorage for high scores

### File Structure
```
Tetris/
├── index.html           # Main game file
├── css/
│   └── styles.css       # Medical-themed styling
├── js/
│   ├── game.js          # Core game engine
│   ├── tetromino.js     # Piece logic
│   ├── board.js         # Game board management
│   ├── controls.js      # Input handling
│   ├── renderer.js      # Canvas rendering
│   └── audio.js         # Sound management
├── assets/
│   ├── sounds/          # Medical sound effects
│   └── images/          # Icons and sprites
├── DESIGN_DOCUMENT.md   # This file
└── README.md            # Project documentation
```

### Core Systems

#### Game Loop
- 60 FPS rendering
- Variable drop speed based on level
- RequestAnimationFrame for smooth animation

#### State Management
- Game states: MENU, PLAYING, PAUSED, GAME_OVER
- Board state: 2D array (10 width × 20 height)
- Current piece state: position, rotation, type
- Score, level, lines cleared tracking

#### Collision Detection
- Boundary checking (walls, floor)
- Piece-to-piece collision
- Rotation collision with wall kicks

---

## 3. GAME MECHANICS & FEATURES

### Core Gameplay

#### Controls
- **Left Arrow**: Move piece left
- **Right Arrow**: Move piece right
- **Down Arrow**: Soft drop (faster fall)
- **Up Arrow / Z**: Rotate counter-clockwise
- **X**: Rotate clockwise
- **Space**: Hard drop (instant placement)
- **P / Esc**: Pause game
- **R**: Restart (when game over)

#### Piece Movement
- Automatic falling every N milliseconds (decreases with level)
- Manual movement with delay to prevent spam
- Wall kicks for rotation (SRS - Super Rotation System)

#### Line Clearing
- Single: 100 points × level
- Double: 300 points × level
- Triple: 500 points × level
- Tetris (4 lines): 800 points × level
- Animated clearing with medical "healing" effect

#### Level Progression
- Start at Level 1
- Level up every 10 lines cleared
- Speed increases by 10% per level
- Max speed at Level 15+

#### Scoring System
- **Soft Drop**: 1 point per cell
- **Hard Drop**: 2 points per cell
- **Line Clears**: Multiplier based on lines × level
- **Combo Bonus**: +50 points per consecutive clear
- **Treatment Bonus**: Special animations and sounds

### Medical-Themed Features

#### Special Animations
- **Heartbeat Pulse**: Background pulse effect matching game intensity
- **Medical Cross**: Appears when lines are cleared
- **Particle Effects**: Medical symbols (⚕️, +, ♥) on clears
- **ECG Line**: Visual representation of game speed

#### Visual Feedback
- **Emergency Lights**: Flashing borders at high speeds
- **Vitals Display**: Shows "game health" (space remaining)
- **Prescription Pad**: Next piece preview styled as prescription
- **Medical Chart**: Score display styled as patient chart

#### Audio
- **Background**: Gentle heartbeat rhythm (speeds up with level)
- **Piece Movement**: Soft "beep" sounds
- **Rotation**: Quick "click" sound
- **Line Clear**: Medical "success" chime
- **Tetris**: Emergency "code clear" sound
- **Game Over**: Flatline tone
- **Level Up**: Hospital PA system notification

---

## 4. USER INTERFACE DESIGN

### Layout Structure

```
┌─────────────────────────────────────────────┐
│           🏥 MEDICAL TETRIS 🏥              │
├──────────┬────────────────────┬─────────────┤
│          │                    │             │
│ PATIENT  │                    │ NEXT        │
│ CHART    │   GAME BOARD       │ TREATMENT   │
│          │   (CANVAS)         │             │
│ Score    │                    │ [Preview]   │
│ Level    │                    │             │
│ Lines    │                    │ VITALS      │
│ Hi-Score │                    │ [Space %]   │
│          │                    │             │
│ CONTROLS │                    │ STATUS      │
│ [Help]   │                    │ [Ready]     │
│          │                    │             │
└──────────┴────────────────────┴─────────────┘
```

### Color Scheme Implementation
- **Board Background**: Light clinical blue (#F0F8FF)
- **Grid Lines**: Soft gray (#D3D3D3)
- **Placed Pieces**: Various medical colors with gradient
- **Active Piece**: Bright with glow effect
- **UI Panels**: White with subtle shadow (clinical cards)
- **Text**: Dark blue (#003366) for readability

### Typography
- **Headings**: "Orbitron" or "Rajdhani" (modern, clean)
- **Body**: "Roboto" or "Open Sans" (readable)
- **Monospace**: "Roboto Mono" (for scores/stats)

---

## 5. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Tasks 5-7)
1. Create HTML structure with canvas and UI elements
2. Set up CSS with medical theme and responsive layout
3. Build core game engine with game loop and state management

### Phase 2: Core Gameplay (Tasks 8-10)
4. Implement tetromino system with 7 piece types
5. Build game board with collision detection
6. Add line clearing and scoring mechanics

### Phase 3: Interactivity (Task 11)
7. Implement keyboard controls and input handling
8. Add touch controls for mobile devices
9. Create pause and restart functionality

### Phase 4: Polish (Tasks 12-14)
10. Add medical-themed visual effects and animations
11. Integrate sound effects and background audio
12. Testing, bug fixes, and performance optimization

---

## 6. SPECIAL FEATURES & INNOVATIONS

### Unique Medical Features

#### "Hospital Mode" Variant Ideas (Future Enhancement)
- **Emergency Room**: Pieces fall faster, bonus points
- **Surgery Precision**: Slower speed, but mistakes cost more
- **Triage Mode**: Multiple boards, prioritize clearing

#### Achievement System
- "First Responder" - Clear 10 lines
- "Resident" - Reach Level 5
- "Attending Physician" - Score 10,000 points
- "Surgeon General" - Perfect Tetris clear
- "Chief of Staff" - Reach Level 10

#### Stats Tracking
- Total games played
- Total treatment points
- Best level reached
- Most lines cleared in single game
- Average survival time

---

## 7. ACCESSIBILITY & RESPONSIVENESS

### Accessibility Features
- Keyboard-only gameplay
- High contrast mode option
- Colorblind-friendly palette option
- Adjustable piece preview size
- Pause screen with clear resume instructions

### Responsive Design
- Desktop: Full layout with all panels
- Tablet: Optimized layout with touch controls
- Mobile: Vertical orientation, simplified UI
- Support for portrait and landscape modes

---

## 8. PERFORMANCE CONSIDERATIONS

### Optimization Strategies
- Canvas layer separation (static vs dynamic elements)
- Object pooling for particles
- Debounced input handling
- Efficient collision detection (only check active cells)
- RequestAnimationFrame for smooth rendering
- Asset preloading before game start

### Browser Compatibility
- Target: Modern browsers (Chrome, Firefox, Safari, Edge)
- Fallbacks for older browsers
- Mobile browser optimization

---

## 9. TESTING CHECKLIST

### Gameplay Testing
- [ ] All pieces spawn correctly
- [ ] Rotation works in all positions
- [ ] Wall kicks function properly
- [ ] Collision detection accurate
- [ ] Line clearing works for 1-4 lines
- [ ] Scoring calculates correctly
- [ ] Level progression triggers appropriately
- [ ] Game over condition triggers correctly

### UI/UX Testing
- [ ] All controls responsive
- [ ] Pause/resume works flawlessly
- [ ] Visual feedback clear and helpful
- [ ] Mobile touch controls accurate
- [ ] Responsive layout works on all screens
- [ ] High score persists across sessions

### Performance Testing
- [ ] 60 FPS maintained during gameplay
- [ ] No memory leaks during extended play
- [ ] Audio doesn't lag or stutter
- [ ] Canvas rendering optimized
- [ ] Fast load times

---

## 10. FUTURE ENHANCEMENTS

### Post-Launch Features
- Multiplayer mode ("Collaborative Treatment")
- Daily challenges ("Medical Emergencies")
- Global leaderboard
- Custom themes (different hospital departments)
- Power-ups (medical equipment boosts)
- Story mode with progression
- Tutorial mode for new players
- Ghost piece preview
- Hold piece functionality

---

## DEVELOPMENT TIMELINE

**Estimated Time: 8-12 hours**

- Design & Planning: 1 hour ✓
- HTML/CSS Setup: 1-2 hours
- Core Engine: 2-3 hours
- Gameplay Implementation: 2-3 hours
- Medical Theme & Polish: 2-3 hours
- Testing & Debugging: 1-2 hours

---

## CONCLUSION

This medical-themed Tetris game will provide an engaging, polished experience with a unique clinical aesthetic. The combination of classic gameplay mechanics with medical theming creates a fresh take on the beloved puzzle game while maintaining the addictive qualities that make Tetris timeless.

Ready to begin implementation! 🏥
