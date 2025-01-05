import React, { useState, useEffect } from 'react';
import Axios from '@api';
import ThemedButton from '../../ui/button/Button';

import refresh from '../assests/refresh.png';
import def from '../assests/default-other.jpg';
import boy from '../assests/default-boy.jpg';
import girl from '../assests/default-girl.jpg';

import './QSection.css';

const Questions = ({ loading, setLoading, questions, onRefresh, onRandomQuestion, onRecommendQuestion }) => {
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
                const userResponse = await Axios.get(`/api/meta/${userId}`);
                const friendsResponse = await Axios.get(`/api/friends/`);
                setUser(userResponse.data);
                setUserFriends(friendsResponse.data.friends);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (userId) fetchUser();
    }, [userId]);

    const handleSolve = async (question) => {
        setLoading(true);
        try {
            await Axios.post(`/api/questions/solve`, {
                userId,
                questionId: question._id,
            });
        } catch (error) {
            console.error("Error solving question:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRecommendQuestion = (friendId) => {
        if (friendId && selectedQuestion) {
            onRecommendQuestion(selectedQuestion, friendId);
            setIsPopoverVisible(false);
        } else {
            alert("Please select a friend and question.");
        }
    };

    const handleRecommendButtonClick = (e, question) => {
        if(userFriends.length > 0) {
            setUserFriends(user.friends);
        } else {
            alert('You have no friends to recommend to.');
        }
        setSelectedQuestion(question._id);
        setIsPopoverVisible(true);
    };

    return (
        <div className="questions-section">
            <h3>Questions</h3>

            {/* Random Question Button */}
            <div className="buttons">
                <button className="random-btn" onClick={onRandomQuestion}>
                    Get Random Question
                </button>
                <ThemedButton link={refresh} type={'refresh'} onClick={onRefresh} />
            </div>

            {loading && <div className="loading-spinner"></div>}

            {/* Conditional Rendering of Popover Above Questions */}
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
                                            setIsPopoverVisible(false); // Hide popover after selection
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

            {/* Questions List */}
            <div className="questions-list">
                {questions?.length > 0 ? (
                    questions.map((question, index) => {
                        const isSolved = user.solvedQuestions?.includes(question._id);

                        return (
                            <div key={index} className="question-card">
                                <h4>{question.name}</h4>
                                <p><strong>Topics:</strong> {question.topics.join(', ')}</p>
                                <p><strong>Difficulty:</strong> {question.difficulty}</p>
                                <div className="platform">
                                    <p><strong>Platform: </strong></p>
                                    <img src={`/images/${question.platform.toUpperCase()}.png`} className="icon" alt={question.platform} />
                                    <p>{question.platform}</p>
                                </div>
                                <div className="btns">
                                    {isSolved ? (
                                        <button className="solved-btn" onClick={() => {
                                            handleSolve(question);
                                            window.open(question.link, '_blank');
                                        }}>
                                            Solved
                                        </button>
                                    ) : (
                                        <button className="solve-btn" onClick={() => {
                                            handleSolve(question);
                                            window.location.href = question.link;
                                        }}>
                                            Solve
                                        </button>
                                    )}

                                    <button 
                                        className="recommend-btn" 
                                        onClick={(e) => handleRecommendButtonClick(e, question)}
                                    >
                                        Recommend
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    !loading && <p>No questions found..</p>
                )}
            </div>
        </div>
    );
};

export default Questions;
