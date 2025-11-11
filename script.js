// --- 1. DATA STRUCTURES ---
    const questions = [
        {
            question: "If you could have any superpower for a day, which would you choose?",
            options: [
                { text: "Super strength and invincibility - to be an unstoppable force", score: { Action: 3, Adventure: 1 } },
                { text: "Time manipulation - to fix mistakes and explore different timelines", score: { SciFi: 3, Thriller: 1 } },
                { text: "Mind reading - to understand people's deepest thoughts and emotions", score: { Drama: 3, Romance: 1 } },
                { text: "The ability to make anyone laugh uncontrollably - to spread joy everywhere", score: { Comedy: 3 } }
            ]
        },
        {
            question: "Your ideal Friday night involves:",
            options: [
                { text: "An adrenaline-fueled adventure like skydiving or exploring abandoned places", score: { Adventure: 3, Action: 1 } },
                { text: "A cozy movie marathon with your favorite person and lots of snacks", score: { Romance: 3, Drama: 1 } },
                { text: "Solving an elaborate mystery or escape room with friends", score: { Thriller: 3, SciFi: 1 } },
                { text: "Hosting an epic party with games, dancing, and hilarious moments", score: { Comedy: 2 } }
            ]
        },
        {
            question: "Which fictional world would you most want to live in?",
            options: [
                { text: "A magical realm with ancient creatures and hidden treasures", score: { Adventure: 2, Fantasy: 1 } },
                { text: "A futuristic society with advanced technology and space travel", score: { SciFi: 2, Action: 1 } },
                { text: "A dramatic period piece with complex relationships and high stakes", score: { Drama: 2, Romance: 1 } },
                { text: "A quirky town where every day brings new comedic situations", score: { Comedy: 2, Romance: 1 } }
            ]
        }
    ];

    const recommendations = {
        Action: {
            title: "Rampage Protocol",
            genre: "Action/Sci-Fi",
            description: "A high-octane chase against a rogue AI threatening humanity. Explosive action meets cutting-edge technology.",
            poster: "https://images.unsplash.com/photo-1578122394593-010214811a2f?fit=crop&w=450&q=80"
        },
        Adventure: {
            title: "The Lost Temple of Xylos",
            genre: "Adventure/Fantasy",
            description: "An explorer seeks an ancient city with magical powers hidden deep in uncharted territories.",
            poster: "https://images.unsplash.com/photo-1517436329012-b97c2718e21a?fit=crop&w=450&q=80"
        },
        Drama: {
            title: "Echoes of the Past",
            genre: "Drama/Biopic",
            description: "A powerful story of a musician's journey through love, loss, and redemption.",
            poster: "https://images.unsplash.com/photo-1489599809505-7ed0b4b4c0e4?fit=crop&w=450&q=80"
        },
        Comedy: {
            title: "The Wedding Crasher's Guide",
            genre: "Comedy/Romance",
            description: "A hilarious misadventure of two friends who accidentally become professional wedding crashers.",
            poster: "https://images.unsplash.com/photo-1489599809505-7ed0b4b4c0e4?fit=crop&w=450&q=80"
        },
        Romance: {
            title: "Letters to a Stranger",
            genre: "Romance/Drama",
            description: "Two strangers connect through anonymous letters, changing each other's lives forever.",
            poster: "https://images.unsplash.com/photo-1489599809505-7ed0b4b4c0e4?fit=crop&w=450&q=80"
        },
        Thriller: {
            title: "The Silent Witness",
            genre: "Thriller/Mystery",
            description: "A detective races against time to solve a series of murders with only one silent witness.",
            poster: "https://images.unsplash.com/photo-1489599809505-7ed0b4b4c0e4?fit=crop&w=450&q=80"
        },
        SciFi: {
            title: "Quantum Paradox",
            genre: "Sci-Fi/Thriller",
            description: "A scientist discovers a way to travel between parallel universes, but each jump has deadly consequences.",
            poster: "https://images.unsplash.com/photo-1489599809505-7ed0b4b4c0e4?fit=crop&w=450&q=80"
        }
    };

    // Mood-based movie recommendations
    const moodRecommendations = {
        happy: {
            title: "Joyful Journeys",
            genre: "Comedy/Adventure",
            description: "A heartwarming adventure about friends discovering the true meaning of happiness in unexpected places.",
            industry: "Hollywood",
            reason: "Your happy expression calls for an uplifting comedy adventure!"
        },
        sad: {
            title: "Silver Linings",
            genre: "Drama/Inspirational",
            description: "A touching story about overcoming adversity and finding hope in the darkest of times.",
            industry: "Bollywood",
            reason: "A heartfelt Bollywood drama to lift your spirits and remind you of life's beauty."
        },
        angry: {
            title: "Redemption Road",
            genre: "Action/Thriller",
            description: "A former soldier channels his rage into fighting injustice in this intense action thriller.",
            industry: "Hollywood",
            reason: "Channel that energy with a high-octane action movie!"
        },
        surprised: {
            title: "Unexpected Turns",
            genre: "Mystery/Thriller",
            description: "A series of shocking revelations turns a simple investigation into a life-changing adventure.",
            industry: "Tollywood",
            reason: "Your surprised expression matches this thrilling Tollywood mystery full of twists!"
        },
        fearful: {
            title: "Courage Within",
            genre: "Drama/Adventure",
            description: "An ordinary person discovers extraordinary bravery when faced with their deepest fears.",
            industry: "Bollywood",
            reason: "This inspiring Bollywood drama will help you face your fears with courage."
        },
        disgusted: {
            title: "Pure Hearts",
            genre: "Romance/Drama",
            description: "A story about finding beauty and love in a world that sometimes seems ugly.",
            industry: "Hollywood",
            reason: "This uplifting romance will restore your faith in humanity."
        },
        neutral: {
            title: "The Observer",
            genre: "Documentary/Drama",
            description: "A thoughtful exploration of human connections in our modern world.",
            industry: "Hollywood",
            reason: "Your calm demeanor suggests you'd enjoy this thoughtful documentary drama."
        }
    };

    // --- 2. STATE MANAGEMENT ---
    let currentQuestionIndex = 0;
    let userScores = {
        Action: 0,
        Adventure: 0,
        Drama: 0,
        Comedy: 0,
        Romance: 0,
        Thriller: 0,
        SciFi: 0
    };

    // Face detection variables
    let faceDetectionModel = null;
    let videoStream = null;
    let detectionInterval = null;

    // --- 3. DOM ELEMENTS ---
    const screens = document.querySelectorAll('.screen');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const movieTitle = document.getElementById('movie-title');
    const movieGenre = document.getElementById('movie-genre');
    const movieDescription = document.getElementById('movie-description');
    const movieImage = document.querySelector('.movie-image');
    const navLinks = document.querySelectorAll('.nav-link');
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const toggleLinks = document.querySelectorAll('.toggle-link a');
    const authForms = document.querySelectorAll('.auth-form');
    const progressBar = document.getElementById('progress-bar');
    const currentQuestionSpan = document.getElementById('current-question');

    // Face detection elements
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startCameraBtn = document.getElementById('start-camera');
    const stopCameraBtn = document.getElementById('stop-camera');
    const detectMoodBtn = document.getElementById('detect-mood');
    const moodDisplay = document.getElementById('mood-display');
    const moodValue = document.getElementById('mood-value');
    const filmIndustry = document.getElementById('film-industry');
    const recommendationCard = document.getElementById('recommendation-card');
    const recommendedTitle = document.getElementById('recommended-title');
    const recommendedGenre = document.getElementById('recommended-genre');
    const recommendedDescription = document.getElementById('recommended-description');
    const recommendedIndustry = document.getElementById('recommended-industry');

    // --- 4. SCREEN MANAGEMENT ---
    function switchScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        });

        const targetScreen = document.getElementById(screenId);
        targetScreen.classList.remove('hidden');
        targetScreen.classList.add('active');

        // Special handling for quiz screen
        if (screenId === 'quiz-screen') {
            resetQuiz();
            displayQuestion();
        }
        
        // Special handling for face detection screen
        if (screenId === 'face-detection-screen') {
            stopCamera(); // Ensure camera is stopped when switching away
        }
    }

    // --- 5. QUIZ LOGIC ---
    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;

        // Update progress bar and counter
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        currentQuestionSpan.textContent = currentQuestionIndex + 1;

        optionsContainer.innerHTML = '';
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            button.textContent = option.text;
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        nextBtn.classList.add('hidden');
    }

    function selectOption(optionIndex) {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(button => button.classList.remove('selected'));
        buttons[optionIndex].classList.add('selected');

        const selectedOption = questions[currentQuestionIndex].options[optionIndex];
        for (const genre in selectedOption.score) {
            userScores[genre] += selectedOption.score[genre];
        }

        nextBtn.classList.remove('hidden');
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }

    async function showResult() {
        let topGenre = '';
        let topScore = 0;

        for (const genre in userScores) {
            if (userScores[genre] > topScore) {
                topScore = userScores[genre];
                topGenre = genre;
            }
        }

        try {
            const response = await fetch('https://movie-recommender-blue.vercel.app/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ genre: topGenre })
            });

            const result = await response.json();
            
            if (result.success && result.movie) {
                movieTitle.textContent = result.movie.title;
                movieGenre.textContent = topGenre;
                movieDescription.textContent = result.movie.description;
                movieImage.style.backgroundImage = `url('${result.movie.poster}')`;
                movieImage.style.backgroundSize = 'cover';
                movieImage.style.backgroundPosition = 'center';
                movieImage.textContent = '';
                movieImage.setAttribute('data-movie-id', result.movie.id);
            } else {
                throw new Error('API failed');
            }
        } catch (error) {
            const recommendation = recommendations[topGenre];
            movieTitle.textContent = recommendation.title;
            movieGenre.textContent = recommendation.genre;
            movieDescription.textContent = recommendation.description;
            movieImage.style.backgroundImage = `url('${recommendation.poster}')`;
            movieImage.style.backgroundSize = 'cover';
            movieImage.style.backgroundPosition = 'center';
            movieImage.textContent = '';
        }

        switchScreen('result-screen');
    }

    function resetQuiz() {
        currentQuestionIndex = 0;
        userScores = {
            Action: 0,
            Adventure: 0,
            Drama: 0,
            Comedy: 0,
            Romance: 0,
            Thriller: 0,
            SciFi: 0
        };
    }

    // --- 6. FACE DETECTION LOGIC ---
    async function loadFaceDetectionModel() {
        try {
            // Load the face detection model
            faceDetectionModel = await faceLandmarksDetection.load(
                faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
                { maxFaces: 1 }
            );
            console.log("Face detection model loaded");
            return true;
        } catch (error) {
            console.error("Error loading face detection model:", error);
            alert("Failed to load face detection model. Please try again later.");
            return false;
        }
    }

    async function startCamera() {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ 
                video: { width: 600, height: 450 } 
            });
            video.srcObject = videoStream;
            
            startCameraBtn.disabled = true;
            stopCameraBtn.disabled = false;
            detectMoodBtn.disabled = false;
            
            // Show mood display
            moodDisplay.classList.remove('hidden');
            
            // Start detecting faces
            detectFaces();
            
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Could not access your camera. Please check permissions and try again.");
        }
    }

    function stopCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }
        
        if (detectionInterval) {
            clearInterval(detectionInterval);
            detectionInterval = null;
        }
        
        startCameraBtn.disabled = false;
        stopCameraBtn.disabled = true;
        detectMoodBtn.disabled = true;
        
        // Clear canvas
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    async function detectFaces() {
        if (!faceDetectionModel) return;
        
        detectionInterval = setInterval(async () => {
            if (video.paused || video.ended) return;
            
            const predictions = await faceDetectionModel.estimateFaces({
                input: video,
                returnTensors: false,
                flipHorizontal: false,
                predictIrises: false
            });
            
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (predictions.length > 0) {
                // Draw facial landmarks
                ctx.strokeStyle = '#e50914';
                ctx.lineWidth = 1;
                
                for (let i = 0; i < predictions.length; i++) {
                    const keypoints = predictions[i].scaledMesh;
                    
                    // Draw face contours
                    for (let j = 0; j < keypoints.length; j++) {
                        const [x, y] = keypoints[j];
                        ctx.beginPath();
                        ctx.arc(x, y, 1, 0, 2 * Math.PI);
                        ctx.stroke();
                    }
                }
            }
        }, 100);
    }

    async function detectMood() {
        if (!faceDetectionModel) {
            alert("Face detection model not loaded. Please try again.");
            return;
        }
        
        try {
            // For demonstration, we'll simulate mood detection
            // In a real implementation, you would use a facial expression recognition model
            
            // Simulate processing
            detectMoodBtn.disabled = true;
            detectMoodBtn.textContent = "Analyzing...";
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For demo purposes, we'll randomly select a mood
            const moods = ['happy', 'sad', 'angry', 'surprised', 'fearful', 'disgusted', 'neutral'];
            const randomMood = moods[Math.floor(Math.random() * moods.length)];
            
            // Update UI with the detected mood
            updateMoodDisplay(randomMood);
            
            // Show recommendation based on mood
            showMoodRecommendation(randomMood);
            
        } catch (error) {
            console.error("Error detecting mood:", error);
            alert("Error detecting your mood. Please try again.");
        } finally {
            detectMoodBtn.disabled = false;
            detectMoodBtn.textContent = "Detect My Mood";
        }
    }

    function updateMoodDisplay(mood) {
        // Update mood value
        moodValue.textContent = mood.charAt(0).toUpperCase() + mood.slice(1);
        
        // Update expression bars with random values for demo
        updateExpressionBar('happy', Math.random() * 100);
        updateExpressionBar('sad', Math.random() * 100);
        updateExpressionBar('angry', Math.random() * 100);
        updateExpressionBar('surprised', Math.random() * 100);
        updateExpressionBar('fearful', Math.random() * 100);
        updateExpressionBar('disgusted', Math.random() * 100);
        updateExpressionBar('neutral', Math.random() * 100);
        
        // Highlight the detected mood bar
        highlightDetectedMood(mood);
    }

    function updateExpressionBar(expression, value) {
        const bar = document.getElementById(`${expression}-bar`);
        const percent = document.getElementById(`${expression}-percent`);
        
        const percentage = Math.round(value);
        bar.style.width = `${percentage}%`;
        percent.textContent = `${percentage}%`;
    }

    function highlightDetectedMood(mood) {
        // Reset all bars
        const expressions = ['happy', 'sad', 'angry', 'surprised', 'fearful', 'disgusted', 'neutral'];
        expressions.forEach(exp => {
            const bar = document.getElementById(`${exp}-bar`);
            bar.style.background = 'linear-gradient(90deg, var(--primary-color), #ff5252)';
        });
        
        // Highlight the detected mood
        const detectedBar = document.getElementById(`${mood}-bar`);
        detectedBar.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    }

    async function showMoodRecommendation(mood) {
        try {
            const response = await fetch('http://localhost:3000/api/movies/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mood: mood })
            });

            const result = await response.json();
            
            if (result.success && result.movie) {
                const recommendedPoster = document.getElementById('recommended-poster');
                recommendedPoster.src = result.movie.poster;
                recommendedPoster.style.display = 'block';
                
                recommendedTitle.textContent = result.movie.title;
                recommendedGenre.textContent = `${mood.charAt(0).toUpperCase() + mood.slice(1)} Mood`;
                recommendedDescription.textContent = result.movie.description;
                recommendationCard.setAttribute('data-movie-id', result.movie.id);
                
                recommendedIndustry.innerHTML = '';
                const industryBadge = document.createElement('span');
                industryBadge.className = 'industry-badge hollywood';
                industryBadge.textContent = 'Hollywood';
                recommendedIndustry.appendChild(industryBadge);
                
                filmIndustry.textContent = `Rating: ${result.movie.rating}/10`;
            } else {
                throw new Error('API failed');
            }
        } catch (error) {
            const recommendation = moodRecommendations[mood];
            
            if (recommendation) {
                document.getElementById('recommended-poster').style.display = 'none';
                recommendedTitle.textContent = recommendation.title;
                recommendedGenre.textContent = recommendation.genre;
                recommendedDescription.textContent = recommendation.description;
                
                recommendedIndustry.innerHTML = '';
                const industryBadge = document.createElement('span');
                industryBadge.className = `industry-badge ${recommendation.industry.toLowerCase()}`;
                industryBadge.textContent = recommendation.industry;
                recommendedIndustry.appendChild(industryBadge);
                
                filmIndustry.textContent = `Recommended Industry: ${recommendation.industry}`;
            }
        }
        
        recommendationCard.classList.remove('hidden');
    }

    // --- 7. BACKEND INTEGRATION ---

    // Contact Form Submission
    document.querySelector('.contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.querySelector('input[type="text"]').value,
            email: e.target.querySelector('input[type="email"]').value,
            message: e.target.querySelector('textarea').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);
            if (result.success) e.target.reset();
        } catch (error) {
            alert('Error sending message. Please try again.');
        }
    });

    // Login Form
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.querySelector('input[type="email"]').value,
            password: e.target.querySelector('input[type="password"]').value
        };

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);
            if (result.success) {
                localStorage.setItem('user', JSON.stringify(result.user));
                e.target.reset();
                switchScreen('home-screen');
            }
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    });

    // Signup Form
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();

        const password = e.target.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = e.target.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const formData = {
            name: e.target.querySelector('input[type="text"]').value,
            email: e.target.querySelector('input[type="email"]').value,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            alert(result.message);
            if (result.success) {
                document.querySelector('.toggle-link a[data-form="login-form"]').click();
                e.target.reset();
            }
        } catch (error) {
            alert('Registration failed. Please try again.');
        }
    });

    // --- 8. EVENT LISTENERS ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const screenId = link.getAttribute('data-screen');
            switchScreen(screenId);
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });

    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', () => switchScreen('quiz-screen'));
    
    // Trailer button
    document.querySelector('.trailer-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        const movieId = movieImage.getAttribute('data-movie-id');
        
        if (!movieId) {
            alert('Trailer not available');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/api/movies/${movieId}/trailer`);
            const result = await response.json();
            
            if (result.success) {
                window.open(result.trailerUrl, '_blank');
            } else {
                alert('Trailer not available for this movie');
            }
        } catch (error) {
            alert('Error loading trailer');
        }
    });

    // Face detection event listeners
    startCameraBtn.addEventListener('click', startCamera);
    stopCameraBtn.addEventListener('click', stopCamera);
    detectMoodBtn.addEventListener('click', detectMood);
    
    // Watch trailer button for mood detection
    document.getElementById('watch-mood-trailer').addEventListener('click', async () => {
        const movieId = recommendationCard.getAttribute('data-movie-id');
        
        if (!movieId) {
            alert('Trailer not available');
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/api/movies/${movieId}/trailer`);
            const result = await response.json();
            
            if (result.success) {
                window.open(result.trailerUrl, '_blank');
            } else {
                alert('Trailer not available for this movie');
            }
        } catch (error) {
            alert('Error loading trailer');
        }
    });

    // Burger menu toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        // Animate links
        const navItems = document.querySelectorAll('.nav-links li');
        navItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Auth form toggle
    toggleLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetForm = link.getAttribute('data-form');

            authForms.forEach(form => {
                form.classList.remove('active-form');
                form.classList.add('hidden-form');
            });

            document.getElementById(targetForm).classList.remove('hidden-form');
            document.getElementById(targetForm).classList.add('active-form');
        });
    });

    // --- 9. INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', async () => {
        displayQuestion();
        
        // Load face detection model when the page loads
        await loadFaceDetectionModel();
        
        // Set canvas dimensions to match video
        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        });
    });