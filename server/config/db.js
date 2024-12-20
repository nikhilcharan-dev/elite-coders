import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {

        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect(dbURI, { });

    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;