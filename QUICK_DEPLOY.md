# ⚡ Quick Deploy Steps

## 1. Setup MongoDB Atlas (5 minutes)
```
1. Go to mongodb.com/cloud/atlas
2. Create free account
3. Create cluster → Choose AWS → Free tier
4. Database Access → Add user (save password!)
5. Network Access → Allow 0.0.0.0/0
6. Get connection string → Copy it
```

## 2. Push to GitHub (2 minutes)
```bash
git init
git add .
git commit -m "Deploy CineMatch"
git remote add origin https://github.com/YOUR_USERNAME/cinematch.git
git push -u origin main
```

## 3. Deploy on Vercel (3 minutes)
```
1. Go to vercel.com → Login with GitHub
2. Import your cinematch repository
3. Add Environment Variable:
   - MONGODB_URI = your_connection_string
4. Click Deploy
5. Wait 2 minutes → Done!
```

## 4. Update API URLs (1 minute)
```
1. Copy your Vercel URL (e.g., https://cinematch-xyz.vercel.app)
2. In script.js: Replace all "http://localhost:3000" with your URL
3. In admin.html: Replace all "http://localhost:3000" with your URL
4. git add . && git commit -m "Update URLs" && git push
```

## ✅ Your Website is Live!

Total time: ~10 minutes
