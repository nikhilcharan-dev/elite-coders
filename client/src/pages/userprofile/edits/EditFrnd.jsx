import React, { useState, useEffect } from 'react';
import Axios from '@api';

import def from '../../assests/default-other.jpg';
import boy from '../../assests/default-boy.jpg';
import girl from '../../assests/default-girl.jpg';

import './EditFrnd.css';

const EditFrnd = ({ onClose, user }) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const friendData = await Axios.get(`${BASE_URL}/api/friends`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const friendRequestData = await Axios.get(`${BASE_URL}/api/friends/friend-requests`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setFriends(friendData.data.friends);
                setFriendRequests(friendRequestData.data.receivedRequests);
                console.log(friendData.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleAcceptRequest = async (username) => {
        try {
            const response = await Axios.post(`${BASE_URL}/api/friends/accept-request/${username}`);
            setFriendRequests(friendRequests.filter(req => req.user.username !== username));
            setFriends([...friends, { username }]);
            alert(response.data.message);
        } catch (error) {
            console.error("Error accepting friend request:", error);
            alert('Error accepting friend request');
        }
    };

    const handleRejectRequest = async (username) => {
        try {
            const response = await Axios.post(`${BASE_URL}/api/friends/reject-request/${username}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFriendRequests(friendRequests.filter(req => req.user.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error rejecting friend request:", error);
            alert('Error rejecting friend request');
        }
    };

    const handleRemoveFriend = async (username) => {
        try {
            const response = await Axios.post(`${BASE_URL}/api/friends/remove-friend/${username}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFriends(friends.filter(friend => friend.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error removing friend:", error);
            alert('Error removing friend');
        }
    };

    const getProfilePhoto = (user) => {
        let profileImage = def;
        if (user) {
            profileImage = user.profilePhoto ||
                (user.gender === 'Male' ? boy :
                    user.gender === 'Female' ? girl : def);
        }

        return profileImage;
    }

    if (loading) return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className='loading-spinner'></div>
                <h3>Loading...</h3>
            </div>
        </div>
    );

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Manage Friends</h3>

                {/* Friend Requests */}
                <div className="friend-requests">
                    <h4>Friend Requests</h4>
                    {friendRequests.length === 0 ? (
                        <p>No pending requests</p>
                    ) : (
                        <ul>
                            {friendRequests.map((request) => (
                                <li key={request.user.username}>
                                    <img src={getProfilePhoto(request.user)} alt={request.user.username}/>
                                    {request.user.username}
                                    <button className='accept-btn' onClick={() => handleAcceptRequest(request.user.username)}>Accept</button>
                                    <button className='reject-btn' onClick={() => handleRejectRequest(request.user.username)}>Reject</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Friend List */}
                <div className="friends-list">
                    <h4>Your Friends</h4>
                    {friends.length === 0 ? (
                        <p>No friends yet</p>
                    ) : (
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend.username} className='friends-card'>
                                    <div className='frnd-info'>
                                        {/* add link from here to profile pending!!!! */}
                                        <img src={getProfilePhoto(friend)} alt={friend.username} className='frnd-img'/>
                                        <h1>{friend.username}</h1>
                                    </div>
                                    <button className='rm-btn' onClick={() => handleRemoveFriend(friend.username)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Close Button */}
                <button onClick={onClose} className='close'>Close</button>
            </div>
        </div>
    );
};

export default EditFrnd;
