import React, { useState, useEffect } from 'react';
import Axios from '@api';
import { useNavigate } from 'react-router-dom';
import Question from "../Question.jsx";

import './CP.css';

const CP = () => {
    const [topics, setTopics] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const topicsResponse = await Axios.get("/api/codeblood/cp");
                const updatedTopics = await Promise.all(
                    topicsResponse.data.map(async (topic) => {
                        const questionsResponse = await Axios.post("/api/questions/filter/byIds", { ids: topic.questions });
                        topic.questions = questionsResponse.data;
                        return topic;
                    })
                );
                setTopics(updatedTopics);
            } catch (err) {
                console.log(err);
            }
            setLoading(false);
        };

        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dsa-section">
            {topics.map((topic, index) => (
                <div key={index} className="topic-card">
                    <div className="topic-header">
                        <h3>{topic.topic}</h3>
                        <a href={"/home"} target="_blank" rel="noopener noreferrer" className="pdf-link">
                            View PDF
                        </a>
                    </div>
                    <div className="questions-container">
                        {topic.questions.map((question, idx) => (
                            <Question key={idx} question={question} />
                        ))}
                    </div>
                    <button className='codeblood-expand' onClick={() => navigate(`/codeblood/dsa/${topic.topic}`)}>
                        <img src={"/images/expand.png"} alt='expand'/>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CP;
