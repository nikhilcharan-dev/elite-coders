import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Question from "../Question.jsx";
import './DSA.css';

const DSA = () => {

    const [topics, setTopics] = useState(null);  // Stores fetched topics
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const getData = async () => {
            try {
                console.log("Rendering...");
                const topicsResponse = await axios.get("http://localhost:5010/api/codeblood/dsa");
                // For each topic, fetch the questions data using their IDs
                const updatedTopics = await Promise.all(
                    topicsResponse.data.map(async (topic) => {
                        const questionsResponse = await axios.post("http://localhost:5010/api/questions/filter/byIds", { ids: topic.questions });
                        topic.questions = questionsResponse.data;
                        return topic;
                    })
                );
                setTopics(updatedTopics);
                setLoading(false);  // Set loading to false once data is fetched
            } catch (err) {
                console.log(err);
                setLoading(false);  // Set loading to false even if there's an error
            }
        };

        getData();
    }, []);

    // If loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // Once topics are loaded, render the actual content
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
                </div>
            ))}
        </div>
    );
};

export default DSA;
