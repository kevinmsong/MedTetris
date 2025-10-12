# 🚀 Quick GitHub Setup & Publishing Guide

Follow these steps to publish Medical Tetris on GitHub and deploy it online!

## Step 1: Create GitHub Repository

1. **Go to GitHub**: https://github.com/new

2. **Repository Settings**:
   - Repository name: `medical-tetris`
   - Description: `A medical-themed Tetris game with hospital aesthetics`
   - Visibility: Public
   - ✅ Add README file: **Uncheck** (we already have one)
   - ✅ Add .gitignore: **Uncheck** (we already have one)
   - ✅ Choose a license: **Uncheck** (we already have one)

3. Click **Create repository**

## Step 2: Initialize Git Locally

Open terminal in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Medical Tetris v1.0"

# Add remote repository (replace with your username)
git remote add origin https://github.com/yourusername/medical-tetris.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

### Option A: Automatic (Recommended)

The GitHub Actions workflow is already configured! Just:

1. Go to your repository on GitHub
2. Click `Settings` → `Pages`
3. Under "Source", select **GitHub Actions**
4. Done! Your site will deploy automatically on every push

### Option B: Manual

1. Go to `Settings` → `Pages`
2. Under "Source", select **Deploy from a branch**
3. Choose `main` branch and `/ (root)` folder
4. Click **Save**

## Step 4: Access Your Live Game! 🎮

Your game will be live at:
```
https://yourusername.github.io/medical-tetris/
```

⏱️ First deployment takes 2-5 minutes

## Step 5: Create Gameplay GIF (Optional)

1. **Record Gameplay**:
   - Windows: Use [ScreenToGif](https://www.screentogif.com/)
   - Mac: Use [Kap](https://getkap.co/)
   - Linux: Use [Peek](https://github.com/phw/peek)

2. **Settings**:
   - Duration: 10-15 seconds
   - Size: 600-800px wide
   - FPS: 15-20
   - File size: < 5MB

3. **Save & Upload**:
   ```bash
   # Save as assets/gameplay.gif
   git add assets/gameplay.gif
   git commit -m "Add gameplay GIF"
   git push
   ```

## Step 6: Update README

Replace placeholders in README.md:
- `yourusername` → your GitHub username
- Update the live demo link
- Update author information

```bash
git add README.md
git commit -m "Update README with correct links"
git push
```

## Step 7: Add Topics (Tags)

On your GitHub repository page:

1. Click ⚙️ next to "About"
2. Add topics: `tetris`, `game`, `html5`, `javascript`, `medical`, `healthcare`, `canvas-game`
3. Add website URL: `https://yourusername.github.io/medical-tetris/`
4. Click **Save changes**

## Step 8: Share Your Game! 🎉

Share on:
- Reddit: r/WebGames, r/javascript, r/gamedev
- Twitter/X with hashtag #MedicalTetris
- Hacker News: https://news.ycombinator.com/
- Product Hunt: https://www.producthunt.com/

## Bonus: Custom Domain

Want a custom domain like `medical-tetris.com`?

1. Buy domain from [Namecheap](https://www.namecheap.com/) or [Google Domains](https://domains.google/)

2. Create `CNAME` file:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

3. Add DNS records at your domain provider:
   ```
   Type: A
   Host: @
   Value: 185.199.108.153
   
   Type: A
   Host: @
   Value: 185.199.109.153
   
   Type: A
   Host: @
   Value: 185.199.110.153
   
   Type: A
   Host: @
   Value: 185.199.111.153
   ```

4. In GitHub: Settings → Pages → Custom domain → Add your domain

## Troubleshooting

### Can't push to GitHub?
```bash
# Check remote
git remote -v

# If wrong, update it
git remote set-url origin https://github.com/yourusername/medical-tetris.git
```

### GitHub Pages not working?
- Wait 5 minutes and refresh
- Check Settings → Pages for errors
- Ensure `index.html` is in root directory

### Need to update live site?
Just push changes:
```bash
git add .
git commit -m "Update game"
git push
```

## Next Steps

✅ Star your own repository
✅ Watch for issues and PRs
✅ Add a nice GIF to README
✅ Share with friends!
✅ Keep improving the game

---

**Congratulations! Your game is now live! 🎮🏥**

Need help? Open an issue or check [DEPLOYMENT.md](DEPLOYMENT.md) for more options.
