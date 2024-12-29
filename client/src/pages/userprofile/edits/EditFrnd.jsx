import React, { useState, useEffect } from 'react';
import Axios from '@api';

import def from '../../assests/default-other.jpg';
import boy from '../../assests/default-boy.jpg';
import girl from '../../assests/default-girl.jpg';

import './EditFrnd.css';

const EditFrnd = ({ onClose, user, onEdit }) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSection, setShowSection] = useState('received');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const friendData = await Axios.get(`/api/friends`);
                const friendRequestData = await Axios.get(`/api/friends/friend-requests`);
                const receivedRequests = friendRequestData.data.receivedRequests;
                const sentRequests = friendRequestData.data.sentRequests || [];
                setFriends(friendData.data.friends);
                setFriendRequests(receivedRequests);
                setSentRequests(sentRequests);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const getProfilePhoto = (user) => {
        return user?.profilePhoto || (user?.gender === 'Male' ? boy : user?.gender === 'Female' ? girl : def);
    };

    const handleAcceptRequest = async (username) => {
        try {
            const response = await Axios.post(`/api/friends/accept-request/${username}`);
            setFriendRequests(friendRequests.filter(req => req.user.username !== username));
            setFriends([...friends, { username }]);
            alert(response.data.message);
        } catch (error) {
            console.error("Error accepting friend request:", error);
            alert('Error accepting friend request');
        }
        onEdit();
    };

    const handleRejectRequest = async (username) => {
        try {
            const response = await Axios.post(`/api/friends/reject-request/${username}`);
            setFriendRequests(friendRequests.filter(req => req.user.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error rejecting friend request:", error);
            alert('Error rejecting friend request');
        }
        onEdit();
    };

    const handleRemoveFriend = async (username) => {
        try {
            const response = await Axios.post(`/api/friends/remove-friend/${username}`);
            setFriends(friends.filter(friend => friend.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error removing friend:", error);
            alert('Error removing friend');
        }
        onEdit();
    };

    const handleUnsendRequest = async (username) => {
        try {
            const response = await Axios.post(`/api/friends/unsend-request/${username}`);
            setSentRequests(sentRequests.filter(req => req.user.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error unsending friend request:", error);
            alert('Error unsending friend request');
        }
        onEdit();
    };

    if (loading) {
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="loading-spinner"></div>
                    <h3>Loading...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Manage Friends</h3>

                {/* Friends List */}
                <div className="friends-list">
                    <h4>Your Friends</h4>
                    {friends.length === 0 ? (
                        <p>No friends yet</p>
                    ) : (
                        <ul>
                            {friends.map((friend) => (
                                <li key={friend.username} className="friends-card">
                                    <div className="frnd-info">
                                        <img src={getProfilePhoto(friend)} alt={friend.username} className="frnd-img" />
                                        <h1>{friend.username}</h1>
                                    </div>
                                    <button
                                        className="rm-btn"
                                        onClick={() => handleRemoveFriend(friend.username)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Toggle Buttons for Sections */}
                <div className="toggle-section">
                    <button
                        className={showSection === 'received' ? 'active' : ''}
                        onClick={() => setShowSection('received')}
                    >
                        Received Requests
                    </button>
                    <button
                        className={showSection === 'sent' ? 'active' : ''}
                        onClick={() => setShowSection('sent')}
                    >
                        Sent Requests
                    </button>
                </div>

                {/* Conditional Sections */}
                {showSection === 'received' ? (
                    <div className="friend-requests">
                        <h4>Received Friend Requests</h4>
                        {friendRequests.length === 0 ? (
                            <p>No received requests</p>
                        ) : (
                            <ul>
                                {friendRequests.map((request) => (
                                    <li key={request.user.username}>
                                        <img src={getProfilePhoto(request.user)} alt={request.user.username} />
                                        {request.user.username}
                                        <button className="accept-btn" onClick={() => handleAcceptRequest(request.user.username)}>
                                            Accept
                                        </button>
                                        <button className="reject-btn" onClick={() => handleRejectRequest(request.user.username)}>
                                            Reject
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div className="friend-requests">
                        <h4>Sent Friend Requests</h4>
                        {sentRequests.length === 0 ? (
                            <p>No sent requests</p>
                        ) : (
                            <ul>
                                {sentRequests.map((request) => (
                                    <li key={request.user.username}>
                                        <img src={getProfilePhoto(request.user)} alt={request.user.username} />
                                        {request.user.username}
                                        <button
                                            className="unsend-btn"
                                            onClick={() => handleUnsendRequest(request.user.username)}
                                        >
                                            Unsend
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                {/* Close Button */}
                <button onClick={onClose} className="close">
                    Close
                </button>
            </div>
        </div>
    );
};

export default EditFrnd;
