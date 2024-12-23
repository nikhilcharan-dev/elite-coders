import React from 'react';
import './Button.css';

const ThemedButton = ({ link, onClick, style, count, type, isActive }) => {
    return (
        <button
            className={`themed-btn ${type && type.toLowerCase()} ${isActive ? 'active' : ''}`}
            onClick={onClick}
            style={style}
        >
            {count && <h1>{count}</h1>}
            {link && <img src={link} alt={`${link}'s`} />}
        </button>
    );
};

export default ThemedButton;
