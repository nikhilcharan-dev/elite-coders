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




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.route('/').get((req, res) => {
    const welcome = `
    <h1> Welcome to Backend Server </h1>
    <p> Nikhil Charan -- </p>
    `;
    return res.send(welcome);
});

app.use('/api/oauth', authRoutes);
app.use('/api/random', quoteRoutes);
app.use('/api/users', infoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/cheatsheets', cheatsheetRouter);


app.listen(PORT, () => {
    console.log(`Server is running at Port: http://localhost:${PORT}`);
    connectDB();
});
