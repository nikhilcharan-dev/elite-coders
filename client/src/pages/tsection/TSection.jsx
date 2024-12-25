import React, { useState, useEffect } from 'react';
import axios from 'axios';

import gfg from '../assests/gfg.png';
import yt from '../assests/youtube.png';

import './TSection.css';

const TSection = ({ questions, loading }) => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const res = await axios.get(`${BASE_URL}/api/users/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if(!userId) fetchUser();
    }, []);

    const handleRecommend = async (question) => {
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            await axios.post(`${BASE_URL}/api/recommend`, {
                userId,
                topic: question.name,
            });
            alert(`Recommended "${question.name}" successfully!`);
        } catch (error) {
            console.error('Error recommending question:', error);
        }
    };

    return (
        <div className="questions-section">
            <h3 style={{paddingBottom: "20px"}}>Learning Resources</h3>

            {loading && <div className="loading-spinner"></div>}

            {/* Question List */}
            <div className="questions-list">
                {questions?.length > 0 ? (
                    questions.map((question, index) => (
                        <div key={index} className="Tquestion-card">
                            <h4>{question.name}</h4>
                            <div className='link-btns'>
                                <button className='yt-btn'>
                                    <a
                                        href={`${question.youtubeLink}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={yt} alt='yt'/>
                                    </a>
                                </button>
                                <button className="gfg-btn">
                                    <a
                                        href={question.gfgLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <img src={gfg} alt='gfg' />
                                    </a>
                                </button>
                        </div>
                            <button
                                className="rcd-btn"
                                onClick={() => handleRecommend(question)}
                            >
                                Recommend
                            </button>
                        </div>
                    ))
                ) : (
                    <>
                        {!loading && <p>No resources found..</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default TSection;
