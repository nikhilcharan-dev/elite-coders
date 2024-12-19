import React, { useState } from "react";
import axios from "axios";
import './LoginPage.css';

function LoginPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            const res = await axios.post(`${BASE_URL}/api/auth/login`, {
                usernameOrEmail: user,
                password: password
            });

            window.prompt(res.data.message);
            console.log(res);

        } catch(err) {
            if(err.respone && err.respone.data) {
                setError(err.respone.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
        
    };

    return (
        <div className="log">
            <section className="login-page">
                <h1>Login</h1>
                <form className="credentials" onSubmit={handleLogin}>
                    {error && <p className="error-message">{error}</p>}
                    <label>
                        User:
                        <input
                            type="text"
                            placeholder="Enter your name or email"
                            className="text-area"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            aria-label="User"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            placeholder="Enter your password"
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
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                        <button
                            type="button"
                            className="register-btn"
                            onClick={() => console.log("Redirecting to registration...")}
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
