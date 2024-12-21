import express from 'express';
import User from '../models/user.js';

const router = express.Router();


router.post('/uploadProfilePhoto', async (req, res) => {
    const { userId, profilePhoto } = req.body;

    if (!userId || !profilePhoto) {
        return res.status(400).json({ message: "Missing userId or profilePhoto" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePhoto },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating profile photo:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.get('/getProfilePhoto/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid userId" });
        }

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