import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).exec();
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:id', async (req, res) => {
    const { username, email, dob, gender, bio, gotoLanguage } = req.body;

    try {
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        console.log('User:', user);

        user.username = username || user.username;
        user.email = email || user.email;
        user.dob = dob || user.dob;
        user.gender = gender || user.gender;
        user.bio = bio || user.bio;
        user.gotoLanguage = gotoLanguage || user.gotoLanguage;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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