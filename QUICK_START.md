# 🎬 CineMatch - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Get TMDB API Key (2 minutes)
1. Visit: https://www.themoviedb.org/signup
2. Create free account & verify email
3. Go to: Settings → API → Create → Developer
4. Copy your API Key
5. Open `server.js` and paste it here:
   ```javascript
   const TMDB_API_KEY = 'paste_your_key_here';
   ```

### 3️⃣ Start Everything
```bash
# Terminal 1: Start MongoDB (if using local)
mongod

# Terminal 2: Start the server
npm start
```

## 🌐 Access Your Website

- **Main Website**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

## ✨ Features You Can Use

### 🎯 Quiz Mode
1. Click "Start The Quiz"
2. Answer 3 personality questions
3. Get a real movie recommendation from TMDB
4. Click "Watch Trailer" to see the official trailer on YouTube

### 😊 Face Detection Mode
1. Click "Try Face Detection"
2. Click "Start Camera" (allow camera access)
3. Click "Detect My Mood"
4. Get movie recommendations based on your facial expression
5. Watch the trailer!

### 👤 User Features
- Sign up / Login
- Submit contact form
- View admin dashboard (see all users & messages)

## 🎥 How Movie Recommendations Work

1. **Quiz**: Your answers determine your genre preference (Action, Comedy, Drama, etc.)
2. **API Call**: System fetches top-rated movies from TMDB in that genre
3. **Display**: Shows real movie with poster, description, and rating
4. **Trailer**: Fetches official YouTube trailer from TMDB

## 🔧 Troubleshooting

### "Cannot find module 'express'"
```bash
npm install
```

### "Failed to fetch movie"
- Check your TMDB API key in `server.js`
- Make sure you have internet connection

### "Connection refused" / MongoDB errors
```bash
# Start MongoDB first
mongod
```

### Camera not working
- Allow camera permissions in your browser
- Use HTTPS or localhost (required for camera access)

## 📊 Admin Dashboard

View all data at: http://localhost:3000/admin
- See all registered users
- View contact form submissions
- Refresh data in real-time

## 🎬 Movie Data Source

All movies, posters, and trailers come from:
- **TMDB** (The Movie Database) - Movie data & posters
- **YouTube** - Official movie trailers

## 💡 Pro Tips

1. **Better Recommendations**: The more specific your quiz answers, the better the movie match
2. **Mood Detection**: Make sure you're in good lighting for accurate face detection
3. **Trailers**: Not all movies have trailers - TMDB will show what's available
4. **Admin Access**: Bookmark `/admin` to quickly check new users and messages

## 🆘 Need Help?

1. Check `API_SETUP.md` for detailed API setup
2. Check `README.md` for full documentation
3. Make sure MongoDB is running
4. Verify your TMDB API key is correct

## 🎉 You're All Set!

Your movie recommendation website is ready to use. Enjoy discovering new movies! 🍿
