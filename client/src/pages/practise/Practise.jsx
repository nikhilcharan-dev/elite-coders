import React, { useState, useEffect } from 'react';
import Axios from '@api';

import CheatSheetPanel from '../cheatsheet/CheatSheetPanel';
import Filter from '../filter/Filter';
import Questions from '../qsection/QSection';
import Burger from '../../ui/burgernav/Burger';

import './Practise.css';

const Practice = () => {
    const [questions, setQuestions] = useState([]);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            setQuestions([]);
            const res = await Axios.get(`${import.meta.env.VITE_BASE_URL}/api/questions`);
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
            const res = await Axios.post(`${import.meta.env.VITE_BASE_URL}/api/questions/filter`, { ...filters });
            filtered = res.data;
        } catch(err) {
            console.error('Error filtering questions:', err);
        }
        setQuestions(filtered);
        setLoading(false);
    };

    const handleRefresh = () => {
        setQuestions(allQuestions);
    }

    const handleRandomQuestion = () => {
        const randomQuestion = allQuestions[Math.floor(Math.random() * allQuestions.length)];
        setQuestions([randomQuestion]);
    };

    const handleRecommendQuestion = async (questionId, receiverId) => {
        try {
            await Axios.post(`/api/recommend/question`, {
                senderId: localStorage.getItem('id'),
                receiverId,
                questionId,
            });
            alert('Recommendation sent!');
        } catch (error) {
            console.error("Error sending recommendation:", error);
        }
    };

    return (
        <div className="practice-page">
            <Burger />
            <CheatSheetPanel/>
            <Filter onFilter={handleFilter} />
            <Questions
                loading={loading}
                setLoading={setLoading}
                questions={questions}
                onRefresh={handleRefresh}
                onRandomQuestion={handleRandomQuestion}
                onRecommendQuestion={handleRecommendQuestion}
            />
        </div>
    );
};

export default Practice;
