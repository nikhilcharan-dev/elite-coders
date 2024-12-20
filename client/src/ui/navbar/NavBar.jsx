import React from 'react';
import { Link } from 'react-router-dom';

import user from '../img/user-dark.png'

import './NavBar.css';

function NavBar() {
    return (
        <nav>
            <div className='logo'>
                <img id='logo' src={user} alt='logo' />
                <h1>Elite Coders</h1>
            </div>
            <ul>
                <li>
                    <Link to='/learn'>Learn</Link>
                </li>
                <li>
                    <Link to='/practise'>Practise</Link>
                </li>
                <li>
                    <Link to='/compete'>Compete</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/profile'>
                        <img id='user' src={user} alt='profile'/>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;