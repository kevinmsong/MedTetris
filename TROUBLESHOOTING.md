# Troubleshooting Medical Tetris

## How to Check if Game is Working

1. **Open the game** in your browser (`index.html`)
2. **Open Developer Console**:
   - Chrome/Edge: Press `F12` or `Ctrl+Shift+I`
   - Firefox: Press `F12` or `Ctrl+Shift+K`
   - Safari: Press `Cmd+Option+I` (Mac)

3. **Check for errors** in the Console tab
4. **Click "START EMERGENCY OPERATIONS"** button
5. **Look for these console messages**:
   - "DOM loaded, initializing game..."
   - "Game initialized successfully"
   - "Rendering initial board..."
   - "Initial board rendered"
   - "Game starting..." (after clicking start)
   - "Starting game loop..."

## Common Issues

### Blocks Not Showing
- Check console for JavaScript errors
- Verify all JS files are loading (check Network tab)
- Make sure canvas element exists
- Check if overlay is covering the canvas

### Game Not Starting
- Click the red "START EMERGENCY OPERATIONS" button
- Check if JavaScript is enabled
- Look for errors in console

### Controls Not Working
- Make sure game has started (click start button first)
- Try clicking on the canvas area first
- Check if browser window has focus

## Debug Mode

To enable more detailed logging, edit `js/renderer.js` line 234 and uncomment:
```javascript
console.log('Rendering frame...'); // Uncomment for debugging
```

This will show every frame being rendered (warning: lots of console output!)
