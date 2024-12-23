import express from 'express';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if(userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch(err) {
        return res.status(500).json({ message: 'Server Error', error: err });
    }
});


router.post('/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    const isEmail = (str) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(str);
    };

    let user;
    if(isEmail(usernameOrEmail)) {
        user = await User.findOne({ email: usernameOrEmail });
    } else {
        user = await User.findOne({ username: usernameOrEmail });
    }

    if(!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    console.log(isPasswordValid);

    if(!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login Successfull', token, userData: user });
});

export default router;