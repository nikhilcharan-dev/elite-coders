import React from 'react';
import { useNavigate } from 'react-router-dom';

import './CheatSheetPanel.css';


const cheatsheets = [
	{
		id: 2,
		profilePhoto: 'https://example.com/photo2.jpg',
		name: 'Graph Theory Cheatsheet',
		quote: 'Graphs are everywhere. Master them here.',
	},
	{
		id: '67681a3b36178cfa62acc18e',
		profilePhoto: 'https://example.com/photo1.jpg',
		name: 'Dynamic Programming Cheatsheet',
		quote: 'Master the art of breaking problems into subproblems.',
	},
	{
		id: 3,
		profilePhoto: 'https://example.com/photo3.jpg',
		name: 'Data Structures Cheatsheet',
		quote: 'Lay the foundation with core structures.',
	},
];

const CheatsheetPanel = () => {

	const navigate = useNavigate();

	return (
		<div className="cheatsheet-section">
			<h2>Featured Cheatsheets</h2>
			<div className="cheatsheet-cards">
				{cheatsheets.slice(0, 3).map((cheatsheet) => (
					<CheatsheetCard
						key={cheatsheet.id}
						profilePhoto={cheatsheet._id}
						name={cheatsheet.name}
						quote={cheatsheet.quote}
					/>
				))}
			</div>
			<button className="expand-button" onClick={() => navigate('/cheatsheets')}>
				Expand
			</button>
		</div>
	);
};

const CheatsheetCard = ({ profilePhoto, name, quote }) => {
	const navigate = useNavigate();
	return (
		<div className="cheatsheet-card">
			<img
                // src={`/images/${profilePhoto}.png`}
				src='/images/default.jpg'
                alt={`${name}'s Profile`}
                onError={(e) => (e.target.src = '/images/default.jpg')}
            />
			<h3>{name}</h3>
			<p className='quote'>"{quote}"</p>
			<div className='cheatsheet-btns'>
				<button className='learn-me-button' onClick={() => navigate(`/cheatsheets/${name}`)}>Learn</button>
				<button className='rec-button'>Recommend</button>
			</div>
		</div>
	);
};

export default CheatsheetPanel;
