import mongoose from 'mongoose';
import readlineSync from 'readline-sync';
import connectDB from './config/db.js';

const questionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    topics: { type: [String], required: true },
    platform: { type: String, required: true },
    link: { type: String, required: true }
}, { timestamps: true });

const Question = mongoose.model('QuestionBank', questionSchema);

async function collectQuestionData() {
    const name = readlineSync.question('Enter the question name: ');
    let difficulty = readlineSync.question('Enter the difficulty (Easy(e), Medium(m), Hard(h), S[SuperHard]): ');
    const platform = readlineSync.question('Enter the Platform (LeetCode(l), GFG(g), CodeForces(cf), CodeChef(c)): ')
    const link = readlineSync.question('Enter the Link: ');

    // Standardize difficulty input
    difficulty = difficulty.toLowerCase() === 'e' ? 'Easy' : 
                difficulty.toLowerCase() === 'm' ? 'Medium' : 
                difficulty.toLowerCase() === 'h' ? 'Hard' : 
                difficulty.toLowerCase() === 's' ? 'S' : difficulty;

    // Standardize platform input
    let platformName;
    switch(platform.toLowerCase()) {
        case 'l': platformName = 'LeetCode'; break;
        case 'g': platformName = 'GFG'; break;
        case 'c': platformName = 'CodeChef'; break;
        case 'cf': platformName = 'CodeForces'; break;
        default: platformName = platform; break;
    }

    // Multiple topics input (comma separated)
    const topicsInput = readlineSync.question('Enter the topics (comma separated): ');
    const topics = topicsInput.split(',').map(topic => topic.trim()); // Split and trim spaces
    
    const newQuestion = new Question({
        name,
        difficulty,
        topics,
        platform: platformName,
        link
    });

    // Save the question to the database
    try {
        await newQuestion.save();
        console.log('Question saved successfully!');
    } catch (err) {
        console.error('Error saving question:', err);
    }
}

// Main function to handle database connection and question collection
async function collectQuestions() {
    try {
        await connectDB();  // Connect to the database once
        const numQuestions = readlineSync.questionInt('Enter the number of questions you want to collect: ');
        
        // Loop to collect and save questions
        for (let i = 0; i < numQuestions; i++) { // 100 questions
            console.log(`Collecting question ${i + 1}/${numQuestions}`);
            await collectQuestionData();  // Wait for each question to be saved before continuing
        }
    } catch (err) {
        console.error('Error during question collection:', err);
    }
}

// Start collecting questions
collectQuestions();
