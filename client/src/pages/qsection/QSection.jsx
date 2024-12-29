import React, { useState, useEffect, useRef } from 'react';
import Axios from '@api';
import ThemedButton from '../../ui/button/Button';

import refresh from '../assests/refresh.png';

import './QSection.css';

const Questions = ({ loading, setLoading, questions, onRefresh, onRandomQuestion, onRecommendQuestion }) => {
    const [user, setUser] = useState({});
    const [userFriends, setUserFriends] = useState([]); // Added state for userFriends
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [isPopoverVisible, setIsPopoverVisible] = useState(false); // State for popover visibility
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 }); // State for popover position
    const userId = localStorage.getItem('id');
    const popoverRef = useRef(null); // Ref for the popover

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userResponse = await Axios.get(`/api/meta/${userId}`);
                const friendsResponse = await Axios.get(`/api/friends/`);
    
                console.log('User Response:', userResponse.data);
                console.log('Friends Response:', friendsResponse.data);
    
                setUser(userResponse.data);
                setUserFriends(Array.isArray(friendsResponse.data.friends) ? friendsResponse.data.friends : []);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
    
        if (userId) fetchUser();
    }, [userId]);
    

    const handleSolve = async (question) => {
        setLoading(true);
        try {
            const res = await Axios.post(`/api/questions/solve`, {
                userId,
                questionId: question._id,
            });
            console.log('Updated Solved Questions:', res.data.solvedQuestions);
        } catch (error) {
            console.error("Error solving question:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRecommendQuestion = (friendId) => {
        if (friendId && selectedQuestion) {
            onRecommendQuestion(selectedQuestion, friendId);
            alert(`Recommendation sent to ${friendId}!`);
            setSelectedFriend(null);
            setSelectedQuestion(null);
            setIsPopoverVisible(false); // Hide popover after sending recommendation
        } else {
            alert("Please select a friend and question.");
        }
    };

    const handlePopoverClose = () => {
        setSelectedFriend(null);
        setSelectedQuestion(null);
        setIsPopoverVisible(false); // Close the popover when the close button is clicked
    };

    const handleRecommendButtonClick = (e, question) => {
        setSelectedQuestion(question._id);
        const { top, left, height } = e.target.getBoundingClientRect(); // Get position of the button
        setPopoverPosition({ top: top + height, left }); // Position popover below the button
        setIsPopoverVisible(true); // Show the popover
    };

    return (
        <div className="questions-section">
            <h3>Questions</h3>

            {/* Random Question Button */}
            <div className="buttons">
                <button className="random-btn" onClick={onRandomQuestion}>Get Random Question</button>
                <ThemedButton link={refresh} type={'refresh'} onClick={onRefresh} />
            </div>

            {loading && <div className="loading-spinner"></div>}

            {/* Questions */}
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

                                    {/* Popover for Friend Selection */}
                                    {isPopoverVisible && (
                                        <div
                                            ref={popoverRef}
                                            className="popover"
                                            style={{ top: `${popoverPosition.top}px`, left: `${popoverPosition.left}px` }}
                                        >
                                            <h4>Select a Friend to Recommend</h4>
                                            <ul>
                                                {userFriends.map((friend) => (
                                                    <li key={friend._id + friend.username}>
                                                        <div className="friend-item">
                                                            <span>{friend.username}</span>
                                                            <button
                                                                className="recommend-btn"
                                                                onClick={() => {
                                                                    handleRecommendQuestion(friend._id);
                                                                    setIsPopoverVisible(false); // Hide popover after recommending
                                                                }}
                                                            >
                                                                Recommend
                                                            </button>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="close-btn" onClick={handlePopoverClose}>Close</button>
                                        </div>
                                    )}
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
