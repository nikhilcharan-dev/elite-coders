import React from 'react';

import NavBar from '../../ui/navbar/NavBar';
import Search from './assests/search/Search';
import Resources from './assests/resources/Resources';

import './Social.css';

const Social = () => {
    return (
        <div className="social-container">
            <NavBar />
            <Search />
            <Resources />
        </div>
    );
};

export default Social;