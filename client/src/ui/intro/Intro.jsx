import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Intro.css";

const Intro = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/login");
        }, 8000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="intro-container">
            <div className="animated-logo">
                <img className="logo" src="/images/logo.png" alt="logo" />
                <h1 className="name">Elite Coders</h1>
            </div>
        </div>
    );
};

export default Intro;
