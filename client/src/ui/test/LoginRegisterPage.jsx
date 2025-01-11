import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "@api";
import Popup from "../../pages/popup/Popup";
import { DotLoader } from "react-spinners";

import "./LoginRegisterPage.css";

const LoginRegisterPage = () => {
    const [isSliderOnLogin, setIsSliderOnLogin] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [logError, setLogError] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [popup, setPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user || !password) {
            setLogError("Please fill out all fields.");
            return;
        }
        setLogError("");

        try {
            setLoading(true);
            const res = await Axios.post(`/api/oauth/login`, {
                usernameOrEmail: user,
                password: password,
            });
            setPopup(true);
            sessionStorage.setItem("token", res.data.token);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userData._id);
            localStorage.setItem("userData", JSON.stringify(res.data.userData));
        } catch (err) {
            setLogError(err.response?.data?.message || "Invalid credentials");
        }
        setLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email || !username || !password) {
            setRegisterError("Please fill out all fields.");
            return;
        }
        if (!isValidEmail(email)) {
            setRegisterError("Please enter a valid email.");
            return;
        }
        setRegisterError("");

        try {
            setLoading(true);
            await Axios.post(`/api/oauth/register`, {
                email,
                username,
                password,
            });
            setPopup(true);
        } catch (err) {
            setRegisterError(err.response?.data?.message || "An unexpected error occurred");
        }
        setLoading(false);
    };


    useEffect(() => {
        const checkOAuth = () => {
            if(localStorage.getItem('token')) {
                navigate(`/user/id=${localStorage.getItem("id")}`);
            }
        }
        checkOAuth();
    }, []);

    const handleAfterLogin = () => {
        setPopup(false);
        navigate(`/user/id=${localStorage.getItem("id")}`);
    }

    const handleAfterRegister = () => {
        setPopup(false);
        setIsSliderOnLogin(false);
    }

    return (
        <div className="login-register-container">
            {/* Web Name */}
            <div className="brand-title-container">
                <img src="/images/logo.png" alt="Background Logo" className="brand-logo" />
                <h1 className="brand-title">Elite Coders</h1>
            </div>

            {
                popup && isSliderOnLogin ? (
                    <Popup title="Registration Successful" isOpen={popup} onClose={handleAfterRegister}>
                        <p className="quote" style={{
                            textAlign: "center",
                            margin: "20px 15px 15px 15px",
                            fontSize: "1.5rem",
                            color: "#4B8A8D"
                        }
                        }>A new Journey Begins....</p>
                    </Popup>
                ) : (
                    <Popup title="Login Successful" isOpen={popup} onClose={handleAfterLogin}>
                        <p className="quote para" style={{
                            textAlign: "center",
                            margin: "20px 15px 15px 15px",
                            fontSize: "1.5rem",
                            color: "#4B8A8D"
                        }
                        }>' Welcome back '</p>
                    </Popup>
                )
            }

            {loading &&
                <div className='overlay'>
                    <DotLoader
                        size={60}
                        color='#ffffff'
                    />
                </div>}

            <div className="form-row">
                {/* Login Card */}
                <div className="form-card login-card">
                    <h2>Login</h2>
                    {logError && <p className="error-message">{logError}</p>}
                    <form onSubmit={handleLogin} className="cred-form">
                        <label>
                            Username or Email
                            <input
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                </div>

                {/* Register Card */}
                <div className="form-card register-card">
                    <h2>Register</h2>
                    {registerError && <p className="error-message">{registerError}</p>}
                    <form onSubmit={handleRegister} className="cred-form">
                        <label>
                            Username
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit">Sign up</button>
                    </form>
                </div>

                {/* Slider */}
                <div
                    className={`slider ${isSliderOnLogin ? "slider-login" : "slider-register"}`}
                >
                    <p>{isSliderOnLogin ? "Ready to conquer your goals? Let’s get started – log in!" : "Every journey starts with a first step – take yours by signing up!"}</p>
                    <button onClick={() => setIsSliderOnLogin(!isSliderOnLogin)}>
                        {isSliderOnLogin ? "Login" : "Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterPage;
