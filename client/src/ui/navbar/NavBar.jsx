import React from 'react';
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
                    <a href='/'>Learn</a>
                </li>
                <li>
                    <a href='/'>Practise</a>
                </li>
                <li>
                    <a href='/'>Compete</a>
                </li>
                <li>
                    <a href='/'>About</a>
                </li>
                <li>
                    <a href='/'>
                        <img id='user' src={user} alt='profile'/>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;