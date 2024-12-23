import mongoose from 'mongoose';

const CheatSheetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    quote: { type: String, required: true },
    questions: [{ type: String, ref: 'Question', required: true }],
    link: { type: String, default: '' },
}, { timestamps: true });

const CheatSheet = mongoose.model('CheatSheet', CheatSheetSchema);
export default CheatSheet;