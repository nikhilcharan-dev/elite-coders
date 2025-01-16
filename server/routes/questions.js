import express from "express";
import User from "../models/user.js";
import Question from "../models/question.js";


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error("Error fetching questions:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch (error) {
        console.error("Error fetching question by ID:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/filter/byIds', async (req, res) => {
    const { ids } = req.body;

    console.log(ids);

    if (!ids || !Array.isArray(ids)) {
        return res.status(400).json({ error: 'Invalid IDs provided' });
    }

    try {
        const questions = await Question.find({ _id: { $in: ids } });
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions by IDs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.post("/filter", async (req, res) => {
    try {

        const { difficulty, topics, platform } = req.body;

        const query = {};
        if (difficulty) query.difficulty = { $regex: new RegExp(`^${difficulty}$`, 'i') };
        if (platform) query.platform = { $regex: new RegExp(`^${platform}$`, 'i') };
        if (topics.length > 0) {
            const topicArray = topics.map(topic => new RegExp(`^${topic.trim()}$`, 'i'));
            console.log(topicArray);
            query.topics = { $in: topicArray };
        }

        const filteredQuestions = await Question.find(query);
        res.status(200).json(filteredQuestions);
    } catch (error) {
        console.error("Error filtering questions:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.get("/random", async (req, res) => {
    try {
        const count = await Question.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuestion = await Question.findOne().skip(randomIndex);

        res.status(200).json(randomQuestion);
    } catch (error) {
        console.error("Error fetching random question:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/solve', async (req, res) => {
    const { userId, questionId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isSolved = user.solvedQuestions.includes(questionId);

        if (isSolved) {
            user.solvedQuestions = user.solvedQuestions.filter(id => id.toString() !== questionId);
        } else {
            user.solvedQuestions.push(questionId);
        }

        await user.save();
        res.status(200).json({ solvedQuestions: user.solvedQuestions });
    } catch (error) {
        console.error("Error marking question as solved:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;
