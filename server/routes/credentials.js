import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Upload profile photo (Base64)
router.post('/uploadProfilePhoto', async (req, res) => {
    try {
        const { userId, profilePhoto } = req.body;

        if (!userId || !profilePhoto) {
            return res.status(400).json({ message: "User ID and profile photo are required" });
        }

        const user = await User.findByIdAndUpdate(userId, { profilePhoto }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile photo uploaded successfully!", user });
    } catch (error) {
        console.error('Error uploading profile photo:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get profile photo (Base64)
router.get('/getProfilePhoto/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user || !user.profilePhoto) {
            return res.status(404).json({ message: "Profile photo not found" });
        }

        res.status(200).json({ profilePhoto: user.profilePhoto });
    } catch (error) {
        console.error('Error retrieving profile photo:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;