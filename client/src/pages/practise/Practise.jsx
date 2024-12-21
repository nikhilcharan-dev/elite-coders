import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CheatSheet from '../cheatsheet/CheatSheet';
import Filter from '../filter/Filter';
import Questions from '../qsection/QSection';

import './Practise.css';

const Practice = () => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch('http://localhost:5010/api/questions/'); // Replace with your API endpoint
            const data = await response.json();
            setQuestions(data);
            setAllQuestions(data);
        };

        fetchQuestions();
    }, []);

    const handleFilter = async (filters) => {
        var filtered = null;
        try {
            // const BASE_URL = import.meta.env.VITE_BASE_URL;
            // const res = await axios.get(`${BASE_URL}/api/questions/filter`, filters);
            const res = await axios.post('http://localhost:5010/api/questions/filter', filters);
            filtered = res.data;
        } catch(err) {
            console.error('Error filtering questions:', err);
        }
        setQuestions(filtered);
    };

    const handleRandomQuestion = () => {
        const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        setQuestions([randomQuestion]);
    };

    const handleRecommendQuestion = (question) => {
        // Simulated API call to recommend a question
        console.log('Recommended question:', question);
        alert(`Recommended question "${question.name}" to a friend!`);
    };

    return (
        <div className="practice-page">
            <CheatSheet/>
            <Filter onFilter={handleFilter} />
            <Questions
                questions={questions}
                onRandomQuestion={handleRandomQuestion}
                onRecommendQuestion={handleRecommendQuestion}
            />
        </div>
    );
};

export default Practice;
