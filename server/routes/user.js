import express from 'express';
import User from '../models/user.js';
import mongoose from 'mongoose';

const router = express.Router();

//checking if ObjectId is valid
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

router.get('/minions', async (req, res) => {
    try {
        const count = await User.countDocuments({});
        return res.json(count);
    } catch(err) {
        return res.status(500).json({ message: 'Server Error' });
    }
});

// searching by name
router.get('/search', async (req, res) => {
    const { query } = req.query;

    const search = query;

    console.log('Search:', search);
    
    if (!search) {
        return res.status(400).json({ message: 'Search query cannot be empty' });
    }

    try {
        const users = await User.find({
            username: { $regex: search, $options: 'i' },
        }).select('username profilePhoto bio _id gender');

        if (!users.length) {
            return res.status(404).json({ message: 'No users found' });
        }

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error');
    }
});

// getting user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    // checking ObjectId
    if (!isValidObjectId(id)) {
        return res.status(400).send('Invalid ObjectId format');
    }

    try {
        const user = await User.findById(id).exec();
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// editing user data
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, dob, gender, bio, language, leetcode, codechef, codeforces } = req.body;

    console.log(leetcode, codeforces, codechef);
    // checking ObjectId
    if (!isValidObjectId(id)) {
        return res.status(400).send('Invalid ObjectId format');
    }

    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.username = username || user.username;
        user.email = email || user.email;
        user.dob = dob || user.dob;
        user.gender = gender || user.gender;
        user.bio = bio || user.bio;
        user.gotoLanguage = language || user.gotoLanguage;
        
        user.handle = user.handle || {};
        if (leetcode !== "") user.handle.leetcode = leetcode;
        if (codeforces !== "") user.handle.codeforces = codeforces;
        if (codechef !== "") user.handle.codechef = codechef;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// deleting user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    // checking ObjectId
    if (!isValidObjectId(id)) {
        return res.status(400).send('Invalid ObjectId format');
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        await user.remove();

        res.json({ msg: 'User removed' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

export default router;
