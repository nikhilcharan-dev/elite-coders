import express from 'express';
import User from '../models/user.js';
import Question from '../models/question.js';
import Topic from '../models/topic.js';

const router = express.Router();

router.post('/recommend-question', async (req, res) => {
    const { senderId, receiverId, questionId } = req.body;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        const user = await User.findById(receiverId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.recommendedQuestions.push({
            senderId,
            questionLink: question._id,
        });
        await user.save();

        res.status(200).json({ message: 'Question recommended successfully' });
    } catch (error) {
        console.error('Error recommending question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/recommend-topic', async (req, res) => {
    const { senderId, receiverId, topicId } = req.body;

    try {
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }

        const user = await User.findById(receiverId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.recommendedTopics.push({
            senderId,
            topicId: topic._id,
        });
        await user.save();

        res.status(200).json({ message: 'Topic recommended successfully' });
    } catch (error) {
        console.error('Error recommending topic:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
