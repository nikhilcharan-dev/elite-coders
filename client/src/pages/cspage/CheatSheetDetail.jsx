import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Questions from '../qsection/QSection';

const CheatSheetDetail = () => {
    const { name } = useParams();
    const [cheatsheet, setCheatsheet] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCheatsheet = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/cheatsheets/${name}`);
                setCheatsheet(response.data);

                console.log(response.data);

                const qIds = response.data.questions;
                const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/questions/filter/byIds`, { qIds });
                setQuestions(res.data);
            } catch (error) {
                console.error('Error fetching cheatsheet:', error);
            }
            setLoading(false);
        };

        fetchCheatsheet();
    }, [name]);

    if (loading) return <Spinner/>;
    if (!cheatsheet) return <p>Cheatsheet not found.</p>;

    const handleRandomQuestion = () => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        setQuestions([randomQuestion]);
    }

    const handleRecommendQuestion = (question) => {
        // Pending !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log('Recommend Question:', question);
    };

    return (
        <div className="cheatsheet-detail">
            <h1>{cheatsheet.name}</h1>
            <p><strong>Quote:</strong> {cheatsheet.quote}</p>
            <h3>Questions:</h3>
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

export default CheatSheetDetail;
