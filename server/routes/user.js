import express from 'express';
import User from '../models/user.js';

const router = express.Router();


router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('profilePhoto');
        
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal Server Error');
    }
});


export default router;
