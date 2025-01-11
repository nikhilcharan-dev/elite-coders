import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import elite from '../img/star.png';
import user from '../img/default-user.png';
import def from '../img/default-other.jpg';
import boy from '../img/default-boy.jpg';
import girl from '../img/default-girl.jpg';

import './NavBar.css';

const NavBar = ({ edited }) => {
    const loginPage = '/intro';
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('token') ? true : false);
    const [profileImage, setProfileImage] = useState(def);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || {});

    useEffect(() => {
        const setImage = () => {
            const image = userData.profilePhoto || 
                (userData.gender === 'Male' ? boy :
                    userData.gender === 'Female' ? girl : 
                        userData.gender === 'Other' ? def : user);
            setProfileImage(image);
        };

        if (isLoggedIn) {
            setImage();
        }
    }, [edited, isLoggedIn, userData]);

    useEffect(() => {
        if (!isLoggedIn || localStorage.length === 0) {
            navigate(loginPage);
        }
    }, [isLoggedIn, navigate]);

    let profilePage = isLoggedIn ? `/user/id=${localStorage.getItem('id')}` : loginPage;

    return (
        <nav>
            <div className="Logo">
                <a href="/">
                    <img id="Logo" src={elite} alt="logo" />
                </a>
                <h1>Elite Coders</h1>
            </div>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/learn">Learn</Link>
                </li>
                <li>
                    <Link to="/practice">Practice</Link>
                </li>
                <li>
                    <Link to="/compete">Compete</Link>
                </li>
                <li>
                    <Link to="/social">Social</Link>
                </li>
                <li>
                    <Link to={profilePage}>
                        <img id="user" src={profileImage} alt="profile" />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;
