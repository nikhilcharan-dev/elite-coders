import connectDB from './config/db.js';
import readlineSync from 'readline-sync';
import Topic from './models/topic.js';



const getTopics = () => {
    let topics = [];
    let size = readlineSync.questionInt("Enter size of Batch: ");
    
    for(let i = 0; i < size; i++) {
        const name = readlineSync.question("Enter Topic name: ");
        const gfgLink = readlineSync.question("Enter GFG link: ");
        const youtubeLink = readlineSync.question("Enter YouTube link: ");
        topics.push({ name, gfgLink, youtubeLink });
    }

    return topics;
}


const uploadTopics = async () => {

    try {
        const insertedTopics = await Topic.insertMany(getTopics());
        console.log('\nTopics uploaded successfully:');
        insertedTopics.forEach((topic, index) => {
            console.log(`  ${index + 1}. ${topic.name} - ID: ${topic._id}`);
        });
        process.exit(0);
    } catch (error) {
        console.error('Error uploading topics:', error.message);
        process.exit(1);
    }
};

(async () => {
    await connectDB();
    await uploadTopics();
})();