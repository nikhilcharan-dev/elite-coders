import mongoose from "mongoose";
import axios from "axios";
import readline from "readline";
import Question from "./models/question.js";
import connectDB from './config/db.js';

const API_URL = "https://alfa-leetcode-api.onrender.com/problems?limit=3421";

const deleteLeetCodeQuestions = async () => {
    try {
        const result = await Question.deleteMany({ platform: 'LeetCode' });
        console.log(`Deleted ${result.deletedCount} LeetCode questions`);
    } catch (error) {
        console.error('Error deleting LeetCode questions:', error);
    }
}

const syncQuestions = async () => {
    try {
        console.log("Fetching questions from API...");
        const { data } = await axios.get(API_URL);

        if (!data || !data.problemsetQuestionList) {
            console.error("Invalid API response.");
            return;
        }

        const questions = data.problemsetQuestionList;

        for (const question of questions) {
            const exists = await Question.findOne({ name: question.title });

            if (!exists) {
                const link = `https://leetcode.com/problems/${question.titleSlug}/`;
                const newQuestion = new Question({
                    name: question.title,
                    difficulty: question.difficulty,
                    topics: question.topicTags.map(tag => tag.name),
                    platform: "LeetCode",
                    link: link,
                });

                await newQuestion.save();
                console.log(`Added: ${question.title}`);
            } else {
                console.log(`Exists: ${question.title}`);
            }
        }

        console.log("Question synchronization completed.");
    } catch (error) {
        console.error("Error during question synchronization:", error);
    }
};



const main = async () => {
    await connectDB();
    await syncQuestions();
    // await deleteLeetCodeQuestions();
    mongoose.connection.close();
};

main();
