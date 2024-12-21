import React, { useState, useEffect } from 'react';
import './QSection.css';
import axios from 'axios';

const Questions = ({ questions, onRandomQuestion, onRecommendQuestion }) => {
    const [loading, setLoading] = useState(false);
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
            const res = await axios.post(`${BASE_URL}/api/questions/filter`, {
                userId,
                questionId: question._id,
            });

            console.log('Updated Solved Questions:', response.data.solvedQuestions);
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
            <button className="random-btn" onClick={onRandomQuestion}>Get Random Question</button>

            {loading && <div className="loading-spinner">Loading...</div>}

            {/* List of Questions */}
            <div className="questions-list">
                {questions?.length > 0 ? (
                    questions.map((question, index) => {
                        const isSolved = user.solvedQuestions?.includes(question._id);

                        return (
                            <div key={index} className="question-card">
                                <h4>{question.name}</h4>
                                <p><strong>Topics:</strong> {question.topics.join(', ')}</p>
                                <p><strong>Difficulty:</strong> {question.difficulty}</p>
                                <p><strong>Platform:</strong> {question.platform}</p>

                                {/* Solve/Solved */}
                                {isSolved ? (
                                    <button className="solved-btn" onClick={() => handleSolve(question)}>
                                        <a className='link' href={question.link} target="_blank" rel="noreferrer">
                                            Solved
                                        </a>
                                    </button>
                                ) : (
                                    <button className="solve-btn" onClick={() => handleSolve(question)}>
                                        <a className='link' href={question.link} target="_blank" rel="noreferrer">
                                            Solve
                                        </a>
                                    </button>
                                )}

                                <button className="recommend-btn" onClick={() => handleRecommend(onRecommendQuestion)}>Recommend</button>
                            </div>
                        );
                    })
                ) : (
                    <p>No questions found</p>
                )}
            </div>
        </div>
    );
};

export default Questions;
