import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    profilePhoto: { type: String, default: null },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Other' },
    dob: { type: Date, default: null },
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    bio: { type: String, default: "Elite Coder" },
    gotoLanguage: { type: String, default: "" },
    handle: {
        type: {
            leetcode: { type: String, default: "" },
            geeksforgeeks: { type: String, default: ""},
            codeforces: { type: String, default: "" },
            codechef: { type: String, default: "" },
        },
        default: "",
    },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }], // Accepted friends
    friendRequests: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: { type: String, enum: ['sent', 'received'], required: true },  // Sent or received
        status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Pending, accepted, rejected
        timestamp: { type: Date, default: Date.now }
    }],
    solvedQuestions: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    recommendedQuestions: {
        type: [{
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            questionLink: { type: mongoose.Schema.Types.ObjectId, ref: "questionbanks", required: true }
        }],
        default: [],
    },
    recommendedTopics: {
        type: [{
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
        }],
        default: [],
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
