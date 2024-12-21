import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePhotoUpload = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [file, setFile] = useState(null);
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();

    if (!userId) {
        navigate('/login');
    }

    useEffect(() => {
        if (userId) {
            axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/getProfilePhoto/${userId}`)
                .then((response) => {
                    setProfilePhoto(response.data.profilePhoto);
                })
                .catch((error) => {
                    console.log('Error fetching profile photo:', error);
                });
        }
    }, [userId]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB. Please upload a smaller file.');
            return;
        }
        setFile(selectedFile);
    };
    

    const handleFileUpload = async () => {
        
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            const base64Image = await convertFileToBase64(file);
            const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/users/uploadProfilePhoto`,
                { userId, profilePhoto: base64Image }
            );
    
            console.log("Photo uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading profile photo:", error);
        }
    };
    
    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith("image/")) {
                reject("Unsupported file type. Please upload an image.");
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };
    

    return (
        <div className="profile-photo-upload">
            <h2>Upload Profile Photo</h2>

            {profilePhoto ? (
                <img
                    src={profilePhoto}
                    alt="Profile"
                    className='porfile-photo'
                />
            ) : (
                <img alt='Profile'/>
            )}

            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
};

export default ProfilePhotoUpload;
