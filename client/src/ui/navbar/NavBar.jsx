import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import elite from '../img/star.png';
import user from '../img/default-user.png';
import boy from '../img/default-boy.jpg';
import girl from '../img/default-girl.jpg';

import './NavBar.css';

function NavBar() {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('token');
    const userId = localStorage.getItem('id');
    const userData = sessionStorage.getItem('userData') 
        ? JSON.parse(sessionStorage.getItem('userData')) 
        : null;

    const loginPage = '/login';
    const profilePage = `/user/id=${localStorage.getItem('id')}`;
    
    let profileImage = user;
    if (userData) {
        profileImage = userData.profilePhoto || 
            (userData.gender === 'male' ? boy : 
             userData.gender === 'female' ? girl : user);
    }

    return (
        <nav>
            <div className="logo">
                <img id="logo" src={elite} alt="logo" />
                <h1>Elite Coders</h1>
            </div>
            <ul>
                <li>
                    <Link to="/learn">Learn</Link>
                </li>
                <li>
                    <Link to="/practise">Practise</Link>
                </li>
                <li>
                    <Link to="/compete">Compete</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to={isLoggedIn ? profilePage : loginPage}>
                        <img id="user" src={profileImage} alt="profile" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
