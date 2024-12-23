import mongoose from 'mongoose';

const CheatSheetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true },
    questions: [{ type: String, ref: 'Question', required: true }],
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    likedIds: [{ type: String, ref: 'User' }],
    dislikedIds: [{ type: String, ref: 'User' }],
}, { timestamps: true });

const CheatSheet = mongoose.model('CheatSheet', CheatSheetSchema);
export default CheatSheet;