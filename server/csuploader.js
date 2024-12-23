import mongoose from 'mongoose';
import connectDB from './config/db.js';
import readlineSync from 'readline-sync';
import CheatSheet from './models/cheatsheet.js';

const { ObjectId } = mongoose.Types;

const getCheatsheetInput = (index) => {
    const name = readlineSync.question(`\nEnter contributor name for cheatsheet ${index + 1}: `);
    const quote = readlineSync.question(`Enter contributor quote for cheatsheet ${index + 1}: `);
    const questionsInput = readlineSync.question(
        'Enter question IDs (comma-separated): '
    );

    const isValidObjectId = (id) => {
        return /^[0-9a-fA-F]{24}$/.test(id);
    };

    const questions = questionsInput
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id)
        // .map((id) => new mongoose.Types.ObjectId(id));
    return { name, quote, questions };
};

const uploadCheatsheets = async () => {
    const cheatsheets = [];

    const numberOfCheatsheets = readlineSync.questionInt(
        'How many cheatsheets would you like to add? '
    );

    for (let i = 0; i < numberOfCheatsheets; i++) {
        const cheatsheet = getCheatsheetInput(i);
        cheatsheets.push(cheatsheet);
    }

    try {
        const insertedCheatsheets = await CheatSheet.insertMany(cheatsheets);
        console.log('\nCheatsheets uploaded successfully:');
        insertedCheatsheets.forEach((sheet, index) => {
            console.log(`  ${index + 1}. ${sheet.name} - ID: ${sheet._id}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error uploading cheatsheets:', error.message);
        process.exit(1);
    }
};

(async () => {
    await connectDB();
    await uploadCheatsheets();
})();



// '7684d5d061f1a8e2424e5d4, 67684dc0061f1a8e2424e5d6, 67684e15061f1a8e2424e5d8, 67684e69061f1a8e2424e5da, 67684ea1061f1a8e2424e5dc, 6768520e061f1a8e2424e5de, 6768523e061f1a8e2424e5e0, 67685263061f1a8e2424e5e2, 6768528a061f1a8e2424e5e4, 676852a8061f1a8e2424e5e6, 676852cb061f1a8e2424e5e8, 676852e5061f1a8e2424e5ea, 67685300061f1a8e2424e5ec, 6768531d061f1a8e2424e5ee, 67685339061f1a8e2424e5f0';
