# API Integration Setup Guide

## TMDB API Setup (Required for Movie Recommendations & Trailers)

### Step 1: Get Your Free TMDB API Key

1. Go to https://www.themoviedb.org/
2. Create a free account (Sign Up)
3. Verify your email address
4. Go to Settings → API → Create → Developer
5. Fill in the required information:
   - Application Name: CineMatch
   - Application URL: http://localhost:3000
   - Application Summary: Movie recommendation website
6. Accept the terms and submit
7. Copy your **API Key (v3 auth)**

### Step 2: Add API Key to Your Project

1. Open `server.js`
2. Find this line (around line 10):
   ```javascript
   const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
   ```
3. Replace `YOUR_TMDB_API_KEY` with your actual API key:
   ```javascript
   const TMDB_API_KEY = 'abc123def456...'; // Your actual key
   ```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start Your Server

```bash
npm start
```

## Features Enabled with API Integration

✅ **Quiz Recommendations**: Get real movie suggestions based on quiz answers
✅ **Mood Detection**: Receive accurate movie recommendations based on detected mood
✅ **Movie Trailers**: Watch official YouTube trailers for recommended movies
✅ **Movie Posters**: Display high-quality movie posters
✅ **Movie Details**: Get real descriptions, ratings, and release dates

## API Endpoints

### 1. Get Movie Recommendation
- **Endpoint**: `POST /api/movies/recommend`
- **Body**: `{ "mood": "happy" }` or `{ "genre": "Action" }`
- **Response**: Movie details with title, description, poster, rating

### 2. Get Movie Trailer
- **Endpoint**: `GET /api/movies/:movieId/trailer`
- **Response**: YouTube trailer URL

## Troubleshooting

### "Failed to fetch movie"
- Check if your API key is correctly set in `server.js`
- Verify your internet connection
- Check TMDB API status: https://status.themoviedb.org/

### "Trailer not available"
- Some movies may not have trailers in the TMDB database
- The system will show an alert if no trailer is found

### Rate Limits
- TMDB free tier: 40 requests per 10 seconds
- This is more than enough for normal usage

## Alternative: Use Without API (Demo Mode)

If you don't want to set up the API, the website will automatically fall back to:
- Pre-defined movie recommendations
- Generic movie posters
- No trailer functionality

The core features (quiz, mood detection UI, authentication) will still work!
