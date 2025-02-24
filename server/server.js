import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import topicRoutes from './routes/topics.js'
import quoteRoutes from './routes/quotes.js';
import friendRoutes from './routes/friends.js';
import infoRoutes from './routes/credentials.js';
import questionRoutes from './routes/questions.js';
import codebloodRoutes from './routes/codeblood.js';
import recommendRoutes from './routes/recommend.js';
import cheatsheetRouter from './routes/cheatsheet.js';
import UserStats from './routes/stats.js';

// setting up env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// origin whitelist
const allowedOrigins = [
    'http://localhost:5173', // testing
    'https://elite-coders-xii.vercel.app',
    'https://elite-coders-nikirus-projects.vercel.app',
    ];

// checking request origin
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
};


// CORS middleware
// app.use(cors(corsOptions)); // add after development
app.use(cors());

// middleware
app.use(express.json({ limit: '10mb' })); // limiting size
app.use(express.urlencoded({ limit: '10mb', extended: true })); 


// HomePage
// Getting pwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// routes
app.use('/api/stats', UserStats);
app.use('/api/meta', userRoutes);
app.use('/api/oauth', authRoutes);
app.use('/api/users', infoRoutes);
app.use('/api/random', quoteRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/recommend', recommendRoutes);
app.use('/api/cheatsheets', cheatsheetRouter);
app.use('/api/codeblood', codebloodRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});