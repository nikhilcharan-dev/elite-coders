import mongoose from "mongoose";

// Define the CodeBlood schema
const codebloodSchema = new mongoose.Schema(
    {
        topic: { type: String, required: true },
        questions: {
            type: [mongoose.Schema.Types.ObjectId], // Array of ObjectId references to questions
            default: [],
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const CodeBlood = mongoose.model('CodeBlood', codebloodSchema);

export default CodeBlood;
