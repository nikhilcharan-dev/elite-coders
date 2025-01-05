import React, { useState, useEffect } from 'react';
import Axios from '@api';

import gfg from '../assests/gfg.png';
import yt from '../assests/youtube.png';
import def from '../assests/default-other.jpg';
import boy from '../assests/default-boy.jpg';
import girl from '../assests/default-girl.jpg';

import './TSection.css';

const TSection = ({ questions, loading, onRefresh, onRecommendQuestion }) => {
    const [user, setUser] = useState({});
    const [userFriends, setUserFriends] = useState([]);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const userId = localStorage.getItem('id');

    const getProfilePhoto = (user) => {
        return user?.profilePhoto || (user?.gender === 'Male' ? boy : user?.gender === 'Female' ? girl : def);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await Axios.get(`/api/meta/${userId}`);
                const friendsRes = await Axios.get(`/api/friends/`);
                setUserFriends(friendsRes.data.friends);
                console.log('friends:', friendsRes.data.friends);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if(userId) fetchUser();
    }, [userId]);

    const handleRecommendQuestion = (friendId) => {
        if(friendId && selectedQuestion) {
            onRecommendQuestion(selectedQuestion, friendId);
            setIsPopoverVisible(false);
        } else {
            alert('Please select a friend and question.');
        }
    };

    const handleRecommendButtonClick = (e, id) => {
        if(userFriends.length <= 0) {
            alert('You have no friends to recommend to.');
        } else {
            setSelectedQuestion(id);
            setIsPopoverVisible(true);
        }
    };

    return (
        <div className="questions-section">
            <h3 style={{paddingBottom: "20px"}}>Learning Resources</h3>

            {loading && <div className="loading-spinner"></div>}

            {isPopoverVisible && (
                <div className="popover">
                    <h4>Select a Friend to Recommend</h4>
                    <ul>
                        {userFriends.map((friend) => (
                            <li key={friend._id + friend.username}>
                                <div className="friend-item">
                                    <img 
                                        src={getProfilePhoto(friend)} 
                                        alt={`${friend.username}'s profile`} 
                                        className="friend-photo" 
                                    />
                                    <span>{friend.username}</span>
                                    <button
                                        className="recommend-btn no-margin"
                                        onClick={() => {
                                            handleRecommendQuestion(friend._id);
                                            setIsPopoverVisible(false);
                                        }}
                                    >
                                        Recommend
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="close-btn" onClick={() => setIsPopoverVisible(false)}>Close</button>
                </div>
            )}

            {/* Question List */}
            <div className="questions-list">
                {questions?.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={index} className="Tquestion-card">
                            <h4>{question.name}</h4>
                            <div className='link-btns'>
                                <button className='yt-btn'>
                                    <a
                                        href={`${question.youtubeLink}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={yt} alt='yt'/>
                                    </a>
                                </button>
                                <button className="gfg-btn"
                                    >
                                    <a
                                        href={question.gfgLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={gfg} alt='gfg' />
                                    </a>
                                </button>
                        </div>
                            <button
                                className="rcd-btn"
                                onClick={(e) => handleRecommendButtonClick(e, question._id)}
                            >
                                Recommend
                            </button>
                        </div>
                    ))
                ) : (
                    <>
                        {!loading && <p>No resources found..</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default TSection;
