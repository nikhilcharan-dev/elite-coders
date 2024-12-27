import React, { useState, useEffect } from 'react';
import Axios from '@api';

import gfg from '../assests/gfg.png';
import yt from '../assests/youtube.png';

import './TSection.css';

const TSection = ({ questions, loading }) => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await Axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/${userId}`);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        if(!userId) fetchUser();
    }, []);

    const handleRecommend = (question) => {
        // Pending !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log('Recommend Question:', question);
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
