import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import elite from '../img/star.png';
import user from '../img/default-user.png';
import def from '../img/default-other.jpg';
import boy from '../img/default-boy.jpg';
import girl from '../img/default-girl.jpg';

import './NavBar.css';

function NavBar() {
    const loginPage = '/login';
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') ? true : false;

    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    console.log(userData);

    var profileImage = userData.profilePhoto ||
                (userData.gender === 'Male' ? boy :
                    userData.gender === 'Female' ? girl : 
                        userData.gender === 'Other' ? def : user);
    
    let profilePage = isLoggedIn? `/user/id=${localStorage.getItem('id')}` : loginPage;


    useEffect(() => {
        if(!isLoggedIn) {
            profileImage = user;
            navigate(loginPage);
        }

        if(localStorage.length === 0) {
            navigate(loginPage);
        }
    }, []);


    return (
        <nav>
            <div className="logo">
                <img id="logo" src={elite} alt="logo" />
                <h1>Elite Coders</h1>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
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
                    <Link to="/">Resources</Link>
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
