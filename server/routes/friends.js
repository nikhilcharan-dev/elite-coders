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
        
        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        console.log('Current user:', currentUser._id);
        console.log('Target user:', targetUser._id);

        if (currentUser._id.toString() === targetUser._id.toString()) {
            return res.status(400).json({ message: 'You cannot send a friend request to yourself.' });
        }

        if (currentUser.friends.includes(targetUser._id)) {
            return res.status(400).json({ message: 'You are already friends.' });
        }

        // cheking if the target user already sent a request to the current user
        const alreadyReceived = currentUser.friendRequests.find(
            (req) => req.user.toString() === targetUser._id.toString() && req.type === 'received'
        );

        if (alreadyReceived) {
            // makingg them friends
            currentUser.friends.push(targetUser._id);
            targetUser.friends.push(currentUser._id);

            // removing the friend requests for both
            currentUser.friendRequests = currentUser.friendRequests.filter(
                (req) => req.user.toString() !== targetUser._id.toString() || req.type !== 'received'
            );
            targetUser.friendRequests = targetUser.friendRequests.filter(
                (req) => req.user.toString() !== currentUser._id.toString() || req.type !== 'sent'
            );

            await currentUser.save();
            await targetUser.save();

            return res.status(200).json({ message: 'You are now friends.' });
        }

        // checking if a request was already sent by the current user
        const alreadySent = currentUser.friendRequests.some(
            (req) => req.user.toString() === targetUser._id.toString() && req.type === 'sent'
        );

        if (alreadySent) {
            return res.status(400).json({ message: 'Friend request already sent.' });
        }

        // sending req if not send already
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
    console.log('getting all requests');
    try {
        const currentUserId = req.user.id;
        const currentUser = await User.findById(currentUserId).populate('friendRequests.user', 'username profilePhoto');

        console.log(currentUser.friendRequests)


        if (!currentUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const receivedRequests = currentUser.friendRequests.filter(
            (req) => req.type === 'received' && req.status === 'pending'
        );

        const sentRequests = currentUser.friendRequests.filter(
            (req) => req.type === 'sent' && req.status === 'pending'
        );

        res.status(200).json({ receivedRequests, sentRequests });
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

router.post('/unsend-request/:username', authMiddleware, async (req, res) => {
    try {
        const { username } = req.params;
        const currentUserId = req.user.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await findUserByUsername(username);

        const sentRequest = currentUser.friendRequests.find(
            (req) =>
                req.user.toString() === targetUser._id.toString() &&
                req.type === 'sent' &&
                req.status === 'pending'
        );

        if (!sentRequest) {
            return res.status(400).json({ message: 'No pending friend request to this user.' });
        }

        currentUser.friendRequests = currentUser.friendRequests.filter(
            (req) => req.user.toString() !== targetUser._id.toString() || req.type !== 'sent'
        );

        targetUser.friendRequests = targetUser.friendRequests.filter(
            (req) => req.user.toString() !== currentUserId || req.type !== 'received'
        );

        await currentUser.save();
        await targetUser.save();

        res.status(200).json({ message: 'Friend request unsent.' });
    } catch(err) {
        res.status(400).json({ message: 'Error unsending request.' });
    }
})


export default router;
