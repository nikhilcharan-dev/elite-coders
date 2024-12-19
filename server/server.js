import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
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
        `;
        return res.send(welcome);
    });

app.use('/api/auth', authRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running at Port: http://localhost:${process.env.PORT}`);
});