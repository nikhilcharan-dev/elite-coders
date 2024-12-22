import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Spinner from '../spinner/Spinner';

import './CheatSheet.css';

const CheatSheet = () => {

    const [cheatsheets, setCheatsheets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCheatsheets = async () => {
            try {
                setLoading(true);
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const res = await axios.get(`${BASE_URL}/api/cheatsheets`);
                setCheatsheets(res.data);
            } catch (err) {
                console.error('Error fetching cheatsheets:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCheatsheets();
    }, []);

    return (
        <div className="cheatsheet-section page">
			<h2>Featured Cheatsheets</h2>
			<div className="cheatsheet-cards">
                {loading && <Spinner />}
				{!loading && cheatsheets.length > 0 ? cheatsheets.map((cheatsheet) => (
					<CheatsheetCard
						key={cheatsheet._id}
						profilePhoto={cheatsheet.profilePhoto}
						name={cheatsheet.name}
						quote={cheatsheet.quote}
                        link={cheatsheet.link}
					/>
				)) : (
                    <p>No cheatsheets available.</p>
                )}
			</div>
        </div>
    );
};


const CheatsheetCard = ({ profilePhoto, name, quote, link }) => {
	return (
		<div className="cheatsheet-card">
			<img src={profilePhoto} alt={`${name}'s profile`} />
			<h3>{name}</h3>
			<p>"{quote}"</p>
            <button className='link-btn'>
                <a href={link}>Learn</a>
            </button>
		</div>
	);
};


export default CheatSheet;