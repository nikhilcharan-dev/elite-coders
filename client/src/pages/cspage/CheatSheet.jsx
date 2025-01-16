import React, { useState, useEffect } from 'react'
import Axios from '@api';
import Spinner from '../spinner/Spinner';
import Burger from '../../ui/burgernav/Burger';

import './CheatSheet.css';

const CheatSheet = () => {

    const [cheatsheets, setCheatsheets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCheatsheets = async () => {
            try {
                setLoading(true);
                const BASE_URL = import.meta.env.VITE_BASE_URL;
                const res = await Axios.get(`${BASE_URL}/api/cheatsheets`);
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
            <Burger />
			<h2>"Cheatsheets Crafted for Excellence"</h2>
			<div className="cheatsheet-cards">
                {loading && <Spinner />}
				{!loading && cheatsheets.length > 0 ? cheatsheets.map((cheatsheet) => (
					<CheatsheetCard
						key={cheatsheet._id}
						profilePhoto={cheatsheet._id}
						name={cheatsheet.name}
						quote={cheatsheet.quote}
					/>
				)) : (
                    <p>No cheatsheets available.</p>
                )}
			</div>
        </div>
    );
};


const CheatsheetCard = ({ profilePhoto, name, quote }) => {
    console.log(name, profilePhoto);
	return (
		<div className="cheatsheet-card">
			<img src={`images/${profilePhoto}.jpg`} alt={`${name}'s profile`} />
			<h3>{name}</h3>
			<p className='quote'>"{quote}"</p>
            <button className='link-btn' onClick={() => window.location.href = '/cheatsheets/' + name}>
                Learn
            </button>
		</div>
	);
};


export default CheatSheet;