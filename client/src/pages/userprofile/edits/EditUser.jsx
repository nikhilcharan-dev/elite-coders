import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import edit from '../../assests/photo-edit.png'

import './EditUser.css';

const EditUser = ({ onClose, user, onEdit }) => {
    const fileInputRef = useRef(null);
    const imgRef = useRef(null);
    const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto || '');
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        dob: user?.dob || '',
        gender: user?.gender || 'Other',
        language: user?.language || 'Assembly',
        bio: user.bio,
    });

    useEffect(() => {
        setProfilePhoto(user.profilePhoto);
    }, [user]);

    useEffect(() => {
        if (imgRef.current) {
            const rect = imgRef.current.getBoundingClientRect();
        }
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) { // Max size 10MB
            setFile(selectedFile);
        } else {
            alert('File size exceeds 10MB. Please upload a smaller file.');
        }
    };

    const handleProfilePhotoUpload = async () => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        try {
            const base64Image = await convertFileToBase64(file);
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/users/uploadProfilePhoto`,
                { userId: user._id, profilePhoto: base64Image }
            );
            localStorage.setItem('userData', JSON.stringify(response.data));
            alert('Profile photo uploaded successfully');
            onEdit();
            onClose();
            setProfilePhoto(response.data.profilePhoto);
        } catch (error) {
            console.error('Error uploading profile photo:', error);
        }
    };

    const convertFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.put(`${BASE_URL}/api/users/${user._id}`, formData);
            alert(`User updated successfully`);
            onEdit();
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            await axios.delete(`${BASE_URL}/api/users/${user.id}`);
            alert('User deleted successfully');
            onClose();
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Failed to delete user');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Profile</h3>
                <form onSubmit={handleUpdate}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        placeholder="Enter your username"
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                    />

                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="gender">Gender:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                    >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>

                    <label htmlFor="language">Preferred Language:</label>
                    <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                    >
                        <option>C / C++</option>
                        <option>Python</option>
                        <option>Java</option>
                        <option>Go</option>
                        <option>JavaScript</option>
                        <option>Assembly</option>
                    </select>

                    <label htmlFor="bio">Bio:</label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us something about yourself..."
                    ></textarea>

                    <div className="button-group">
                        <button type="submit" className="save-btn">
                            Save Changes
                        </button>
                        <button type="button" className="close-btn" onClick={onClose}>
                            Close
                        </button>
                        <button type="button" className="delete-btn" onClick={handleDelete}>
                            Delete User
                        </button>
                    </div>
                </form>
            </div>
            <div className="profile-photo-section">
                <div className="profile-photo-container">
                    {profilePhoto ? (
                        <img src={profilePhoto} ref={imgRef} alt="Profile" className="photo" />
                    ) : (
                        <div className="no-photo" ref={imgRef}>No photo</div>
                    )}
                    <button className="edit-photo-btn" onClick={() => fileInputRef.current.click()}>
                        <img src={edit} alt="Edit" className="edit-img" />
                    </button>
                    <input
                        className="photo-input"
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </div>
                <button className="upload-btn" onClick={handleProfilePhotoUpload}>Upload Photo</button>
            </div>
        </div>
    );
};

export default EditUser;
