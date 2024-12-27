import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import topicRoutes from './routes/topics.js'
import quoteRoutes from './routes/quotes.js';
import friendRoutes from './routes/friends.js';
import infoRoutes from './routes/credentials.js';
import questionRoutes from './routes/questions.js';
import cheatsheetRouter from './routes/cheatsheet.js';

// .env file config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// origin whitelist
const allowedOrigins = [
    'http://localhost:5173',
    'https://elite-coders-nikirus-projects.vercel.app',
    'https://elite-coders-xii.vercel.app'
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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};1


// CORS middleware
app.use(cors(corsOptions));

// middleware
// app.use(cors());
app.use(express.json({ limit: '10mb' })); // limiting size
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

// home
app.route('/').get((req, res) => {
    const welcome = `
    <h1> Welcome to Backend Server </h1>
    <p> Nikhil Charan -- </p>
    `;
    return res.send(welcome);
});

// routes
app.use('/api/oauth', authRoutes);
app.use('/api/random', quoteRoutes);
app.use('/api/users', infoRoutes);
app.use('/api/meta', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/cheatsheets', cheatsheetRouter);

app.use('*', (req, res) => {
    return res.status(404).json({ message: 'Route not found' });
});


app.listen(PORT, () => {
    connectDB();
});