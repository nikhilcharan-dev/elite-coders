import mongoose from "mongoose";
import express from "express";
import CheatSheet from "../models/cheatsheet.js";

const router = express.Router();

// creating a new cheatsheet
router.post("/", async (req, res) => {
    const { name, quote, questions} = req.body;

    try {
        const newCheatSheet = new CheatSheet({ name, quote, questions });
        await newCheatSheet.save();
        console.log('Cheatsheet id:', newCheatSheet._id);
        res.status(201).json(newCheatSheet);
    } catch (error) {
        console.error('Error creating cheatsheet:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// getting all
router.get("/", async (req, res) => {
    try {
        const cheatsheets = await CheatSheet.find();
        res.status(200).json(cheatsheets);
    } catch (error) {
        console.error("Error fetching cheatsheets:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// getting by id/name
router.get("/:param", async (req, res) => {
    const { param } = req.params;

    if (!param) {
        return res.status(400).json({ message: "Parameter is required" });
    }

    const isObjectId = mongoose.Types.ObjectId.isValid(param);

    try {
        let cheatsheet;

        if (isObjectId) {
            cheatsheet = await CheatSheet.findById(param);
        } else {
            cheatsheet = await CheatSheet.findOne({ name: {$regex: `^${param}$`, $options: 'i'} });
        }
        if (!cheatsheet) {
            return res.status(404).json({ message: 'Cheatsheet not found' });
        }
        res.status(200).json(cheatsheet);
    } catch (error) {
        console.error("Error fetching cheatsheet:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// getting by link
router.get('/:link', async (req, res) => {
    const { link } = req.params;

    try {
        const cheatsheet = await CheatSheet.findOne({ link });

        if (!cheatsheet) {
            return res.status(404).json({ message: 'Cheatsheet not found' });
        }

        res.status(200).json(cheatsheet);
    } catch (error) {
        console.error('Error fetching cheatsheet:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// getting random
router.get('/random/:size', async (req, res) => {
    const size = parseInt(req.params.size, 10);

    try {
        const randomCheatsheets = await CheatSheet.aggregate([
            { $sample: { size } }
        ]);

        res.status(200).json(randomCheatsheets);
    } catch (error) {
        console.error('Error fetching random cheatsheets:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// like by id
router.post("/:id/like", async (req, res) => {
    const { userId } = req.body;
    
    try {
        const cheatsheet = await CheatSheet.findById(req.params.id);

        if (!cheatsheet) {
            return res.status(404).json({ message: "Cheatsheet not found" });
        }

        if (cheatsheet.likedIds.includes(userId)) {
            return res.status(400).json({ message: "You have already liked this cheatsheet" });
        }

        if (cheatsheet.dislikedIds.includes(userId)) {
            cheatsheet.dislikedIds = cheatsheet.dislikedIds.filter(id => id !== userId);
            cheatsheet.dislikes -= 1;
        }

        cheatsheet.likedIds.push(userId);
        cheatsheet.likes += 1;

        await cheatsheet.save();

        res.status(200).json({ message: "Cheatsheet liked", likes: cheatsheet.likes });
    } catch (error) {
        console.error("Error liking cheatsheet:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// dislike by id 
router.post("/:id/dislike", async (req, res) => {
    const { userId } = req.body;
    
    try {
        const cheatsheet = await CheatSheet.findById(req.params.id);

        if (!cheatsheet) {
            return res.status(404).json({ message: "Cheatsheet not found" });
        }

        if (cheatsheet.dislikedIds.includes(userId)) {
            return res.status(400).json({ message: "You have already disliked this cheatsheet" });
        }

        if (cheatsheet.likedIds.includes(userId)) {
            cheatsheet.likedIds = cheatsheet.likedIds.filter(id => id !== userId);
            cheatsheet.likes -= 1;
        }

        cheatsheet.dislikedIds.push(userId);
        cheatsheet.dislikes += 1;

        await cheatsheet.save();

        res.status(200).json({ message: "Cheatsheet disliked", dislikes: cheatsheet.dislikes });
    } catch (error) {
        console.error("Error disliking cheatsheet:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


export default router;