import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import User from '../models/user.js';

const router = express.Router();

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ensure MongoDB connection is open before using GridFSBucket
mongoose.connection.once('open', () => {
    console.log('MongoDB connection established');
    const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'profilePhotos'
    });

    // Upload profile photo route
    router.post('/uploadProfilePhoto', upload.single('profilePhoto'), async (req, res) => {
        try {
            const file = req.file;

            if (!file) {
                return res.status(400).send('No file uploaded');
            }

            const uploadStream = bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });

            uploadStream.end(file.buffer);

            const fileId = uploadStream.id;
            const userId = req.body.userId;

            const user = await User.findByIdAndUpdate(userId, { profilePhoto: fileId }, { new: true });

            res.json({ message: 'Profile photo uploaded successfully!', user });
        } catch (error) {
            console.error('Error uploading profile photo:', error);
            res.status(500).send('Internal Server Error');
        }
    });

    // Retrieve profile photo route
    router.get('/getProfilePhoto/:userId', async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);

            if (!user || !user.profilePhoto) {
                return res.status(404).send('Profile photo not found');
            }

            const fileId = user.profilePhoto;
            const downloadStream = bucket.openDownloadStream(fileId);

            res.set('Content-Type', 'image/png');
            downloadStream.pipe(res);
        } catch (error) {
            console.error('Error retrieving profile photo:', error);
            res.status(500).send('Internal Server Error');
        }
    });
});

export default router;
