import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "@api";

import def from "../img/default-other.jpg";
import boy from "../img/default-boy.jpg";
import girl from "../img/default-girl.jpg";
import burger from "../img/burger-bar.png";
import close from "../img/close.png";

import "./Burger.css";

const Burger = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [menuVisible, setMenuVisible] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await Axios.get(`/api/users/getProfilePhoto/${user?._id}`);
                setProfilePhoto(res?.data?.photo || null);
            } catch (err) {
                console.error("Error fetching profile photo:", err);
            }
        })();
    }, [user]);

    const getImage = () => {
        return (
            profilePhoto ||
            (user?.gender === "Male" ? boy : user?.gender === "Female" ? girl : def)
        );
    };

    const toggleMenu = () => {
        if(menuVisible) {
            setMenuVisible(false);
        } else { 
            setMenuVisible(true);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login");
    };

    return (
        <section className="burger-section">
            {menuVisible ? (
                <div className="burger-icon" onClick={toggleMenu}>
                    <img className="burger-img" src={burger} alt="menu" />
                </div>
            ) : (
                <div className={`burger-menu ${menuVisible ? "visible" : "hidden"}`}>
                    <div className="burger-icon" onClick={toggleMenu}>
                        <img className="burger-img" src={close} alt="close" />
                    </div>
                    <img
                        className="burger-profile"
                        src={getImage()}
                        alt="user"
                        onClick={() => navigate(`/user/id=${user?._id}`)}
                    />
                    <ul className="burger-links">
                        <li onClick={() => navigate("/home")}>Home</li>
                        <li>
                            CodeLab
                            <ul className="burger-dropdown">
                                <li onClick={() => navigate("/learn")}>Learn</li>
                                <li onClick={() => navigate("/practice")}>Practice</li>
                            </ul>
                        </li>
                        <li>
                            <li className='codeblood-link' to="/codeblooded/curated">CodeBlooded</li>
                        </li>
                        <li>
                            CodeGlory
                            <ul className="burger-dropdown">
                                <li onClick={() => navigate("/stats")}>Stats</li>
                                <li onClick={() => navigate("/compete")}>Compete</li>
                            </ul>
                        </li>
                        <li onClick={() => navigate("/social")}>Social</li>
                    </ul>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </section>
    );
};

export default Burger;
