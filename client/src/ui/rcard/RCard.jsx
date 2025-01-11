import React from 'react';


import './RCard.css';

const RCard = ({ title, description, bcLink, logo, link }) => {

    const handleClick = (link) => {
        window.open(link, "_blank");
    }

    return (
        <div className='resource-card' onClick={() => handleClick(link)}>
            <img src={bcLink} alt={title} className='background-logo' />
            <img src={logo} alt={title} className='resource-logo' />
            <h3>{title.toUpperCase()}</h3>
            <p>{description}</p>
        </div>
    );
};

export default RCard;