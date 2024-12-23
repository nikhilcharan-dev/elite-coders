import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Popup from "../../pages/popup/Popup";

import './LoginPage.css';

function LoginPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);
    const [profilePage, setProfilePage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user && !password) {
            setError("Please fill out all fields.");
            return;
        } else if(!user) {
            setError("Please Enter username");
            return;
        } else if(!password) {
            setError("Please Enter password");
            return;
        }
        setError("");
        
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.post(`${BASE_URL}/api/oauth/login`, {
                usernameOrEmail: user,
                password: password
            });

            setPopup(true);
            // cookies
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.userData._id);
            localStorage.setItem('userData', JSON.stringify(res.data.userData));
            setProfilePage(`/user/id=${res.data.userData._id}`);
        } catch(err) {
            setError(err.response.data.message);
        }
    };
    
    const handleAfterLogin = () => {
        setPopup(false);
        navigate(profilePage);
    }

    return (
        <div className="log">
            {popup && (
                <Popup title="Login Successful" isOpen={popup} onClose={handleAfterLogin}>
                    <p className="quote para" style={{textAlign: "center",
                                                         margin: "20px 15px 15px 15px", 
                                                         fontSize: "1.5rem",
                                                         color: "#4B8A8D"
                                                        }
                    }>' Welcome back '</p>
                </Popup>
            )}

            <section className="login-page">
                <h1>Login</h1>
                <form className="credentials" onSubmit={handleLogin}>
                    {error && <p className="error-message">{error}</p>}
                    <label>
                        <input
                            type="text"
                            placeholder="Enter your Username or E-mail"
                            className="text-area"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            aria-label="User"
                        />
                    </label>
                    <label>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="text-area"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Password"
                        />
                    </label>
                    <a href="/" className="forgot-password-link">
                        Forgot your password?
                    </a>
                    <div className="btns">
                        <button 
                            type="submit" 
                            className="login-btn"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="register-btn"
                            onClick={() => navigate('/register')}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default LoginPage;
