const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();

// TMDB API Configuration
const TMDB_API_KEY = '488d69b6f553507110b021deaa2381bf';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';



app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cinematch';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Contact Schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Email already exists' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }
        res.json({ success: true, message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const contact = new Contact({ name, email, message });
        await contact.save();
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
});

// Admin Routes
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});

app.get('/api/admin/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch contacts' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Fallback movies database
const fallbackMovies = {
    Action: { title: 'Mad Max: Fury Road', description: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland.', poster: 'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg', rating: 8.1, id: 76341 },
    Comedy: { title: 'The Grand Budapest Hotel', description: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.', poster: 'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg', rating: 8.1, id: 120467 },
    Drama: { title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption.', poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg', rating: 8.7, id: 278 },
    Romance: { title: 'The Notebook', description: 'A poor yet passionate young man falls in love with a rich young woman.', poster: 'https://image.tmdb.org/t/p/w500/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg', rating: 7.9, id: 11036 },
    Thriller: { title: 'Inception', description: 'A thief who steals corporate secrets through dream-sharing technology.', poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg', rating: 8.8, id: 27205 },
    SciFi: { title: 'Interstellar', description: 'A team of explorers travel through a wormhole in space.', poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', rating: 8.6, id: 157336 },
    Adventure: { title: 'The Lord of the Rings', description: 'A meek Hobbit embarks on a journey to destroy a powerful ring.', poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg', rating: 8.8, id: 120 }
};

// Movie Recommendation API based on mood/genre
app.post('/api/movies/recommend', async (req, res) => {
    const { mood, genre } = req.body;
    
    // Map mood to genre
    const genreMap = {
        happy: 'Comedy',
        sad: 'Drama',
        angry: 'Action',
        surprised: 'SciFi',
        fearful: 'Thriller',
        disgusted: 'Drama',
        neutral: 'Adventure',
        Action: 'Action',
        Adventure: 'Adventure',
        Drama: 'Drama',
        Comedy: 'Comedy',
        Romance: 'Romance',
        Thriller: 'Thriller',
        SciFi: 'SciFi'
    };

    const selectedGenre = genreMap[mood] || genreMap[genre] || 'Action';
    const fallbackMovie = fallbackMovies[selectedGenre];
    
    // Return fallback movie immediately (works offline)
    res.json({
        success: true,
        movie: {
            title: fallbackMovie.title,
            description: fallbackMovie.description,
            poster: fallbackMovie.poster,
            rating: fallbackMovie.rating,
            releaseDate: '2024',
            id: fallbackMovie.id
        }
    });
});

// Trailer database (works offline)
const trailerDatabase = {
    76341: 'hEJnMQG9ev8',
    120467: '1Fg5iWmQjwk',
    278: '6hB3S9bIaco',
    11036: '4M7LIcH8C9U',
    27205: 'YoHD9XEInc0',
    157336: 'zSWdZVtXT7E',
    120: 'V75dMMIW2B4'
};

// Get Movie Trailer
app.get('/api/movies/:movieId/trailer', async (req, res) => {
    const { movieId } = req.params;
    
    // Check fallback database first
    const trailerKey = trailerDatabase[movieId];
    
    if (trailerKey) {
        res.json({
            success: true,
            trailerUrl: `https://www.youtube.com/watch?v=${trailerKey}`,
            embedUrl: `https://www.youtube.com/embed/${trailerKey}`
        });
    } else {
        res.json({ success: false, message: 'No trailer found' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
