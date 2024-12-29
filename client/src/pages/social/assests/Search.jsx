import React, { useState } from 'react';
import Axios from '@api';
import { Link } from 'react-router-dom';

import def from '../../assests/default-other.jpg';
import boy from '../../assests/default-boy.jpg';
import girl from '../../assests/default-girl.jpg';
import search from '../../assests/search.png';

import './Search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopover, setShowPopover] = useState(false);
    const [requestStatus, setRequestStatus] = useState({}); // Track request status per user

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        try {
            const response = await Axios.get(
                `http://localhost:5010/api/meta/search?query=${searchQuery}`
            );
            setSearchResults(response.data);
            setShowPopover(true);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendRequest = async (username) => {
        if (!username) return;
        setRequestStatus((prev) => ({ ...prev, [username]: 'loading' }));

        try {
            const response = await Axios.post(
                `http://localhost:5010/api/friends/send-request/${username}`
            );
            setRequestStatus((prev) => ({ ...prev, [username]: 'success' }));
            console.log(response.data.message);
        } catch (error) {
            console.error('Error sending friend request:', error);
            setRequestStatus((prev) => ({ ...prev, [username]: 'error' }));
        }
    };

    const getGender = (user) => {
        let profileImage = def;
        if (user) {
            profileImage = user.profilePhoto ||
                (user.gender === 'Male' ? boy :
                    user.gender === 'Female' ? girl : def);
        }
        return profileImage;
    };

    const closePopover = () => {
        setSearchQuery('');
        setShowPopover(false);
    };

    return (
        <div className="search-container">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button
                    onClick={handleSearch}
                    disabled={isLoading}
                    className="search-button"
                >
                    <img
                        src={search}
                        alt="Search"
                        className="search-icon"
                    />
                </button>
            </div>

            {/* Popover for Search Results */}
            {showPopover && (
                <div className="search-popover">
                    <button className="close-button" onClick={closePopover}>
                        &times;
                    </button>
                    <div className="popover-content">
                        {searchResults.length > 0 ? (
                            searchResults.map((user) => (
                                <div className="user-card" key={user._id}>
                                    <img
                                        src={getGender(user)}
                                        alt="profile"
                                        className="user-photo"
                                    />
                                    <div className="user-info">
                                        <h3>{user.username}</h3>
                                        <p>{user.bio}</p>
                                        <button className="view-profile">
                                            <Link
                                                to={`/profile/${user._id}`}
                                            >
                                                View Profile
                                            </Link>
                                        </button>
                                        <button
                                            className="send-request-button"
                                            onClick={() => handleSendRequest(user.username)}
                                            disabled={requestStatus[user.username] === 'loading' || requestStatus[user.username] === 'success'}
                                        >
                                            {requestStatus[user.username] === 'loading' ? 'Sending...' :
                                                requestStatus[user.username] === 'success' ? 'Request Sent' :
                                                    'Send Request'}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="no-results">No users found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;
