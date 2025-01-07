import React, { useEffect, useState } from 'react';
import Axios from '@api';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import Questions from '../qsection/QSection';
import ThemedButton from '../../ui/button/Button';

// images 
import like from '../assests/like.png';
import dislike from '../assests/dislike.png';
import liked from '../assests/liked.png';
import disliked from '../assests/disliked.png';
import home from '../assests/home.png';

import './CheatSheetDetail.css';
import Like from '../../ui/like/Like';

const CheatSheetDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const userId = localStorage.getItem('id');
    const [cheatsheet, setCheatsheet] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isDisliked, setIsDisliked] = useState(false);

    useEffect(() => {
        const fetchCheatsheet = async () => {
            setLoading(true);
            try {
                const response = await Axios.get(`${import.meta.env.VITE_BASE_URL}/api/cheatsheets/${name}`);
                setCheatsheet(response.data);

                const ids = response.data.questions;
                const res = await Axios.post(`${import.meta.env.VITE_BASE_URL}/api/questions/filter/byIds`, { ids });
                localStorage.setItem('questions', JSON.stringify(res.data));
                setQuestions(res.data);
                setLikes(response.data.likes);
                setDislikes(response.data.dislikes);
            } catch (error) {
                console.error('Error fetching cheatsheet:', error);
            }
            setLoading(false);
        };

        fetchCheatsheet();
    }, [name, likes, dislikes]);

    const handleLike = async () => {
        try {
            const res = await Axios.post(`${import.meta.env.VITE_BASE_URL}/api/cheatsheets/${cheatsheet._id}/like`, { userId });
            setLikes(res.data.likes);
            setIsLiked(true);
            setIsDisliked(false); // Dislike reset if liked
        } catch (error) {
            console.error("Error liking cheatsheet:", error);
        }
    };

    const handleDislike = async () => {
        try {
            const res = await Axios.post(`${import.meta.env.VITE_BASE_URL}/api/cheatsheets/${cheatsheet._id}/dislike`, { userId });
            setDislikes(res.data.dislikes);
            setIsLiked(false); // Like reset if disliked
            setIsDisliked(true);
        } catch (error) {
            console.error("Error disliking cheatsheet:", error.message);
        }
    };

    const handleRefresh = () => {
        setQuestions(JSON.parse(localStorage.getItem('questions')));
    }

    const handleRandomQuestion = () => {
        const curQuestions = JSON.parse(localStorage.getItem('questions'));
        const randomQuestion = curQuestions[Math.floor(Math.random() * curQuestions.length)];
        setQuestions([randomQuestion]);
    };

    const handleRecommendQuestion = (question) => {
        // Pending !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log('Recommend Question:', question);
    };

    if (loading) return <Spinner />;
    if (!cheatsheet) return <p>Cheatsheet not found.</p>;

    return (
        <div className="cheatsheet-detail">
            <div className="cheatsheet-header">
                <img
                    className="cheatsheet-image"
                    src={`/images/${cheatsheet._id}.jpg`}
                    alt={`${cheatsheet.name}'s Profile`}
                    onError={(e) => (e.target.src = '/images/default.png')}
                />
                <h1>{`< ${cheatsheet.name} / >`}</h1>
            </div>
            <p><strong>Quote:</strong> {cheatsheet.quote}</p>
            <div className="actions">
                <ThemedButton link={home} onClick={() => navigate('/')} />
                <Like
                    count={likes} 
                    onClick={handleLike} 
                    text="Likes"
                />
                <Like 
                    count={dislikes} 
                    onClick={handleDislike} 
                    text="Dislikes"
                />
            </div>
            <Questions
                loading={loading}
                setLoading={setLoading}
                questions={questions}
                onRandomQuestion={handleRandomQuestion}
                onRecommendQuestion={handleRecommendQuestion}
                onRefresh={handleRefresh}
            />
        </div>
    );
};

export default CheatSheetDetail;
