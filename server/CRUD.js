import mongoose from "mongoose";
import User from "./models/user.js";
import connectDB from "./config/db.js";

const updateExistingUsers = async () => {
    try {
        const result = await User.updateMany(
            {},
            {
                $set: {
                    handle: {
                        leetcode: "",
                        geeksforgeeks: "",
                        codechef: "",
                        codeforces: "",
                    }
                }
            }
        );

        console.log(`${result.modifiedCount} users updated with default handles.`);
    } catch (error) {
        console.error("Error updating users:", error);
    }
}

const getAllUsers = async () => {
    try {
        const users = User.find();
        console.log(users);
    } catch (err) {
        console.log(err);
    }
}

import Question from "./models/question.js";
import CodeBlood from "./models/codeblood.js";

const bundleQuestionsByTopic = async () => {
    try {
        const allQuestions = await Question.find();

        const topicMap = new Map();

        allQuestions.forEach((question) => {
            question.topics.forEach((topic) => {
                if (!topicMap.has(topic)) {
                    topicMap.set(topic, []);
                }
                topicMap.get(topic).push(question._id);
            });
        });

        for (const [topic, questionIds] of topicMap.entries()) {
            await CodeBlood.create({
                topic,
                questions: questionIds.map((id) => ({ link: id })),
            });
        }

        console.log("Questions have been bundled by topics successfully.");
    } catch (err) {
        console.error("Error bundling questions by topics:", err);
    }
};

const getAllTopics = async () => {
    try {
        const data = await CodeBlood.find().exec();
        const topics = data.map((topic) => topic.topic);
        topics.sort((a, b) => a.length - b.length);
        console.log(topics);
        console.log(topics.length);
    } catch (err) {
        console.log(err);
    }
}

const synonymMap = {
    "DP": "Dynamic Programming",
    "Maths": "Math",
    "Mathematics": "Math",
    "Strings": "String",
    "Arrays": "Array",
    "Graph Theory": "Graph",
    "Optimization": "Optimisation",
    "Breadth First Search": "Breadth-First Search",
    "Depth First Search": "Depth-First Search",
    "LinkedList": "Linked List",
};

const normalizeTopics = (topics) => {
    return topics.map(topic => synonymMap[topic] || topic);
};

const addNormalizedTopicsToCodeBlood = async () => {
    try {
        const questions = await Question.find({});

        const topicMap = {};

        questions.forEach((question) => {
            const normalizedTopics = normalizeTopics(question.topics);

            normalizedTopics.forEach((topic) => {
                if (!topicMap[topic]) {
                    topicMap[topic] = [];
                }
                topicMap[topic].push(question._id);
            });
        });

        for (const topic in topicMap) {
            await CodeBlood.updateOne(
                { topic },
                { $set: { topic, questions: topicMap[topic] } },
                { upsert: true }
            );
        }

        console.log("Normalized topics have been added to CodeBlood.");
    } catch (err) {
        console.error("Error adding normalized topics to CodeBlood:", err);
    }
};

(async () => {
    await connectDB();
    await updateExistingUsers();
    await getAllUsers();
    // await getAllTopics();
    // await addNormalizedTopicsToCodeBlood();
    await mongoose.disconnect();
})();
