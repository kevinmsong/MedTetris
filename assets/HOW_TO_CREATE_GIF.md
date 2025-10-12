# 📸 Creating Gameplay GIF Instructions

Since you can't upload a GIF yet, here's how to create one:

## Quick Option: Take a Screenshot First

For now, you can take a screenshot and use that in the README until you create a GIF.

### Windows
- Press `Windows + Shift + S`
- Select area
- Save as `assets/gameplay.png`

### Mac
- Press `Cmd + Shift + 4`
- Select area
- Automatically saves to Desktop

### Linux
- Press `PrtScn` or use `gnome-screenshot`

Then update README.md line 15 to use `.png` instead of `.gif`:
```markdown
<img src="assets/gameplay.png" alt="Medical Tetris Gameplay" width="600px"/>
```

---

## Creating the Animated GIF

### Option 1: ScreenToGif (Windows) - Recommended

1. **Download**: https://www.screentogif.com/
2. **Install and launch**
3. Click **Recorder**
4. Position the recording frame over your game
5. Click **Record**
6. Play the game for 10-15 seconds:
   - Start the game
   - Move pieces
   - Clear some lines
   - Show scoring
7. Press **Stop** (F8)
8. Click **Save As**
9. Set filename: `gameplay.gif`
10. Choose location: `assets/` folder
11. Optimize: Click **Options** → Set FPS to 15
12. Click **Save**

### Option 2: Kap (Mac)

1. **Download**: https://getkap.co/
2. **Install and launch**
3. Select recording area
4. Click record
5. Play for 10-15 seconds
6. Stop recording
7. Export as GIF
8. Move to `assets/gameplay.gif`

### Option 3: Peek (Linux)

```bash
# Install
sudo apt install peek

# Launch
peek
```

1. Position window over game
2. Click record
3. Play game for 10-15 seconds
4. Stop and save as `assets/gameplay.gif`

### Option 4: Online Tool (Any OS)

1. Use a screen recording extension like:
   - [Loom](https://www.loom.com/)
   - [Screencastify](https://www.screencastify.com/)
2. Record 10-15 seconds of gameplay
3. Download the video
4. Convert to GIF using:
   - https://ezgif.com/video-to-gif
   - https://cloudconvert.com/mp4-to-gif

---

## Optimization Tips

### Before Uploading

Use https://ezgif.com/optimize to reduce file size:

1. Upload your GIF
2. Select optimization level: **Optimization Level 35**
3. Apply
4. Download optimized version

### Target Specs

- **Width**: 600-800px
- **FPS**: 12-20
- **Duration**: 10-15 seconds
- **File Size**: < 5MB (GitHub limit: 10MB)
- **Colors**: 256 (standard GIF)

---

## What to Show in the GIF

✅ Do show:
- Starting the game
- Moving pieces (left, right, down)
- Rotating pieces
- Clearing lines
- Score increasing
- Level progression
- Ghost piece preview

❌ Don't show:
- Menu screens for too long
- Pause screen
- Game over (unless you restart)
- More than 15 seconds

---

## Alternative: Use a Video

If GIF is too large, embed a video in README:

```markdown
[![Medical Tetris Gameplay](https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
```

Upload to:
- YouTube (Unlisted)
- Vimeo
- GitHub (as Release asset)

---

## After Creating GIF

```bash
# Add to git
git add assets/gameplay.gif

# Commit
git commit -m "Add gameplay demonstration GIF"

# Push
git push
```

Your README will now show the animated gameplay! 🎮
