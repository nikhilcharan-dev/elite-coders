import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    difficulty: { type: String, required: true },
    topics: { type: [String], required: true },
    platform: { type: String, required: true },
    link: { type: String, required: true }
}, { timestamps: true });

const Question = mongoose.model('QuestionBank', questionSchema);

export default Question;
