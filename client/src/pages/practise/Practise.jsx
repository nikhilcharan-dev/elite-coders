import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CheatSheetPanel from '../cheatsheet/CheatSheetPanel';
import Filter from '../filter/Filter';
import Questions from '../qsection/QSection';

import './Practise.css';

const Practice = () => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setQuestions([]);
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            console.log('BASE_URL:', BASE_URL);
            const res = await axios.get(`${BASE_URL}/api/questions`);
            setQuestions(res.data);
            setAllQuestions(res.data);
            setLoading(false);
        };

        fetchQuestions();
    }, []);

    const handleFilter = async (filters) => {
        var filtered = null;
        try {
            setLoading(true);
            setQuestions([]);
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.post(`${BASE_URL}/api/questions/filter`, { ...filters });
            filtered = res.data;
        } catch(err) {
            console.error('Error filtering questions:', err);
        }
        setQuestions(filtered);
        setLoading(false);
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
            <CheatSheetPanel/>
            <Filter onFilter={handleFilter} />
            <Questions
                loading={loading}
                setLoading={setLoading}
                questions={questions}
                onRandomQuestion={handleRandomQuestion}
                onRecommendQuestion={handleRecommendQuestion}
            />
        </div>
    );
};

export default Practice;
