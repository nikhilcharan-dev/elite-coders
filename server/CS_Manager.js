import readline from 'readline';
import mongoose from 'mongoose';
import CheatSheet from './models/cheatsheet.js';
import Question from './models/question.js';
import connectDB from './config/db.js';

const promptUser = (query) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => rl.question(query, (answer) => {
        rl.close();
        resolve(answer.split(',').map((name) => name.trim()));
    }));
};

async function validateAndPromptCheatSheets() {
    try {
        const cheatSheets = await CheatSheet.find();

        for (const cheatSheet of cheatSheets) {
            const { questions } = cheatSheet;
            const existingQuestions = await Question.find({ _id: { $in: questions } });
            const existingIds = existingQuestions.map((q) => q._id.toString());
            const missingIds = questions.filter((id) => !existingIds.includes(id));
            console.log(`CheatSheet "${cheatSheet.name}" has ${missingIds.length} missing question IDs.`);
            cheatSheet.questions = cheatSheet.questions.filter((id) => existingIds.includes(id));

            if (missingIds.length > 0) {
                console.log(`Please provide names of LeetCode questions to replace the ${missingIds.length} missing IDs.`);
                const leetcodeNames = await promptUser('Enter question names separated by commas: ');
                const newQuestions = await Question.find({ name: { $in: leetcodeNames } });
                const newQuestionIds = newQuestions.map((q) => q._id.toString());
                cheatSheet.questions = [...new Set([...cheatSheet.questions, ...newQuestionIds])];
                await cheatSheet.save();
                console.log(`Updated CheatSheet "${cheatSheet.name}". Added ${newQuestionIds.length} new question IDs.`);
            } else {
                console.log(`No missing questions in CheatSheet "${cheatSheet.name}".`);
            }
        }
    } catch (error) {
        console.error('Error validating and updating cheatsheets:', error);
    }
}

const addQuestionsToCheatSheetByName = async (cheatSheetName, questionNames) => {
    try {
        const cheatSheet = await CheatSheet.findOne({ name: cheatSheetName });

        if (!cheatSheet) {
            console.log(`CheatSheet "${cheatSheetName}" not found`);
            return;
        }

        const questions = await Question.find({ name: { $in: questionNames } });
        const questionIds = questions.map((q) => q._id.toString());

        if (questionIds.length === 0) {
            console.log('No matching questions found for the provided names.');
            return;
        }

        cheatSheet.questions = [...new Set([...cheatSheet.questions, ...questionIds])];
        await cheatSheet.save();
        console.log(`Successfully added ${questionIds.length} questions to the CheatSheet "${cheatSheet.name}".`);
    } catch (error) {
        console.error('Error adding questions to cheatsheet:', error);
    }
}


const addQuestionsToCheatSheetByLink = async (cheatSheetName, questionLink) => {
    try {
        const cheatSheet = await CheatSheet.findOne({ name: cheatSheetName });

        if (!cheatSheet) {
            console.log(`CheatSheet "${cheatSheetName}" not found`);
            return;
        }

        const questions = await Question.find({ link: { $in: questionLink } });
        const questionIds = questions.map((q) => q._id.toString());

        if (questionIds.length === 0) {
            console.log('No matching questions found for the provided Links.');
            return;
        }

        cheatSheet.questions = [...new Set([...cheatSheet.questions, ...questionIds])];
        await cheatSheet.save();
        console.log(`Successfully added ${questionIds.length} questions to the CheatSheet "${cheatSheet.name}".`);
    } catch (error) {
        console.error('Error adding questions to cheatsheet:', error);
    }
}

const CS_NAME = "Kumar";
const X_CS_QUE = [
    "Subarray Sum Equals K",
    "Product of Array Except Self",
    "Word Search",
    "Set Matrix Zeroes",
    "Longest Substring Without Repeating Characters",
    "Merge Intervals",
    "Next Permutation",
    "Search a 2D Matrix",
    "3Sum", "4Sum",
    "Sort Colors",
    "Container With Most Water",
    "Pow(x, n)",
    "Maximum Subarray",
];

const leetcodeLinks = [
    "https://leetcode.com/problems/maximum-subarray/",
    "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "https://leetcode.com/problems/reverse-linked-list/",
    "https://leetcode.com/problems/linked-list-cycle/",
    "https://leetcode.com/problems/valid-parentheses/",
    "https://leetcode.com/problems/implement-queue-using-stacks/",
    "https://leetcode.com/problems/subsets/",
    "https://leetcode.com/problems/binary-tree-inorder-traversal/",
    "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
    "https://leetcode.com/problems/search-in-a-binary-search-tree/",
    "https://leetcode.com/problems/validate-binary-search-tree/",
    "https://leetcode.com/problems/fibonacci-number/"
];


const main = async () => {
    await connectDB();
    // await validateAndPromptCheatSheets();
    // await addQuestionsToCheatSheetByName(CS_NAME, X_CS_QUE);
    await addQuestionsToCheatSheetByLink(CS_NAME, leetcodeLinks);
    mongoose.connection.close();
};

main();
