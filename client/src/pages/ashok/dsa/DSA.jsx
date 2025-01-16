import React, { useState, useEffect, Suspense } from 'react';
import Axios from '@api';
import { useNavigate } from "react-router-dom";
import QuestionCard from "../Question.jsx";

import './DSA.css';

const DSA = () => {
    const [topics, setTopics] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                console.log("Fetching topics...");
                const response = await Axios.get("/api/codeblood/dsa");
                const topicsData = response.data;

                const enrichedTopics = await Promise.all(
                    topicsData.map(async (topic) => {
                        const questionsResponse = await Axios.post(
                            "/api/questions/filter/byIds",
                            { ids: topic.questions }
                        );
                        return {
                            ...topic,
                            questions: questionsResponse.data,
                        };
                    })
                );

                setTopics(enrichedTopics);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
            setLoading(false);
        };

        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
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
                                <QuestionCard key={idx} question={question} />
                            ))}
                        </div>
                        <button className='codeblood-expand' onClick={() => navigate(`/codeblood/dsa/${topic.topic}`)}>
                            <img src={"/images/expand.png"} alt='expand'/>
                        </button>
                    </div>
                ))}
            </div>
        </Suspense>
    );
};

export default DSA;
