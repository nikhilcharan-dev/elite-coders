import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Popup from "../../pages/popup/Popup";

import './RegisterPage.css';

function RegisterPage() {
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [popup, setPopup] = useState(false);
    const [login, setLogin] = useState("");
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email && !username && !password) {
            setError("Please fill out all fields.");
            return;
        } else if(!email) {
            setError("Please Enter email");
            return;
        } else if(!password) {
            setError("Please Enter password");
            return;
        } else if(!username) {
            setError("Please Enter username");
            return;
        } else if(!isValidEmail(email)) {
            setError("Please Enter a valid email");
            return;
        }

        setError("");
        
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.post(`${BASE_URL}/api/oauth/register`, {
                email,
                username,
                password
            });
            
            setPopup(true);
            setLogin('/login');

        } catch(err) {
            setError(err.response?.data?.message || 'An unexpected error occurred');
        }
    };

    const handleAfterRegister = () => {
        setPopup(false);
        navigate(login);
    }

    return (
        <div className="register">
            {popup && (
                <Popup title="Registration Successful" isOpen={popup} onClose={handleAfterRegister}>
                    <p className="quote" style={{textAlign: "center",
                                                         margin: "20px 15px 15px 15px", 
                                                         fontSize: "1.5rem",
                                                         color: "#4B8A8D"
                                                        }
                    }>A new Journey Begins....</p>
                </Popup>
            )}
            <section className="register-page">
                <h1>Register</h1>
                <form className="credentials" onSubmit={handleRegister}>
                    {error && <p className="error-message">{error}</p>}
                    <label>
                        <span>Username</span>
                        <input
                            type="text"
                            placeholder="Enter your Username"
                            className="text-area"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            aria-label="User"
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            type="text"
                            placeholder="Enter your E-mail"
                            className="text-area"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email"
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            className="text-area"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Password"
                        />
                    </label>
                    <div className="btns">
                        <button
                            type="submit"
                            className="register-btn"
                        >
                            Register
                        </button>
                        <button type="button" className="login-btn"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default RegisterPage;
