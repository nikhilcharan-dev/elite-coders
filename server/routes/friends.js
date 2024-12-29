import express from 'express';
import User from '../models/user.js';
import authMiddleware from './authmiddleware.js';

const router = express.Router();

// Helper function to find user by username
const findUserByUsername = async (username) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    return user;
};

// gettig current user's friends
router.get('/', authMiddleware, async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId).populate('friends', 'username profilePhoto');
        res.status(200).json({ friends: currentUser.friends });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// sending a friend request
router.post('/send-request/:username', authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const currentUserId = req.user.id;

        if (req.user.username === username) {
            return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        if (currentUser.friends.includes(targetUser._id)) {
            return res.status(400).json({ message: 'You are already friends.' });
        }

        const alreadySent = currentUser.friendRequests.some(
            (req) => req.user.toString() === targetUser._id.toString() && req.type === 'sent'
        );
        const alreadyReceived = targetUser.friendRequests.some(
            (req) => req.user.toString() === currentUserId && req.type === 'received'
        );

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

// accepting a friend request
router.post('/accept-request/:username', authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const currentUserId = req.user.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        const receivedRequest = currentUser.friendRequests.find(
            (req) =>
                req.user.toString() === targetUser._id.toString() &&
                req.type === 'received' &&
                req.status === 'pending'
        );

        if (!receivedRequest) {
            return res.status(400).json({ message: 'No pending friend request from this user.' });
        }

        currentUser.friends.push(targetUser._id);
        targetUser.friends.push(currentUserId);

        currentUser.friendRequests = currentUser.friendRequests.filter(
            (req) => req.user.toString() !== targetUser._id.toString() || req.type !== 'received'
        );
        targetUser.friendRequests = targetUser.friendRequests.filter(
            (req) => req.user.toString() !== currentUserId || req.type !== 'sent'
        );

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// rejecting a friend request
router.post('/reject-request/:username', authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const currentUserId = req.user.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        const receivedRequest = currentUser.friendRequests.find(
            (req) =>
                req.user.toString() === targetUser._id.toString() &&
                req.type === 'received' &&
                req.status === 'pending'
        );

        if (!receivedRequest) {
            return res.status(400).json({ message: 'No pending friend request from this user.' });
        }

        currentUser.friendRequests = currentUser.friendRequests.filter(
            (req) => req.user.toString() !== targetUser._id.toString() || req.type !== 'received'
        );
        targetUser.friendRequests = targetUser.friendRequests.filter(
            (req) => req.user.toString() !== currentUserId || req.type !== 'sent'
        );

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend request rejected.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

// geting pending friend requests
router.get('/friend-requests', authMiddleware, async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId).populate('friendRequests.user', 'username profilePhoto');

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const receivedRequests = currentUser.friendRequests.filter(
            (req) => req.type === 'received' && req.status === 'pending'
        );

        res.status(200).json({ receivedRequests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.post('/remove-friend/:username', authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const currentUserId = req.user.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        if(!currentUser.friends.includes(targetUser._id)) {
            return res.status(400).json({ message: 'This user is not in friends list.' });
        }

        currentUser.friends = currentUser.friends.filter(
            friend => friend.toString() !== targetUser._id.toString()
        );
        
        targetUser.friends = targetUser.friends.filter(
            friend => friend.toString() !== currentUserId
        );

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend removed successfully.' });
    } catch(err) {
        res.status(400).json({ message: 'Error removing friend. '});
    }
});


export default router;
