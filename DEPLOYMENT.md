# 🚀 Deployment Guide

This guide covers multiple ways to deploy Medical Tetris to the web.

## Table of Contents
- [GitHub Pages (Recommended)](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Cloudflare Pages](#cloudflare-pages)
- [Other Hosting Options](#other-hosting-options)

---

## GitHub Pages

**Best for**: Free hosting with custom domain support

### Automatic Deployment (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click `Settings` → `Pages`
   - Under "Source", select `GitHub Actions`
   - The workflow will automatically deploy on every push to `main`

3. **Access Your Site**:
   - URL: `https://yourusername.github.io/medical-tetris/`
   - Usually takes 2-3 minutes for first deployment

### Manual Deployment

1. **Enable GitHub Pages**:
   - Go to `Settings` → `Pages`
   - Under "Source", select `Deploy from a branch`
   - Choose `main` branch and `/ (root)` folder
   - Click Save

2. **Your site will be live** at `https://yourusername.github.io/medical-tetris/`

### Custom Domain

1. Add a `CNAME` file to your repository:
   ```bash
   echo "yourdomain.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. Configure DNS with your domain provider:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. In GitHub Settings → Pages, add your custom domain

---

## Netlify

**Best for**: Quick deployment with preview builds

### Method 1: Drag & Drop

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag your entire project folder
3. Your site is live instantly!

### Method 2: Git Integration

1. **Connect Repository**:
   - Sign in to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

2. **Configure Build**:
   - Build command: *(leave empty)*
   - Publish directory: `/`
   - Click "Deploy site"

3. **Custom Domain** (Optional):
   - Go to "Domain settings"
   - Add your custom domain
   - Follow DNS configuration instructions

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

---

## Vercel

**Best for**: Fast global CDN with instant deployments

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 2: Git Integration

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Click "Deploy"
5. Your site is live!

### Custom Domain

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS as instructed

---

## Cloudflare Pages

**Best for**: Advanced performance and caching

1. Sign in to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect your GitHub repository
4. Configure:
   - Build command: *(leave empty)*
   - Build output directory: `/`
5. Click "Save and Deploy"

---

## Other Hosting Options

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Deploy
firebase deploy
```

### Surge

```bash
# Install Surge
npm install -g surge

# Deploy
surge
```

### Render

1. Go to [Render](https://render.com)
2. Click "New Static Site"
3. Connect your repository
4. Deploy

### Azure Static Web Apps

1. Go to [Azure Portal](https://portal.azure.com)
2. Create "Static Web App"
3. Connect GitHub repository
4. Configure and deploy

---

## Environment Variables

This project doesn't require any environment variables. It's pure client-side JavaScript!

---

## SSL/HTTPS

All the hosting platforms mentioned above provide **free SSL certificates** automatically.

---

## Performance Optimization

The game is already optimized, but for even better performance:

1. **Enable Compression** (most hosts do this automatically)
2. **CDN**: All mentioned hosts use global CDNs
3. **Caching**: Set cache headers if possible:
   ```
   Cache-Control: public, max-age=31536000
   ```

---

## Monitoring

### Google Analytics (Optional)

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Troubleshooting

### Site Not Loading
- Check if `index.html` is in the root directory
- Verify all file paths are relative, not absolute
- Check browser console for errors

### 404 Errors
- Ensure all files are committed and pushed
- Verify publish directory is set to `/` or root

### Slow Loading
- Check if files are being served from CDN
- Verify compression is enabled
- Test with different browsers

---

## Need Help?

- Open an issue on GitHub
- Check hosting platform documentation
- Contact support for your hosting provider

---

**Happy Deploying! 🚀**
