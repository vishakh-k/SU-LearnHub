# 🚀 SU-LearnHub Deployment Guide

## Quick Summary

Your app is ready to deploy! Choose one of these **simple hosting options**:

| Platform | Cost | Setup Time | Steps |
|----------|------|-----------|-------|
| **Vercel** ⭐ | Free | 2 min | 3 steps |
| **Netlify** | Free | 2 min | 3 steps |
| **GitHub Pages** | Free | 5 min | Deploy action |

---

## Option 1: Vercel (Recommended - Easiest)

### ✅ What You Get
- ✨ Automatic deployment from GitHub
- 🔄 Preview deployments for each PR
- 🌍 Global CDN
- ⚡ Zero-config for Vite
- 💚 Free tier perfect for learning

### 📋 Deployment Steps

**Step 1: Create Vercel Account**
1. Go to https://vercel.com/signup
2. Click "Continue with GitHub"
3. Authorize Vercel to access your repositories

**Step 2: Import Project**
1. Go to https://vercel.com/new
2. Select **vishakh-k/SU-LearnHub**
3. Click "Import"

**Step 3: Configure Environment Variables**
1. Scroll to "Environment Variables"
2. Add (optional, only if using Supabase):
   ```
   VITE_SUPABASE_URL = your-supabase-url
   VITE_SUPABASE_ANON_KEY = your-supabase-key
   ```
3. Click "Deploy"

**Done! 🎉**
- Your app is live in ~1-2 minutes
- Get a URL like: `https://su-learnhub.vercel.app`
- Every `git push` auto-deploys

---

## Option 2: Netlify (Also Easy)

### ✅ What You Get
- 🚀 Same features as Vercel
- 📊 Great analytics
- 🔐 Secure redirects
- 🎨 Great UI

### 📋 Deployment Steps

**Step 1: Create Netlify Account**
1. Go to https://netlify.com/signup
2. Click "Continue with GitHub"
3. Authorize Netlify

**Step 2: Create New Site**
1. Go to https://app.netlify.com/teams/USERNAME/sites
2. Click "Add new site" → "Import an existing project"
3. Select GitHub → Select **vishakh-k/SU-LearnHub**

**Step 3: Configure Build**
1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add Environment Variables (optional):
   ```
   VITE_SUPABASE_URL = your-url
   VITE_SUPABASE_ANON_KEY = your-key
   ```
4. Click "Deploy site"

**Done! 🎉**
- URL like: `https://su-learnhub.netlify.app`

---

## Option 3: GitHub Pages (Free, But More Steps)

### ✅ What You Get
- Free hosting directly from GitHub
- No external accounts needed
- Built-in security

### ⚠️ Note
Requires updating `vite.config.ts` with base path.

### 📋 Deployment Steps

**Step 1: Update vite.config.ts**
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/SU-LearnHub/',  // Add this line
})
```

**Step 2: Create GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Step 3: Enable GitHub Pages**
1. Go to repo Settings → Pages
2. Set source to "Deploy from a branch"
3. Select "gh-pages" branch
4. Click "Save"

**Done! 🎉**
- URL: `https://vishakh-k.github.io/SU-LearnHub`

---

## ⚙️ Environment Variables

If using **Supabase** features (optional):

### For Vercel/Netlify:
1. Get your values from Supabase dashboard
2. Add in hosting platform's environment settings
3. Variables:
   ```
   VITE_SUPABASE_URL = https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJxxx...
   ```

### Check .env file:
```bash
# Your local .env file (don't commit this)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...
```

---

## 🔍 After Deployment

### Test Your App
1. Open your deployment URL
2. Verify:
   - ✅ Page loads
   - ✅ Navigation works
   - ✅ Chatbot loads (💬 button)
   - ✅ Alumni mentoring loads
   - ✅ No console errors

### Share Your Link
```
🎉 App deployed at: https://your-url-here
```

### Make Changes
```bash
# Make code changes
git add .
git commit -m "Update feature"
git push
# Automatically deploys in 1-2 minutes!
```

---

## 🆘 Troubleshooting

### Build Fails?
```bash
# Test locally first
npm install
npm run build
npm run preview
```

### App shows 404?
- ✅ GitHub Pages: Check base path in vite.config.ts
- ✅ Vercel/Netlify: Check "dist" output directory

### Environment variables not loading?
- Make sure variable name starts with `VITE_`
- Redeploy after adding variables
- Check they appear in platform settings

### Can't find GitHub repo?
- Make sure you're logged in with correct account
- Verify repo is public (Settings → Visibility)

---

## 📊 Recommended: Vercel

**Why Vercel is the easiest:**
1. Auto-detects Vite projects
2. No configuration needed (vercel.json is optional)
3. Instant preview URLs for testing
4. Best performance
5. Zero cold starts

**Quick Deployment Checklist:**
- ✅ Project on GitHub ✓
- ✅ vercel.json configured ✓
- ✅ package.json has build script ✓
- ✅ Vite configured correctly ✓

→ **Ready to deploy!**

---

## 📈 What Happens After Deploy

### Development Branch Changes
```
You push code
    ↓
GitHub receives push
    ↓
Vercel/Netlify detects change
    ↓
Runs: npm install
    ↓
Runs: npm run build
    ↓
Uploads dist/ to CDN
    ↓
Your app updates! (1-2 min)
```

### Preview Deployments
Create a pull request → Get instant preview URL to test changes!

---

## 🎯 Next Steps

1. **Choose a platform:** Vercel recommended
2. **Sign up with GitHub:** 30 seconds
3. **Import project:** 1 minute
4. **Deploy:** 1-2 minutes
5. **Share URL:** 🎉 Done!

**Total time: ~5 minutes**

---

## 💡 Pro Tips

### Add Domain Name
- Vercel: Settings → Domains → Add custom domain
- Netlify: Site settings → Domain management

### Enable Analytics
- Vercel: Built-in Web Analytics
- Netlify: Integrations → Fathom Analytics

### Custom Email Verification
- Configure Supabase if auth is needed
- Add SMTP for email notifications

### Monitor Performance
- Vercel: Deployment analytics
- Netlify: Analytics dashboard
- Check: Core Web Vitals

---

**Your app is production-ready! Deploy in 5 minutes. 🚀**

*Questions? Check official docs:*
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Vite: https://vitejs.dev/guide/static-deploy.html
