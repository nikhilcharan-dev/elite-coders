import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    profilePhoto: { type: mongoose.Schema.Types.ObjectId, ref: "fs.files", default: null }, // Reference to GridFS file
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    dob: { type: Date, default: null },
    email: { type: String, required: true, unique: true },
    bio: { type: String, default: "Elite Coder" },
    gotoLanguage: { type: String, default: "" },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    recommendedQuestions: {
        type: [{
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            questionLink: { type: String, required: true },
        }],
        default: [],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
