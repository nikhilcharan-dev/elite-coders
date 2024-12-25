import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditFrnd.css';

const EditFrnd = ({ onClose, user }) => {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const friendData = await axios.get(`${BASE_URL}/api/friends/`, { } ,{ headers: { Authorization: `Bearer ${token}` } });
                console.log(token);
                const friendRequestData = await axios.get(`${BASE_URL}/api/friends/friend-requests`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                
                setFriends(friendData.data.friends);
                setFriendRequests(friendRequestData.data.receivedRequests);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSendFriendRequest = async (username) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/friends/send-request/${username}`, { user }, { headers: { Authorization: `Bearer ${token}` } });
            alert(response.data.message);
        } catch (error) {
            console.error("Error sending friend request:", error);
            alert('Error sending friend request');
        }
    };

    const handleAcceptRequest = async (username) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/friends/accept-request/${username}`, { user }, { headers: { Authorization: `Bearer ${token}` } });
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
            const response = await axios.post(`${BASE_URL}/api/friends/reject-request/${username}`, { user }, { headers: { Authorization: `Bearer ${token}` } });
            setFriendRequests(friendRequests.filter(req => req.user.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error rejecting friend request:", error);
            alert('Error rejecting friend request');
        }
    };

    const handleRemoveFriend = async (username) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/friends/remove-friend/${username}`, {}, { headers: { Authorization: `Bearer ${token}` } });
            setFriends(friends.filter(friend => friend.username !== username));
            alert(response.data.message);
        } catch (error) {
            console.error("Error removing friend:", error);
            alert('Error removing friend');
        }
    };

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

                {/* Search bar for sending friend requests */}
                <div className="search-friends">
                    <input
                        type="text"
                        placeholder="Search by username..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {searchQuery && (
                        <button onClick={() => handleSendFriendRequest(searchQuery)}>
                            Send Friend Request
                        </button>
                    )}
                </div>

                {/* Friend Requests */}
                <div className="friend-requests">
                    <h4>Friend Requests</h4>
                    {friendRequests.length === 0 ? (
                        <p>No pending requests</p>
                    ) : (
                        <ul>
                            {friendRequests.map((request) => (
                                <li key={request.user.username}>
                                    {request.user.username}
                                    <button onClick={() => handleAcceptRequest(request.user.username)}>Accept</button>
                                    <button onClick={() => handleRejectRequest(request.user.username)}>Reject</button>
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
                                <li key={friend.username}>
                                    {friend.username}
                                    <button onClick={() => handleRemoveFriend(friend.username)}>Remove</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Close Button */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default EditFrnd;
