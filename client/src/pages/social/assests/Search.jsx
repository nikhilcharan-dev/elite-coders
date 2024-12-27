import React, { useState } from 'react';
import Axios from '@api';
import { Link } from 'react-router-dom';

import './Search.css';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        try {
            const response = await Axios.get(`${import.meta.env.VITE_BASE_URL}/api/users?search=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="search-container">
            <h1>Search for Friends</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </div>

            <div className="results-container">
                {searchResults.length > 0 ? (
                    searchResults.map((user) => (
                        <div className="user-card" key={user._id}>
                            <img
                                src={user.profilePhoto || '/placeholder.png'}
                                alt="profile"
                                className="user-photo"
                            />
                            <div className="user-info">
                                <h3>{user.username}</h3>
                                <Link to={`/profile/${user._id}`} className="view-profile">
                                    View Profile
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">No users found</p>
                )}
            </div>
        </div>
    );
};

export default Search;
