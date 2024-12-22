import connectDB from './config/db.js';
import readlineSync from 'readline-sync';
import CheatSheet from './models/cheatsheet.js';

const getCheatsheetInput = (index) => {
    const name = readlineSync.question(`\nEnter contributor name for cheatsheet ${index + 1}: `);
    const quote = readlineSync.question(`Enter contributor quote for cheatsheet ${index + 1}: `);
    const questionsInput = readlineSync.question(
        'Enter question IDs (comma-separated): '
    );

    const questions = questionsInput
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id);

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
