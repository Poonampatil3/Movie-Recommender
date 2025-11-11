# 🚀 Vercel Deployment Guide for CineMatch

## Prerequisites
- GitHub account
- Vercel account (free) - Sign up at https://vercel.com
- MongoDB Atlas account (free) - Sign up at https://www.mongodb.com/cloud/atlas

## Step 1: Setup MongoDB Atlas (Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create account
3. Create a FREE cluster:
   - Choose AWS
   - Select nearest region
   - Cluster Name: "CineMatch"
4. Create Database User:
   - Click "Database Access" → "Add New Database User"
   - Username: `cinematch`
   - Password: Generate secure password (SAVE THIS!)
5. Whitelist IP Address:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
6. Get Connection String:
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string (looks like: `mongodb+srv://cinematch:<password>@...`)
   - Replace `<password>` with your actual password

## Step 2: Push Code to GitHub

1. **Initialize Git** (if not already):
   ```bash
   cd "d:\Movie Recommender website"
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Commit**:
   ```bash
   git commit -m "Initial commit - CineMatch website"
   ```

4. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Repository name: `cinematch`
   - Make it Public
   - Don't initialize with README
   - Click "Create repository"

5. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cinematch.git
   git branch -M main
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Find your `cinematch` repository
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add these variables:
   
   **Variable 1:**
   - Name: `MONGODB_URI`
   - Value: Your MongoDB Atlas connection string
   - Example: `mongodb+srv://cinematch:yourpassword@cluster0.xxxxx.mongodb.net/cinematch?retryWrites=true&w=majority`
   
   **Variable 2:**
   - Name: `NODE_ENV`
   - Value: `production`

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - You'll get a URL like: `https://cinematch-xyz.vercel.app`

## Step 4: Update Frontend API URLs

After deployment, you need to update the API URLs in your code:

1. **Get your Vercel URL** (e.g., `https://cinematch-xyz.vercel.app`)

2. **Update script.js**:
   - Find all instances of `http://localhost:3000`
   - Replace with your Vercel URL
   - Example: `https://cinematch-xyz.vercel.app`

3. **Update admin.html**:
   - Find all instances of `http://localhost:3000`
   - Replace with your Vercel URL

4. **Commit and push changes**:
   ```bash
   git add .
   git commit -m "Update API URLs for production"
   git push
   ```

5. **Vercel will auto-deploy** the changes

## Step 5: Test Your Live Website

Visit your Vercel URL and test:
- ✅ Homepage loads
- ✅ Quiz works and shows movies
- ✅ Face detection works
- ✅ Trailers play
- ✅ Sign up / Login works
- ✅ Contact form works
- ✅ Admin dashboard shows data

## Troubleshooting

### "Cannot connect to MongoDB"
- Check your MongoDB Atlas connection string
- Make sure password is correct (no special characters issues)
- Verify IP whitelist includes 0.0.0.0/0

### "API not working"
- Check Vercel logs: Dashboard → Your Project → Deployments → Click latest → View Function Logs
- Verify environment variables are set correctly

### "Page not found"
- Make sure `vercel.json` is in root directory
- Redeploy: Vercel Dashboard → Deployments → Click "..." → Redeploy

## Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5-30 minutes)

## Free Tier Limits

**Vercel Free:**
- 100 GB bandwidth/month
- Unlimited deployments
- Perfect for personal projects

**MongoDB Atlas Free:**
- 512 MB storage
- Shared cluster
- Good for 1000s of users

## Your Website is Live! 🎉

Share your URL:
- Main Site: `https://your-project.vercel.app`
- Admin Panel: `https://your-project.vercel.app/admin`

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
- Check deployment logs in Vercel dashboard
