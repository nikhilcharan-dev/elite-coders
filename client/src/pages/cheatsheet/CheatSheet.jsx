
import React from 'react';
import './CheatSheet.css';

const cheatsheets = [
  {
    id: 1,
    profilePhoto: 'https://example.com/photo1.jpg',
    name: 'Dynamic Programming Cheatsheet',
    quote: 'Master the art of breaking problems into subproblems.',
  },
  {
    id: 2,
    profilePhoto: 'https://example.com/photo2.jpg',
    name: 'Graph Theory Cheatsheet',
    quote: 'Graphs are everywhere. Master them here.',
  },
  {
    id: 3,
    profilePhoto: 'https://example.com/photo3.jpg',
    name: 'Data Structures Cheatsheet',
    quote: 'Lay the foundation with core structures.',
  },
  // Add more cheatsheet objects here
];

const Cheatsheet = () => {
  return (
    <div className="cheatsheet-section">
      <h2>Featured Cheatsheets</h2>
      <div className="cheatsheet-cards">
        {cheatsheets.slice(0, 3).map((cheatsheet) => (
          <CheatsheetCard
            key={cheatsheet.id}
            profilePhoto={cheatsheet.profilePhoto}
            name={cheatsheet.name}
            quote={cheatsheet.quote}
          />
        ))}
      </div>
      <button className="expand-button" onClick={() => window.location.href = '/cheatsheets'}>
        Expand
      </button>
    </div>
  );
};

const CheatsheetCard = ({ profilePhoto, name, quote }) => {
    return (
      <div className="cheatsheet-card">
        <img src={profilePhoto} alt={`${name}'s profile`} />
        <h3>{name}</h3>
        <p>"{quote}"</p>
      </div>
    );
};

export default Cheatsheet;
