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
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.get(`${BASE_URL}/api/questions`);
            setQuestions(res.data);
            setAllQuestions(res.data);
        };

        fetchQuestions();
    }, []);

    const handleFilter = async (filters) => {
        var filtered = null;
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            console.log(filters);
            const res = await axios.post(`${BASE_URL}/api/questions/filter`, { filters });
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
        // Pending !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log('Recommend Question:', question);
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
