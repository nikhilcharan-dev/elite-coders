import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quoteRoutes from './routes/quotes.js'
import infoRoutes from './routes/credentials.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app
    .route('/')
    .get((req, res) => {
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


app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port: http://localhost:${process.env.PORT}`);
});