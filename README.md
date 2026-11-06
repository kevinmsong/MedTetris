# Medical Tetris: Clinical Edition

A medical-themed Tetris game that runs in the browser. Pieces are drawn as hospital supplies, the scoreboard uses clinical terms, and sound effects are synthesized live. It is plain HTML5, CSS, and JavaScript with no build step and no dependencies.

**[Play it on GitHub Pages](https://kevinmsong.github.io/MedTetris/)**

[![License: MIT](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Features

- **Classic Tetris play:** ghost piece preview, wall-kick rotation, soft and hard drop, combo bonus for consecutive line clears
- **Medical theme:** seven pieces styled as syringes, pill bottles, stethoscopes, bandages, medical tape, IV drips, and thermometers; scores shown as "Treatment Points", levels as "Emergency Level", and lines as "Cases Resolved"; an ECG-style speed monitor and a storage-capacity (board fill) gauge
- **Sound:** beeps, chimes, level-up and game-over (flatline) tones generated with the Web Audio API (no audio files), with a Sound on/off button
- **Achievements:** First Responder (clear 10 lines), Resident (reach level 5), Attending (score 10,000)
- **High score** saved in the browser's `localStorage`
- **Mobile:** touch controls and a responsive layout

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Move left / right | ← / → | Swipe left / right |
| Rotate | ↑, Z, or X | Tap |
| Soft drop | ↓ | Swipe down |
| Hard drop | Space | Swipe up |
| Pause | P or Esc | |
| Restart (after game over) | R | |

## Scoring and levels

| Event | Points |
|---|---|
| Soft drop | 1 per cell |
| Hard drop | 2 per cell |
| 1 / 2 / 3 / 4 lines | 100 / 300 / 500 / 800 × level |
| Combo | +50 × combo count |

You level up every 10 lines. Each level shortens the drop interval by 50 ms, from 1,000 ms at level 1 down to a 100 ms floor (level 19).

## Run locally

```bash
git clone https://github.com/kevinmsong/MedTetris.git
cd MedTetris
python -m http.server 8000      # or: npm start
```

Then open <http://localhost:8000>. Opening `index.html` directly also works. You need a modern browser with Canvas and Web Audio support.

## Project structure

```
MedTetris/
├── index.html                    # Page layout, HUD, achievements panel
├── css/styles.css                # Medical-themed styles and animations
├── js/
│   ├── game.js                   # Game loop, scoring, levels, achievements, high score
│   ├── tetromino.js              # Piece shapes and rotation
│   ├── board.js                  # Board state and line clears
│   ├── renderer.js               # Canvas rendering and effects
│   ├── controls.js               # Keyboard and touch input
│   └── audio.js                  # Web Audio sound synthesis
├── .github/workflows/deploy.yml  # GitHub Pages deployment
└── package.json                  # Convenience scripts only (no dependencies)
```

## Deployment

Every push to `main` deploys the site to GitHub Pages through `.github/workflows/deploy.yml`. In a fork, set **Settings → Pages → Source** to **GitHub Actions**. The site is static, so any static host (Netlify, Vercel, and so on) also works.

## License

MIT. See [LICENSE](LICENSE).

Inspired by Tetris (1984) by Alexey Pajitnov. Fonts: Orbitron, Roboto, and Roboto Mono (Google Fonts).
