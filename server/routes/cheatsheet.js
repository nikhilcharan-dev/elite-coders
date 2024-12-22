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

// getting by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const cheatsheet = await CheatSheet.findById(id);
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



export default router;