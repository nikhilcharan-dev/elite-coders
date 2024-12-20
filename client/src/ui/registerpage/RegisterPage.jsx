import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css';

function RegisterPage() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!email && !user && !password) {
            setError("Please fill out all fields.");
            return;
        } else if(!email) {
            setError("Please Enter email");
            return;
        } else if(!password) {
            setError("Please Enter password");
            return;
        } else if(!user) {
            setError("Please Enter username");
            return;
        }

        setError("");
        
        try {
            const BASE_URL = import.meta.env.VITE_BASE_URL;
            const res = await axios.post(`${BASE_URL}/api/oauth/register`, {
                email: email,
                username: user,
                password: password
            });

            window.alert(res.data.message);
            console.log(res);

            navigate('/login');

        } catch(err) {
            setError(err.response?.data?.message || 'An unexpected error occurred');
        }
        
    };

    return (
        <div className="register">
            <section className="register-page">
                <h1>Register</h1>
                <form className="credentials" onSubmit={handleRegister}>
                    {error && <p className="error-message">{error}</p>}
                    <label>
                        <input
                            type="text"
                            placeholder="Enter your Username"
                            className="text-area"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            aria-label="User"
                        />
                    </label>
                    <label>
                        <input
                            type="text"
                            placeholder="Enter your E-mail"
                            className="text-area"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="btns">
                        <button type="button" className="login-btn"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                        <button
                            type="submit"
                            className="register-btn"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default RegisterPage;
