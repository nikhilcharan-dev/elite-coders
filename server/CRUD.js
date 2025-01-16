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

(async () => {
    await connectDB();
    await updateExistingUsers();
    // await getAllUsers();
    await mongoose.disconnect();
})();