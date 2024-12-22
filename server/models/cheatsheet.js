import mongoose from 'mongoose';

const CheatSheetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true }],
    link: { type: String, required: true },
}, { timestamps: true });

const CheatSheet = mongoose.model('CheatSheet', CheatSheetSchema);
export default CheatSheet;