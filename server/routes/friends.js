import express from 'express';
import User from '../models/user.js';
import authMiddleware from './authmiddleware.js';

const router = express.Router();

const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (err) {
        throw new Error('User not found');
    }
};

router.get('/friends', authMiddleware, async (req, res) => {
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId).populate('friends', 'username profilePhoto');
        res.status(200).json({ friends: currentUser.friends });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/send-request/:username', authMiddleware, async (req, res) => {
    const { username } = req.params;
    const currentUserId = req.user.id;

    if (req.user.username === username) {
        return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
    }

    try {
        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        if (currentUser.friends.includes(targetUser._id)) {
            return res.status(400).json({ message: 'You are already friends.' });
        }

        const alreadySent = currentUser.friendRequests.some(req => req.user.toString() === targetUser._id.toString() && req.type === 'sent');
        const alreadyReceived = targetUser.friendRequests.some(req => req.user.toString() === currentUserId && req.type === 'received');

        if (alreadySent || alreadyReceived) {
            return res.status(400).json({ message: 'Friend request already sent or received.' });
        }

        currentUser.friendRequests.push({ user: targetUser._id, type: 'sent', status: 'pending' });
        targetUser.friendRequests.push({ user: currentUserId, type: 'received', status: 'pending' });

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend request sent successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/accept-request/:username', authMiddleware, async (req, res) => {
    const { username } = req.params;
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        const receivedRequest = currentUser.friendRequests.find(req => req.user.toString() === targetUser._id.toString() && req.type === 'received' && req.status === 'pending');

        if (!receivedRequest) {
            return res.status(400).json({ message: 'No pending friend request from this user.' });
        }

        currentUser.friends.push(targetUser._id);
        targetUser.friends.push(currentUserId);

        receivedRequest.status = 'accepted';
        const sentRequest = targetUser.friendRequests.find(req => req.user.toString() === currentUserId && req.type === 'sent');
        sentRequest.status = 'accepted';

        currentUser.friendRequests = currentUser.friendRequests.filter(req => req.user.toString() !== targetUser._id.toString() || req.type !== 'received');
        targetUser.friendRequests = targetUser.friendRequests.filter(req => req.user.toString() !== currentUserId || req.type !== 'sent');

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/reject-request/:username', authMiddleware, async (req, res) => {
    const { username } = req.params;
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        const receivedRequest = currentUser.friendRequests.find(req => req.user.toString() === targetUser._id.toString() && req.type === 'received' && req.status === 'pending');

        if (!receivedRequest) {
            return res.status(400).json({ message: 'No pending friend request from this user.' });
        }

        receivedRequest.status = 'rejected';
        const sentRequest = targetUser.friendRequests.find(req => req.user.toString() === currentUserId && req.type === 'sent');
        sentRequest.status = 'rejected';

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend request rejected.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.get('/friend-requests', authMiddleware, async (req, res) => {
    const currentUserId = req.user.id;

    try {
        const currentUser = await User.findById(currentUserId).populate('friendRequests.user', 'username profilePhoto');
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const receivedRequests = currentUser.friendRequests && currentUser.friendRequests.length > 0
            ? currentUser.friendRequests.filter(req => req.type === 'received' && req.status === 'pending')
            : [];

        res.status(200).json({ receivedRequests });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error.' });
    }
});

export default router;
