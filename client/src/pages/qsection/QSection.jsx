import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThemedButton from '../../ui/button/Button';

import refresh from '../assests/refresh.png';

import './QSection.css';


const Questions = ({ loading, setLoading, questions, handleRefresh, onRandomQuestion, onRecommendQuestion }) => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
                console.log(`${BASE_URL}/api/users/${userId}`)
                setUser(res.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        
        fetchUser();
    }, []);


    const handleSolve = async (question) => {
        setLoading(true);
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.post(`${BASE_URL}/api/questions/solve`, {
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

    return (
        <div className="questions-section">
            <h3>Questions</h3>

            {/* Random Question Button */}
            <div className="buttons">
                <button className="random-btn" onClick={onRandomQuestion}>Get Random Question</button>
                <ThemedButton link={refresh} type={'refresh'} onClick={handleRefresh} />
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
                                    <img src={`/images/${question.platform.toUpperCase()}.png`}
                                        className="icon"
                                        alt={question.platform}
                                    />
                                    <p>
                                        {question.platform}
                                    </p>
                                </div>
                                {/* Solve/Solved */}
                                {isSolved ? (
                                    <button className="solved-btn" onClick={() => {
                                        handleSolve(question);
                                        window.location.href = question.link;
                                        }}>
                                        Solved
                                    </button>
                                ) : (
                                    <button className="solve-btn"  onClick={() => {
                                        handleSolve(question);
                                        window.location.href = question.link;
                                        }}>
                                        Solve
                                    </button>
                                )}

                                <button className="recommend-btn" onClick={() => handleRecommend(onRecommendQuestion)}>Recommend</button>
                            </div>
                        );
                    })
                ) : (
                    <>
                        {!loading && <p>No questions found..</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Questions;
