import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import elite from '../img/star.png';
import user from '../img/user-dark.png'

import './NavBar.css';

function NavBar() {

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('token');

    const loginPage = '/login';
    const profilePage = `/profile?id=${localStorage.getItem('id')}`;

    return (
        <nav>
            <div className='logo'>
                <img id='logo' src={elite} alt='logo' />
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
                    <Link to={isLoggedIn ? profilePage : loginPage}>
                        <img id='user' src={user} alt='profile'/>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;