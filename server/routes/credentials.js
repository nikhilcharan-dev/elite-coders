import mongoose from 'mongoose';
import express from 'express';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import User from '../models/user.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established');
    const bucket = new GridFSBucket(mongoose.connection.db, {
        bucketName: 'profilePhotos'
    });

    router.post('/uploadProfilePhoto', upload.single('profilePhoto'), async (req, res) => {
        try {
            const file = req.file;
            const userId = req.body.userId;
    
            if (!file) {
                return res.status(400).send('No file uploaded');
            }
    
            const uploadStream = bucket.openUploadStream(file.originalname, {
                contentType: file.mimetype
            });
    
            uploadStream.end(file.buffer);
    
            const fileId = uploadStream.id;
    
            const user = await User.findByIdAndUpdate(userId, { profilePhoto: fileId }, { new: true });
    
            res.json({ message: 'Profile photo uploaded successfully!', user });
        } catch (error) {
            console.error('Error uploading profile photo:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    

    router.get('/getProfilePhoto/:userId', async (req, res) => {
        try {
            const userId = req.params.userId;
            const user = await User.findById(userId);
    
            if (!user || !user.profilePhoto) {
                return res.status(404).send('Profile photo not found');
            }
    
            const fileId = user.profilePhoto;
            const downloadStream = bucket.openDownloadStream(fileId);
    
            res.set('Content-Type', 'image/jpeg');
            downloadStream.pipe(res);
        } catch (error) {
            console.error('Error retrieving profile photo:', error);
            res.status(500).send('Internal Server Error');
        }
    });
    
    
    

});

export default router;
