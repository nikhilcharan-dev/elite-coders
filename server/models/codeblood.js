import mongoose from "mongoose";

const codebloodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    questions: {
        type: [{
            link: { type: mongoose.Schema.Types.ObjectId, ref: "questionbanks", required: true}
        }],
        default: [],
    },
}, { timestamps: true });

const CodeBlood = mongoose.model('CodeBlood', codebloodSchema);

export default CodeBlood;