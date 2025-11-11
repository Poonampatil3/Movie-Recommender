# CineMatch - Movie Recommender Website

A personality-driven movie recommendation website with Node.js backend and MongoDB database.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- TMDB API Key (free) - Get from https://www.themoviedb.org/settings/api

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Setup MongoDB**
   - Install MongoDB locally OR use MongoDB Atlas
   - For local MongoDB: Make sure MongoDB is running on `mongodb://localhost:27017`
   - For MongoDB Atlas: Update the connection string in `server.js`

3. **Setup TMDB API** (Required for movie recommendations & trailers)
   - Get your free API key from https://www.themoviedb.org/settings/api
   - Open `server.js` and replace `YOUR_TMDB_API_KEY` with your actual key
   - See `API_SETUP.md` for detailed instructions

4. **Start the Server**
```bash
npm start
```

5. **Access the Application**
   - Main Website: `http://localhost:3000`
   - Admin Dashboard: `http://localhost:3000/admin`

## Features

- **Contact Form**: Users can send messages (stored in MongoDB)
- **User Authentication**: 
  - Sign up with name, email, and password
  - Login with email and password
  - Passwords are securely hashed using bcrypt
- **Movie Quiz**: Personality-based movie recommendations with real TMDB data
- **Face Detection**: AI-powered mood detection for movie suggestions
- **Movie Trailers**: Watch official YouTube trailers
- **Responsive Design**: Works on all devices

## API Endpoints

### Authentication
- `POST /api/signup` - Register new user
- `POST /api/login` - Login user

### Contact
- `POST /api/contact` - Submit contact form

### Movies (TMDB Integration)
- `POST /api/movies/recommend` - Get movie recommendation based on mood/genre
- `GET /api/movies/:movieId/trailer` - Get YouTube trailer for a movie

## Database Collections

- **users**: Stores user accounts (name, email, hashed password)
- **contacts**: Stores contact form submissions

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Security**: bcryptjs for password hashing
- **APIs**: TMDB API for movies, YouTube for trailers
- **AI**: TensorFlow.js for face detection
